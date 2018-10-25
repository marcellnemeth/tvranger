package hu.thesis.tvranger.security;

import hu.thesis.tvranger.model.User;
import hu.thesis.tvranger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
    User user = userRepository.findByEmailOrUsername(emailOrUsername,emailOrUsername).orElseThrow(
        () -> new UsernameNotFoundException("Could not find user with the given username or email: " + emailOrUsername)
    );
    return UserPrincipal.createUserPrincipal(user);
  }

  //Used by JWT Authentication filter
  @Transactional
  public UserDetails loadUserById(Long id){
    User user = userRepository.findById(id).orElseThrow(
        () -> new UsernameNotFoundException("Could not find user with this id: " + id)
    );

    return UserPrincipal.createUserPrincipal(user);
  }
}
