import {
  Center,
  Container,
  Flex,
  Heading,
  List,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Badge, Button, Col, Progress, Row } from "reactstrap";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Benefit from "./Benefit";
import { max } from "moment";
import { MapContext } from "components/Trip/Map";

function BenefitList(props) {
  const [Benefits, setBenefits] = useState([]);
  const [grade, setGrade] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [team, setTeam] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/benefit/getAll",
    })
      .then((res) => {
        setBenefits(res.data);
      })
      .catch((error) => {
        //console.log(error);
        throw new Error(error);
      });

    setGrade(location.state.grade);
  }, []);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "benefit",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  //console.log(isOver);

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    setBenefits((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
  };
  const removePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setBenefits((prev) => [...prev, item]);
  };

  const handleInsert = () => {
    console.log(grade);
    if (team.length > grade.benefitCount) {
      Swal.fire({
        title: "Error!",
        text: `혜택 ${team.length - grade.benefitCount}개가 초과 되었습니다.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (team.length < grade.benefitCount) {
      Swal.fire({
        title: "Error!",
        text: `혜택을 ${grade.benefitCount - team.length}개 더 넣으세요`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      sessionStorage.setItem("mode", "fromBenefit");
      sessionStorage.setItem("myBenefits", team);
      navigate("/card/purchase", {
        state: {
          myBenefits: team,
          grade: grade,
        },
      });
    }
  };

  return (
    <>
      <Card
        className="bg-gradient-warning shadow-lg border-1"
        border={team.length === grade.benefitCount ? "primary" : ""}
        style={
          team.length === grade.benefitCount
            ? { borderWidth: 10 }
            : { borderWidth: 0 }
        }
      >
        <h1 style={{ margin: 10 }} className="text-white">
          Benefit Custom
          <Badge style={{ fontSize: 50, marginLeft: 550 }}>
            {" "}
            {grade.gradeName}
          </Badge>
        </h1>

        <div className="p-6">
          <Row>
            <img
              style={{ width: 100, height: 100 }}
              alt=""
              src={require("assets/img/card/chip.png")}
            />
            <img
              style={{
                width: 500,
                height: 210,
                marginLeft: 138,
                marginTop: -38,
              }}
              alt=""
              src={require("assets/img/brand/logo4.png")}
            />
          </Row>
        </div>

        <div className="progress-info">
          <div className="progress-label">
            <div>Left Count</div>
          </div>
          <div className="progress-percentage"></div>
        </div>
        <Progress
          max={grade.benefitCount}
          value={team.length}
          color="primary"
        />

        <h4 style={{ marginLeft: 640 }} className="text-white">
          Available Benefit Count :
          <Badge
            style={{ fontSize: 25, marginLeft: 10 }}
            color="secondary"
            pill
            className="mr-3"
          >
            {grade.benefitCount}개
          </Badge>
        </h4>
      </Card>

      <Container maxW="850px">
        <Flex justify="space-between" height="90vh" align="center">
          <Stack width="300px">
            <Heading fontSize="3xl" color="yellow.800" textAlign="center">
              Benefit List
            </Heading>

            <List
              bgGradient={
                isPlayerOver
                  ? "linear(to-b, yellow.300, yellow.500)"
                  : "linear(to-b, yellow.100, yellow.200)"
              }
              ref={removeFromTeamRef}
              p="4"
              minH="70vh"
              boxShadow="xl"
              borderRadius="md"
            >
              {Benefits.map((p, i) => (
                <Benefit
                  item={p}
                  key={i}
                  index={i}
                  benefitType="benefit"
                  onDropPlayer={movePlayerToTeam}
                />
              ))}
            </List>
          </Stack>
          <Stack width="300px">
            <Heading fontSize="3xl" color="teal.800" textAlign="center">
              MyBenefit
            </Heading>
            <List
              bgGradient={
                isOver
                  ? "linear(to-b, teal.300, teal.500)"
                  : "linear(to-b, teal.100, teal.200)"
              }
              ref={addToTeamRef}
              minH="70vh"
              boxShadow="xl"
              borderRadius="md"
              p="4"
            >
              {team.map((p, i) => (
                <Benefit
                  item={p}
                  key={i}
                  index={i}
                  benefitType="team"
                  onDropPlayer={removePlayerFromTeam}
                />
              ))}
            </List>
          </Stack>
        </Flex>
        <Button
          style={{ marginTop: -100, width: "100%" }}
          color="default"
          variant="primary mx-3"
          onClick={handleInsert}
        >
          {/* <Link to="/card/purchase" state={{ myBenefits: team }}>
                수정
              </Link> */}
          CONFIRM BENEFITS
        </Button>
      </Container>
    </>
  );
}

export default BenefitList;
