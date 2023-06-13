import React, { useEffect, useState } from "react";
import "assets/css/trip.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Course from "./Course";
const { kakao } = window;

function Map(props) {
  const [course, setCourse] = useState([]);
  const [node, setNode] = useState([]);
  const [store, setStore] = useState([]);

  async function getCourse() {
    const courses = await axios.get("/trip/course");
    setCourse(courses.data);
    const nodes = await axios.get("/trip/node");
    setNode(nodes.data);
    const stores = await axios.get("/trip/store");
    setStore(stores.data);
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <Container>
      <Course kakao={kakao} course={course} />
    </Container>
  );
}

export default Map;
