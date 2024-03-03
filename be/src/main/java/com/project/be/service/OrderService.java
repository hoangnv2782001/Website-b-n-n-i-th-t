package com.project.be.service;

import java.util.List;

import com.project.be.dto.request.OrderDto;
import com.project.be.dto.response.OrderResponse;
import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.PageResponse;

public interface OrderService {
	int createOrder(OrderDto order);

	OrderResponse getOrder(int id);

	PageResponse getOrders(int id,String status,int page,int size);

	List<OrdersResponse> searchOrders(String status, String code);

	void cancellOrder(int id);

	void confirmOrder(int id);

}
