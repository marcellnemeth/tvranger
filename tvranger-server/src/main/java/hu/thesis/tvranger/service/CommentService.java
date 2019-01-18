package hu.thesis.tvranger.service;

import hu.thesis.tvranger.dto.CommentDto;
import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.mapper.CommentMapper;
import hu.thesis.tvranger.model.Comment;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.payload.request.CreateCommentRequest;
import hu.thesis.tvranger.repository.CommentRepository;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

    public CommentDto createComment(CreateCommentRequest commentRequest, UserPrincipal userPrincipal){

        User user = userRepository.findByUsername(userPrincipal.getUsername()).orElseThrow(
                ()-> new ResourceNotFoundException("User","Username",userPrincipal.getUsername())
        );

        Comment comment = new Comment(commentRequest.getMessage(),commentRequest.getShowId(), user);

        Comment result = commentRepository.save(comment);

        return CommentMapper.map(result);

    }

    public CommentDto getCommentByCommentId(Long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentId", commentId));


        return CommentMapper.map(comment);

    }

    public List<CommentDto> getCommentsByShowId(Long showId){
        List<Comment> comments = commentRepository.findAllByShowId(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Comments", "show id", showId));

        List<CommentDto> commentDtos = new ArrayList<>();

        for(Comment comment : comments){
            commentDtos.add(CommentMapper.map(comment));
        }

        Collections.reverse(commentDtos);

        return commentDtos;
    }
}
