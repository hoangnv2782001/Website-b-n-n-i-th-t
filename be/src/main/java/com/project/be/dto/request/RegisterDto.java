package com.project.be.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterDto {

	
	
	
	@NotBlank(message = "All fields are required")
	private String name;
	
	@NotBlank(message = "All fields are required")
	private String password;
	
	@NotBlank(message = "All fields are required")
	@Email(message="Email is invalid")
	private String email;
	
	

}
