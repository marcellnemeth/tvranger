package hu.thesis.tvranger.payload.request;

import javax.validation.constraints.NotNull;

public class WatchListRequest {
    @NotNull
    private int showId;


    public WatchListRequest(@NotNull int showId) {
        this.showId = showId;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }
}
