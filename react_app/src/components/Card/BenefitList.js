import axios from "axios";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Col, Container, Row } from "reactstrap";
import DragDrop from "./DragDrop";

function BenefitList(props) {
  const [benefits, setBenefits] = useState([]);
  const [grade, setGrade] = useState([]);

  useEffect(() => {
    const { gradeid } = { gradeid: 30 };
    axios({
      method: "get",
      url: `/grade/getGradeById/${gradeid}`,
    })
      .then((r) => {
        console.log(r.data);
        setGrade(r.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });

    axios({
      method: "get",
      url: "/benefit/getAll",
    })
      .then((res) => {
        console.log(res.data);
        setBenefits(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    console.log(benefits.length);
  }, [benefits]);

  return (
    <>
      <h1>benefit Custom page</h1>
      <h2>혜택 커스텀</h2>
      <h3>{grade.gradeName}</h3>
      <hr />
      <Container fluid>
        <Row>
          <Col>No</Col>
          <Col>카테고리</Col>
          <Col>혜택명</Col>
          <Col>혜택</Col>
          <Col>세부 사항</Col>
        </Row>
        {benefits.map((benefit, index) => (
          <Row key={index}>
            <Col>{index + 1}</Col>
            <Col>{benefit.category}</Col>
            <Col>{benefit.benefitName}</Col>
            <Col>{benefit.discountRate * 100}</Col>
            <Col>{benefit.detail}</Col>
          </Row>
        ))}
      </Container>

      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <DragDrop />
        </div>
      </DndProvider>
    </>
  );
}

export default BenefitList;
