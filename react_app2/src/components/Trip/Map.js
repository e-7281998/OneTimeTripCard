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
  var initialMapInfo = {
    id: 0,
    nodeId: 0,
    location: "",
  };
  const [course, setCourse] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [stores, setStores] = useState([]);
  const [value, setValue] = useState(0);
  const [mapInfo, setMapInfo] = useState(initialMapInfo);
  const nodeArr = [];
  const storeArr = [];

  //데이터 받아서 코스에 넣기
  async function getCourse() {
    const courses = await axios.get("/trip/course");
    setCourse(() => {
      return courses.data;
    });
  }

  //마커 클릭했을 때 값 변경 시켜서 렌더링할 화면 고르기
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

  //코스 관련 데이터 받아오기
  useEffect(() => {
    getCourse();
  }, []);

  //노드 데이터 넣기
  useEffect(() => {
    course.map((item) => item.courseNodes.map((node) => nodeArr.push(node)));
    setNodes(nodeArr);
  }, [course]);

  //스토어 데이터 넣기
  useEffect(() => {
    nodes.map((item) => item.stores.map((store) => storeArr.push(store)));
    setStores(storeArr);
  }, [nodes]);

  return (
    <MapContext.Provider
      value={{
        kakao,
        course,
        nodes: nodes,
        stores,
        mapInfo,
        changeValue,
      }}
    >
      <Container>
        <div>
          {value === 0
            ? "지역을 선택해주세요."
            : "선택한 지역 : " + mapInfo.location}
        </div>
        {value === 0 && <Course />}
        {value === 1 && <Node />}
        {value === 2 && <Store />}
      </Container>
      {value !== 0 && <button onClick={changeValue}>이전</button>}
    </MapContext.Provider>
  );
}

export { Map as default, MapContext };
