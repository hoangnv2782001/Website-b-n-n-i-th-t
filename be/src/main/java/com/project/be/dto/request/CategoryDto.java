package com.project.be.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {

	@NotBlank(message = "All field are required")
	private String name;
	
	@NotBlank(message = "All field are required")
	private String description;
	
	@NotBlank(message = "All field are required")
	private String img;
	
	
	

}
