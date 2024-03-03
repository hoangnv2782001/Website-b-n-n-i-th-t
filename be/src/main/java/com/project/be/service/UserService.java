package com.project.be.service;

import java.util.List;

import com.project.be.dto.request.PasswordNewDto;
import com.project.be.dto.request.UserDto;
import com.project.be.dto.response.OrderResponse;
import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.UserResponse;
import com.project.be.dto.response.UserStatistic;

public interface UserService {
	void updateInfo(UserDto user);
	
	UserResponse getUser(int id);
	
	List<OrdersResponse> getOrder(int id);
	
	void changePassword(String password,int id);
	
	List<UserStatistic> getAllUsers();

}
