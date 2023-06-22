package com.shinhan.OneTimeTripCard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.shinhan.OneTimeTripCard.repository.UserRepository;
import com.shinhan.OneTimeTripCard.vo.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MailService {
	private final UserRepository userRepository;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	//인증번호 발송 유효성 check
	public int updatePwd(User user) {
		int flag = 0;
		
		//이메일이 없으면 
		if(userRepository.findByEmail(user.getEmail()) == null) {
			flag = 0;
			return flag;
		} else if (userRepository.findByEmail(user.getPhone()) == null) {
			flag = 1;
			return flag;
		} else 
			flag = 3;
		
		return flag;
	}
	
	//임시비밀번호 메일 보내기
	public void sendSimpleEmail(User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		//6자리 인증 랜덤 비밀번호 생성
		String[] charSet = new String[] {
						"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
					    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
					    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
					    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
					    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
						};
				
		String tempPwd = "";
				
		for(int i=0;i<6;i++) {
			int randomIndex = (int)(Math.random() * charSet.length);
			tempPwd += charSet[randomIndex];
		}
				
		//단순 문자 메일 보내기
		
		//메일 제목 넣는 곳
		message.setSubject("임시 비밀번호 보냈다 "); 
		//보낼 이메일 나중에 수정하면 됨 user.getEmail()
		message.setTo("psj9258@gmail.com");
		//메일 본문 내용 넣는곳
		message.setText("임시 비밀번호:" + tempPwd);
		
		javaMailSender.send(message);
		
		//임시비밀번호 저장
		User foundUser = userRepository.findByEmail(user.getEmail());
		foundUser.setPassword(tempPwd);
		userRepository.save(foundUser);
	}
	
}
