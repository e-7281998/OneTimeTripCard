import React from 'react';
import { Button } from 'reactstrap';

function MyPageComponent(props) {
    return (
        <div>
            <h1>This is myPage</h1>
            <Button>정보 수정</Button>
            <Button><a href='/user/manage-card'>카드 관리</a></Button>
            <Button>충전하기</Button>
            <Button>사용내역 조회</Button>
            <Button>혜택 커스텀</Button>
        </div>
    );
}

export default MyPageComponent;