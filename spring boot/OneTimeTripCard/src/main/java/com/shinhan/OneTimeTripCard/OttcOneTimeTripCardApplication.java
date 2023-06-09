package com.shinhan.OneTimeTripCard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OttcOneTimeTripCardApplication {

	public static void main(String[] args) {
		SpringApplication.run(OttcOneTimeTripCardApplication.class, args);
	}

}
