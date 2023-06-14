import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { selectUserCardsByUserId } from "js/userCard";
import axios from 'axios';

function CardPurchaseHistory(props) {

    const [userCards, setUserCards] = useState([]);

    const userId = 1;
    useEffect(() => {
        selectUserCardsByUserId(userId)
            .then(userCards => {
                setUserCards(userCards);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    return (
        <div>
            <Container>
                <Row>
                    <Col>구매일</Col><Col>상품명</Col><Col>결제 금액</Col>
                </Row>
                {userCards.length !== 0 && userCards.map((userCard, index) => (
                    <Row key={index}>
                        <Col>{userCard.createdAt}</Col>
                        <Col>{userCard.card?.cardDesign?.cardName}</Col>
                        <Col>{userCard.grade.price}</Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default CardPurchaseHistory;