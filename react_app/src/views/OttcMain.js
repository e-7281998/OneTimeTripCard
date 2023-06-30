import React from "react";
import "assets/css/main.css";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CardSlide from "./Card/CardSlide.js";
import Event from "./others/Event.js";
import { Badge, Col, Container, Row } from "reactstrap";
import { AbsoluteCenter } from "@chakra-ui/react";

function OttcMain(props) {
  // const listOfData = [
  //   // your data array here
  // ];

  // function CarouselContainer(props) {
  //   // render the carousel structure
  // }

  // function renderCard(index, modIndex, cursor) {
  //   const item = listOfData[modIndex];
  //   // render the item
  // }

  return (
    <>
      <main ref={props.ref}>
        <div className="frame">
          <h1>WellCome OTTC!</h1>
          <div className="satellites"  >

            <img className="satellite" src={require("assets/img/card/homecard.png")}>
            </img>
            <img className="satellite2" src={require("assets/img/card/homecard.png")}>
            </img>
            <img className="satellite3" src={require("assets/img/card/homecard2.png")}>
            </img>
            <img className="satellite4" src={require("assets/img/card/homecard2.png")}>
            </img>
          </div>

        </div>
        <Badge
          className="secondary badgetype"
          pill
          style={{
            fontSize: 20,
            position: "absolute",
            left: 50,
            top: 520,
            border: "3px solid",
          }}
        >
          Event
        </Badge>
        <div className="frame">
          <Event />
        </div>

        <section>

          <Badge
            className="secondary badgetype"
            pill
            style={{
              fontSize: 20,
              position: "absolute",
              top: 925,
              left: 50,
              border: "3px solid",
            }}
          >
            Card design
          </Badge>
          <article className="frame">
            <div >
              <CardSlide />
            </div>
          </article>
          <Badge
            className="secondary badgetype"
            pill
            style={{
              fontSize: 20,
              position: "absolute",
              top: 1150,
              left: 50,
              border: "3px solid",
            }}
          >
            Notice
          </Badge>
          <div className="flex">
            <article className="frame">
              <div className="notice">
                [Notice] Temporary suspension due to system maintenance
              </div>

              <div className="notice">
                [Notice] Information on Changes to Gold Level Membership
                Benefits
              </div>
              <div className="notice">
                [Notice] Information on Changes to Gold Level Membership
                Benefits
              </div>
            </article>
            <Badge
              className="secondary badgetype"
              pill
              style={{
                fontSize: 20,
                position: "absolute",
                top: 1150,
                left: 750,
                border: "3px solid",
              }}
            >
              Customer Support
            </Badge>

            <article className="frame" style={{ width: 270 }}>
              <div className="notice">
                Customer Center <br></br> 1234-5678
              </div>

              <div className="notice">
                Report theft <br></br> 1234-9999
              </div>
              <div className="notice">
                Card application <br></br> 1234-8888
              </div>
            </article>
          </div>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default OttcMain;
