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
} from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function FindEmailPage(props) {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const [userEmail, setUserEmail] = useState([]);

  const handleInputFirstName = (e) => {
    setInputFirstName(e.target.value);
  };
  const handleInputLastName = (e) => {
    setInputLastName(e.target.value);
  };
  const handleInputPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const onClickOK = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();

    axios({
      method: "post",
      url: "/login/find-email",
      data: {
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone,
      },
    })
      .then((res) => {
        //가지고온 데이터를 변수(setUserEmail)에다가 넣음
        setUserEmail(res.data);
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

                      <small className="text-muted">
                        Member email :
                        {userEmail.map((item, index) => (
                          <div key={index}> {item} </div>
                        ))}
                      </small>
                      <div className="text-center">
                        <Button
                          disabled={
                            inputFirstName.length === 0 ||
                            inputLastName === 0 ||
                            inputPhone === 0
                          }
                          className="mt-4"
                          color="primary"
                          type="submit"
                          onClick={onClickOK}
                        >
                          OK
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

export default FindEmailPage;
