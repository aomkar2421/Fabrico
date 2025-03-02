package com.om.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.om.Model.User;
import com.om.config.JwtProvider;
import com.om.exception.UserException;
import com.om.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	
	public UserServiceImplementation(JwtProvider jwtProvider, UserRepository userRepository) {
		this.userRepository = userRepository;
		this.jwtProvider = jwtProvider;
	}
	

	@Override
	public User findUserById(Long userId) throws UserException {

		Optional<User> user = userRepository.findById(userId);
		
		if (user.isPresent()) {
			return user.get();
		}
		
		throw new UserException("User not found for user id - "+userId);
	}

//	@Override
//	public User findUserProfileByJwt(String jwt) throws UserException {
//		String email = jwtProvider.getEmailFromToken(jwt);
//		System.out.println("=================EMAIL FROM JWT====================="+ email);
//		User user = userRepository.findByEmail(email);
//		System.out.println("=================USER FROM JWT====================="+ user);
//
//		if (user == null) {
//			throw new UserException("User not found with email - "+email);
//		}
//				
//		return user;
//	}
	
	
	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
	    System.out.println("Raw JWT received: " + jwt);
	    
	    String email = jwtProvider.getEmailFromToken(jwt);
	    System.out.println("Email extracted from JWT: " + email);
	    
	    User user = userRepository.findByEmail(email);
	    System.out.println("User found for email " + email + ": " + (user != null));
	    
	    if (user == null) {
	        throw new UserException("User not found with email - " + email);
	    }
	    
	    return user;
	}

}
