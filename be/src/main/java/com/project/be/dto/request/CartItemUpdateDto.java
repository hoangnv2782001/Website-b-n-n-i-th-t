package com.project.be.dto.request;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemUpdateDto {
	@NotNull(message = "All field are required")
	private int id;
	
	@NotNull(message = "All field are required")
	private int type;
}
