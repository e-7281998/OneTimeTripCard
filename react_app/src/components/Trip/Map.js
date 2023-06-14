import React, { createContext, useEffect, useState } from "react";
import "assets/css/trip.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Course from "./Course";
import Node from "./Node";
import Store from "./Store";
const { kakao } = window;

const MapContext = createContext();
function Map(props) {
  const [course, setCourse] = useState([]);
  const [node, setNode] = useState([]);
  const [store, setStore] = useState([]);
  const [value, setValue] = useState(2);

  async function getCourse() {
    const courses = await axios.get("/trip/course");
    setCourse(courses.data);
    const nodes = await axios.get("/trip/node");
    setNode(nodes.data);
    const stores = await axios.get("/trip/store");
    setStore(stores.data);
  }

  const changeValue = (e) => {
    if (e?.target != null) {
      if (value !== 0) {
        setValue(value - 1);
      }
    } else {
      if (value < 2) {
        setValue(value + 1);
      }
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <MapContext.Provider
      value={{
        kakao: kakao,
        course: course,
        changeValue,
      }}
    >
      <Container>
        {value == 0 && <Course />}
        {value == 1 && <Node />}
        {value == 2 && <Store />}
      </Container>
      {value != 0 && <button onClick={changeValue}>이전</button>}
    </MapContext.Provider>
  );
}

export { Map as default, MapContext };
