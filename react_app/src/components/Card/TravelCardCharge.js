import axios from "axios";
import React, { useEffect, useState } from "react";

function TravelCardCharge(props) {
  const userId = sessionStorage.getItem("id");
  const [member, setMember] = useState([]);

  useEffect(() => {
    axios.get(`/travel-with/users/${userId}`).then((res) => {
      setMember(() => res.data);
      res.data.map((item) => {
        console.log(item.firstName);
      });
    });
  }, []);
  return (
    <div className="text-center mb-3">
      <p>멤버 : {member.length}</p>
      {member.map((item, index) => (
        <span> {item.firstName + " " + item.lastName} </span>
      ))}
    </div>
  );
}

export default TravelCardCharge;
