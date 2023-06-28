import React, { useContext, useEffect } from "react";
import { MapContext } from "./Map";

function Course(props) {
  const { kakao, course, changeValue, mapInfo } = useContext(MapContext);
  //지도 생성
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
        level: 14, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    var positions = [];

    course.map((item) => {
      positions.push({
        id: item.id,
        title: item.location,
        latlng: new kakao.maps.LatLng(item.latitude, item.longitude),
      });
    });

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
        mapInfo.location = item.title;
        mapInfo.id = item.id;
        changeValue();
        // console.log(item);
      });
    });
  });

  return (
    <>
      <div id="map"></div>
    </>
  );
}

export default Course;
