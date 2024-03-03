package com.project.be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
	@NotBlank(message = "All field are required")
	private String name;

	@NotBlank(message = "All field are required")
	private String description;

	@NotBlank(message = "All field are required")
	private String img;

	@NotNull(message = "All field are required")
	private double price;

	@NotNull(message = "All field are required")
	private int quantity;

	@NotNull(message = "All field are required")
	private double mass;

	@NotNull(message = "All field are required")
	private int category;
}
