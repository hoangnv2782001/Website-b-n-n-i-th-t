package com.project.be.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.service.ProductService;
import com.project.be.service.StatisticService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/statistics")
@RequiredArgsConstructor
public class StatisticController {
	private final StatisticService statisticService;

	@GetMapping
	public ResponseEntity<?> getStatistics() {

		return ResponseEntity.ok().body(statisticService.getStatistics());
	}
	
	@GetMapping("/orders")
	public ResponseEntity<?> getOrders() {

		return ResponseEntity.ok().body(statisticService.getNewOrders());
	}
	
	@GetMapping("/revenue")
	public ResponseEntity<?> getRevenue() {

		return ResponseEntity.ok().body(statisticService.statisticRevenue());
	}
}
