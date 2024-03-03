package com.project.be.dto.response;

import com.project.be.common.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserStatistic {
	
	private int id;


	private String email;

	private String name;
	
	private String createAt;
	
	private boolean enable;
	
	
	private int quantity;
	
	private double amount;
	

}
