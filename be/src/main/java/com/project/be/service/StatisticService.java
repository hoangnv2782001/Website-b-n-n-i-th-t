package com.project.be.service;

import java.util.List;

import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.StatisticResponse;

public interface StatisticService {
	
	StatisticResponse getStatistics();
	
	
	
	List<OrdersResponse> getNewOrders();
	
	List<Double> statisticRevenue();
}
