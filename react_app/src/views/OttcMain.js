import React from "react";
import "assets/css/main.css";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import CardSlide from "./Card/CardSlide.js";
import Event from "./others/Event.js";
import { Badge } from "reactstrap";

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
        <div id="body" className="frame" style={{ display: "flex", textAlign: "center", height: "auto" }}>

          <div className="welcome"><h2>Welcome to</h2> <h1> <b>O</b>ne <b>T</b>ime <b>T</b>rip <b>C</b>ard</h1></div>

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
        <Badge id="bdgstyle"
          className="secondary badgetype"
          pill
          style={{
            left: 50,
            top: 455,
          }}
        >
          Event
        </Badge>
        <div className="frame">
          <Event />
        </div>

        <section>

          <Badge id="bdgstyle"
            className="secondary badgetype"
            pill
            style={{
              top: 860,
              left: 50,
            }}
          >
            Card design
          </Badge>
          <article className="frame">
            <div >
              <CardSlide />
            </div>
          </article>
          <Badge id="bdgstyle"
            className="secondary badgetype"
            pill
            style={{
              top: 1080,
              left: 50,
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
            <Badge id="bdgstyle"
              className="secondary badgetype"
              pill
              style={{
                top: 1080,
                left: 750,
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
