package com.project.be.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.project.be.common.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Order {
	@Id
	@GeneratedValue
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="user_id")
	private User user;
	
	@OneToMany(mappedBy = "order")
	private List<OrderItem> orderItems;
	@CreatedDate
	private LocalDateTime createdAt;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	private int quantity;
	
	private String code;
	
	private double amount;
	
	private String note;
	
	private String paymentType;
	
	@OneToOne(mappedBy = "order")
	private Shipment shipment;
	
	

}
