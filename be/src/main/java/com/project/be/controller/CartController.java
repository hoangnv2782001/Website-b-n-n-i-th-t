package com.project.be.controller;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.dto.request.CartItemDto;
import com.project.be.dto.request.CartItemUpdateDto;
import com.project.be.dto.response.Message;
import com.project.be.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

	private static final Logger logger = LoggerFactory.getLogger(CartController.class);

	private final CartService cartService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getCart(@PathVariable("id") int id) {
		return new ResponseEntity(cartService.getCart(id), HttpStatus.OK);
	}

	@PostMapping("/items")
	public ResponseEntity<?> addItem(@RequestBody @Valid CartItemDto cartItemDto) {

		return new ResponseEntity<Object>(cartService.addItemToCart(cartItemDto), HttpStatus.OK);
	}

	@DeleteMapping("/items/{id}")
	public ResponseEntity<?> deleteItem(@PathVariable("id") int id) {

		cartService.deleteItem(id);
		return new ResponseEntity<Object>(new Message("suucess", "200"), HttpStatus.OK);
	}

	@PutMapping("/items")
	public ResponseEntity<?> updateItem(@RequestBody @Valid CartItemUpdateDto cartItemDto) {

		
		return new ResponseEntity<Object>(cartService.updateItem(cartItemDto), HttpStatus.OK);
	}

}
