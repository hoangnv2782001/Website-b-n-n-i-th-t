package com.project.be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.be.common.Role;
import com.project.be.model.User;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByEmail(String email);
	

	
	@Query	("SELECT COUNT(u) FROM User u WHERE u.enable = true AND u.role = 'USER'")
	int countEnabledUsersWithUserRole();
	
	List<User> findByRoleEquals(Role role);

}
