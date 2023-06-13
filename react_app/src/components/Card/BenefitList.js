import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

function BenefitList(props) {

    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/benefit/getAll'
        }).then((res) => {
            console.log(res.data);
            setBenefits(res.data);
        }).catch(error => { console.log(error); throw new Error(error) });
    }, []);

    useEffect(() => {
        console.log(benefits.length);
    }, [benefits])

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>No</Col>
                    <Col>카테고리</Col>
                    <Col>혜택명</Col>
                    <Col>혜택</Col>
                    <Col>세부 사항</Col>
                </Row>
                {benefits.map((benefit, index) => (
                    <Row>
                        <Col>{index + 1}</Col>
                        <Col>{benefit.category}</Col>
                        <Col>{benefit.benefitName}</Col>
                        <Col>{benefit.discountRate * 100}</Col>
                        <Col>{benefit.detail}</Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
}

export default BenefitList;