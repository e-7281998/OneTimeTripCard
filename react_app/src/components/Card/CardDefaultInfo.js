import React from "react";
import Card from 'react-bootstrap/Card';


function CardDefaultInfo(props) {

    return (
        <Card className="mb-3 text-center btn-block" >
            <Card.Body >
                카드 잔액 <span> 22,400 W</span>
            </Card.Body>
            <Card.Img className="m-auto" src={require("assets/img/card/cardImg1.png")} style={{ width: '13rem' }} />
            <Card.Body>
                미국 <span>골드</span>
            </Card.Body>
        </Card>
    );
}


export default CardDefaultInfo;
