package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.model.Comment;
import hu.thesis.tvranger.payload.request.CreateCommentRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/comment")
    public ResponseEntity<?> createComment(@Valid @RequestBody CreateCommentRequest commentRequest){

        Comment comment = new Comment(commentRequest.getMessage(),commentRequest.getShowId());

        Comment result = commentRepository.save(comment);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/comments/{commentId}").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true,"The comment has been created"));

    }

    @GetMapping("/comments/{commentId}")
    public Comment getComment(@PathVariable Long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentId", commentId));

        return comment;
    }

    @GetMapping("/comment/show/{showId}")
    public Comment getCommentByShowId(@PathVariable Long showId){
        Comment comment = commentRepository.findByShowId(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "showId", showId));

        return comment;
    }
}
