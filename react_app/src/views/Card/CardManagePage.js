import CardList from 'components/Card/CardList';
import React from 'react';
import { Button } from 'reactstrap';

function CardManagePage(props) {
    return (
        <div>
            <span>카드 관리</span><Button><a href='/card/purchase'>카드 구매</a></Button><Button>카드 구매 내역</Button>
            <hr></hr>

            <CardList />
        </div>
    );
}

export default CardManagePage;