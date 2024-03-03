package com.project.be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.be.model.Category;
import com.project.be.model.Product;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findByActiveTrue();

	Optional<Category> findByIdAndActiveTrue(int id);

	@Query("SELECT COUNT(p) FROM Category p WHERE p.active = true")
	int countAllActiveCategorys();

	@Query("SELECT p FROM Category p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) and p.active = true")
	List<Category> searchByName(@Param("keyword") String keyword);
}
