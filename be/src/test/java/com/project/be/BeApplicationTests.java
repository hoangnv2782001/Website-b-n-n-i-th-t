package com.project.be;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.be.service.EmailService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class BeApplicationTests {
	@Autowired
	private EmailService emailService;

	@Test
	void contextLoads() {
		emailService.sendEmailResetPassword("hoangnv2782001@gmail.com");
	}
	
	

}
