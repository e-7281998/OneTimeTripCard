import React from "react";

function Charge(props) {
  const { userCard } = props;

  console.log(userCard);

  return (
    <div>
      <form>
        <label>
          <span>한국</span> <input type="number" />
        </label>
        <label>
          <span></span> <input type="number" />
        </label>
      </form>
    </div>
  );
}

export default Charge;
