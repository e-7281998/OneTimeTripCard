import React from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

function CardDefaultInfo(props) {
  const location = useLocation();
  const userCard = location.state.userCard;

  return (
    <Card className="mb-3 text-center btn-block">
      <Card.Body>
        잔액 <span> {userCard.balance}</span>
      </Card.Body>
      <Card.Img
        className="m-auto"
        src={require("assets/img/card/cardImg1.png")}
        style={{ width: "13rem" }}
      />
      <Card.Body>
        <span>{userCard.nickName} </span>
        <span>{userCard.grade.gradeName}</span>
      </Card.Body>
    </Card>
  );
}

export default CardDefaultInfo;
