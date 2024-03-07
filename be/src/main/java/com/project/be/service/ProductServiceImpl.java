package com.project.be.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.dto.request.ProductDto;
import com.project.be.dto.response.ProductResponse;
import com.project.be.dto.response.CategoryResponse;
import com.project.be.dto.response.Message;
import com.project.be.dto.response.PageResponse;
import com.project.be.dto.response.ProductCategory;
import com.project.be.exception.ResourceNotFoundException;
import com.project.be.model.Category;
import com.project.be.model.OrderItem;
import com.project.be.model.Product;
import com.project.be.repository.CategoryRepository;
import com.project.be.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;
	private final ModelMapper mapper;
	private final CategoryRepository categoryRepository;
	private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Override
	public ProductResponse getProductById(int id) {
		Product c = productRepository.findByIdAndActiveTrue(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("product not found");
		});

		ProductResponse response = ProductResponse.builder().id(c.getId()).name(c.getName()).active(c.isActive())
				.description(c.getDescription()).img(c.getImg())
				.category(ProductCategory.builder().id(c.getCategory().getId()).name(c.getCategory().getName()).build())
				.mass(c.getMass()).quantity(c.getQuantity()).price(c.getPrice())
				.createdDate(c.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy"))).build();
		return response;
	}

	@Override
	public List<ProductResponse> getAllProduct(int page, int size) {
		List<Product> product = productRepository.findByActiveTrue(PageRequest.of(page - 1, size)).getContent().get(0);

		List<ProductResponse> response = product.stream().map(c -> ProductResponse.builder().id(c.getId())
				.name(c.getName()).active(c.isActive()).description(c.getDescription()).img(c.getImg())
				.mass(c.getMass()).quantity(c.getQuantity()).price(c.getPrice())
				.createdDate(c.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
				.category(ProductCategory.builder().id(c.getCategory().getId()).name(c.getCategory().getName()).build())
				.build()).collect(Collectors.toList());

		return response;
	}

	@Override
	public int createProduct(ProductDto productDto) {
		Product product = Product.builder().name(productDto.getName()).description(productDto.getDescription())
				.img(productDto.getImg()).active(true).quantity(productDto.getQuantity()).mass(productDto.getMass())
				.price(productDto.getPrice()).category(Category.builder().id(productDto.getCategory()).build()).build();

		product = productRepository.save(product);
		return product.getId();
	}

	@Override
	public Message delete(int id) {
		Product product = productRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("product not found");
		});

		product.setActive(false);

		productRepository.save(product);

		return new Message("200", "Delete successfully");
	}

	@Override
	public Message update(int id, ProductDto productDto) {
		Product product = productRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("product not found");
		});
		logger.info("categoryid :", productDto.getCategory());
		Category category = categoryRepository.findById(productDto.getCategory()).orElseThrow(() -> {
			throw new ResourceNotFoundException("category not found");
		});

		product.setCategory(category);
		product.setDescription(productDto.getDescription());
		product.setImg(productDto.getImg());

		product.setMass(productDto.getMass());

		product.setName(productDto.getName());
		product.setPrice(productDto.getPrice());
		product.setQuantity(productDto.getQuantity());
		productRepository.save(product);

		return new Message("200", "Update successfully");
	}

	@Override
	public PageResponse searchProduct(String param, int page, int size, String[] sort) {

		Sort s = null;
		logger.info("sort by {}", sort);

		if (sort.length >= 2) {
			if (sort[1].equals("asc"))
				s = Sort.by(sort[0]).ascending();
			else
				s = Sort.by(sort[0]).descending();
		} else {
			s = Sort.by("id").ascending();
		}

		Pageable pageable = PageRequest.of(page - 1, size, s);
		Page productPage = productRepository.searchByName(param, pageable);

		List<Product> products = productPage.getContent();

		List<ProductResponse> response = products.stream()
				.map(c -> ProductResponse.builder().id(c.getId()).name(c.getName()).active(c.isActive())
						.description(c.getDescription()).img(c.getImg()).category(ProductCategory.builder().id(c.getCategory().getId()).name(c.getCategory().getName()).build())
						.mass(c.getMass()).quantity(c.getQuantity()).price(c.getPrice())
						.createdDate(c.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.build())
				.collect(Collectors.toList());

		return PageResponse.builder().data(response).totalElements(productPage.getTotalElements())
				.totalPages(productPage.getTotalPages()).build();
	}

	@Override
	public void updateQuantity(List<OrderItem> orderItems) {
		for (OrderItem item : orderItems) {
			item.getProduct().setQuantity(item.getProduct().getQuantity() - item.getQuantity());
			item.getProduct().setSale(item.getQuantity() + item.getProduct().getSale());
			productRepository.save(item.getProduct());
		}

	}

	@Override
	public PageResponse getProductByCategory(int id, int page, int size, String[] sort) {
		Sort s = null;
		logger.info("sort by {}", sort);

		if (sort.length >= 2) {
			if (sort[1].equals("asc"))
				s = Sort.by(sort[0]).ascending();
			else
				s = Sort.by(sort[0]).descending();
		} else {
			s = Sort.by("id").ascending();
		}

		Pageable pageable = PageRequest.of(page - 1, size, s);

		Page<Product> productPage = productRepository.findByCategoryIdAndActiveTrue(id, pageable);

		List<Product> products = productPage.getContent();

		List<ProductResponse> response = products.stream()
				.map(c -> ProductResponse.builder().id(c.getId()).name(c.getName()).active(c.isActive())
						.description(c.getDescription()).img(c.getImg())
						.mass(c.getMass()).quantity(c.getQuantity()).price(c.getPrice())
						.category(ProductCategory.builder().id(c.getCategory().getId()).name(c.getCategory().getName()).build())
						.createdDate(c.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.build())
				.collect(Collectors.toList());

		return PageResponse.builder().data(response).totalElements(productPage.getTotalElements())
				.totalPages(productPage.getTotalPages()).build();
	}

	@Override
	public List<ProductResponse> getProducts(String param) {
		List<Product> products = new ArrayList<>();
		if (param.equals("new"))
			products = productRepository.getProductsNew(PageRequest.of(0, 8)).getContent();
		else if (param.equals("sale"))
			products = productRepository.getProductsSale(PageRequest.of(0, 8)).getContent();

		List<ProductResponse> response = products.stream()
				.map(c -> ProductResponse.builder().id(c.getId()).name(c.getName()).active(c.isActive())
						.description(c.getDescription()).img(c.getImg())
						.mass(c.getMass()).quantity(c.getQuantity()).price(c.getPrice())
						.category(ProductCategory.builder().id(c.getCategory().getId()).name(c.getCategory().getName()).build())
						.createdDate(c.getCreatedDate().format(DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy")))
						.build())
				.collect(Collectors.toList());

		return response;
	}

}
