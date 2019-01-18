package hu.thesis.tvranger.dto;

public class WatchListDto {

    private Long id;

    private int showId;

    private String username;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public int getShowId(){
        return showId;
    }

    public void setShowId(int showId){
        this.showId = showId;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }
}
