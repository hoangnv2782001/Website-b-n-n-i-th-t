package com.project.be.model;

import java.time.LocalDateTime;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;

	private String description;

	private String img;

	private boolean active;

	private double price;

	private int quantity;

	private double mass;

	@Column(columnDefinition = "integer default 0")
	private int sale;

	@CreatedDate
	private LocalDateTime createdDate;

	@ManyToOne
	@JoinColumn(name = "categry_id")
	private Category category;

}