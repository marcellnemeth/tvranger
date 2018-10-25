package hu.thesis.tvranger.repository;

import hu.thesis.tvranger.enums.RoleName;
import hu.thesis.tvranger.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long > {
  Optional<Role> findByName(RoleName name);
}
