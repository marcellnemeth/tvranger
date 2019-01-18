package hu.thesis.tvranger.service;

import hu.thesis.tvranger.dto.WatchListDto;
import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.mapper.WatchListMapper;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.model.WatchList;
import hu.thesis.tvranger.payload.request.WatchListRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.repository.WatchListRepository;
import hu.thesis.tvranger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WatchListService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    WatchListRepository watchListRepository;

    public WatchListDto createWatchList(WatchListRequest watchListRequest, UserPrincipal userPrincipal){

        User user = userRepository.findByUsername(userPrincipal.getUsername()).orElseThrow(
                () -> new ResourceNotFoundException("User", "Username", userPrincipal.getUsername())
        );

        Optional<List<WatchList>> watchLists = watchListRepository.findByShowId(watchListRequest.getShowId());

        if (watchLists.isPresent()) {
            for (WatchList item : watchLists.get()) {
                if (item.getUser().getUsername().equals(userPrincipal.getUsername())) {
                    return null;
                }
            }

        }
        WatchList watchList = new WatchList(watchListRequest.getShowId(),user);
        WatchList result = watchListRepository.save(watchList);

        return WatchListMapper.map(result);
    }

    public List<WatchListDto> getWatchListsByUser(UserPrincipal userPrincipal){
        List<WatchListDto> userWatchListDto = new ArrayList<>();
        List<WatchList> userWatchList = watchListRepository.findAllByUserId(userPrincipal.getId());

        for(WatchList watchList : userWatchList){
            userWatchListDto.add(WatchListMapper.map(watchList));
        }

        return userWatchListDto;

    }
}
