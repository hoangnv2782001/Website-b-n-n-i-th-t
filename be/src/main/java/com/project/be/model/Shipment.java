package com.project.be.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "shipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Shipment {
	@Id
	@GeneratedValue
	private int id;
	
	private String receiver;
	
	private String address;
	
	private String phone;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="order_id")
	private Order order;

}
