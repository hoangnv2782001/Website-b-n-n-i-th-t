package com.project.be.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {
	private int id;
	
	private int quantity;
	
	private double amount;
	
	private List<CartItem> cartItems;
	
	
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class CartItem{
		private int id;
		
		private int quantity;
		
		private double amount;
		
		private String productName;
		
		private int productQuantity;
		
		private String productImg;
		
		private double productPrice;
	}

}
