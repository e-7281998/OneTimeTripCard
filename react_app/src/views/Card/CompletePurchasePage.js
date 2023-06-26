import DecidedGrade from "components/Card/DecidedGrade";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function CompletePurchasePage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userCard = location.state.userCard;

  const goToCardManagePage = () => {
    navigate("/card");
  };
  return (
    <div>
      {/* <UnRegisteredCard /> */}
      <DecidedGrade userCard={userCard} />
      <Button onClick={goToCardManagePage}>카드 관리로 이동</Button>
    </div>
  );
}

export default CompletePurchasePage;
