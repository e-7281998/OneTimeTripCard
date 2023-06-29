import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
function CardSlide(props) {
  const cardImage = [
    {
      id: 1,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBOACQI.png",
    },
    {
      id: 2,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckASABWU.png",
    },
    {
      id: 3,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBEMBD8.png",
    },

    {
      id: 4,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBEDB98.png",
    },
    {
      id: 5,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBAAB70.png",
    },
    {
      id: 6,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckASAD0J.png",
    },
    {
      id: 7,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckASAABM.png",
    },
    {
      id: 8,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBE9CQZ.gif",
    },
    {
      id: 9,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBOACPO.png",
    },
    {
      id: 10,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBAAB0O.png",
    },
    {
      id: 11,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBEBB7N.png",
    },
    {
      id: 12,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBE4BND.png",
    },
    {
      id: 13,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBA9BM9.png",
    },
    {
      id: 14,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBAAB56.png",
    },
    {
      id: 15,
      src: "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCheckBETBFW.png",
    },
  ];

  return (
    <div>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={true}
        showSides={true}
        // 투명도
        sidesOpacity={0.3}
        // 그림 사이즈 (9가제일 작음)
        sideSize={0.1}
        slidesToScroll={3}
        slidesToShow={3}
        scrollOnDevice={true}
        animationDuration={50}
        autoCycle={true}
      >
        {cardImage.map((a) => (
          <div>
            <img key={a.id} src={a.src} />
          </div>
        ))}
      </InfiniteCarousel>
    </div>
  );
}

export default CardSlide;
