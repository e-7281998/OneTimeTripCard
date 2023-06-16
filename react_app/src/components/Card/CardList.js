import { selectUserCardsByUserId } from 'js/userCard';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
function CardList(props) {
    const [userCards, setUserCards] = useState([]);
    const [userCard, setUserCard] = useState({});
    const [show, setShow] = useState(false);
    const [registerInput, setRegisterInput] = useState({ cardNo: '', nickName: '', isDefault: false });

    // 모달 닫는 함수
    const handleClose = () => {
        setShow(false);
        setRegisterInput({ cardNo: '', nickName: '', isDefault: false });
    }
    // 모달 여는 함수
    const showRegisterModal = async (event) => {
        setUserCard(() => {
            const newUserCard = JSON.parse(event.target.parentNode.getAttribute('value'));
            if (newUserCard.card === null) {
                setShow(true);
            }
            return newUserCard;
        });
    }

    const userId = 1;
    useEffect(() => {
        selectUserCardsByUserId(userId)
            .then(userCards => {
                setUserCards(userCards);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const getInput = (event) => {
        setRegisterInput({ ...registerInput, [event.target.name]: event.target.value });
    }

    const checkHandler = () => {
        setRegisterInput({ ...registerInput, isDefault: !registerInput['isDefault'] });
    }

    /**
     * 
     */
    const register = () => {
        if (registerInput.cardNo === '') {
            alert('카드 번호를 입력하세요');
        }
        axios.post('/user-card/register', {
            userCard: userCard,
            cardNo: registerInput.cardNo,
            nickName: registerInput.nickName,
            isDefault: registerInput.isDefault
        }).then((response) => {
            if (response.data === 'notExist') {
                alert('card number is not valid');
            } else if (response.data === 'alreadyRegistered') {
                alert('this card is already registered');
            } else {
                const newUserCard = response.data;
                setUserCards(userCards.map(userCard => {
                    if (newUserCard.id === userCard.id) {
                        return newUserCard;
                    }
                    return userCard;
                }));

                handleClose();
            }

        }).catch(error => { console.log(error); throw new Error(error) });
    }

    return (
        <div>
            <h1>Card List Area</h1>
            <Container fluid>
                <Row>
                    <Col>별칭</Col>
                    <Col>카드 번호</Col>
                    <Col>상품명</Col>
                    <Col>구매일시</Col>
                    <Col>등급</Col>
                    <Col>그룹카드</Col>
                    <Col>기본카드</Col>
                </Row>
                {userCards.map((userCard, index) => (
                    <Row key={index} onClick={showRegisterModal} value={JSON.stringify(userCard)}>
                        <Col>{userCard.nickName}</Col>
                        <Col>{userCard.card?.cardNo}</Col>
                        <Col>{userCard.card?.cardName}</Col>
                        <Col>{userCard.createdAt}</Col>
                        <Col>{userCard.grade?.gradeName}</Col>
                        <Col>{userCard.isGroup ? 'Yes' : 'No'}</Col>
                        <Col>{userCard.isDefault ? 'Yes' : 'No'}</Col>
                    </Row>
                ))}
            </Container>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>카드 등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>카드 번호</Col>
                            <Col><Form.Control placeholder='카드 번호' onChange={getInput} name='cardNo' /></Col>
                        </Row>
                        <Row>
                            <Col>별칭</Col>
                            <Col><Form.Control placeholder='별칭' onChange={getInput} name='nickName' /></Col>
                        </Row>
                        <Row>
                            <Col><Form.Check checked={registerInput['isDefault']} onChange={checkHandler} /></Col>
                            <Col>기본카드</Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={register}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default CardList;