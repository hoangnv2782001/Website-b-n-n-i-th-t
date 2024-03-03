package com.project.be.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.common.OrderStatus;
import com.project.be.dto.request.OrderDto;
import com.project.be.dto.response.CartResponse;
import com.project.be.dto.response.OrderResponse;
import com.project.be.dto.response.OrdersResponse;
import com.project.be.dto.response.PageResponse;
import com.project.be.dto.response.ProductResponse;
import com.project.be.exception.ResourceNotFoundException;
import com.project.be.model.Cart;
import com.project.be.model.Order;
import com.project.be.model.OrderItem;
import com.project.be.model.Shipment;
import com.project.be.repository.CartItemRepository;
import com.project.be.repository.CartRepository;
import com.project.be.repository.OrderItemRepository;
import com.project.be.repository.OrderRepository;
import com.project.be.repository.ProductRepository;
import com.project.be.repository.ShipmentRepository;
import com.project.be.utils.CodeUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final CartRepository cartRepository;

	private final CartItemRepository cartItemRepository;

	private final ShipmentRepository shipmentRepository;

	private final OrderItemRepository orderItemRepository;

	private final ProductRepository productRepository;

	private final ProductService productService;

	private final CodeUtils codeUtils;

	private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

	@Override
	public int createOrder(OrderDto orderDto) {
		Cart cart = cartRepository.findById(orderDto.getCartId()).orElseThrow(() -> {
			throw new ResourceNotFoundException("Cart not found");
		});
		
		if(cart.getQuantity() == 0) {
			throw new ResourceNotFoundException("Cart not found");
		}
		
		logger.info("yeu cau thanh toan online cua ",orderDto.getReceiver(),orderDto.getAddress());
		double amount = orderDto.getAmount();

		if (orderDto.getPaymentType().equals("Online"))
			amount /= 100;

		Order order = Order.builder().user(cart.getUser()).status(OrderStatus.SUBMITTED).quantity(cart.getQuantity())
				.amount(amount).note(orderDto.getNote()).paymentType(orderDto.getPaymentType())
				.code(codeUtils.generateOrderCode(LocalDateTime.now())).build();

		Shipment shipment = Shipment.builder().receiver(orderDto.getReceiver()).address(orderDto.getAddress())
				.phone(orderDto.getPhone()).build();

		Order order1 = orderRepository.save(order);

		List<OrderItem> items = cart.getCartItems().stream()
				.map(t -> OrderItem.builder().product(t.getProduct()).order(order1)
						.amount(t.getQuantity() * t.getProduct().getPrice()).quantity(t.getQuantity()).build())
				.collect(Collectors.toList());

		shipment.setOrder(order1);

		cartItemRepository.deleteAll(cart.getCartItems());
		cart.setQuantity(0);

		cartRepository.save(cart);

		shipmentRepository.save(shipment);

		productService.updateQuantity(orderItemRepository.saveAll(items));

		return order1.getId();

	}

	@Override
	public OrderResponse getOrder(int id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Order not found");
		});

		OrderResponse orderResponse = OrderResponse.builder().id(order.getId())
				.createAt(order.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
				.quantity(order.getQuantity()).amount(order.getAmount()).orderStatus(order.getStatus())
				.name(order.getShipment().getReceiver()).address(order.getShipment().getAddress()).code(order.getCode())
				.phone(order.getShipment().getPhone()).note(order.getNote()).paymentType(order.getPaymentType())
				.build();

		List<OrderResponse.Item> items = order.getOrderItems().stream()
				.map(t -> OrderResponse.Item.builder().id(t.getId()).quantity(t.getQuantity())
						.productPrice(t.getProduct().getPrice()).amount(t.getQuantity() * t.getProduct().getPrice())
						.productName(t.getProduct().getName()).productImg(t.getProduct().getImg()).build())
				.collect(Collectors.toList());

		orderResponse.setItems(items);

		return orderResponse;

	}

	@Override
	public PageResponse getOrders(int id, String status,int page, int size) {

		Page<Order> orderPage = null;
		Pageable pageable = PageRequest.of(page-1, size);

		if (status.equals("all"))
			orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(id,pageable);
		else
			orderPage = orderRepository.findByUserIdAndStatusEqualsOrderByCreatedAtDesc(id,
					status.equals("SUBMITTED") ? OrderStatus.SUBMITTED : OrderStatus.COMPLETED,pageable);
		List<Order> order = orderPage.getContent();

		List<OrdersResponse> orders = order.stream()
				.map(t -> OrdersResponse.builder().id(t.getId()).quantity(t.getQuantity()).code(t.getCode())
						.amount(t.getAmount()).paymentType(t.getPaymentType())
						.createAt(t.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.orderStatus(t.getStatus()).build())
				.collect(Collectors.toList());

		return PageResponse.builder().totalElements(orderPage.getTotalElements()).totalPages(orderPage.getTotalPages()).data(orders).build();
	}

	@Override
	public void cancellOrder(int id) {
		// TODO Auto-generated method stub
		Order order = orderRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Order not found");
		});

		order.setStatus(OrderStatus.CANCELLED);

		orderRepository.save(order);

	}

	@Override
	public void confirmOrder(int id) {
		// TODO Auto-generated method stub

		Order order = orderRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Order not found");
		});

		order.setStatus(OrderStatus.COMPLETED);
//
//		List<OrderItem> orderItems = order.getOrderItems();
//
//		for (OrderItem item : orderItems) {
//			item.getProduct().setQuantity(item.getProduct().getQuantity() - item.getQuantity());
//			item.getProduct().setSale(item.getQuantity() + item.getProduct().getSale());
//			productRepository.save(item.getProduct());
//		}

		orderRepository.save(order);

	}

	@Override
	public List<OrdersResponse> searchOrders(String status, String code) {
		List<Order> order = new ArrayList<>();

		if (status.equals("all"))
			order = orderRepository.search(code);
		else
			order = orderRepository.search(code,
					status.equals("SUBMITTED") ? OrderStatus.SUBMITTED : OrderStatus.COMPLETED);

		List<OrdersResponse> orders = order.stream()
				.map(t -> OrdersResponse.builder().id(t.getId()).quantity(t.getQuantity()).code(t.getCode())
						.amount(t.getAmount()).paymentType(t.getPaymentType())
						.createAt(t.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.orderStatus(t.getStatus()).build())
				.collect(Collectors.toList());

		logger.info("code va statú ", code, status);

		return orders;
	}

}
