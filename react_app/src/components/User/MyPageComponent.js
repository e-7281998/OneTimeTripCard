import React from "react";
import { Button } from "reactstrap";
//import DemoNavbar from "components/Navbars/DemoNavbar.js";

function MyPageComponent(props) {
  return (
    <div>
      <h1>This is myPage</h1>
      <Button>
        <a href="/user/user-info-update">정보 수정</a>
      </Button>
      <Button>
        <a href="/card/manage-card">카드 관리</a>
      </Button>
      <Button>충전하기</Button>
      <Button>사용내역 조회</Button>
      <Button>혜택 커스텀</Button>
    </div>
  );
}

export default MyPageComponent;
