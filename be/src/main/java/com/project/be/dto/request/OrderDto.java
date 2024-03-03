package com.project.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
	private int cartId;
	
	private double amount;
	
	private String receiver;

	private String address;

	private String phone;
	
	private String note;
	
	private String paymentType;

}
