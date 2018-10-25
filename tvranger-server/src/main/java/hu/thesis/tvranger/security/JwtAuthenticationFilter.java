package hu.thesis.tvranger.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

  private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  CustomUserDetailsService customUserDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
    try {
      String jsonWebtoken = getJsonWebtokenFromRequest(httpServletRequest);

      if(StringUtils.hasText(jsonWebtoken) && jwtTokenProvider.validateToken(jsonWebtoken)){
        Long userId = jwtTokenProvider.getUserIdFromJwt(jsonWebtoken);

        UserDetails userDetails = customUserDetailsService.loadUserById(userId);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }

    } catch (Exception e){
      log.error("Could not set user in security context", e);
    }
    filterChain.doFilter(httpServletRequest,httpServletResponse);
  }

  private String getJsonWebtokenFromRequest(HttpServletRequest request){
    String bearerToken = request.getHeader("Authorization");

    if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
      return bearerToken.substring(7, bearerToken.length());
    }
    return null;
  }
}
