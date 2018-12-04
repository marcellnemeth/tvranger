package hu.thesis.tvranger.payload.request;

import javax.validation.constraints.NotNull;

public class WatchListRequest {
    @NotNull
    private Long showId;

    public WatchListRequest(Long showId){
        this.showId = showId;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }
}
