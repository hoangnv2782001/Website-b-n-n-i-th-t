package com.project.be.service;

import com.project.be.dto.request.LoginDto;
import com.project.be.dto.request.PasswordDto;
import com.project.be.dto.request.RegisterDto;
import com.project.be.dto.request.VerificationInfo;
import com.project.be.dto.response.AuthResponse;
import com.project.be.dto.response.Message;

/**
 * Định nghĩa các method handle authentication
 */
public interface AuthService {
	/**
	 * Xử lí bussiness register một accout mới
	 * @param registerDto
	 * @return AuthResponse
	 */
	Message register(RegisterDto registerDto) ;
	
	/**
	 * Xử lí login vào hệ thống
	 * @param loginDto
	 * @return AuthResponse
	 */
	AuthResponse authenticate(LoginDto loginDto);
	
	/**
	 * Xac thuc otp
	 * @param veInfo
	 * @return message
	 */
	AuthResponse verifyOTP(VerificationInfo veInfo);
	
	/**
	 * xu lí forgot password
	 * @param email
	 * @return
	 */
	Message forgotPassword(String email);
	
	/**
	 * reset password
	 * @param email
	 * @return
	 */
	AuthResponse resetPassword(PasswordDto passwordDto);

}
