package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.dto.CommentDto;
import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.mapper.CommentMapper;
import hu.thesis.tvranger.model.Comment;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.payload.request.CreateCommentRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.repository.CommentRepository;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.security.CurrentUser;
import hu.thesis.tvranger.security.UserPrincipal;
import hu.thesis.tvranger.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    CommentService commentService;


    @PostMapping("/comment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createComment(@Valid @RequestBody CreateCommentRequest commentRequest, @CurrentUser UserPrincipal userPrincipal) {
        CommentDto commentDto = commentService.createComment(commentRequest, userPrincipal);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/comments/{commentId}").buildAndExpand(commentDto.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "The comment has been created"));

    }

    @GetMapping("/comments/{commentId}")
    public CommentDto getComment(@PathVariable Long commentId) {
        return commentService.getCommentByCommentId(commentId);
    }

    @GetMapping("/comment/show/{showId}")
    public List<CommentDto> getCommentByShowId(@PathVariable Long showId) {

        return commentService.getCommentsByShowId(showId);
    }
}
