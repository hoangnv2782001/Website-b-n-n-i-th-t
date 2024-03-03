package com.project.be.service;

import com.project.be.dto.request.CartItemDto;
import com.project.be.dto.request.CartItemUpdateDto;
import com.project.be.dto.response.CartItemResponse;
import com.project.be.dto.response.CartResponse;
import com.project.be.model.Cart;
import com.project.be.model.CartItem;

public interface CartService {
	
	void creatCart(Cart cart);
	
	
	CartResponse getCart(int id);
	
	int addItemToCart(CartItemDto cartItemDto);
	
	void deleteItem(int id);
	
	CartResponse.CartItem updateItem(CartItemUpdateDto cartItemDto);
	
	void updateItem(CartItem cartItem, CartItemDto cartItemDto);

}
