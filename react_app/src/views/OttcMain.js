import React from "react";

import SimpleFooter from "components/Footers/SimpleFooter.js";
import CardSlide from "./Card/CardSlide.js";
import Event from "./others/Event.js";
import { Col, Row } from "reactstrap";

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
        <Event />
        <section>
          <article className="">
            <CardSlide />
          </article>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default OttcMain;
