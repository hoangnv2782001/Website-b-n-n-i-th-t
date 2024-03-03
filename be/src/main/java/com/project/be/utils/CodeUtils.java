package com.project.be.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class CodeUtils {
	
	public static String generateOrderCode(LocalDateTime date) {
		
		String code = "DH";
		  Random random = new Random();
	        StringBuilder eightDigitString = new StringBuilder();

	        for (int i = 0; i < 8; i++) {
	            int digit = random.nextInt(10); // Sinh một chữ số ngẫu nhiên từ 0 đến 9
	            eightDigitString.append(digit); // Nối chữ số vào chuỗi
	        }

		return code + eightDigitString;
	}
	
	

}
