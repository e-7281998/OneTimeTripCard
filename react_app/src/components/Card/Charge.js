import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import CardDefaultInfo from "./CardDefaultInfo";
import axios from "axios";

function Charge() {
  const location = useLocation();
  const userCard = location.state.userCard;
  const [exchange, setExchange] = useState(0);
  const [OWN, setOWN] = useState(0);
  const [KRW, setKRW] = useState(0);

  useEffect(() => {
    axios
      .get(
        `/exchange-rate/charge?currencyName=${userCard.user.preferredCurrency}`
      )
      .then((res) => {
        setExchange(Math.floor(res.data));
      });
  }, []);

  //충전 요청하기
  const onCharge = () => {
    axios
      .post("/charge", {
        userCard: userCard,
        currency: userCard.user.preferredCurrency,
        rate: exchange,
        amount: OWN,
        amountWon: KRW,
      })
      .then(() => {
        navigate("/card");
      });
  };

  //환전계산
  const onExchange = (e) => {
    if (e.target.getAttribute("data") === "KRW") {
      setOWN(() => (e.target.value / exchange).toFixed(2));
      setKRW(() => Math.floor(e.target.value));
    } else {
      setOWN(() => e.target.value);
      setKRW(() => Math.floor(e.target.value * exchange));
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <CardDefaultInfo />
      <Form className="m-auto" style={{ width: "400px" }}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            KRW
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder={KRW}
              onChange={onExchange}
              value={KRW}
              data="KRW"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            {userCard.user.preferredCurrency.toUpperCase()}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder={OWN}
              onChange={onExchange}
              value={OWN}
              data="OWN"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            출금계좌
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder={userCard.user.accountNo}
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            남은 충전 횟수
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder={
                userCard.grade.maxRechargeCount - userCard.rechargeCount
              }
              disabled
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 text-center btn-block">
          <Button onClick={() => navigate(-1)}>돌아가기</Button>
          <Button onClick={onCharge}>충전하기</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default Charge;
