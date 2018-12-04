package hu.thesis.tvranger.controller;

import hu.thesis.tvranger.enums.RoleName;
import hu.thesis.tvranger.exceptions.ApplicationException;
import hu.thesis.tvranger.model.Role;
import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.payload.request.LoginRequest;
import hu.thesis.tvranger.payload.request.SignupRequest;
import hu.thesis.tvranger.payload.response.ApiResponse;
import hu.thesis.tvranger.payload.response.JwtAuthenticationResponse;
import hu.thesis.tvranger.repository.RoleRepository;
import hu.thesis.tvranger.repository.UserRepository;
import hu.thesis.tvranger.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

  Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest){

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getEmailOrUsername(),
            loginRequest.getPassword()
        )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jsonWebtoken = jwtTokenProvider.generateToken(authentication);



    return ResponseEntity.ok(new JwtAuthenticationResponse(jsonWebtoken));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
    if(userRepository.existsByUsername(signupRequest.getUsername())){
      return new ResponseEntity<>(new ApiResponse(false,"This username is already in use"),
          HttpStatus.BAD_REQUEST);
    }
    if(userRepository.existsByEmail(signupRequest.getEmail())){
      return new ResponseEntity<>(new ApiResponse(false, "This email is already in use"),
          HttpStatus.BAD_REQUEST);
    }

    User user = new User(signupRequest.getUsername(), signupRequest.getEmail(),
        signupRequest.getPassword());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
        .orElseThrow(() -> new ApplicationException("User Role were not set."));

    user.setRoles(Collections.singleton(userRole));

    User result = userRepository.save(user);

    URI location = ServletUriComponentsBuilder
        .fromCurrentContextPath().path("/api/users/{username}")
        .buildAndExpand(result.getUsername()).toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "The user has been registered successfully."));
  }
}
