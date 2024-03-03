package com.project.be.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.project.be.common.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
	private int id;

	private int quantity;

	private double amount;

	private String createAt;

	private OrderStatus orderStatus;

	private List<Item> items;

	private String name;

	private String phone;

	private String note;

	private String address;

	private String paymentType;
	
	private String code;

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Item {
		private int id;

		private int quantity;

		private double amount;

		private String productName;

		private double productPrice;

		private String productImg;
	}

}
