import React, { useState } from "react";
import Picture from "./Picture";
import "../../App.css";
import { useDrop } from "react-dnd";
const PictureList = [
  {
    id: 1, //드래그 할 요소를 구분하기 위한 식별자
    url: "https://media.istockphoto.com/id/1342734145/ko/%EC%82%AC%EC%A7%84/%EB%B3%B4%EB%A6%84%EB%8B%AC%EA%B3%BC-%EC%9D%BC%EB%B3%B8-%ED%8C%9C%ED%8C%8C-%EC%9E%94%EB%94%94-%EC%88%98%ED%99%95-%EB%8B%AC%EA%B3%BC-%EC%9D%BC%EB%B3%B8-%ED%8C%9C%ED%8C%8C-%EC%9E%94%EB%94%94-%EC%88%98%ED%99%95-%EB%8B%AC%EA%B3%BC-%EC%9D%BC%EB%B3%B8-%ED%8C%9C%ED%8C%8C-%EC%9E%94%EB%94%94.jpg?s=1024x1024&w=is&k=20&c=fNzFDom_He3nvXV4yCRXsqQW0y5HosLlo-sqXzbrqPE=",
  },
  {
    id: 2, //드래그 할 요소를 구분하기 위한 식별자
    url: "https://media.istockphoto.com/id/1146148505/ko/%EC%82%AC%EC%A7%84/%EB%B0%A4-%ED%95%98%EB%8A%98%EC%97%90-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EA%B1%B4%EC%A1%B0-%EB%B6%84%EA%B8%B0-%EB%82%98%EB%AC%B4%EC%97%90-%EC%A0%84%EC%B2%B4-%EB%AC%BC%EA%B3%A0%EA%B8%B0-%EB%8B%AC-%EB%8B%A4%EC%8B%9C.jpg?s=2048x2048&w=is&k=20&c=dEjXx7Zf7bw6cJ46OW25nqSnSrXm3frSX7ZZA17LoeA=",
  },
  {
    id: 3, //드래그 할 요소를 구분하기 위한 식별자
    url: "https://media.istockphoto.com/id/965548504/ko/%EC%82%AC%EC%A7%84/%ED%99%A9%EC%95%BC-%EC%A7%80%EC%97%AD-%EC%84%B8%EB%A0%88-%EC%9E%90%EC%97%B0-%EB%B0%B0%EA%B2%BD-%EC%9C%84%EC%9D%98-%EB%B0%9D%EC%9D%80-%ED%92%80-%EB%AC%B8.jpg?s=1024x1024&w=is&k=20&c=CPsQJ7NQMjjrM25L7ZZemWcdkkaM_LlWTE_W_N_Jz9I=",
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]); //board안에 뭐가 있는지 업데이트 (즉, 혜택커스텀 뭐 넣을 것인지 )

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image", //앞에서 정의한 image 타입만 accept하겠다는 뜻
    drop: (item) => addImageToBoard(item.id), //board에 add하겠다. (어떤 picture를 drop할지 식별해주는 것이다. )
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), //isOver 왜 씀? 끝났을때(drop하고 나서) 변화주고 싶은 스타일이나 뭔가 변화를 주고 싶을때
    }),
  }));

  //board에 add하겠다. --> 아까 url 정의했을 때 적었던 id
  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id); //picture 안에  id가 같을 경우만 보드에 그려줘라 아니면 하지마
    setBoard((board) => [...board, pictureList[0]]); //항상 list안에는 요소가 하나밖에 없으니깐.
    //setBoard([pictureList[0]]);
  };
  return (
    <>
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {/* //위에서 정의한 drop가져옴 */}
        {board.map((picture) => {
          //들어있는 board보여준다. (혜택 선택한 것들)
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    </>
  );
}

export default DragDrop;
