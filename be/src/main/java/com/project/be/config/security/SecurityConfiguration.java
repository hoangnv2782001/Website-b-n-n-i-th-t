package com.project.be.config.security;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.project.be.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

	private final UserRepository userRepository;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	private final UserDetailsService userDetailsService;
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	/**
	 * Initial DaoAuthenticationProvider to uses authenticate user
	 * 
	 * @return authProvider
	 */
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;

	}

	/**
	 * The BCryptPasswordEncoder implementation uses the widely supported bcrypt
	 * algorithm to hash the passwords. In order to make it more resistent to
	 * password cracking, bcrypt is deliberately slow. Like other adaptive one-way
	 * functions, it should be tuned to take about 1 second to verify a password on
	 * your system. The default implementation of BCryptPasswordEncoder uses
	 * strength 10 as mentioned in the Javadoc of BCryptPasswordEncoder. You are
	 * encouraged to tune and test the strength parameter on your own system so that
	 * it takes roughly 1 second to verify a password.
	 * 
	 * @return PasswordEncoder
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * An AuthenticationManager can do one of 3 things in its authenticate() method:
	 * 
	 * Return an Authentication (normally with authenticated=true) if it can verify
	 * that the input represents a valid principal.
	 * 
	 * Throw an AuthenticationException if it believes that the input represents an
	 * invalid principal.
	 * 
	 * Return null if it cannot decide.
	 * 
	 * @param configuration
	 * @return Authentication
	 * @throws Exception
	 */

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	/**
	 * Config FilterChain
	 * 
	 * @param http
	 * @return SecurityFilterChain
	 * @throws Exception
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(authorizeRequests -> authorizeRequests

				.requestMatchers("/api/v1/auth/**").permitAll().requestMatchers("/api/v1/cart/**")
				.hasAnyAuthority("USER", "ADMIN").requestMatchers("/api/v1/users", "/api/v1/users/**")
				.hasAnyAuthority("ADMIN", "USER")
				.requestMatchers(HttpMethod.GET, "/api/v1/categorys", "/api/v1/categorys/{id}", "api/v1/categorys/search")
				.permitAll().requestMatchers("/api/v1/categorys/{id}", "/api/v1/categorys").hasAnyAuthority("ADMIN")
				.requestMatchers("/api/v1/statistics", "/api/v1/statistics/**").hasAnyAuthority("ADMIN")
				.requestMatchers("/api/v1/files").hasAnyAuthority("USER", "ADMIN").requestMatchers("/api/v1/payment")
				.hasAnyAuthority("USER", "ADMIN")
				.requestMatchers(HttpMethod.GET,"/api/v1/products/**","/api/v1/products").permitAll()
				.requestMatchers("/api/v1/products","/api/v1/products/**").hasAnyAuthority("ADMIN")
				.requestMatchers("/api/v1/order","/api/v1/order/**").hasAnyAuthority("ADMIN","USER")
				.requestMatchers("/api/v1/order/confirm/**").hasAnyAuthority("ADMIN")
				).cors(t -> t.configurationSource(corsConfigurationSource()))
				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
//				.exceptionHandling(t -> t.)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	/**
	 * config cors
	 * 
	 * @return CorsConfigurationSource
	 */

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Origin của trang web của bạn
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", configuration); // Cấu hình CORS cho các URL bắt đầu bằng /api/
		return source;
	}
}
