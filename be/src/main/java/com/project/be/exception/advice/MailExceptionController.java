package com.project.be.exception.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.be.dto.response.Message;
import com.project.be.exception.MailCustomException;





@RestControllerAdvice
public class MailExceptionController {
	
	private static final Logger logger = LoggerFactory.getLogger(MailCustomException.class);
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(MailCustomException.class)
	public ResponseEntity<?> handleMailException(MailCustomException ex) {
		logger.error("Send email error : {}", ex.getMessage());
		return ResponseEntity.badRequest().body(new Message("500", ex.getMessage()));
	}

}
