import { selectUserCardsByUserId } from "js/userCard";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { selectTravelCardsByUserId } from "js/travelCard";
import InfiniteCarousel from "react-leaf-carousel";

var arr = [];

function CardList(props) {
  const location = useLocation();

  const [userCards, setUserCards] = useState([]);
  const [userCard, setUserCard] = useState({});
  const [show, setShow] = useState(false);
  const [registerInput, setRegisterInput] = useState({
    cardNo: "",
    nickName: "",
    isDefault: false,
  });
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  const currentState = location.pathname.split("/")[1] === "travelCard";

  var title = [
    "별칭",
    "카드 번호 ",
    "상품명",
    "구매일시",
    "등급",
    "기본카드",
    "",
    "",
    "",
  ];
  if (currentState) {
    delete title[5];
  }
  const [cardArr, setCardArr] = useState(false);

  useEffect(() => {
    if (arr.length !== 0 && arr.length === userCards.length) {
      setCardArr(true);
    } else {
      setCardArr(false);
    }
  }, [userCards]);

  // 모달 닫는 함수
  const handleClose = () => {
    setShow(false);
    setRegisterInput({ cardNo: "", nickName: "", isDefault: false });
  };
  // 모달 여는 함수
  const showRegisterModal = (selectedUserCard) => {
    setUserCard(selectedUserCard);
    setShow(true);
  };


  //카드 정보 보기
  const showInfo = (event) => {
    const selectedUserCard = JSON.parse(
      event.target.parentNode.getAttribute("value")
    );
    if (selectedUserCard.card) {
      navigate(`/card/info`, {
        state: {userCard : selectedUserCard}
      })
    } else {
      //카드 계좌 없는 경우
      showRegisterModal(selectedUserCard);
    }
  };


  /**
   * 카드 클릭시 행동
   * 1. 등록카드 -> 카드 충전 페이지로 이동
   * 2. 미등록카드 -> 등록 프로세스
   * @param {*} event
   */
  const clickCard = (event) => {
    event.stopPropagation();
    const selectedUserCard = JSON.parse(
      event.target.getAttribute("value")
    );
    if (selectedUserCard.card) {
      //카드 계좌 있는 경우
      if (location.pathname === "/travelCard") {
        navigate(`/travelCard/charge/${selectedUserCard.id}`, {
          state: { userCard: selectedUserCard },
        });
      } else {
        navigate(`/card/charge/${selectedUserCard.id}`, {
          state: { userCard: selectedUserCard },
        });
      }
    } else {
      //카드 계좌 없는 경우
      showRegisterModal(selectedUserCard);
    }
  };
  const userId = window.sessionStorage.getItem("id");
  useEffect(() => {
    //개인카드
    if (location.pathname === "/card") {
      selectUserCardsByUserId(userId)
        .then((userCards) => {
          setUserCards(cardList(userCards));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //여행카드
    else if (location.pathname === "/travelCard") {
      selectTravelCardsByUserId(userId)
        .then((userCards) => {
          setUserCards(cardList(userCards));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const getInput = (event) => {
    setRegisterInput({
      ...registerInput,
      [event.target.name]: event.target.value,
    });
  };

  const checkHandler = () => {
    setRegisterInput({
      ...registerInput,
      isDefault: !registerInput["isDefault"],
    });
  };

  const register = () => {
    if (registerInput.cardNo === "") {
      alert("카드 번호를 입력하세요");
      return;
    }
    // 개인 카드인 경우
    if (!currentState) {
      axios
      .post("/user-card/register", {
        userCard: userCard,
        cardNo: registerInput.cardNo,
        nickName: registerInput.nickName,
        isDefault: registerInput.isDefault,
      })
      .then((response) => {
        if (response.data === "notExist") {
          alert("card number is not valid");
        } else if (response.data === "alreadyRegistered") {
          alert("this card is already registered");
        } else {
          const newUserCard = response.data;
          setUserCards(
            userCards.map((userCard) => {
              if (newUserCard.id === userCard.id) {
                return newUserCard;
              }
              return userCard;
            })
          );
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    } else { // travelWith인 경우
      axios.post("/travel-with/register-card", {
        travelWithId: userCard.travelWithId,
        memberId: userId,
        managerId: userCard.manager,
        cardNo: registerInput.cardNo
      }).then(response => {
        if (response.data === 'NotAllowed') {
          alert("card number is not valid");
        } else if (response.data === 'NotTravelWithCard') {
          alert("this card is not for travel with card");
        } else if (response.data === 'InvalidCardNo') {
          alert("card number is not valid");
        } else if (response.data === 'AlreadyRegistered') {
          alert("this card is already registered");
        } else {
          setRender(render + 1);
          handleClose();
        }
      }).catch(error => console.log(error));
    }
    
  };

  /**
   * 환불 메소드
   * @param {} event
   */
  const refund = (event) => {
    event.stopPropagation();
    const selecteduserCardId = event.target.getAttribute("value");
    axios.put(`/user-card/refund/${selecteduserCardId}`).then((response) => {
      alert("환불 완료, 환불금:", response.data);
    });
  };

  return (
    <>
      <main ref={props.ref}>
        {/* 카드슬라이드 이미지 */}
        {cardArr && (
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
            dots={true}
            showSides={true}
            // 투명도
            sidesOpacity={0.3}
            // 그림 사이즈 (9가제일 작음)
            sideSize={0.9}
            slidesToScroll={1}
            slidesToShow={1}
            scrollOnDevice={true}
            key={render}
          >
            {userCards.map((item, index) => (
              //다음이 원본 : 충전하기로 넘어감
              //카드 정보보기로 바꿔놓음
              // <div key={index} onClick={clickCard} value={JSON.stringify(item)}>
              <div key={index} onClick={showInfo} value={JSON.stringify(item)}>
                <img alt="" src={require("assets/img/card/1.png")} />
                <div>{item.nickName}</div>
                {!currentState && <div>{item.isDefault ? "Yes" : "No"}</div>}
                <div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (location.pathname === "/travelCard") {
                        navigate(`/travelCard/history/${item.id}`, {
                          state: { userCard: item },
                        });
                      } else {
                        navigate(`/card/history/${item.id}`, {
                          state: { userCard: item },
                        });
                      }
                    }}
                  >
                    사용내역
                  </Button>
                </div>
                <div>
                <Button
                    onClick={clickCard} value={JSON.stringify(item)}
                  >
                    충전하기
                  </Button>
                </div>
                <div>
                {currentState && (
                     <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/travelCard/split`, {
                          state: { userCard: item },
                        });
                      }}
                    >
                      멤버 보기
                    </Button>
                 )}
                </div>
                {!currentState && <div>
                  <Button
                    disabled={item.balance === 0 ? "disabled" : ""}
                    value={item.id}
                    onClick={refund}
                  >
                    환불하기
                  </Button>
                </div>}
                
              </div>
            ))}
            {/* <div></div> */}
            {/* <div>
              <img alt="" src={require("assets/img/card/2.png")} />
            </div>
            <div>
              <img alt="" src={require("assets/img/card/3.png")} />
            </div> */}
          </InfiniteCarousel>
        )}

        {/* <Container fluid>
          <Row className="justify-content-center">
            {title.map((item, index) => (
              <Col key={index}>{item}</Col>
            ))}
            {currentState && <Col></Col>}
          </Row>
          {userCards.map((userCard, index) => (
            <Row
              key={index}
              onClick={clickCard}
              value={JSON.stringify(userCard)}
            >
              <Col>{userCard.nickName}</Col>
              <Col>{userCard.card?.cardNo}</Col>
              <Col>{userCard.card?.cardDesign.cardName}</Col>
              <Col>{userCard.createdAt}</Col>
              <Col>{userCard.grade?.gradeName}</Col>
              {!currentState && <Col>{userCard.isDefault ? "Yes" : "No"}</Col>}

              <Col>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (location.pathname === "/travelCard") {
                      navigate(`/travelCard/history/${userCard.id}`, {
                        state: { userCard: userCard },
                      });
                    } else {
                      navigate(`/card/history/${userCard.id}`, {
                        state: { userCard: userCard },
                      });
                    }
                  }}
                >
                  사용내역
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={userCard.isDefault ? "disabled" : ""}
                  value={userCard.id}
                  nick={userCard.nickName}
                  onClick={onDelete}
                >
                  삭제하기
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={userCard.balance === 0 ? "disabled" : ""}
                  value={userCard.id}
                  onClick={refund}
                >
                  환불하기
                </Button>
              </Col>
            </Row>
          ))}
        </Container> */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>카드 등록</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>카드 번호</Col>
                <Col>
                  <Form.Control
                    placeholder="카드 번호"
                    onChange={getInput}
                    name="cardNo"
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="별칭"
                    onChange={getInput}
                    name="nickName"
                  />
                </Col>
              </Row>
              {!currentState && <Row>
                <Col>
                  <Form.Check
                    checked={registerInput["isDefault"]}
                    onChange={checkHandler}
                  />
                </Col>
                <Col>기본카드</Col>
              </Row> }
              
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
      </main>
    </>
  );
}

//카드 삭제, 비활성화 거르기
function cardList(userCards) {
  const card = [];
  arr = [];
  for (var i = 0; i < userCards.length; i++) {
    if (userCards[i].status) card.push(userCards[i]);
    if (userCards[i].status === null) card.push(userCards[i]);
  }
  card.forEach((item) => arr.push(item));
  return card;
}

export { CardList as default, cardList };