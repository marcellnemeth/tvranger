package hu.thesis.tvranger.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

  private static Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

  @Value("${app.jwtSecretKey}")
  private String jwtSecretKey;

  @Value("${app.jwtExpirationInMs}")
  private String jwtExpiration;

  public String generateToken(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

    Date now = new Date();
    Date expirationDate = new Date(now.getTime() + jwtExpiration);

    return Jwts.builder()
        .setSubject(Long.toString(userPrincipal.getId()))
        .setIssuedAt(new Date())
        .setExpiration(expirationDate)
        .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
        .compact();
  }

  public Long getUserIdFromJwt(String token){
    Claims claims = Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody();

    return Long.parseLong(claims.getSubject());

  }

  public boolean validateToken(String authenticationToken){
    try {
      Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(authenticationToken);
      return true;
    } catch (SignatureException e){
      logger.error("Invalid Jwt signature");
    } catch (MalformedJwtException e) {
      logger.error("Invalid Jwt token");
    }catch (ExpiredJwtException e) {
      logger.error("Expired Jwt token");
    } catch (UnsupportedJwtException e) {
      logger.error("Unsupported Jwt token");
    } catch (IllegalArgumentException e) {
      logger.error("Jwt claims string is empty.");
    }
    return false;
  }
}
