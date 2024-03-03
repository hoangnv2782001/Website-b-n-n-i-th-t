package com.project.be.controller;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.dto.request.PasswordNewDto;
import com.project.be.dto.request.UserDto;
import com.project.be.dto.response.Message;
import com.project.be.dto.response.UserResponse;
import com.project.be.model.User;
import com.project.be.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {
	private final UserService userService;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@PutMapping
	public ResponseEntity<?> updateInfo(@RequestBody @Valid UserDto userDto) {
		userService.updateInfo(userDto);
		return new ResponseEntity(new Message("success", "200"), HttpStatus.OK);

	}

	@PutMapping("/password")
	public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordNewDto passwordNewDto,
			@AuthenticationPrincipal User user) {
		userService.changePassword(passwordNewDto.getPassword(), user.getId());
		return new ResponseEntity(new Message("success", "200"), HttpStatus.OK);

	}

	@GetMapping(value = "/")
	public ResponseEntity<?> getUser(@AuthenticationPrincipal User user) {

		logger.info("da truy capp " + user.getRole());

		return new ResponseEntity(
				UserResponse.builder().id(user.getId()).name(user.getName()).address(user.getAddress())
						.phone(user.getPhoneNumber()).role(user.getRole()).email(user.getEmail()).build(),
				HttpStatus.OK);
	}

	@GetMapping(value = "/role/user")
	public ResponseEntity<?> getAllUser() {

		return new ResponseEntity(userService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping(value = "/order/{id}")
	public ResponseEntity<?> getOrder(@PathVariable int id) {

		logger.info("da truy capp ");

		return new ResponseEntity(userService.getOrder(id), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUser(@PathVariable("id") int id) {

		return new ResponseEntity(userService.getUser(id), HttpStatus.OK);

	}

}