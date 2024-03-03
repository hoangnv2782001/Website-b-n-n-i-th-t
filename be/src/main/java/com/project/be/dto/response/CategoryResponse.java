package com.project.be.dto.response;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
	private int id;
	
	private String name;
	
	private String description;
	
	private String img;
	
	private boolean active;
	
	private String createdDate;
}
