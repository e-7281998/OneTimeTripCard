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
    const benefits = [
        { id: 1, category: '대형마트', benefitName: '이마트', discountRate: 0.05, detail: '(주말-온라인 결제 제외)건당 3만원-10만원 결제 시, 5% 할인(최대 5천원 할인) ' },
        { id: 5, category: '관광지', benefitName: '롯데월드', discountRate: 0.3, detail: '(온라인 결제 제외)건당 3만원-5만원 결제 시, 30% 입장료 할인(최대 5천원 할인)' },
        { id: 7, category: '뷰티', benefitName: '올리브영', discountRate: 0.1, detail: '(온라인 결제 제외)건당 3만원-5만원 결제 시, 10% 할인(최대 5천원 할인)' },
        { id: 9, category: '약국', benefitName: '약국', discountRate: 0.05, detail: '건당 3만원-5만원 결제 시, 5% 할인(최대 2.5천원 할인)' },
        { id: 11, category: '편의점', benefitName: 'cu', discountRate: 0.05, detail: '건당 1만원-2만원 결제 시, 5% 할인(최대 1천원 할인)' }
    ];
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

    function purchase() {
        let myBenefits = []
        for (let i = 0; i < grade.benefitCount; ++i) {
            myBenefits.push(benefits[i]);
        }
        axios({
            method: "post",
            url: "/user-card/purchase",
            data: {
                user: { id: 1 },
                grade: grade,
                nickName: 'testCard',
                benefits: myBenefits
            }
        }).then(res => {
            // 성공 후 결제 완료 창으로 이동
            navigate('/card/complete-purchase', {
                state: {
                    userCard: res.data
                }
            })
            console.log(res.data);
        }).catch(error => { console.log(error); throw new Error(error); });
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
            <Button onClick={purchase}>구입하기</Button>
        </div>
    );
}

export default GradeSelect;