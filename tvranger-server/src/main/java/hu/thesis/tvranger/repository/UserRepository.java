package hu.thesis.tvranger.repository;

import hu.thesis.tvranger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  Optional<User> findByEmailOrUsername(String email, String username);

  Optional<User> findByUsername(String username);

  Boolean existsByEmail(String email);

  Boolean existsByUsername(String username);
}
