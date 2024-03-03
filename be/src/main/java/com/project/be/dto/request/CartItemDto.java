package com.project.be.dto.request;

import jakarta
.validation.constraints.NotBlank;
import jakarta
.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
	
	@NotNull(message = "All field are required")
	private int cartId;
	
	@NotNull(message = "All field are required")
	private int productId;
	
	@NotNull(message = "All field are required")
	private int quantity;

}
