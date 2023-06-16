import React from "react";
import { useDrag } from "react-dnd";

function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id }, //drop에서 board 그려줄때 id가 필요해서 보낸다.
    collect: (monitor) => ({
      //monitor: 내장 객체 같음.
      isDragging: !!monitor.isDragging(), //드래깅 가능한지 드래깅 추적(여기서는 핑크로 구분함) -> true/false 반환
      //isDragging:드래깅하는지 안하는지
    }),
  }));
  return (
    <img
      alt=""
      ref={drag}
      src={url}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;
