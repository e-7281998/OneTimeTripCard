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

function FindPasswordPage(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
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

  const onClickOK = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();
    console.log("fistName : ", inputFirstName);
    console.log("lastName : ", inputLastName);
    console.log("phone : ", inputPhone);

    axios({
      method: "post",
      url: "/login/find-emailpwd",
      data: {
        firstName: inputFirstName,
        lastName: inputLastName,
        phone: inputPhone,
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
                    <div className="text-center">PW찾기</div>
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
                            placeholder="Email"
                            type="email"
                            value={inputEmail}
                            onChange={handleInputEmail}
                          />
                          <button>인증하기</button>
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

                      <div className="text-center">
                        <Button
                          disabled={
                            inputFirstName.length === 0 ||
                            inputLastName.length === 0 ||
                            inputPhone.length === 0
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

export default FindPasswordPage;
