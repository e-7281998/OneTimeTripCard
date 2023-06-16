import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
//import DemoNavbar from "components/Navbars/DemoNavbar.js";

function MyPageComponent(props) {
  return (
    <div>
      <h1>This is myPage</h1>
      <Button>
        <Link to="/user/user-info-update">정보 수정</Link>
      </Button>
      <Button>
        <Link to="/card/manage-card">카드 관리</Link>
      </Button>
      <Button>충전하기</Button>
      <Button>사용내역 조회</Button>
      <Button>
        <Link to="/card/benefit-custom">혜택 커스텀</Link>
      </Button>
    </div>
  );
}

export default MyPageComponent;
