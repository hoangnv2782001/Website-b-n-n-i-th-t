package com.project.be.dto.response;

import java.time.LocalDateTime;

import com.project.be.common.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticResponse {
	private int category;
	private int product;
	private int user;
	private int order;
}
