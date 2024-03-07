package com.project.be.dto.response;

import java.time.LocalDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

	private int id;

	private String name;

	private String description;

	private String img;

	private boolean active;

	private double price;

	private int quantity;

	private double mass;

	private String createdDate;

	private ProductCategory category;
}
