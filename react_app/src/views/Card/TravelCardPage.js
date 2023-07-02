import SimpleFooter from "components/Footers/SimpleFooter";
import React from "react";
import { Button, Card, Col, Container, Row } from "reactstrap";

function TravelCardPage(props) {
  const onClickStart = (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("id");

    if (userId == null) {
      document.location.href = "/login";
    } else document.location.href = "/travelCard";
  };
  return (
    <>
      <main className="profile-page" ref={props.main}>
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/brand/person2.png")}
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0"></div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading"></span>
                        <span className="description"></span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Start a travel card service with your friends!
                  </div>

                  <Button className="mr-4" color="info" onClick={onClickStart}>

                    Start Travelcard Service
                  </Button>
                </div>

                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        Manage your money by creating meeting cards with
                        friends, colleagues, and family who are traveling. Start
                        the automatic currency exchange and convenient money
                        sharing service right now.
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default TravelCardPage;
