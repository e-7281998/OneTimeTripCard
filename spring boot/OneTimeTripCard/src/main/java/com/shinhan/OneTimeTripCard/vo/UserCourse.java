package com.shinhan.OneTimeTripCard.vo;

import java.sql.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor  
@Table
@Entity
public class UserCourse {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userCourseId;		//pk
	private Long userId; 	 		//蜡历id
	private Long courseId;	 		//内胶id
	private Date createdAt; 		//内胶积己朝楼
	private Boolean completed; 		// Y / N

}
