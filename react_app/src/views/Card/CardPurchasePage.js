import GradeSelect from "components/Card/GradeSelect";
import React from "react";

function CardPurchasePage(props) {
  return (
    <>
      <h1>Get A New Card!</h1>
      {/* <span>신규 구입</span> */}
      <hr></hr>

      <GradeSelect />
    </>
  );
}

export default CardPurchasePage;
