import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? "pink" : "lavender" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function InfoUpdateComponent() {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I am the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I am another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default InfoUpdateComponent;

// !!!!!!지우지 마세요 절대
// import axios from "axios";
// import React, { useEffect } from "react";
// import { Accordion, Button, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// function InfoUpdateComponent(props) {
//   useEffect(() => {
//     axios({
//       url: "/user/userInfoUpdate",
//       method: "get",
//     })
//       .then((r) => {
//         console.log(r.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   return (
//     <>
//       <div className="accordion" id="accordionExample">
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#collapseOne"
//               aria-expanded="true"
//               aria-controls="collapseOne"
//             >
//               Accordion Item #1
//             </button>
//           </h2>
//           <div
//             id="collapseOne"
//             className="accordion-collapse collapse show"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               <strong>This is the first item's accordion body.</strong> It is
//               shown by default, until the collapse plugin adds the appropriate
//               classNamees that we use to style each element. These classNamees
//               control the overall appearance, as well as the showing and hiding
//               via CSS transitions. You can modify any of this with custom CSS or
//               overriding our default variables. It's also worth noting that just
//               about any HTML can go within the <code>.accordion-body</code>,
//               though the transition does limit overflow.
//             </div>
//           </div>
//         </div>
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#collapseTwo"
//               aria-expanded="false"
//               aria-controls="collapseTwo"
//             >
//               Accordion Item #2
//             </button>
//           </h2>
//           <div
//             id="collapseTwo"
//             className="accordion-collapse collapse"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               <strong>This is the second item's accordion body.</strong> It is
//               hidden by default, until the collapse plugin adds the appropriate
//               classNamees that we use to style each element. These classNamees
//               control the overall appearance, as well as the showing and hiding
//               via CSS transitions. You can modify any of this with custom CSS or
//               overriding our default variables. It's also worth noting that just
//               about any HTML can go within the <code>.accordion-body</code>,
//               though the transition does limit overflow.
//             </div>
//           </div>
//         </div>
//         <div className="accordion-item">
//           <h2 className="accordion-header">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#collapseThree"
//               aria-expanded="false"
//               aria-controls="collapseThree"
//             >
//               Accordion Item #3
//             </button>
//           </h2>
//           <div
//             id="collapseThree"
//             className="accordion-collapse collapse"
//             data-bs-parent="#accordionExample"
//           >
//             <div className="accordion-body">
//               <strong>This is the third item's accordion body.</strong> It is
//               hidden by default, until the collapse plugin adds the appropriate
//               classNamees that we use to style each element. These classNamees
//               control the overall appearance, as well as the showing and hiding
//               via CSS transitions. You can modify any of this with custom CSS or
//               overriding our default variables. It's also worth noting that just
//               about any HTML can go within the <code>.accordion-body</code>,
//               though the transition does limit overflow.
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Accordion>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>Accordion Item #1</Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="1">
//           <Accordion.Header>Accordion Item #2</Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" src="holder.js/100px180" />
//         <Card.Body>
//           <Card.Title>Card Title</Card.Title>
//           <Card.Text>
//             Some quick example text to build on the card title and make up the
//             bulk of the card's content.
//           </Card.Text>
//           <Button variant="primary">Go somewhere</Button>
//         </Card.Body>
//       </Card> */}
//     </>
//   );
// }

// export default InfoUpdateComponent;
