package com.project.be.service;

import java.util.UUID;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.common.Constants;
import com.project.be.exception.MailCustomException;
import com.project.be.utils.OtpUtils;

import lombok.RequiredArgsConstructor;

/**
 * Send otp email
 */
@Service
@RequiredArgsConstructor
@Transactional
public class EmailServiceImpl implements EmailService {
	private final JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String sender;

	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

	@Override
	public String sendEmailOtp(String to) {
		String otp = OtpUtils.genarateOtp();

		String content = "Xin Chào\r\n" + "\r\n" + "Code của Bạn là : " + otp
				+ ". Xử dụng nó để xác nhận tài khoản của bạn.\r\n" + "\r\n";
//				+ "You must confirm your email within 3 days of signing up. If you do not confirm your email in \r\n"
//				+ "this timeframe, your account will be deleted and you will need to sign up for App again. \r\n\n"
//				+ "The App Team";
		sendEmail(to, "Xác Nhận Tài Khoản Email", content);

		return otp;
	}

	@Override
	public String sendEmailResetPassword(String to) {
		// TODO Auto-generated method stub

		String resetToken = UUID.randomUUID().toString();

		String link = Constants.URL_RESET_PASSWORD + resetToken+"&email="+to;

		String content = 
                "<h4>Vui lòng nhấn vào link dưới đây để đổi mật khẩu</h4>" +
                "<a href=\"http://" + link + "\">" + link + "</a>" +
                "</body></html>";

		MimeMessage message = emailSender.createMimeMessage();

		boolean multipart = true;

		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(message, multipart, "utf-8");

			 helper.setText(content, true);

			helper.setTo(to);

			helper.setSubject("Quên Mật Khẩu");

			this.emailSender.send(message);

		} catch (MessagingException e) {
			throw new MailCustomException("There was an error sending the email, Please try again later");
		}

		return resetToken;
	}

	@Override
	public void sendEmail(String to, String subject, String content) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setSubject(subject);
			message.setFrom(sender);
			message.setTo(to);
			message.setText(content);
			emailSender.send(message);
			logger.info("send email to {} ", to);

		} catch (Exception exception) {

			throw new MailCustomException("There was an error sending the email, Please try again later");
		}
	}
	
//	public static void main(String[] args) {
//		EmailService e = new EmailServiceImpl(null)
//	}

}
