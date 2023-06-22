import CardList from "components/Card/CardList";
import CardPurchaseHistory from "components/Card/CardPurchaseHistory";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

function CardManagePage(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Link to="/card/purchase">
        <Button style={{ marginRight: 10, marginLeft: "75%" }}>
          카드 구매
        </Button>
      </Link>
      <Button onClick={handleShow}>카드 구매내역</Button>

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
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <CardList />
        </div>
      </Container>
    </>
  );
}

export default CardManagePage;
