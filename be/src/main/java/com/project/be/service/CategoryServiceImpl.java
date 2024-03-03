package com.project.be.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.dto.request.CategoryDto;
import com.project.be.dto.response.CategoryResponse;
import com.project.be.dto.response.Message;
import com.project.be.dto.response.ProductResponse;
import com.project.be.exception.ResourceNotFoundException;
import com.project.be.model.Category;
import com.project.be.model.Product;
import com.project.be.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;
	private final ModelMapper mapper;

	@Override
	public CategoryResponse getCategoryById(int id) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("category not found");
		});

		CategoryResponse response = mapper.map(category, CategoryResponse.class);
		return response;
	}

	@Override
	public List<CategoryResponse> getAllCategory() {
		List<Category> category = categoryRepository.findByActiveTrue();

		List<CategoryResponse> response = category.stream().map(c -> mapper.map(c, CategoryResponse.class))
				.collect(Collectors.toList());

		return response;
	}

	@Override
	public int createCategory(CategoryDto categoryDto) {
		Category category = Category.builder().name(categoryDto.getName()).description(categoryDto.getDescription())
				.img(categoryDto.getImg()).active(true).build();

		category = categoryRepository.save(category);
		return category.getId();
	}

	@Override
	public Message delete(int id) {
		Category category = categoryRepository.findByIdAndActiveTrue(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("category not found");
		});

		category.setActive(false);

		categoryRepository.save(category);

		return new Message("200", "Delete successfully");
	}

	@Override
	public Message update(int id, CategoryDto categoryDto) {
		Category category = categoryRepository.findByIdAndActiveTrue(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("category not found");
		});

		category.setDescription(categoryDto.getDescription());
		category.setName(categoryDto.getName());
		category.setImg(categoryDto.getImg());

		categoryRepository.save(category);

		return new Message("200", "Delete successfully");
	}

	@Override
	public List<CategoryResponse> searchCategory(String param) {
		// TODO Auto-generated method stub
		
		List<Category> categorys = categoryRepository.searchByName(param);
		List<CategoryResponse> response = categorys.stream().map(c -> mapper.map(c, CategoryResponse.class))
				.collect(Collectors.toList());

		return response;
	}


}
