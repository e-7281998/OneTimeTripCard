import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
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

//alert components
import Swal from "sweetalert2";
function SignUpPage(props) {
  //회원가입
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  //유효성 상태 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);

  //유효성 상태 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordChkMessage, setPasswordChkMessage] = useState("");

  //선호통화 목록
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState();
  const [currnecyName, setCurrencyName] = useState([]);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
    //이메일 정규식 , 비밀번호 정규식
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (inputEmail.match(emailRegEx) === null) {
      //형식에 맞지 않을 경우 아래 콘솔 출력
      setEmailMessage("Example@gmail.com");
      setIsEmail(false);
      setIsEmailCheck(false);
    } else {
      // 맞을 경우 출력
      setEmailMessage("Correct");
      setIsEmail(true);
      setIsEmailCheck(false);
    }
  };
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);

    //영문 숫자 조합 8-15자리
    const passwordRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;

    if (e.target.value.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 콘솔 출력
      setPasswordMessage("Please enter 8 to 15 digits of English+number.");
      setIsPassword(false);
      return;
    } else {
      // 맞을 경우 출력
      setPasswordMessage("Comfirm");
      setIsPassword(true);
    }
  };

  const handleInputPasswordConfirm = (e) => {
    setInputPasswordConfirm(e.target.value);

    if (inputPassword === e.target.value) {
      setPasswordChkMessage("Confirm");
      setIsPasswordConfirm(true);
    } else {
      setPasswordChkMessage("Please check your password again.");
      setIsPasswordConfirm(false);
    }
  };
  const handleInputFirstName = (e) => {
    setInputFirstName(e.target.value);
  };
  const handleInputLastName = (e) => {
    setInputLastName(e.target.value);
  };
  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  //email 중복체크
  const onClickEmailCheck = (e) => {
    e.preventDefault();

    axios({
      method: "get",
      url: "/login/sign-up",
      // get요청으로 할때는 param으로 써야됨
      params: { email: inputEmail },
    })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire({
            title: "Error!",
            text: "This email is already in use.",
            icon: "error",
            confirmButtonText: "OK",
          });
          setIsEmailCheck(false);
        } else {
          Swal.fire({
            title: "Success!",
            text: "This email is usable.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setIsEmailCheck(true);
        }
      })
      .catch();
  };

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

  //회원가입
  const onClickSignUp = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();

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
      .then((res) => {})
      .catch();

    Swal.fire({
      title: "Success!",
      text: "You have successfully registered as a member Please login.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        document.location.href = "/";
      }
    });
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
                  {/* <CardHeader className="px-lg-5 py-lg-5"/> */}
                  <CardBody className="px-lg-5 py-lg-5">
                    <div style={{ textAlign: "center" }}>
                      <img
                        alt="..."
                        className=""
                        src={require("assets/img/brand/logo2.png")}
                        style={{ width: "250px" }}
                      />
                    </div>

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
                              disabled={inputEmail.length === 0}
                              color="primary"
                              type="button"
                              onClick={onClickEmailCheck}
                              style={{
                                fontSize: 5,
                                margin: 10,
                                padding: 5,
                              }}
                            >
                              Check
                            </Button>
                          </div>
                        </InputGroup>
                        <small
                          className="text-muted"
                          style={{ marginBottom: -5 }}
                        >
                          {emailMessage}
                        </small>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            value={inputPassword}
                            onChange={handleInputPassword}
                            autoComplete="off"
                          />
                        </InputGroup>
                        <small className="text-muted">{passwordMessage}</small>
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
                        <small className="text-muted">
                          {passwordChkMessage}
                        </small>
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
                            inputPhone.length === 0 ||
                            isPassword === false ||
                            isEmail === false ||
                            isPasswordConfirm === false ||
                            isEmailCheck === false
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
