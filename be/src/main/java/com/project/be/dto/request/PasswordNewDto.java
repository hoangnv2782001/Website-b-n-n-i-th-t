package com.project.be.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PasswordNewDto {
	
	@NotBlank(message = "Password is required")
	private String password;

}
