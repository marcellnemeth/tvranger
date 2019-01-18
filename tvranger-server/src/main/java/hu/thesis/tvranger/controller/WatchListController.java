package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.dto.WatchListDto;
import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.model.WatchList;
import hu.thesis.tvranger.payload.request.WatchListRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.repository.WatchListRepository;
import hu.thesis.tvranger.security.CurrentUser;
import hu.thesis.tvranger.security.UserPrincipal;
import hu.thesis.tvranger.service.WatchListService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class WatchListController {

    private static final Logger logger = LoggerFactory.getLogger(WatchListController.class);

    @Autowired
    WatchListRepository watchListRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WatchListService watchListService;

    @PostMapping("/watchlist")
    public ResponseEntity<?> createWatchList(@Valid @RequestBody WatchListRequest watchListRequest,
                                             @CurrentUser UserPrincipal userPrincipal) {

        WatchListDto watchListDto = watchListService.createWatchList(watchListRequest,userPrincipal);

        if(watchListDto == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "This show is already on the watchlist"));
        }else {

            URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/watchlists/{watchListId}").buildAndExpand(watchListDto.getId()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "The watchlist has been created"));
        }
    }

    @GetMapping("/watchlist/all")
    public ResponseEntity<?> findAll(@CurrentUser UserPrincipal user) {
        List<WatchListDto> userWatchlistDto = watchListService.getWatchListsByUser(user);

        if(userWatchlistDto.size() == 0){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(userWatchlistDto);
    }
}
