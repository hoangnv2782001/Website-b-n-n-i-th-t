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
import com.project.be.dto.request.ProductDto;
import com.project.be.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

	private final ProductService productService;

	@GetMapping("/products/{id}")
	public ResponseEntity<?> getProduct(@PathVariable("id") int id) {
		return ResponseEntity.ok(productService.getProductById(id));
	}

	@GetMapping("/products/category/{id}")
	public ResponseEntity<?> getProductByCategory(@PathVariable("id") int id,
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "sort", defaultValue = "id,desc") String[] sort,
			@RequestParam(name = "size", defaultValue = "10") int size) {
		return ResponseEntity.ok(productService.getProductByCategory(id,page,size,sort));
	}

	@GetMapping("/products/search")
	public ResponseEntity<?> searchProduct(@RequestParam(name = "keyword",defaultValue = "") String param,
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "sort", defaultValue = "id,desc") String[] sort,
			@RequestParam(name = "size", defaultValue = "10") int size) {
		return ResponseEntity.ok(productService.searchProduct(param,page,size,sort));

	}

	@GetMapping("/products")
	public ResponseEntity<?> getProduct(@RequestParam("page") int page, @RequestParam("size") int size) {
		return ResponseEntity.ok(productService.getAllProduct(page, size));
	}

	@GetMapping("/products/")
	public ResponseEntity<?> getProductByParam(@RequestParam("param") String param) {
		return ResponseEntity.ok(productService.getProducts(param));
	}

	@PostMapping("/products")
	public ResponseEntity<?> create(@RequestBody @Valid ProductDto productDto) {
		return new ResponseEntity(productService.createProduct(productDto), HttpStatus.CREATED);
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") int id) {

		return new ResponseEntity(productService.delete(id), HttpStatus.OK);
	}

	@PutMapping("/products/{id}")

	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody @Valid ProductDto productDto) {

		return new ResponseEntity(productService.update(id, productDto), HttpStatus.OK);
	}
}
