package com.project.be.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.dto.request.CartItemDto;
import com.project.be.dto.request.CartItemUpdateDto;
import com.project.be.dto.response.CartItemResponse;
import com.project.be.dto.response.CartResponse;
import com.project.be.exception.QuantityLimitedException;
import com.project.be.exception.ResourceNotFoundException;
import com.project.be.model.Cart;
import com.project.be.model.CartItem;
import com.project.be.model.Product;
import com.project.be.repository.CartItemRepository;
import com.project.be.repository.CartRepository;
import com.project.be.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {
	private final CartRepository cartRepository;
	private final ProductRepository productRepository;
	private final CartItemRepository cartItemRepository;

	@Override
	public void creatCart(Cart cart) {
		cartRepository.save(cart);

	}

	@Override
	public CartResponse getCart(int id) {
		Cart cart = cartRepository.findByUserId(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Cart not found");
		});

		CartResponse cartResponse = CartResponse.builder().id(cart.getId()).quantity(cart.getQuantity()).build();

		List<CartResponse.CartItem> cartItems = cart.getCartItems().stream()
				.map(t -> CartResponse.CartItem.builder().id(t.getId()).quantity(t.getQuantity())
						.amount(t.getQuantity() * t.getProduct().getPrice()).productPrice(t.getProduct().getPrice())
						.productName(t.getProduct().getName()).productImg(t.getProduct().getImg())
						.productQuantity(t.getProduct().getQuantity()).build())
				.collect(Collectors.toList());
		double amount = cartItems.stream().mapToDouble(CartResponse.CartItem::getAmount).sum();

		cartResponse.setAmount(amount);
		cartResponse.setCartItems(cartItems);

		return cartResponse;
	}

	@Override
	public int addItemToCart(CartItemDto cartItemDto) {

		Optional<CartItem> cartItemOp = cartItemRepository.findByCartIdAndProductId(cartItemDto.getCartId(),
				cartItemDto.getProductId());

		if (cartItemOp.isPresent()) {

			updateItem(cartItemOp.get(), cartItemDto);
			return 0;
		}
		Cart cart = cartRepository.findById(cartItemDto.getCartId()).orElseThrow(() -> {
			throw new ResourceNotFoundException("Cart not found");
		});

		Product product = productRepository.findById(cartItemDto.getProductId()).orElseThrow(() -> {
			throw new ResourceNotFoundException("Product not found");
		});

		if (cartItemDto.getQuantity() > product.getQuantity())
			throw new QuantityLimitedException("The requested quantity exceeds the available stock.");

		CartItem cartItem = CartItem.builder().product(product).quantity(cartItemDto.getQuantity()).cart(cart).build();

		cartItemRepository.save(cartItem);

		cart.setQuantity(cart.getQuantity() + 1);

		cartRepository.save(cart);

		return 1;

	}

	@Override
	public void deleteItem(int id) {
		CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Cart item not found");
		});

		Cart cart = cartItem.getCart();

		cart.setQuantity(cart.getQuantity() - 1);
		
		cartRepository.save(cart);

		cartItemRepository.delete(cartItem);

	}

	@Override
	public CartResponse.CartItem updateItem(CartItemUpdateDto cartItemDto) {
		CartItem cartItem = cartItemRepository.findById(cartItemDto.getId()).orElseThrow(() -> {
			throw new ResourceNotFoundException("Cart item not found");
		});

		int quantity = cartItem.getQuantity() + cartItemDto.getType();

		if (quantity > cartItem.getProduct().getQuantity())
			throw new QuantityLimitedException("The requested quantity exceeds the available stock.");
		cartItem.setQuantity(quantity);

		cartItemRepository.save(cartItem);

		CartResponse.CartItem cartItem2 = CartResponse.CartItem.builder().id(cartItem.getId())
				.quantity(cartItem.getQuantity()).amount(cartItem.getQuantity() * cartItem.getProduct().getPrice())
				.productPrice(cartItem.getProduct().getPrice()).productName(cartItem.getProduct().getName())
				.productImg(cartItem.getProduct().getImg()).productQuantity(cartItem.getProduct().getQuantity())
				.build();

		return cartItem2;

	}

	@Override
	public void updateItem(CartItem cartItem, CartItemDto cartItemDto) {
		cartItem.setQuantity(cartItem.getQuantity() + cartItemDto.getQuantity());

		cartItemRepository.save(cartItem);

	}

}
