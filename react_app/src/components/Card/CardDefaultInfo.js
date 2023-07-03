import React from "react";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

function CardDefaultInfo(props) {
  const location = useLocation();
  const userCard = location.state.userCard;

  var imgSrc = userCard.card.cardDesign.imgSrc;
  imgSrc = imgSrc.split("/");

  return (
    <Card
      className="mb-3 text-center btn-block"
      style={{ background: "#e9ecef" }}
    >
      <Card.Body>
        <h4 style={{ fontSize: 30, fontWeight: 500 }}>BALANCE</h4>
        <h1 style={{ fontSize: 60, fontWeight: 800 }}>₩ {userCard.balance}</h1>
      </Card.Body>
      <Card.Img
        className="m-auto"
        src={require(`assets/img/card/${imgSrc[3]}`)}
        style={{ width: "13rem" }}
      />
      <Card.Body>
        <div style={{ fontSize: 20, fontWeight: 800 }}>
          {userCard.nickName}{" "}
        </div>
        <div style={{ fontSize: 20, fontWeight: 500 }}>
          {userCard.grade.gradeName}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardDefaultInfo;
