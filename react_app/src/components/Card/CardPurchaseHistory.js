import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

function CardPurchaseHistory(props) {

    const [userCards, setUserCards] = useState([]);
    const userId = 1;

    axios({
        method: "get",
        url: `/user-card/history/${userId}`,
    }).then((res) => {
        setUserCards(res.data);
    }).catch(error => { console.log(error); throw new Error(error); });

    return (
        <div>
            <Container>
                <Row>
                    <Col>구매일</Col><Col>상품명</Col><Col>결제 금액</Col>
                </Row>
                {userCards.map((userCard, index) => (
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