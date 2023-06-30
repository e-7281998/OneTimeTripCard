import React from "react";
import "assets/css/main.css";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CardSlide from "./Card/CardSlide.js";
import Event from "./others/Event.js";
import { Badge, Container, Row } from "reactstrap";

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
        <Badge
          className="secondary badgetype"
          pill
          style={{
            fontSize: 20,
            position: "absolute",
            left: 50,
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
              top: 410,
              left: 50,
              border: "3px solid",
            }}
          >
            Card design
          </Badge>
          <article className="frame">
            <div>
              <CardSlide />
            </div>
          </article>
          <Badge
            className="secondary badgetype"
            pill
            style={{
              fontSize: 20,
              position: "absolute",
              top: 635,
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
                top: 635,
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
