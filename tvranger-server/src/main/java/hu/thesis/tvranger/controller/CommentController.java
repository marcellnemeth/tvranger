package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.model.Comment;
import hu.thesis.tvranger.payload.request.CreateCommentRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createComment(@Valid @RequestBody CreateCommentRequest commentRequest){

        Comment comment = new Comment(commentRequest.getMessage(),commentRequest.getShowId());

        Comment result = commentRepository.save(comment);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/comments/{commentId}").buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true,"The comment has been created"));

    }

    @GetMapping("/comments/{commentId}")
    public Comment getComment(@PathVariable Long commentId){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentId", commentId));

        return comment;
    }

    @GetMapping("/comment/show/{showId}")
    public List<Comment> getCommentByShowId(@PathVariable Long showId){
        List<Comment> comments = commentRepository.findAllByShowId(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Comments", "show id", showId));

        Collections.reverse(comments);

        return comments;
    }
}
