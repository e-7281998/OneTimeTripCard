import CardDefaultInfo from "components/Card/CardDefaultInfo";
import CardHistory from "components/Card/CardHistory";
import React from "react";

function HistoryPage(props) {
    //카드 리스트에서 오면 선택한 카드
    //개인 정보에서 오면 기본 카드
    //서버에 사용 내역 조회 요청하기

    return (
        <div>
            <CardDefaultInfo />
            <CardHistory />
        </div>
    );
}

export default HistoryPage;
