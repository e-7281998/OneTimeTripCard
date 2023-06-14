import CardList from 'components/Card/CardList';
import CardPurchaseHistory from 'components/Card/CardPurchaseHistory';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';

function CardManagePage(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <span>카드 관리</span><Button><a href='/card/purchase'>카드 구매</a></Button><Button onClick={handleShow}>카드 구매 내역</Button>
            <hr></hr>
            <Modal show={show} onHide={handleClose} size='lg'>
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
    );
}

export default CardManagePage;