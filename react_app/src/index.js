/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import UserHome from "routes/UserHome";
import CardHome from "routes/CardHome";
import TripHome from "routes/TripHome";
import DemoNavbar from "components/Navbars/DemoNavbar";
import LoginHome from "routes/LoginHome";
import { Container, Row, Col } from "reactstrap";
import OttcMain from "views/OttcMain";
import TravelHome from "routes/TravelHome";
import AboutOttc from "views/others/AboutOttc";
import AboutBenefit from "views/others/AboutBenefit";
import AboutGrade from "views/others/AboutGrade";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <DemoNavbar />
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <Routes>
                <Route path="/*" element={<OttcMain />} />
                <Route path="/login/*" element={<LoginHome />} />
                <Route path="/user/*" element={<UserHome />} />
                <Route path="/card/*" element={<CardHome />} />
                <Route path="/travelCard/*" element={<TravelHome />} />
                <Route path="/trip/*" element={<TripHome />} />
                <Route path="/aboutottc" element={<AboutOttc />} />
                <Route path="/aboutbenefit" element={<AboutBenefit />} />
                <Route path="/aboutgrade" element={<AboutGrade />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </section>
    </BrowserRouter>
  </>
);
