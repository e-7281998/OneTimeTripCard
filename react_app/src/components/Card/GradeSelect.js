import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carousel from "./Carousel";
/**
 * 작성자 : 손준범
 *
 * 카드 구매 시 Grade 목록을 출력하는 메서드
 * 페이지 초기 데이터에 기본 등급이 있으며, axios를 통해 Grade List를 서버에서 가져와 gradeList 초기화
 * DropDown 목록에서 grade 선택 시, grade와 연결된 데이터 렌더링
 *
 * @param {*} props
 * @returns
 */
function GradeSelect(props) {
  const userId = window.sessionStorage.getItem("id");

  const [gradeList, setGradeList] = useState([]);
  const [grade, setGrade] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  //const [myBenefits, setMyBenefits] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/grade/getAll",
    })
      .then((res) => {
        setGradeList(res.data);
      })
      .catch((error) => {
        //console.log(error);
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    let mode = sessionStorage.getItem("mode");

    if (mode === "fromBenefit") {
      setGrade(location.state.grade);

      sessionStorage.setItem("mode", "1");
    } else if (mode === "1") {
      sessionStorage.setItem("mode", "");
    } else {
      location.state = null;
      setGrade(() => {
        return (
          gradeList.length &&
          gradeList.find((item) => {
            console.log("item:", item);
            return item.gradeName === "normal";
          })
        );
      });
    }
    //setMyBenefits(null);
  }, [gradeList]);

  function selectGrade(event) {
    gradeList.forEach((g) => {
      if (g.gradeName === event.target.innerHTML) {
        setGrade(g);
      }
    });
  }

  function purchase() {
    //일반 등급이 아니고, 혜택 선택 안했으면 구매 못함.
    if (grade.gradeName !== "normal" && !location.state?.myBenefits) {
      alert("커스텀을 선택하세요");
      return;
    }

    axios({
      method: "post",
      url: "/user-card/purchase",
      data: {
        user: { id: userId },
        grade: grade,
        benefits: location.state == null ? null : location.state.myBenefits,
      },
    })
      .then((res) => {
        // 성공 후 결제 완료 창으로 이동

        navigate("/card/complete-purchase", {
          state: {
            userCard: res.data,
          },
        });
        console.log("res.data:", res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  /**
   * 혜택 선택 페이지로 이동
   */
  const goToSelectBenefits = () => {
    if (grade.gradeName == null) {
      Swal.fire({
        title: "Warning!",
        text: "등급을 먼저 선택해주시기 바랍니다. ",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      if (grade.gradeName === "normal") {
        Swal.fire({
          title: "Warning!",
          html: `일반등급은 혜택을 추가할 수 없습니다. <br />다른 등급을 선택해주세요 `,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        navigate("/card/benefit-custom", {
          state: {
            grade: grade,
          },
        });
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between border">
        <img
          className="d-block mx-5 my-4"
          src={require("assets/img/card/unregisteredCard.gif")}
          alt=""
          style={{ width: "350px" }}
        />
        {/* <Carousel /> */}
        <Container className="border-left ms-3 me-5 my-4">
          <div>
            <Row className="my-2">
              <Col>
                <h5>Card Level</h5>
              </Col>
              <Col>
                <Dropdown className=" d-flex justify-content-end">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" size="sm">
                    {grade.gradeName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {gradeList.map((grade1) => (
                      <Dropdown.Item
                        key={grade1.gradeName}
                        onClick={selectGrade}
                      >
                        {grade1.gradeName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <div className="border my-4 px-3 py-3">
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Price</strong>
                </small>
              </Col>
              <Col className="text-right">{grade.price}</Col>
            </Row>
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Expiration Date</strong>
                </small>
              </Col>
              <Col className="text-right"> {grade.period}</Col>
            </Row>
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Benefit Count</strong>
                </small>
              </Col>
              <Col className="text-right">{grade.benefitCount}</Col>
            </Row>
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Payback Rate</strong>
                </small>
              </Col>
              <Col className="text-right">{grade.refundRate * 100}%</Col>
            </Row>
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Select Benefit</strong>
                </small>
              </Col>

              <Col className="d-flex justify-content-end">
                <Button onClick={goToSelectBenefits} size="sm">
                  Go Select
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <small>
                  <strong>Selected Benefit</strong>
                </small>
                {location.state &&
                  location.state.myBenefits.map(
                    (benefit) => benefit.benefitName
                  )}
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <small>
                  <strong>Recharge Count</strong>
                </small>
              </Col>
              <Col className="text-right">{grade.maxRechargeCount}</Col>
            </Row>
            {/* <Row className="d-flex justify-content-end my-3">
            <Button onClick={purchase} size="sm" type="button">
              구입하기
            </Button>
          </Row> */}
          </div>
          <Button onClick={purchase} size="sm" type="button">
            Buy Now
          </Button>
        </Container>
      </div>
      <div className="text-center">
        <br />
        <br />
        <br />
        <br />
        <img src={require("assets/img/card/serviceDetail.png")} />
      </div>
    </>
  );
}

export default GradeSelect;
