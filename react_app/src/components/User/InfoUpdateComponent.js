import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import AccountComponent from "./AccountComponent";

function InfoUpdateComponent() {
  const [userInfo, setUserInfo] = useState([]);
  const [eventKey, setEventKey] = useState([]);

  const navi = useNavigate();
  //const { userid } = useParams(); //파라미터 전달할 때

  useEffect(() => {
    axios({
      url: `/user/userInfoGet/1`,
      method: "get",
    })
      .then((r) => {
        console.log(r.data);
        setUserInfo(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleInsert = () => {
    axios({
      url: "/user/userInfoUpdate",
      method: "put",
      data: userInfo,
    })
      .then((r) => {
        console.log(r.data);
        window.location.href = "/user/user-info-update";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Accordion>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>이메일</div>
            <div>{userInfo.email}</div>
          </div>
          <ContextAwareToggle eventKey="0">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="UserEmail"
              aria-label="UserEmail"
              name="email"
              defaultValue={userInfo.email}
              onChange={handleChange}
            ></input>
            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>비밀번호</div>
            <div>{userInfo.password}</div>
          </div>
          <ContextAwareToggle eventKey="1">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="UserPassword"
              aria-label="UserPassword"
              name="password"
              defaultValue={userInfo.password}
              onChange={handleChange}
            ></input>
            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>이름(First Name) / 성(Last Name)</div>
            <div>
              {userInfo.firstName} /{userInfo.lastName}
            </div>
          </div>
          <ContextAwareToggle eventKey="2">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body className="d-flex">
            <span>이름</span>
            <input
              type="text"
              className="form-control"
              placeholder="UserFirstName"
              aria-label="UserFirstName"
              name="firstName"
              defaultValue={userInfo.firstName}
              onChange={handleChange}
            ></input>

            <span>성</span>
            <input
              type="text"
              className="form-control"
              placeholder="UserLastName"
              aria-label="UserLastName"
              name="lastName"
              defaultValue={userInfo.lastName}
              onChange={handleChange}
            ></input>
            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>전화번호</div>
            <div>{userInfo.phone}</div>
          </div>
          <ContextAwareToggle eventKey="3">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="UserPhone"
              aria-label="UserPhone"
              name="phone"
              defaultValue={userInfo.phone}
              onChange={handleChange}
            ></input>
            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>통화</div>
            <div>{userInfo.preferredCurrency}</div>
          </div>
          <ContextAwareToggle eventKey="4">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="UserPreferredCurrency"
              aria-label="UserPreferredCurrency"
              name="preferredCurrency"
              defaultValue={userInfo.preferredCurrency}
              onChange={handleChange}
            ></input>
            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>계좌 등록</div>
            <div>{userInfo.accountNo}</div>
          </div>
          <ContextAwareToggle eventKey="5">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>
            <AccountComponent userInfo={userInfo} handleChange={handleChange} />

            <Button onClick={handleInsert}>저장</Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <div>
            <div>프로필 이미지 등록</div>
            <div>----------</div>
          </div>
          <ContextAwareToggle eventKey="6">수정</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="6">
          <Card.Body className="d-flex">---</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      <div className="ms-auto p-2">
        <Button
          type="button"
          style={{ backgroundColor: isCurrentEventKey ? "pink" : "lavender" }}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      </div>
    </>
  );
}

export default InfoUpdateComponent;
