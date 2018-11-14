package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.exceptions.ResourceNotFoundException;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.payload.request.UserSummary;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.security.CurrentUser;
import hu.thesis.tvranger.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserRepository userRepository;

    @GetMapping("/user/currentuser")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        UserSummary userSummary = new UserSummary(userPrincipal.getId(), userPrincipal.getUsername(), userPrincipal.getEmail());

        return userSummary;
    }

    @GetMapping("/users/{username}")
    public UserSummary getUserSummary(@PathVariable String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getEmail());

        return userSummary;
    }

    @GetMapping("/user/{userId}")
    public UserSummary getUserById(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));

        UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getEmail());


        return userSummary;
    }

    @GetMapping("/user/checkUsername")
    public Boolean checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);

        return isAvailable;
    }

    @GetMapping("/user/checkEmail")
    public Boolean checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);

        return isAvailable;
    }
}
