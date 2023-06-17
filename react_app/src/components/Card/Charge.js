import React from "react";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


function Charge(props) {
  const { userCard } = props;
  const navigate = useNavigate();
  return (
    <>
      <Card className="mb-3 text-center btn-block" >
        <Card.Body >
          카드 잔액 <span> 22,400 W</span>
        </Card.Body>
        <Card.Img className="m-auto" src={require("assets/img/card/cardImg1.png")} style={{ width: '13rem' }} />
        <Card.Body>
          미국 <span>골드</span>
        </Card.Body>
      </Card>

      <Form className="m-auto" style={{ width: '400px' }}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            KRW
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="10000" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            USD
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="10000" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            출금계좌
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="123456789" disabled />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            남은 충전 횟수
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" placeholder="1" disabled />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 text-center btn-block" >
          <Button onClick={() => navigate(-1)}>돌아가기</Button>
          <Button type="submit">충전하기</Button>
        </Form.Group>
      </Form >
    </>
  );
}


export default Charge;
