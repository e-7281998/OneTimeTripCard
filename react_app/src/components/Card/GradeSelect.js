import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
            return item.gradeName === "일반";
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
    axios({
      method: "post",
      url: "/user-card/purchase",
      data: {
        user: { id: userId },
        grade: grade,
        nickName: "testCard",
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
      if (grade.gradeName === "일반") {
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
    <div>
      <Container>
        <Row>
          <Col>등급</Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {grade.gradeName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {gradeList.map((grade1) => (
                  <Dropdown.Item key={grade1.gradeName} onClick={selectGrade}>
                    {grade1.gradeName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col>금액</Col>
          <Col>{grade.price}</Col>
        </Row>
        <Row>
          <Col>기간</Col>
          <Col>{grade.period}</Col>
        </Row>
        <Row>
          <Col>혜택 수</Col>
          <Col>{grade.benefitCount}</Col>
        </Row>
        <Row>
          <Col>즉시 환급률</Col>
          <Col>{grade.refundRate * 100}%</Col>
        </Row>
        <Row>
          <Col>혜택 커스텀</Col>
          <Col>
            선택한 커스텀 ----
            {location.state &&
              location.state.myBenefits.map((benefit) => benefit.benefitName)}
          </Col>
          <Col>
            <Button onClick={goToSelectBenefits}>커스텀 하기</Button>
          </Col>
        </Row>
        <Row>
          <Col>재 충전 동일 혜택 수</Col>
          <Col>{grade.maxRechargeCount}</Col>
        </Row>
      </Container>
      <Button onClick={purchase}>구입하기</Button>
    </div>
  );
}

export default GradeSelect;
