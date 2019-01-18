package hu.thesis.tvranger.mapper;

import hu.thesis.tvranger.dto.WatchListDto;
import hu.thesis.tvranger.model.WatchList;

public class WatchListMapper {

    public static WatchListDto map(WatchList watchList){
        WatchListDto watchListDto = new WatchListDto();

        watchListDto.setId(watchList.getId());
        watchListDto.setShowId(watchList.getShowId());
        watchListDto.setUsername(watchList.getUser().getUsername());

        return watchListDto;
    }
}
