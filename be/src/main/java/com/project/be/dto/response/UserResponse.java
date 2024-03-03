package com.project.be.dto.response;

import com.project.be.common.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
	private int id;
	private String phone;
	private String email;
	private String address;
	private String name;
	private Role role; 

}
