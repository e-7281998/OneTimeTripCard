import GradeSelect from "components/Card/GradeSelect";
import UnRegisteredCard from "components/Card/UnRegisteredCard";
import React from "react";
function CardPurchasePage(props) {
  return (
    <div>
      <h1>카드 구매 페이지</h1>
      <span>신규 구입</span>
      <hr></hr>
      <UnRegisteredCard />
      <GradeSelect />
    </div>
  );
}

export default CardPurchasePage;
