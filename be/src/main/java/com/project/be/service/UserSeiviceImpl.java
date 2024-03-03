package com.project.be.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.common.OrderStatus;
import com.project.be.common.Role;
import com.project.be.dto.request.UserDto;
import com.project.be.dto.response.OrderResponse;
import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.UserResponse;
import com.project.be.dto.response.UserStatistic;
import com.project.be.exception.ResourceNotFoundException;
import com.project.be.model.Order;
import com.project.be.model.User;
import com.project.be.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSeiviceImpl implements UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	@Override
	public void updateInfo(UserDto user) {
		User u = userRepository.findById(user.getId()).orElseThrow(() -> {
			throw new ResourceNotFoundException("User not found");
		});

		u.setAddress(user.getAddress());
		u.setPhoneNumber(user.getPhone());
		u.setName(user.getName());
		userRepository.save(u);
	}

	@Override
	public UserResponse getUser(int id) {
		User u = userRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("User not found");
		});

		return UserResponse.builder().id(u.getId()).address(u.getAddress()).phone(u.getPhoneNumber())
				.email(u.getEmail()).name(u.getName()).build();

	}

	@Override
	public List<OrdersResponse> getOrder(int id) {
		User u = userRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("User not found");
		});
		List<Order> order = u.getOrders();
		List<OrdersResponse> orders = order.stream()
				.map(t -> OrdersResponse.builder().id(t.getId()).quantity(t.getQuantity()).amount(t.getAmount())
						.createAt(t.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.orderStatus(t.getStatus()).build())
				.collect(Collectors.toList());

		return orders;
	}

	@Override
	public void changePassword(String password, int id) {
		// TODO Auto-generated method stub

		User u = userRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("User not found");
		});

		u.setPassword(passwordEncoder.encode(password));

		userRepository.save(u);

	}

	@Override
	public List<UserStatistic> getAllUsers() {
		List<User> users = userRepository.findByRoleEquals(Role.USER);

		List<UserStatistic> userStatistics = new ArrayList<>();

		for (User u : users) {

			UserStatistic userStatistic = UserStatistic.builder().email(u.getEmail())
					.createAt(u.getCreateAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy"))).id(u.getId())
					.name(u.getName()).quantity(u.getOrders().size()).enable(u.isEnable()).build();
			
			double amount = u.getOrders().stream()
				    .filter(order -> order.getStatus() == OrderStatus.COMPLETED || order.getPaymentType().equals("Online"))   
				    .mapToDouble(Order::getAmount)
				    .sum();
			
			userStatistic.setAmount(amount);
			
			userStatistics.add(userStatistic);
		}
		return userStatistics;
	}

}
