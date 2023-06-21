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
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import axios from "axios";

function FindEmailPage(props) {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const [userEmail, setUserEmail] = useState([]);

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

  const onClickOK = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();
    console.log("fistName : ", inputFirstName);
    console.log("lastName : ", inputLastName);
    console.log("phone : ", inputPhone);

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
        console.log("data", res.data);
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
                  <CardHeader className="bg-white pb-5">
                    <div className="text-center">로고넣기</div>

                    <Col style={{ display: "flex" }}>
                      <div style={{ margin: "auto" }} className="text-center">
                        <a href="find-email">Find ID</a>
                      </div>
                      <div style={{ margin: "auto" }} href="/find-password">
                        <a href="find-password">Find Password</a>
                      </div>
                    </Col>
                  </CardHeader>

                  {/* 여기서부터 회색 칸 안쪽 */}
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

                      <div>
                        회원 email :
                        {userEmail.map((item, index) => (
                          <div key={index}> {item} </div>
                        ))}
                      </div>
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
