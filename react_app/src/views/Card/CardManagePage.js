import axios from "axios";
import CardList from "components/Card/CardList";
import CardPurchaseHistory from "components/Card/CardPurchaseHistory";
import TravelCardRegister from "components/Card/TravelCardRegister";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

function CardManagePage(props) {
  const [show, setShow] = useState(false);
  const [travelWithModal, setTravelWithModal] = useState(false);
  const userId = window.sessionStorage.getItem("id");
  const [user, setUser] = useState({});
  const [render, setRender] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const openRegisterTravelWith = () => {
    setTravelWithModal(true);
  };

  const closeTravelWithModal = () => {
    setTravelWithModal(false);
  };

  const registerTravelWith = (userEmails, nickName) => {
    axios
      .post("/travel-with/register", {
        userId: userId,
        nickName: nickName,
        emails: userEmails,
        isDefault: false,
      })
      .then((response) => {
        setTravelWithModal(false);
        setRender(render + 1);
      });
  };

  useEffect(() => {
    axios
      .get(`/user/find/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const currentState = location.pathname.split("/")[1] === "travelCard";

  return (
    <>
      {!currentState && (
        <Link to="/card/purchase">
          <Button color="default" style={{ left: 770 }}>
            카드 구매
          </Button>
        </Link>
      )}
      {currentState && (
        <Button
          color="default"
          onClick={openRegisterTravelWith}
          style={{ marginRight: 10, left: 780 }}
        >
          카드 등록
        </Button>
      )}

      <Button color="primary" onClick={handleShow} style={{ left: 780 }}>
        카드 구매내역
      </Button>

      <Container className="pt-lg-1">
        <div>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>카드 구매 내역</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CardPurchaseHistory />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <CardList key={render} />
          <TravelCardRegister
            open={travelWithModal}
            close={closeTravelWithModal}
            userEmail={user.email}
            register={registerTravelWith}
          />
        </div>
      </Container>
    </>
  );
}

export default CardManagePage;
