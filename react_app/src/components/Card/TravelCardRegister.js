import axios from 'axios';
import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

function TravelCardRegister(props) {
    const userEmail = props.userEmail;
    const [userEmails, setUserEmails] = useState([]);
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const findUserEmail = () => {
        if (userEmail === email) {
            alert("You can't invite yourself");
            return;
        }
        axios.get("/user/find-email",
           {params: {
                email: email
            }}
        ).then(response => {
            if (response.data === '') {
                alert('Please input the valid email');
            } else {
                if (userEmails.includes(response.data)) {
                    alert('You already added this email');
                }
                else {
                    setUserEmails([...userEmails, response.data]);
                }
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const emailInputChange = (event) => {
        setEmail(event.target.value);
    }

    const nickNameChange = (event) => {
        setNickName(event.target.value);
    }

    const closeTravelWithModal = () => {
        setUserEmails([]);
        props.close();
    }

    const deleteEmail = (event) => {
        let tempEmails = [];
        userEmails.forEach((userEmail, index) => {
            if (userEmail !== event.target.value) {
                tempEmails.push(userEmail);
            }
        });
        setUserEmails(tempEmails);
    }

    const registerTravelWith = () => {
        if (userEmails.length === 0) {
            alert('please invite at least one member');
            return;
        }
        if (nickName === '') {
            alert('Please enter nickName of the card');
            return;
        }
        props.register(userEmails, nickName);
    }

    return (
        <div>
            <Modal show={props.open}>
                <Modal.Header>
                    <Modal.Title>Register Travel With Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>nickName</Form.Label>
                        <Form.Control placeholder="nickName" onChange={nickNameChange}/>
                </Form.Group>
                <Form.Group>
                        <Form.Label>Invite Members</Form.Label>
                        <Form.Control placeholder="example@gmail.com" onChange={emailInputChange}/>
                        <Button onClick={findUserEmail}>Invite</Button>
                </Form.Group>
                {userEmails.map((userEmail, index) => (
                    <InputGroup key={index}>
                        <Form.Control
                        value={userEmail}
                        readOnly
                        />
                        <Button value={userEmail} onClick={deleteEmail}>X</Button>
                    </InputGroup>
                ))}
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeTravelWithModal}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={registerTravelWith}>
                    register
                    </Button>
                </Modal.Footer>
            </Modal>
          
          
            
          
        </div>
    );
}

export default TravelCardRegister;