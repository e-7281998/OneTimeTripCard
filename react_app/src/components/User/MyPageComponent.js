import React from "react";
import { Form, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

//import DemoNavbar from "components/Navbars/DemoNavbar.js";

function MyPageComponent(props) {
  const userId = window.sessionStorage.getItem("id");
  const firstName = window.sessionStorage.getItem("firstName");
  const lastName = window.sessionStorage.getItem("lastName");

  return (
    <>
      <main ref={props.ref}>
        <section className="section section-shaped section-lg">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <div>
                <h1> {lastName + " " + firstName}</h1>
                <Col lg="auto">
                  <Link to="/user/user-info-update">
                    <Button
                      color="success"
                      style={{ height: 100, marginRight: 50 }}
                    >
                      정보수정
                    </Button>
                  </Link>
                  <Link to="/card">
                    <Button
                      color="default"
                      style={{ height: 100, marginRight: 50 }}
                    >
                      카드관리
                    </Button>
                  </Link>

                  <Link to="/card/transfer">
                    <Button
                      color="danger"
                      style={{ height: 100, marginRight: 50 }}
                    >
                      카드 잔액이동
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button
                      color="warning"
                      style={{ height: 100, marginRight: 50 }}
                    >
                      충전하기
                    </Button>
                  </Link>

                  <Link to="/card/benefit-custom">
                    <Button
                      color="info"
                      style={{ height: 100, marginRight: 50 }}
                    >
                      사용내역 조회
                    </Button>
                  </Link>

                  <Link to="/card/benefit-custom">
                    <Button color="danger" style={{ height: 100 }}>
                      혜택 커스텀
                    </Button>
                  </Link>
                </Col>
              </div>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export default MyPageComponent;
