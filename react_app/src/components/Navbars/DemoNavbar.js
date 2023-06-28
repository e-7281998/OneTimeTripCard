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

  const onClickCardManage = (e) => {
    e.preventDefault();

    if (userId == null) {
      document.location.href = "/login";
    } else document.location.href = "/card";
  };

  const onClicktransfer = (e) => {
    e.preventDefault();

    if (userId == null) {
      document.location.href = "/login";
    } else document.location.href = "/card/transfer";
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
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">카드관리</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={onClickCardManage}>
                      My Card List
                    </DropdownItem>
                    <DropdownItem onClick={onClicktransfer}>
                      카드 잔액 이동
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavbarBrand href="/card/travelCard">
                  여행 카드 서비스
                </NavbarBrand>
                {/* <NavbarBrand href="/travelCard">여행 카드 서비스</NavbarBrand> */}

                <NavbarBrand href="/trip">여행 추천 서비스</NavbarBrand>

                <NavbarBrand href="#pablo">이벤트</NavbarBrand>
                {/* <NavbarBrand href="#pablo">공지사항</NavbarBrand> */}
              </Nav>
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

            <Link to="/user/user-info-update">
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
