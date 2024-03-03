package com.project.be.exception.advice;


import java.io.UnsupportedEncodingException;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.be.dto.response.Message;






@RestControllerAdvice
public class ValidatorExceptionController {
	private static final Logger logger = LoggerFactory.getLogger(ValidatorExceptionController.class);

	
	@ExceptionHandler( {BindException.class,UnsupportedEncodingException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public  Message handleValidationExceptions(BindException  ex) {
		
		
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
	
		for(FieldError e: fieldErrors ) {
			logger.error("message : {} {}", e.getField(),e.getDefaultMessage());
		}
		return new Message("400",fieldErrors.get(0).getDefaultMessage());
	}
	

}
