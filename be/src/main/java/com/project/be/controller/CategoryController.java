package com.project.be.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.be.dto.request.CategoryDto;
import com.project.be.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping("/categorys/{id}")
	public ResponseEntity<?> getCategory(@PathVariable("id") int id) {
		return ResponseEntity.ok(categoryService.getCategoryById(id));
	}

	
	@GetMapping("/categorys/search")
	public ResponseEntity<?> searchCategory(@RequestParam("param") String param) {
		return ResponseEntity.ok(categoryService.searchCategory(param));
	
	}


	@GetMapping("/categorys")
	public ResponseEntity<?> getCategory() {
		return ResponseEntity.ok(categoryService.getAllCategory());
	}

	@PostMapping("/categorys")
	public ResponseEntity<?> create(@RequestBody @Valid CategoryDto categoryDto) {
		return new ResponseEntity(categoryService.createCategory(categoryDto), HttpStatus.CREATED);
	}

	@DeleteMapping("/categorys/{id}")

	public ResponseEntity<?> delete(@PathVariable("id") int id) {

		return new ResponseEntity(categoryService.delete(id), HttpStatus.OK);
	}

	@PutMapping("/categorys/{id}")

	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody @Valid CategoryDto categoryDto) {

		return new ResponseEntity(categoryService.update(id, categoryDto), HttpStatus.OK);
	}

}
