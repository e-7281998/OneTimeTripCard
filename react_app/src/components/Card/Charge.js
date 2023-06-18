import React from "react";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import CardDefaultInfo from "./CardDefaultInfo";


function Charge(props) {
  const { userCard } = props;
  const navigate = useNavigate();
  return (
    <>
      <CardDefaultInfo />
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
