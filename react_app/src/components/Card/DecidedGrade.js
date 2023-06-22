import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Carousel from "./Carousel";

function DecidedGrade(props) {
  const location = useLocation();

  //const userCard = props.userCard;
  const userCard = location.state.userCard;
  const grade = userCard.grade;
  const benefits = userCard.benefits;

  return (
    <div>
      <Carousel />
      <Container>
        <Row>
          <Col>등급</Col>
          <Col>{grade.gradeName}</Col>
        </Row>
        <Row>
          <Col>금액</Col>
          <Col>{grade.price}</Col>
        </Row>
        <Row>
          <Col>기간</Col>
          <Col>{grade.period}</Col>
        </Row>
        <Row>
          <Col>즉시 환급률</Col>
          <Col>{grade.refundRate * 100}%</Col>
        </Row>
        <Row>
          <Col>재 충전 동일 혜택 수</Col>
          <Col>{grade.maxRechargeCount}</Col>
        </Row>
        <Row>
          <Col>혜택 수</Col>
          <Col>{grade.benefitCount}</Col>
        </Row>
        <Row>
          <Col>선택한 혜택</Col>
        </Row>
        {benefits &&
          benefits.map((benefit) => (
            <Row key={benefit.benefitName}>
              <Col>{benefit.benefitName}</Col>
              <Col>{benefit.discountRate * 100}% 할인</Col>
            </Row>
          ))}
      </Container>
    </div>
  );
}

export default DecidedGrade;
