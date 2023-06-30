import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import AccountComponent from "./AccountComponent";

function InfoUpdateComponent(props) {
  const [userInfo, setUserInfo] = useState([]);
  const userid = sessionStorage.getItem("id");

  //여기 추가
  const [currency, setCurrency] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [currnecyName, setCurrencyName] = useState([]);

  useEffect(() => {
    console.log();
    axios({
      url: `/user/userInfoGet/${userid}`,
      method: "get",
    })
      .then((r) => {
        setUserInfo(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleInsert = (e) => {
    axios({
      url: "/user/userInfoUpdate",
      method: "put",
      data: userInfo,
    })
      .then((r) => {
        setUserInfo(r.data);
        //저장 클릭시 input창 닫히고, 수정버튼 라벤더로
        //통화는 구조가 달라서 적용 안됨..
        // var parent1 = e.target.parentNode.parentNode;
        // var btn = parent1.parentNode.querySelector("button");
        // btn.style.backgroundColor = "lavender"
        // parent1.remove("show");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //선호통화 List로 불러오기
  useEffect(() => {
    axios({
      method: "get",
      url: "/exchange-rate/getAllCurrency",
    })
      .then((res) => {
        setCurrencyList(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);

  //선호통화
  useEffect(() => {
    setCurrency(userInfo.preferredCurrency);
    setCurrencyName(currencyList.map((currency) => currency.currnecyName));
  }, [currencyList]);

  //통화선택
  function selectCurrency(e) {
    currencyList.forEach((c) => {
      if (c === e.target.innerHTML) {
        setCurrency(c);
        setUserInfo({ ...userInfo, preferredCurrency: c });
      }
    });
  }

  return (
    <main ref={props.ref}>
      <section className="section section-shaped section-lg">
        <Container>
          <Accordion>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>
                  <div>이메일</div>
                  <div>{userInfo.email}</div>
                </div>
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
                  <div>{currency}</div>
                  {/* <div>{userInfo.preferredCurrency}</div> */}
                </div>
                <ContextAwareToggle eventKey="4">수정</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body className="d-flex">
                  {/* 여기부터 추가 */}

                  <FormGroup>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        id="navbarDropdownMenuLink2"
                        color="default"
                      >
                        {currency}
                      </DropdownToggle>

                      <DropdownMenu aria-labelledby="navbarDropdownMenuLink2">
                        {currencyList.map((currnecyName) => (
                          <DropdownItem
                            key={currnecyName}
                            onClick={selectCurrency}
                          >
                            {currnecyName}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </FormGroup>

                  {/* 여기까지 */}
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="UserPreferredCurrency"
                    aria-label="UserPreferredCurrency"
                    name="preferredCurrency"
                    defaultValue={userInfo.preferredCurrency}
                    onChange={handleChange}
                  ></input> */}
                  <Button onClick={handleInsert}>저장</Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div>
                  <div>계좌</div>
                  <div>{userInfo.accountNo}</div>
                </div>
                <ContextAwareToggle eventKey="5">수정</ContextAwareToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <AccountComponent
                    userInfo={userInfo}
                    handleChange={handleChange}
                  />
                  <Button onClick={handleInsert}>저장</Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </section>
    </main>
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
