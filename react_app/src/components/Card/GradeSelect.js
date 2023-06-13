import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

/**
 * 작성자 : 손준범
 * 
 * 카드 구매 시 Grade 목록을 출력하는 메서드
 * 페이지 초기 데이터에 기본 등급이 있으며, axios를 통해 Grade List를 서버에서 가져와 gradeList 초기화
 * DropDown 목록에서 grade 선택 시, grade와 연결된 데이터 렌더링
 * 
 * @param {*} props 
 * @returns 
 */
function GradeSelect(props) {
    const basicGrade = {
        id: 27, gradeName: '일반', price: 0, period: 0, refundRate: 0,
        benefitCount: 0, imgSrc: "null", maxRechargeCount: 0, deliveryCount: 0
    }
    const [gradeList, setGradeList] = useState([basicGrade]);
    const [grade, setGrade] = useState(basicGrade);
    const [gradeNames, setGradeNames] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: "get",
            url: '/grade/getAll'
        }).then((res) => {
            setGradeList(res.data);
        }).catch(error => { console.log(error); throw new Error(error); });
    }, []);

    useEffect(() => {
        setGrade(gradeList[0]);
        setGradeNames(gradeList.map(grade => grade.gradeName));
    }, [gradeList]);

    function selectGrade(event) {
        gradeList.forEach(g => {
            if (g.gradeName === event.target.innerHTML) {
                setGrade(g);
            }
        })
    }

    /**
     * 혜택 선택 페이지로 이동
     */
    const goToSelectBenefits = () => {
        navigate('/card/benefit-custom', {
            state: {
                grade: grade
            }
        });
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>등급</Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {grade.gradeName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {gradeNames.map(gradeName => <Dropdown.Item key={gradeName} onClick={selectGrade}>{gradeName}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col>금액</Col>
                    <Col>{grade.price}</Col>
                </Row>
                <Row>
                    <Col>기간</Col>
                    <Col>{grade.period}</Col>
                </Row>
                <Row>
                    <Col>혜택 수</Col>
                    <Col>{grade.benefitCount}</Col>
                </Row>
                <Row>
                    <Col>즉시 환급률</Col>
                    <Col>{grade.refundRate * 100}%</Col>
                </Row>
                <Row>
                    <Col>혜택 커스텀</Col>
                    <Col><Button onClick={goToSelectBenefits}>커스텀 하기</Button></Col>
                </Row>
                <Row>
                    <Col>재 충전 동일 혜택 수</Col>
                    <Col>{grade.maxRechargeCount}</Col>
                </Row>
            </Container>
            <Button>구입하기</Button>
        </div>
    );
}

export default GradeSelect;