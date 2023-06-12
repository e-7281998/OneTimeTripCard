import React from 'react';
import Card from 'react-bootstrap/Card';

function UnRegisteredCard(props) {
    return (
        <Card style={{ width: '18rem' }} bg={'dark'}>
            <Card.Img src={require("assets/img/question-mark.png")} />
            <Card.Body>

            </Card.Body>
        </Card>
    );
}

export default UnRegisteredCard;