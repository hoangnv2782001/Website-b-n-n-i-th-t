package com.project.be.exception.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.be.config.security.JwtAuthenticationFilter;
import com.project.be.dto.response.Message;
import com.project.be.exception.OTPException;
import com.project.be.exception.UserAlreadyExistException;

@RestControllerAdvice
public class AuthExceptionController {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@ExceptionHandler({ AuthenticationException.class, OTPException.class, UserAlreadyExistException.class })
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public Message handleLoginException(RuntimeException ex) {
		logger.error("Message : {}", ex.getMessage());

		return new Message("401", ex.getMessage());
	}

}
