import { selectUserCardsByUserId } from "js/userCard";
import React, { useEffect, useState } from "react";
import { cardList } from "./CardList";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";

function CardTransfer(props) {
  const userId = window.sessionStorage.getItem("id");
  const [userCards, setUserCards] = useState([]);
  //다시 선택하기 버튼 눌렀을 때를 위한 카드 리스트 백업
  const [saveUserCards, setSaveUserCards] = useState([]);
  const title = ["Nickname", "Card No", "Balance", ""];
  const navigate = useNavigate();
  const [selectMsg, setSelectMsg] = useState(
    "Please select the card to transfer the balance to."
  );
  //잔액 이동할 카드 정보
  const [selectCard, setSelectCard] = useState({
    from: "",
    to: "",
  });

  //다시 선택하기 클릭시 작동
  function onReset(e) {
    setSelectCard({ from: "", to: "" });
    setSelectMsg("Please select the card to transfer the balance to.");
    setUserCards(saveUserCards);
  }

  //잔액이동할 카드 선택
  const onSendCard = (e) => {
    //잔액 이동 할 카드
    if (selectCard.from === "") {
      setSelectMsg(
        `Card to move balance : ${e.target.getAttribute("nick")} => `
      );
      setSelectCard({ ...selectCard, from: e.target.getAttribute("value") });
    }
    //잔액 이동 될 카드
    else if (selectCard.to === "") {
      setSelectCard({ ...selectCard, to: e.target.getAttribute("value") });

      setSelectMsg((prev) => {
        return `${prev}${e.target.getAttribute("nick")}`;
      });
    }

    //선택된 카드 제외하고 userCards에 담기
    setUserCards(
      userCards.filter(
        (item) => item.id !== Number(e.target.getAttribute("value"))
      )
    );
  };

  //잔액 이동하기
  const onTransfer = () => {
    axios
      .put("/user-card/transfer/user-cards", {
        from: selectCard.from,
        to: selectCard.to,
      })
      .then((res) => {
        alert(`balance transferred : ${res.data}`);
        navigate("/card");
      });
  };

  useEffect(() => {
    selectUserCardsByUserId(userId)
      .then((userCards) => {
        setUserCards(cardList(userCards));
        setSaveUserCards(cardList(userCards));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center mb-5">{selectMsg}</h2>
      <Table responsive="sm" className="text-center">
        <thead>
          <tr>
            {title.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userCards.map((item, index) => (
            <tr key={index}>
              <td>{item.nickName}</td>
              <td>{item.card?.cardNo}</td>
              <td>{item.balance}</td>
              <td>
                <Button
                  nick={item.nickName}
                  value={item.id}
                  onClick={onSendCard}
                  disabled={selectCard.to !== "" ? true : false}
                >
                  select
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form className="m-auto">
        <Form.Group className="mb-3 text-center btn-block">
          <Button onClick={() => navigate(-1)}>back</Button>
          {selectCard.from !== "" && (
            <Button onClick={onReset}>choose again</Button>
          )}
          <Button onClick={onTransfer}>balance transfer</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CardTransfer;
