package com.shinhan.OneTimeTripCard.vo;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class MultiKeyUserCourse implements Serializable {
	private Long userId; 	 //À¯Àúid
	private Long courseId;
}
