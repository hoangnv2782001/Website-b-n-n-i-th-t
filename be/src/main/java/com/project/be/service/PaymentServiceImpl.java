package com.project.be.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.be.config.vnpay.Config;
import com.project.be.dto.request.OrderDto;
import com.project.be.repository.CategoryRepository;
import com.project.be.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Override
	public String createPayment(OrderDto orderDto) throws UnsupportedEncodingException {
		String vnp_Version = "2.1.0";
		String vnp_Command = "pay";
		String orderType = "other";

		long amount = (long) orderDto.getAmount();

		amount *= 100;

		String vnp_TxnRef = Config.getRandomNumber(8);
//		String vnp_IpAddr = Config.getIpAddress(req);

		String vnp_TmnCode = Config.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_BankCode", "NCB");
//
//		if (bankCode != null && !bankCode.isEmpty()) {
//			vnp_Params.put("vnp_BankCode", bankCode);
//		}
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
		vnp_Params.put("vnp_OrderType", orderType);

//		String locate = req.getParameter("language");
//		if (locate != null && !locate.isEmpty()) {
//			vnp_Params.put("vnp_Locale", locate);
//		} else {

//			vnp_Params.put("vnp_Locale", "vn");

//		}

		String url = Config.vnp_ReturnUrl + "?address="
				+ URLEncoder.encode(orderDto.getAddress(), StandardCharsets.UTF_8) + "&phone="
				+ orderDto.getPhone()+ "&receiver="
				+ URLEncoder.encode(orderDto.getReceiver(), StandardCharsets.UTF_8) + "&note="
				+ URLEncoder.encode(orderDto.getNote(), StandardCharsets.UTF_8) + "&paymentType="
				+ orderDto.getPaymentType() + "&cartId="
				+ orderDto.getCartId();

		vnp_Params.put("vnp_ReturnUrl", url);
		vnp_Params.put("vnp_IpAddr", "123.123.123.123");

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List fieldNames = new ArrayList(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) vnp_Params.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		return Config.vnp_PayUrl + "?" + queryUrl;

	}

}
