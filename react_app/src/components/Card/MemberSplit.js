import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CardDefaultInfo from "./CardDefaultInfo";

function MemberSplit(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userCard = location.state.userCard;
  const userId = sessionStorage.getItem("id");
  const [member, setMember] = useState([]);
  console.log("여기입니다");
  console.log(userCard.manager);
  console.log(userId);

  const onSplit = () => {
    console.log("userCard.travelWithId");
    console.log(userCard.travelWithId);

    axios.post(`/travel-with/split/${userCard.travelWithId}`).then((res) => {
      console.log("정산하기");
      console.log(res);
    });
  };

  //내보내기
  const onExpel = (e) => {
    console.log("------------------------------");
    console.log(e.target.getAttribute("email"));
    console.log("------------------------------");
    console.log(userCard.travelWithId);

    axios
      .delete(`/travel-with/expel`, {
        data : {
          email: e.target.getAttribute("email"),
          travelWithId: userCard.travelWithId,
        }
        
      })
      .then((res) => {
       const arr = member.filter((item, index) => item.id !== res.data.id);
        setMember(arr);
      });
  };

  useEffect(() => {
    axios.get(`/travel-with/users/${userCard.travelWithId}`).then((res) => {
      setMember(() => res.data.filter((item) => Number(userId) != item.id));
    });
  }, []);

  const purchaseTitle = ["", "이름", "정산 예정 금액", "초대일", ""];

  if (!(userCard.manager === Number(userId))) {
    delete purchaseTitle[4];
  }

  return (
    <div>
      <CardDefaultInfo />
      <Table responsive="sm" className="text-center">
        <thead>
          <tr>
            {purchaseTitle.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {member.map((item, index) => (
            <tr key={index}>
              <td>이미지넣기</td>
              <td>{item.firstName + " " + item.lastName}</td>
              <td>{userCard.balance / member.length}</td>
              <td>{userCard?.expiredAt?.slice(0, 10)}</td>
              {userCard.manager === Number(userId) && (
                <td>
                  <Button
                    email={item.email}
                    disabled={
                      userCard.manager === Number(userId) ? "" : "disabled"
                    }
                    onClick={onExpel}
                  >
                    내보내기
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <Form.Group className="mb-3 text-center btn-block">
        <Button onClick={() => navigate(-1)}>돌아가기</Button>
        {userCard.manager === Number(userId) && (
          <Button onClick={onSplit}>정산하기</Button>
        )}
      </Form.Group>
    </div>
  );
}

export default MemberSplit;
