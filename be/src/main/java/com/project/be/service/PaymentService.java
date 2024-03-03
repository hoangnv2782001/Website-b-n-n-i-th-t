package com.project.be.service;

import java.io.UnsupportedEncodingException;

import com.project.be.dto.request.OrderDto;
import com.project.be.dto.request.PaymentDto;




public interface PaymentService {
	
	String createPayment(OrderDto orderDto) throws UnsupportedEncodingException;
	
	

}
