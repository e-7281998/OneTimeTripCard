/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

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
import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  //input 입력할때마다 이벤트 발생하여 값 받음
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
    console.log(e.target.value);
  };
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const onClickLogin = (e) => {
    //기본기능을 수행하지 않음.
    e.preventDefault();
    console.log("click login");
    console.log("email : ", inputEmail);
    console.log("password : ", inputPassword);

    axios({
      method: "post",
      url: "/login",
      data: { email: inputEmail, password: inputPassword },
    })
      .then((res) => {
        console.log("data", res.data);
        console.log("res.data.ID :: ", res.data.id);
        console.log("res.data.msg :: ", res.data.msg);

        //로그인 경우를 3가지 case로 나눔
        var email = res.data.email;

        if (email === "0") {
          // 일치하는 email 없을 경우
          console.log("======================", "email을 확인해주세요.");
          alert("email을 확인해주세요");
        } else if (email === "1") {
          // password가 틀린 경우
          alert("비밀번호를 확인해주세요");
          console.log("======================", "비밀번호를 확인해주세요");
        } else {
          alert("로그인 성공");
          console.log("======================", "로그인 성공");
          // sessionStorage에 id를 email이라는 key 값으로 저장
          sessionStorage.setItem("id", res.data.id);
          //sessionStorage.setItem("id", inputEmail);

          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/";
        }
      })
      .catch();
  };

  return (
    <>
      {/* <DemoNavbar /> */}
      <main ref={props.ref}>
        {/* 스크롤 내려가게하는거임 */}
        <section className="section section-shaped section-lg">
          {/* 파랑색 배경 */}
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
            {/* 안에 로그인 흰 창 위치 */}
            <Row className="justify-content-center">
              <Col lg="5">
                <Card>
                  <CardHeader className="bg-white pb-5">
                    <div className="btn-wrapper text-center">
                      <p>로고삽입</p>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="input_email"
                            value={inputEmail}
                            onChange={handleInputEmail}
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
                            placeholder="Password"
                            type="password"
                            name="input_password"
                            autoComplete="off"
                            value={inputPassword}
                            onChange={handleInputPassword}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        {/* 아이디 또는 비밀번호 입력안하면 버튼 비활성화 */}
                        <Button
                          disabled={
                            inputEmail.length === 0 ||
                            inputPassword.length === 0
                          }
                          className="my-4"
                          color="primary"
                          onClick={onClickLogin}
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a href="login/find-email" className="text-light">
                      <small>Forgot email / password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a href="/login/sign-up" className="text-light">
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Login;

// class Login extends React.Component {

//   componentDidMount() {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//     this.refs.main.scrollTop = 0;
//   }
//   render() {
//     return (
//       <>
//         <DemoNavbar />
//         <main ref="main">
//           <section className="section section-shaped section-lg">
//             <div className="shape shape-style-1 bg-gradient-default">
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//             </div>
//             <Container className="pt-lg-7">
//               <Row className="justify-content-center">
//                 <Col lg="5">
//                   <Card className="bg-secondary shadow border-0">
//                     <CardHeader className="bg-white pb-5">
//                       <div className="btn-wrapper text-center">
//                         <p>로고삽입</p>
//                       </div>
//                     </CardHeader>
//                     <CardBody className="px-lg-5 py-lg-5">
//                       <Form role="form">
//                         <FormGroup className="mb-3">
//                           <InputGroup className="input-group-alternative">
//                             <InputGroupAddon addonType="prepend">
//                               <InputGroupText>
//                                 <i className="ni ni-email-83" />
//                               </InputGroupText>
//                             </InputGroupAddon>
//                             <Input placeholder="Email" type="email" />
//                           </InputGroup>
//                         </FormGroup>
//                         <FormGroup>
//                           <InputGroup className="input-group-alternative">
//                             <InputGroupAddon addonType="prepend">
//                               <InputGroupText>
//                                 <i className="ni ni-lock-circle-open" />
//                               </InputGroupText>
//                             </InputGroupAddon>
//                             <Input
//                               placeholder="Password"
//                               type="password"
//                               autoComplete="off"
//                             />
//                           </InputGroup>
//                         </FormGroup>
//                         <div className="custom-control custom-control-alternative custom-checkbox">
//                           <input
//                             className="custom-control-input"
//                             id=" customCheckLogin"
//                             type="checkbox"
//                           />
//                           <label
//                             className="custom-control-label"
//                             htmlFor=" customCheckLogin"
//                           >
//                             <span>Remember me</span>
//                           </label>
//                         </div>
//                         <div className="text-center">
//                           <Button
//                             className="my-4"
//                             color="primary"
//                             type="submit"
//                           >
//                             Sign in
//                           </Button>
//                         </div>
//                       </Form>
//                     </CardBody>
//                   </Card>
//                   <Row className="mt-3">
//                     <Col xs="6">
//                       <a
//                         className="text-light"
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <small>Forgot password?</small>
//                       </a>
//                     </Col>
//                     <Col className="text-right" xs="6">
//                       <a
//                         className="text-light"
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <small>Create new account</small>
//                       </a>
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>
//             </Container>
//           </section>
//         </main>
//         <SimpleFooter />
//       </>
//     );
//   }
// }

// export default Login;
