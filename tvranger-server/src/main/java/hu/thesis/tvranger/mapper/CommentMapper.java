package hu.thesis.tvranger.mapper;

import hu.thesis.tvranger.dto.CommentDto;
import hu.thesis.tvranger.model.Comment;

public class CommentMapper {

    public static CommentDto map(Comment comment){
        CommentDto commentDto = new CommentDto();

        commentDto.setId(comment.getId());
        commentDto.setMessage(comment.getMessage());
        commentDto.setShowId(comment.getShowId());
        commentDto.setUsername(comment.getUser().getUsername());

        return commentDto;
    }
}
