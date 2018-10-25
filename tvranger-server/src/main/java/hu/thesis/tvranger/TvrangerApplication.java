package hu.thesis.tvranger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EntityScan(basePackageClasses = {
    TvrangerApplication.class,
    Jsr310JpaConverters.class
})
public class TvrangerApplication {

	@PostConstruct
  void init(){
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }

	public static void main(String[] args) {
		SpringApplication.run(TvrangerApplication.class, args);
	}
}
