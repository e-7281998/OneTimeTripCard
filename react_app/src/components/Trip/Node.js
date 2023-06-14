import React, { useContext, useEffect } from "react";
import { MapContext } from "./Map";

function Node(props) {
  const { kakao, nodes, changeValue, mapInfo } = useContext(MapContext);

  useEffect(() => {
    var positions = [];
    //선택한 Course에 해당하는 Node만 배열에 담기
    var node = nodes.filter((item) => item.course.id === mapInfo.id);

    node.map((item) => {
      positions.push({
        id: item.id,
        courseId: item.course.id,
        title: item.location,
        latlng: new kakao.maps.LatLng(item.latitude, item.longitude),
      });
    });

    var la = 0,
      ma = 0;
    positions.map((item) => (la += item.latlng.La));
    positions.map((item) => (ma += item.latlng.Ma));

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          ma / positions.length,
          la / positions.length
        ), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = require("assets/img/icons/ottc/course_maker.png");

    positions.map((item) => {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(34, 34);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: item.latlng, // 마커를 표시할 위치
        title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      //마커에 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, "click", () => {
        mapInfo.nodeId = item.id;
        changeValue();
      });
    });
  }, []);

  return <div id="map">Node입니다.</div>;
}

export default Node;
