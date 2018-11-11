package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.payload.request.UserSummary;
import hu.thesis.tvranger.security.CurrentUser;
import hu.thesis.tvranger.security.UserPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user/currentuser")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        UserSummary userSummary = new UserSummary(userPrincipal.getId(),userPrincipal.getUsername(),userPrincipal.getEmail());

        return userSummary;
    }
}
