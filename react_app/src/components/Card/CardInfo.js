import React, { useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Dropdown,
  Row,
} from "reactstrap";

function CardInfo(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userCard = location.state.userCard;

  var imgSrc = userCard.card.cardDesign.imgSrc;
  imgSrc = imgSrc.split("/");

  return (
    <div className="d-flex" style={{ width: "500px", margin: " auto" }}>
      <Container>
        <Card className="mb-3 text-center btn-block">
          <img
            className="m-auto"
            src={require(`assets/img/card/${imgSrc[3]}`)}
            style={{ width: "100%" }}
          />
        </Card>
        {userCard.isDefault && (
          <Row className="my-2">
            <Col></Col>
            <Col className="text-right">Default Card</Col>
          </Row>
        )}
        <Row className="my-2">
          <Col></Col>
          <Col className="text-right">{userCard.card.cardNo}</Col>
        </Row>
        <Row className="my-2">
          <Col>NickName</Col>
          <Col className="text-right">{userCard.nickName}</Col>
        </Row>
        <Row className="my-2">
          <Col>Balance</Col>
          <Col className="text-right">{userCard.balance}</Col>
        </Row>
        <Row className="my-2">
          <Col>Grade</Col>
          <Col className="text-right">{userCard.grade.gradeName}</Col>
        </Row>
        <Row className="my-2">
          <Col>Edition</Col>
          <Col className="text-right">{userCard.card.cardDesign.cardName}</Col>
        </Row>
        <Row className="my-2">
          <Col>CreatedAt</Col>
          <Col className="text-right"> {userCard.createdAt.slice(0, 10)}</Col>
        </Row>

        <Button style={{ margin: "auto" }} onClick={() => navigate(-1)}>
          BACK
        </Button>
      </Container>
    </div>
  );
}

export default CardInfo;
