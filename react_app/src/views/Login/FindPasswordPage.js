import React, { useState } from "react";

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
} from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function FindPasswordPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
    console.log(e.target.value);
  };
  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
    console.log(e.target.value);
  };

  const onClickOK = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();
    console.log("phone : ", inputPhone);

    axios({
      method: "post",
      url: "/login/find-password",
      data: {
        email: inputEmail,
        phone: inputPhone,
      },
    })
      .then((res) => {
        console.log("data", res.data);

        var email = res.data.email;

        //이메일이 없을경우
        if (email === 0) {
          console.log(
            "======================",
            "가입되어있지 않은 email 입니다."
          );
          alert("가입되어있지 않은 email 입니다.");
          return;
        } else if (email === 1) {
          console.log(
            "======================",
            "전화번호가 일치하지 않습니다."
          );
          alert("전화번호가 일치하지 않습니다.");
          return;
        } else {
          console.log(
            "======================",
            "임시비밀번호를 전송하였습니다."
          );
          alert("임시 비밀번호를 전송하였습니다.");
        }
      })
      .catch();

    //document.location.href = "/";
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
                  {/* 여기서부터 회색 칸 안쪽 */}
                  <CardBody className="px-lg-5 py-lg-5">
                    <div style={{ textAlign: "center" }}>
                      <img
                        alt="..."
                        className=""
                        src={require("assets/img/brand/logo2.png")}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <Col style={{ display: "flex", margin: 10 }}>
                      <div style={{ margin: "auto" }} className="text-center">
                        <a href="find-email">Find ID</a>
                      </div>
                      <div style={{ margin: "auto" }} href="/find-password">
                        <a href="find-password">Find Password</a>
                      </div>
                    </Col>
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

                      <div className="text-center">
                        <Button
                          disabled={inputPhone.length === 0}
                          className="mt-4"
                          color="primary"
                          type="submit"
                          onClick={onClickOK}
                        >
                          인증번호 발송
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

export default FindPasswordPage;
