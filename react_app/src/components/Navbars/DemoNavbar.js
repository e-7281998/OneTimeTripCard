import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function DemoNavbar(props) {
  const [collapseClasses, setCollapseClasses] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const userId = window.sessionStorage.getItem("id");

  useEffect(() => {
    //let = 변수
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    //const = 상수

    let onExiting = () => {
      this.setState({
        collapseClasses: "collapsing-out",
      });
    };

    let onExited = () => {
      this.setState({
        collapseClasses: "",
      });
    };
  }, []);

  const onClickLogOut = (e) => {
    sessionStorage.clear();
    document.location.href = "/";
  };

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom "
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/navlogo.png")}
                style={{ height: 38 }}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={useEffect.onExiting}
              onExited={useEffect.onExited}
            >
              {/* nav 안에 항목 넣어야지 흰색글씨 스타일 먹음 */}
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">OTT Card</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to="/aboutottc" tag={Link}>
                      about OTT Card
                    </DropdownItem>
                    <DropdownItem to="/aboutbenefit" tag={Link}>
                      카드혜택
                    </DropdownItem>
                    <DropdownItem to="/aboutgrade" tag={Link}>
                      등급제
                    </DropdownItem>
                    <DropdownItem to="/register-page" tag={Link}>
                      카드컬렉션
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavbarBrand href="/card/travelCard">
                  여행 카드 서비스
                </NavbarBrand>
                <NavbarBrand href="/travelCard">여행 카드 서비스</NavbarBrand>

                <NavbarBrand href="/trip">여행 추천 서비스</NavbarBrand>
                <NavbarBrand href="#pablo">배송서비스</NavbarBrand>
                <NavbarBrand href="#pablo">이벤트</NavbarBrand>
                <NavbarBrand href="#pablo">공지사항</NavbarBrand>
              </Nav>

              {/* <Nav className="navbar-nav-hover align-items-lg-center" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <i className="ni ni-ui-04 d-lg-none mr-1" />
                  <span className="nav-link-inner--text">Components</span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-xl">
                  <div className="dropdown-menu-inner">
                    <Media
                      className="d-flex align-items-center"
                      href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                      target="_blank"
                    >
                      <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                        <i className="ni ni-spaceship" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className="heading text-primary mb-md-1">
                          Getting started
                        </h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Learn how to use Argon compiling Scss, change
                          brand colors and more.
                        </p>
                      </Media>
                    </Media>
                    <Media
                      className="d-flex align-items-center"
                      href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                      target="_blank"
                    >
                      <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                        <i className="ni ni-palette" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className="heading text-primary mb-md-1">
                          Foundation
                        </h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Learn more about colors, typography, icons and the
                          grid system we used for Argon.
                        </p>
                      </Media>
                    </Media>
                    <Media
                      className="d-flex align-items-center"
                      href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                      target="_blank"
                    >
                      <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-ui-04" />
                      </div>
                      <Media body className="ml-3">
                        <h5 className="heading text-warning mb-md-1">
                          Components
                        </h5>
                        <p className="description d-none d-md-inline-block mb-0">
                          Browse our 50 beautiful handcrafted components
                          offered in the Free version.
                        </p>
                      </Media>
                    </Media>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <i className="ni ni-collection d-lg-none mr-1" />
                  <span className="nav-link-inner--text">Examples</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/landing-page" tag={Link}>
                    Landing
                  </DropdownItem>
                  <DropdownItem to="/profile-page" tag={Link}>
                    Profile
                  </DropdownItem>
                  <DropdownItem to="/login-page" tag={Link}>
                    Login
                  </DropdownItem>
                  <DropdownItem to="/register-page" tag={Link}>
                    Register
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav> */}
            </UncontrolledCollapse>
            <Link to="/login/sign-up">
              <Button
                hidden={userId}
                color="secondary"
                type="button"
                style={{ margin: 10 }}
              >
                회원가입
              </Button>
            </Link>

            <Link to="/user">
              <Button
                color="secondary"
                type="button"
                hidden={!userId}
                style={{ margin: 10 }}
              >
                <i
                  className="ni ni-circle-08"
                  style={{ marginLeft: -5, marginRight: 5 }}
                ></i>
                My Page
              </Button>
            </Link>

            <Button hidden={!userId} onClick={onClickLogOut}>
              로그아웃
            </Button>

            <Link to="/login">
              <Button hidden={userId} color="secondary" type="button">
                로그인
              </Button>
            </Link>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default DemoNavbar;
