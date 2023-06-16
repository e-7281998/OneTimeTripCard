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
	
	//비밀번호 인증번호로 update
	public User updatePwd(User user) {
		System.out.println("bbb");
		return userRepository.save(user);
	}
	
	//단순 문자 메일 보내기
	public void sendSimpleEmail() {
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
		//보낼 이메일
		message.setTo("psj9258@gmail.com");
		//메일 본문 내용 넣는곳
		message.setText("임시 비밀번호:" + tempPwd);
		
		javaMailSender.send(message);
		
		
	}
	
	
	
	//6자리 인증 랜던 비밀번호 보내기
	public String createRandomPw() {
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
		
		return tempPwd;
	}
}
