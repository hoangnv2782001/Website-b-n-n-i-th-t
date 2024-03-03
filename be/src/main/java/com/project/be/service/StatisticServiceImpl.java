package com.project.be.service;

import java.sql.Array;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import com.project.be.common.OrderStatus;
import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.StatisticResponse;
import com.project.be.model.Order;
import com.project.be.repository.CategoryRepository;
import com.project.be.repository.OrderRepository;
import com.project.be.repository.ProductRepository;
import com.project.be.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StatisticServiceImpl implements StatisticService {

	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;

	private final ProductRepository productRepository;

	private final OrderRepository orderRepository;

	@Override
	public StatisticResponse getStatistics() {

		return StatisticResponse.builder().category(categoryRepository.countAllActiveCategorys())
				.product(productRepository.countAllActiveProducts())
				.user(userRepository.countEnabledUsersWithUserRole()).order(orderRepository.countCompletedOrders())
				.build();

	}

	@Override
	public List<OrdersResponse> getNewOrders() {
		Pageable page = PageRequest.of(0, 5);

		List<Order> order = orderRepository.findByStatusEqualsOrderByCreatedAtDesc(OrderStatus.SUBMITTED, page).getContent();

		List<OrdersResponse> orders = order.stream()
				.map(t -> OrdersResponse.builder().code(t.getCode()).id(t.getId()).quantity(t.getQuantity())
						.paymentType(t.getPaymentType())

						.amount(t.getAmount())
						.createAt(t.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.orderStatus(t.getStatus()).build())
				.collect(Collectors.toList());
		return orders;
	}

	@Override
	public List<Double> statisticRevenue() {
		List<Order> orders = orderRepository.findByStatusEqualsOrderByCreatedAtDesc(OrderStatus.COMPLETED);

		int specificYear = LocalDateTime.now().getYear(); // Năm cần tính tổng

		Map<Integer, Double> amountByMonth = orders.stream()
				.filter(order -> order.getCreatedAt().getYear() == specificYear).collect(Collectors.groupingBy(
						order -> order.getCreatedAt().getMonthValue(), Collectors.summingDouble(Order::getAmount)));

		// In ra tổng amount của từng tháng trong năm cụ thể
		amountByMonth.forEach((month, totalAmount) -> System.out.println("Tháng " + month + ": " + totalAmount));

		List<Double> revenue = new ArrayList<>();

		for (int i = 1; i <= 12; i++)
			revenue.add(0.0);

		System.out.println("renuver " + revenue.size());

		amountByMonth.forEach((month, totalAmount) -> {
			revenue.set(month - 1, totalAmount);

			System.out.println("renuver " + month + " " + totalAmount);
		});

		return revenue;
	}

}
