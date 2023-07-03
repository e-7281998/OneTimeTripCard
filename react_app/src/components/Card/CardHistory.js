import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CardHistory(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const userCard = location.state.userCard;

  const dateDate = ["prev", "following"];
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const purchaseTitle = [
    "",
    "일자",
    "금액",
    "할인금액",
    "최종 결제 금액",
    "가맹점명",
  ];

  const chargeTitle = ["#", "일자", "금액"];
  //api data 담을 공간. 사용/충전 내역
  const [used, setUsed] = useState([]);

  const activeData = ["결제내역", "충전내역"];
  const [active, setActive] = useState(`/charge/getHistory/${userCard.id}`);
  //사용내역 조회, 충전내역 조회에 따라 목록 출력할 배열 선택해서 담을 곳  ( purchaseTitle / chargeTitle )
  const [title, setTitle] = useState(purchaseTitle);

  //달력 월,별
  const getData = (e) => {
    const value = e.target.value;
    //이전 누름
    if (value === dateDate[0]) {
      if (month === 1) {
        setMonth(() => 12);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    }
    //이후 누름
    else {
      if (month === 12) {
        setMonth(() => 1);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    }
  };

  //결제 내역 버튼 , 충전 내역 버튼 클릭시 api 변경
  const getActive = (e) => {
    setUsed([]);
    if (e.target.innerHTML === activeData[0]) {
      setTitle(() => purchaseTitle);
      setActive(() => `/purchase/getHistory/${userCard.id}`);
    } else {
      setTitle(() => chargeTitle);
      //다음은 결제 내역 호출하는 api임. 바꿔주면 됨
      setActive(() => `/charge/getHistory/${userCard.id}`);
    }
  };

  //데이터 요청
  useEffect(() => {
    axios
      .get(active, {
        params: {
          year: year,
          month: month,
        },
      })
      .then((res) => {
        setUsed(() => {     
          setUsed(res.data.reverse());
        });
      });
  }, [month, title]);

  return (
    <div>
      <Form.Group className="mb-3 text-center btn-block">
        <Button onClick={() => navigate(-1)}>돌아가기</Button>
        <Button type="button" onClick={getActive}>
          {activeData[0]}
        </Button>
        <Button type="button" onClick={getActive}>
          {activeData[1]}
        </Button>
      </Form.Group>
      <Form.Group className="mb-3 text-center btn-block d-flex justify-content-center">
        <Button type="button" onClick={getData} value={dateDate[0]}>
          <i className="fa fa-angle-left" />
        </Button>
        <p className="mr-9 ml-9">
          {year} / {month}
        </p>
        <Button type="button" onClick={getData} value={dateDate[1]}>
          <i className="fa fa-angle-right" />
        </Button>
      </Form.Group>
      <Table responsive="sm" className="text-center">
        <thead>
          <tr>
            {title.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {used && used.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {/* <td>{item.createdAt.slice(0, 10)}</td> */}
              <td>{item.createdAt.slice(0, 10) + " " + item.createdAt.slice(11, 16)}</td>
              {title.length === purchaseTitle.length && (
                <td>{item.amount}</td>
              )}
              {title.length !== purchaseTitle.length && (
                <td>{item.amountWon}</td>
              )}
              {/* purchaseTitle일 때는 항목이 더 많이 출력되므로  */}
              {title.length === purchaseTitle.length && (
                <>
                  <td>{item.discount}</td>
                  <td>{item.amount - item.discount}</td>
                  <td>{item.store}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CardHistory;
