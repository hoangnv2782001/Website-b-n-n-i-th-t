package com.project.be.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.config.vnpay.Config;
import com.project.be.dto.request.OrderDto;
import com.project.be.dto.request.PaymentDto;
import com.project.be.service.OrderService;
import com.project.be.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
	
	private final PaymentService paymentService;

	@PostMapping
	public ResponseEntity<?> createPayment(@RequestBody @Valid OrderDto orderDto) throws UnsupportedEncodingException {

		return ResponseEntity.ok().body(paymentService.createPayment(orderDto));
	}

}
