import React, { useState } from "react";

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
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function SignUpPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputcurrency, setInputCurrency] = useState("");

  //이메일 중복체크
  //   const [onCheckEmail, setIsCheckEmail] = useState(false);

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
  const handleInputCurrency = (e) => {
    setInputCurrency(e.target.value);
    console.log(e.target.value);
  };

  const onClickSignUp = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();
    console.log("email : ", inputEmail);
    console.log("password : ", inputPassword);
    console.log("password comfirm : ", inputPasswordConfirm);
    console.log("fistName : ", inputFirstName);
    console.log("lastName : ", inputLastName);
    console.log("phone : ", inputPhone);
    console.log("currency : ", inputcurrency);

    axios({
      method: "post",
      url: "/login/sign-up",
      data: {
        email: inputEmail,
        password: inputPassword,
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone,
        preferredCurrency: inputcurrency,
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
      <DemoNavbar />
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
                        <InputGroup className="input-group-alternative mb-3">
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
                          <button>중복확인</button>
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
                            placeholder="Password 확인"
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
                              <i className="ni ni-email-83" />
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
                              <i className="ni ni-email-83" />
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
                              <i className="ni ni-email-83" />
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
                      {/* 선호통화 임시 input */}
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="선호통화 임시 input"
                            type="text"
                            value={inputcurrency}
                            onChange={handleInputCurrency}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <UncontrolledDropdown>
                          <DropdownToggle caret id="navbarDropdownMenuLink2">
                            <img
                              alt="..."
                              src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/US.png"
                            ></img>
                            선호통화
                          </DropdownToggle>

                          <DropdownMenu aria-labelledby="navbarDropdownMenuLink2">
                            <li>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/DE.png"
                                ></img>
                                Deutsch
                              </DropdownItem>
                            </li>

                            <li>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/GB.png"
                                ></img>
                                English(UK)
                              </DropdownItem>
                            </li>

                            <li>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src="https://demos.creative-tim.com/argon-dashboard-pro-bs4/assets/img/icons/flags/FR.png"
                                ></img>
                                FranÃ§ais
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </FormGroup>

                      <div className="text-center">
                        <Button
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
