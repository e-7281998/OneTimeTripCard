import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Benefit from "./Benefit";

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
        text: `${
          team.length - grade.benefitCount
        }개 혜택이 초과 되셨습니다.  빼주세요. `,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (team.length < grade.benefitCount) {
      Swal.fire({
        title: "Error!",
        text: `${grade.benefitCount - team.length}개 더 넣으세요`,
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
    <Container maxW="800px">
      <Heading p="2" align="center" color="GrayText">
        Benefit Custom
      </Heading>
      <h1 align="center">{grade.gradeName}</h1>
      <h1 align="center">혜택 수: {grade.benefitCount}개</h1>
      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            Benefit
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

            <Button variant="primary mx-3" onClick={handleInsert}>
              {/* <Link to="/card/purchase" state={{ myBenefits: team }}>
                수정
              </Link> */}
              추가
            </Button>
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default BenefitList;
