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
function CardList(props) {
  const location = useLocation();
  console.log("location");
  console.log(location);

  const [userCards, setUserCards] = useState([]);
  const [userCard, setUserCard] = useState({});
  const [show, setShow] = useState(false);
  const [registerInput, setRegisterInput] = useState({
    cardNo: "",
    nickName: "",
    isDefault: false,
  });
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
  ];
  if (currentState) {
    delete title[5];
  }

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

  /**
   * 카드 클릭시 행동
   * 1. 등록카드 -> 카드 충전 페이지로 이동
   * 2. 미등록카드 -> 등록 프로세스
   * @param {*} event
   */
  const clickCard = (event) => {
    const selectedUserCard = JSON.parse(
      event.target.parentNode.getAttribute("value")
    );
    console.log("selectedUserCard: ", selectedUserCard);
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

  const onDelete = (e) => {
    e.stopPropagation();

    if (
      window.confirm(
        `${e.target.getAttribute("nick")} 카드를 정말 삭제하시겠습니까?`
      )
    ) {
      console.log("삭제할게요 : ", e.target.getAttribute("value"));
      axios
        .delete(`/user-card/delete/${e.target.getAttribute("value")}`)
        .then((userCards) => {
          setUserCards(cardList(userCards));
        });
    }
  };

  const register = () => {
    if (registerInput.cardNo === "") {
      alert("카드 번호를 입력하세요");
    }
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
        <section className="section section-shaped section-lg">
          <h1>Card List Area</h1>
          {/* 카드슬라이드 이미지 */}
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
          >
            <div>
              <img alt="" src={require("assets/img/card/cardImg1.png")} />
            </div>
            <div>
              <img alt="" src={require("assets/img/card/1.png")} />
            </div>
            <div>
              <img alt="" src={require("assets/img/card/2.png")} />
            </div>
            <div>
              <img alt="" src={require("assets/img/card/3.png")} />
            </div>
          </InfiniteCarousel>
          <Container fluid>
            <Row className="justify-content-center">
              {title.map((item, index) => (
                <Col key={index}>{item}</Col>
              ))}
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
                <Col>{userCard.isDefault ? "Yes" : "No"}</Col>

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
          </Container>
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
                </Row>
                <Row>
                  <Col>별칭</Col>
                  <Col>
                    <Form.Control
                      placeholder="별칭"
                      onChange={getInput}
                      name="nickName"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Check
                      checked={registerInput["isDefault"]}
                      onChange={checkHandler}
                    />
                  </Col>
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
        </section>
      </main>
    </>
  );
}

//카드 삭제, 비활성화 거르기
function cardList(userCards) {
  const card = [];
  for (var i = 0; i < userCards.length; i++) {
    console.log(userCards[i].status);
    if (userCards[i].status) card.push(userCards[i]);
    if (userCards[i].status === null) card.push(userCards[i]);
  }
  return card;
}

export { CardList as default, cardList };
