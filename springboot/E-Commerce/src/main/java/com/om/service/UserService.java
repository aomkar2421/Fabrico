package com.om.service;

import com.om.Model.User;
import com.om.exception.UserException;

public interface UserService {

	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
}
