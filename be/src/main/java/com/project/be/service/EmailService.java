package com.project.be.service;

import org.springframework.mail.SimpleMailMessage;



/**
 * Define service perform sending email
 */

public interface EmailService {

	String sendEmailOtp(String to);

	String sendEmailResetPassword(String to);

	void sendEmail(String to,String subject,String content);

//	void sendMimeMessageWithAttachments(String name, String to, String token);
//
//	void sendMimeMessageWithEmbeddedFiles(String name, String to, String token);
//
//	void sendHtmlEmail(String name, String to, String token);
//
//	void sendHtmlEmailWithEmbeddedFiles(String name, String to, String token);
}