package com.project.be.config.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

/**
 * 
 * OncePerRequestFilter: FilterChain
 */

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	private final JwtTokenProvider jwtTokenProvider;

	private final UserDetailsService userDetailsService;
 
	@Override
	/**
	 * 
	 */
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
									@NonNull FilterChain filterChain) throws ServletException, IOException {
		
		logger.info("User request {}",request.getLocalName());
		
		logger.info("Thread name :{}",Thread.currentThread().getName());

		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String username;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			logger.info("Thread name oout :{}",authHeader);
			filterChain.doFilter(request, response);
			return;
		}

		jwt = authHeader.substring(7);

		username = jwtTokenProvider.getUsername(jwt);

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			if (jwtTokenProvider.isTokenValid(jwt, userDetails)) {
				
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());

				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);

			}
		}

		filterChain.doFilter(request, response);
	}

}
