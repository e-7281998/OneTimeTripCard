import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function SignUpPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState();
  const [currnecyName, setCurrencyName] = useState([]);

  useEffect(() => {
    setCurrency(currencyList[0]);
    setCurrencyName(currencyList.map((currency) => currency.currnecyName));
  }, [currencyList]);

  //선호통화 List로 불러오기
  useEffect(() => {
    axios({
      method: "get",
      url: "/exchange-rate/getAllCurrency",
    })
      .then((res) => {
        console.log(res.data);
        setCurrencyList(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);

  //선호통화
  useEffect(() => {
    setCurrency(currencyList[0]);
    setCurrencyName(currencyList.map((currency) => currency.currnecyName));
  }, [currencyList]);

  //통화선택
  function selectCurrency(e) {
    currencyList.forEach((c) => {
      if (c === e.target.innerHTML) {
        setCurrency(c);
      }
    });
  }

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
    console.log(e.target.value);
  };
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
    console.log(e.target.value);
  };
  const handleInputPasswordConfirm = (e) => {
    setInputPasswordConfirm(e.target.value);
    console.log(e.target.value);
  };
  const handleInputFirstName = (e) => {
    setInputFirstName(e.target.value);
    console.log(e.target.value);
  };
  const handleInputLastName = (e) => {
    setInputLastName(e.target.value);
    console.log(e.target.value);
  };
  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
    console.log(e.target.value);
  };

  //email 중복체크
  const onClickEmailCheck = (e) => {
    e.preventDefault();
    console.log("email : ", inputEmail);

    axios({
      method: "get",
      url: "/login/sign-up",
      // get요청으로 할때는 param으로 써야됨
      params: { email: inputEmail },
    })
      .then((res) => {
        if (res.data === 1) {
          alert("이미 사용중인 이메일 입니다.");
        } else {
          alert("사용가능한 이메일 입니다.");
        }
      })
      .catch();
  };

  //회원가입
  const onClickSignUp = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();

    console.log("email : ", inputEmail);
    console.log("password : ", inputPassword);
    console.log("password comfirm : ", inputPasswordConfirm);
    console.log("fistName : ", inputFirstName);
    console.log("lastName : ", inputLastName);
    console.log("phone : ", inputPhone);
    //console.log(currnecyName);

    if (inputPassword !== inputPasswordConfirm)
      return alert("비밀번호를 다시 확인해주세요.");

    axios({
      method: "post",
      url: "/login/sign-up",
      data: {
        email: inputEmail,
        password: inputPassword,
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone,
        preferredCurrency: currency,
      },
    })
      .then((res) => {
        console.log("data", res.data);
      })
      .catch();

    // document.location.href = "/";
  };

  return (
    <>
      <main ref={props.main}>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-center">로고넣기</div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <FormGroup>
                        <InputGroup
                          className="input-group-alternative mb-3"
                          style={{ backgroundColor: "white" }}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            value={inputEmail}
                            onChange={handleInputEmail}
                          />
                          <div style={{ backgroundColor: "white" }}>
                            <Button
                              color="primary"
                              type="button"
                              onClick={onClickEmailCheck}
                              style={{
                                fontSize: 5,
                                margin: 10,
                                padding: 5,
                              }}
                            >
                              중복확인
                            </Button>
                          </div>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            disabled={onClickEmailCheck.flag === 0}
                            placeholder="Password"
                            type="password"
                            value={inputPassword}
                            onChange={handleInputPassword}
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password Confirm"
                            value={inputPasswordConfirm}
                            onChange={handleInputPasswordConfirm}
                            type="password"
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="FistName"
                            type="text"
                            value={inputFirstName}
                            onChange={handleInputFirstName}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="LastName"
                            type="text"
                            value={inputLastName}
                            onChange={handleInputLastName}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-mobile-button" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone"
                            type="phone"
                            value={inputPhone}
                            onChange={handleInputPhone}
                          />
                        </InputGroup>
                      </FormGroup>

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
                                {/* <img
                                  alt="..."
                                  src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/US.png"
                                ></img> */}
                                {currnecyName}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </FormGroup>

                      <div className="text-center">
                        <Button
                          disabled={
                            inputEmail.length === 0 ||
                            inputPassword.length === 0 ||
                            inputFirstName.length === 0 ||
                            inputLastName.length === 0 ||
                            inputPhone.length === 0
                          }
                          className="mt-4"
                          color="primary"
                          type="submit"
                          onClick={onClickSignUp}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default SignUpPage;
