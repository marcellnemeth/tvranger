package hu.thesis.tvranger.repository;

import hu.thesis.tvranger.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {

    List<WatchList> findAllByUserId(long userId);

    Optional<List<WatchList>> findByShowId(int showId);
}
