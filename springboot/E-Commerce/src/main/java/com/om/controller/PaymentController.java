package com.om.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.om.Model.Order;
import com.om.exception.OrderException;
import com.om.repository.OrderRepository;
import com.om.request.ApiResponse;
import com.om.service.OrderService;
import com.om.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {

	@Value("${razorpay.api.key}")
	String apiKey;

	@Value("${razorpay.api.secret}")
	String apiSecret;
	
	@Value("${client}")
	String client;

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId, @RequestHeader("Authorization")String jwt) throws OrderException, RazorpayException{

		Order order = orderService.findOrderById(orderId);

		System.out.println("apiKey "+ apiKey);
		System.out.println("apiSecret "+ apiSecret);

		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
			JSONObject paymentLinkRequest = new JSONObject();
			System.out.println("Payment Link Request: " + paymentLinkRequest.toString());

			paymentLinkRequest.put("amount", (int)(order.getTotalDiscountedPrice() * 100));
			paymentLinkRequest.put("currency","INR");

			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFirstName());
			customer.put("email", order.getUser().getEmail());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("callback_url", client+"/payment/"+orderId);
			paymentLinkRequest.put("callback_method", "get");

			PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentLinkResponse res = new PaymentLinkResponse();
			res.setPayment_link_id(paymentLinkId);
			res.setPayment_link_url(paymentLinkUrl);

			return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);

		} catch (RazorpayException e) {
		    System.err.println("RazorpayException: " + e.getMessage());
		    if (e.getCause() != null) {
		        e.getCause().printStackTrace();
		    }
		    throw new RazorpayException("Error creating payment link: " + e.getMessage());
		}

	}


	@GetMapping("/payments")
	public ResponseEntity<ApiResponse> redirect(@RequestParam(name="payment_id") String paymentId, @RequestParam(name="order_id") Long orderId ) throws OrderException, RazorpayException{

		Order order = orderService.findOrderById(orderId);
		RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

		try {

			Payment payment = razorpay.payments.fetch(paymentId);

			if (payment.get("status").equals("captured")) {
				order.getPaymentDetails().setPaymentld(paymentId);
				order.getPaymentDetails().setStatus("COMPLETED");
				order.setOrderStatus("PLACED");
				orderRepository.save(order);
			}

			ApiResponse res = new ApiResponse();
			res.setMessage("Your order is placed");
			res.setStatus(true);

			return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);


		} catch (Exception e) {
			throw new RazorpayException(e.getMessage());
		}

	}

}
