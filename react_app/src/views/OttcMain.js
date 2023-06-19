import React from "react";

import InfiniteCarousel from "react-leaf-carousel";
// reactstrap components
import { Container, Row } from "reactstrap";

// core components
//import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import CustomControls from "./IndexSections/CustomControls.js";
import Menus from "./IndexSections/Menus.js";
import Navbars from "./IndexSections/Navbars.js";
import Tabs from "./IndexSections/Tabs.js";
import Progress from "./IndexSections/Progress.js";
import Pagination from "./IndexSections/Pagination.js";
import Pills from "./IndexSections/Pills.js";
import Labels from "./IndexSections/Labels.js";
import Alerts from "./IndexSections/Alerts.js";
import Typography from "./IndexSections/Typography.js";
import Modals from "./IndexSections/Modals.js";
import Datepicker from "./IndexSections/Datepicker.js";
import TooltipPopover from "./IndexSections/TooltipPopover.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

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
    <div>
      <>
        {/* <DemoNavbar /> */}
        <main ref={props.ref}>
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
          <section className="section">
            <Container>
              <CustomControls />
              <Menus />
            </Container>
          </section>
          <Navbars />
          <section className="section section-components">
            <Container>
              <Tabs />
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <Progress />
                <Pagination />
              </Row>
              <Row className="row-grid justify-content-between">
                <Pills />
                <Labels />
              </Row>
              <Alerts />
              <Typography />
              <Modals />
              <Datepicker />
              <TooltipPopover />
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    </div>
  );
}

export default OttcMain;
