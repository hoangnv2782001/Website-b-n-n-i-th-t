package com.project.be.service;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.common.Constants;
import com.project.be.common.Role;
import com.project.be.config.security.JwtTokenProvider;
import com.project.be.dto.request.LoginDto;
import com.project.be.dto.request.PasswordDto;
import com.project.be.dto.request.RegisterDto;
import com.project.be.dto.request.VerificationInfo;
import com.project.be.dto.response.AuthResponse;
import com.project.be.dto.response.Message;
import com.project.be.exception.OTPException;
import com.project.be.exception.UserAlreadyExistException;
import com.project.be.model.Cart;
import com.project.be.model.User;
import com.project.be.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Xử lí bussiness logic cho authenticatin module, bao gồm : Đăng kí Đăng nhập
 * Reset mật khẩu Quên mật khẩu Xác thực otp
 */
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final ModelMapper mapper;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManager authenticationManager;
	private final EmailService emailService;
	private final CartService cartService;
	private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
	private final RedisTemplate redisTemplate;


	/**
	 * Bussiness bao gồm : check exits email genarator otp gửi email xác thực otp
	 * cập nhật thông tin user mới cvào csdl genarate jwt Excepption throw
	 * UserAlreadyExistException khi email đã được sử dụng
	 * 
	 */
	@Override
	public Message register(RegisterDto registerDto) {

		userRepository.findByEmail(registerDto.getEmail()).ifPresent((user) -> {
			throw new UserAlreadyExistException("Email is already exit");
		});

		String otp = emailService.sendEmailOtp(registerDto.getEmail());

		logger.info("otp : {}", otp);
		redisTemplate.opsForValue().set(registerDto.getEmail(), otp,Constants.OTP_DURATION,TimeUnit.MINUTES);

	

		User user = User.builder().name(registerDto.getName()).email(registerDto.getEmail())
				.password(passwordEncoder.encode(registerDto.getPassword())).enable(false)
				
				.role(Role.USER).build();
		userRepository.save(user);

		return Message.builder().httpStatus("201")
				.message("Account created successfully. Please check your email to verify your account.").build();
	}

	/**
	 * Xử lí login : athenticate thông tin cập nhật user vào securitycontext
	 */

	@Override
	public AuthResponse authenticate(LoginDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) authentication.getPrincipal();
		String token = jwtTokenProvider.genarateToken(user);

		return AuthResponse.builder().token(token).id(user.getId()).role(user.getRole()).build();
	}

	/**
	 * Xác thực otp
	 */

	@Override
	public AuthResponse verifyOTP(VerificationInfo veInfo) {
		logger.info("email and pass verify :{} , {} ", veInfo.getEmail(), passwordEncoder.encode(veInfo.getOtp()));
		User user = userRepository.findByEmail(veInfo.getEmail()).orElseThrow(() -> {
			throw new OTPException("Email is invalid");
		});
		String token = "";

		try {
			token = redisTemplate.opsForValue().get(veInfo.getEmail()).toString();
		}catch(Exception e) {
			logger.error("Verify account fail");
			throw new OTPException("OTP was expired");
		}
		if(!token.equals(veInfo.getOtp())) {
			throw new OTPException("OTP is invalid");
		}

		user.setEnable(true);

		user = userRepository.save(user);

		Cart cart = Cart.builder().quantity(0).user(user).build();
		cartService.creatCart(cart);

		String jwt = jwtTokenProvider.genarateToken(user);

		return AuthResponse.builder().token(jwt).id(user.getId()).build();
	}

	/**
	 * handle forgot password
	 */

	@Override
	public Message forgotPassword(String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> {
			throw new UsernameNotFoundException("User not found");
		});

		String token = emailService.sendEmailResetPassword(email);

		LocalDateTime dateExpiration = LocalDateTime.now().plusSeconds(Constants.TOKEN_RESET_PASSWORD_DURATION);

		userRepository.save(user);

		return Message.builder().httpStatus("200").message("Reset password link sent to email").build();
	}

	@Override
	public AuthResponse resetPassword(PasswordDto passwordDto) {
		try {
			User user =(User) redisTemplate.opsForValue().get(passwordDto.getToken());
			logger.info("user reset pass {}",user);
			user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
            redisTemplate.delete(passwordDto.getToken());
			userRepository.save(user);

			String jwtToken = jwtTokenProvider.genarateToken(user);

			return AuthResponse.builder().token(jwtToken).build();
		}catch(Exception e) {
			throw new UsernameNotFoundException("Token is invalid");
		}
	}

}
