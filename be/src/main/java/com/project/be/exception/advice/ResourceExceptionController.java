package com.project.be.exception.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.be.dto.response.Message;
import com.project.be.exception.MailCustomException;
import com.project.be.exception.OTPException;
import com.project.be.exception.QuantityLimitedException;
import com.project.be.exception.ResourceNotFoundException;

@RestControllerAdvice
public class ResourceExceptionController {
	private static final Logger logger = LoggerFactory.getLogger(ResourceExceptionController.class);
	
	@ExceptionHandler({ResourceNotFoundException.class,QuantityLimitedException.class })
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Message handleLoginException(RuntimeException ex) {
		logger.error("Message : {}", ex.getMessage());

		return new Message("400", ex.getMessage());
	}

}
