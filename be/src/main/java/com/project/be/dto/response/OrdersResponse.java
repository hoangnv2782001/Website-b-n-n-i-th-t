package com.project.be.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.project.be.common.OrderStatus;
import com.project.be.dto.response.OrderResponse.Item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrdersResponse {
	
		private int id;

		private int quantity;
		
		private String code;

		private double amount;

		private String createAt;
		
		
		private String paymentType;

		private OrderStatus orderStatus;
	


}
