package com.shinhan.OneTimeTripCard.vo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.sun.istack.NotNull;

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
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Card {
	@Id
	private String cardNo; // pk
	
	@OneToOne
	@NotNull
	private CardDesign cardDesign;
	
	@OneToMany(mappedBy = "card", fetch = FetchType.LAZY)
	private List<UserCard> userCards;
}
