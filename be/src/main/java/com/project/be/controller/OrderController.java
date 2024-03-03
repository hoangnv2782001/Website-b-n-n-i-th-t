package com.project.be.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.dto.request.OrderDto;
import com.project.be.dto.response.Message;
import com.project.be.service.CategoryService;
import com.project.be.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {
	

	private final OrderService orderService;
	
	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

	@PostMapping
	public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
		logger.info("order request");

		return ResponseEntity.created(URI.create(orderService.createOrder(orderDto) + ""))
				.body(new Message("201", "Successfully"));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOrder(@PathVariable("id") int id) {

		return ResponseEntity.ok().body(orderService.getOrder(id));
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<?> getOrders(@PathVariable("id") int id,
			@RequestParam(name = "status",defaultValue = "all") String status,
			@RequestParam(name = "page", defaultValue = "1") int page,
			
			@RequestParam(name = "size", defaultValue = "10") int size) {

		return ResponseEntity.ok().body(orderService.getOrders(id,status,page,size));
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchOrder(@RequestParam("status") String status,@RequestParam("code") String code) {

		return ResponseEntity.ok().body(orderService.searchOrders(status,code));
	}

	@PutMapping("/cancel/{id}")
	public ResponseEntity<?> cancelOrder(@PathVariable("id") int id) {
		orderService.cancellOrder(id);
		return ResponseEntity.ok().body(new Message("200", "Successfuly"));
	}
	
	@PutMapping("/confirm/{id}")
	public ResponseEntity<?> confirmOrder(@PathVariable("id") int id) {
		orderService.confirmOrder(id);
		return ResponseEntity.ok().body(new Message("200", "Successfuly"));
	}
}
