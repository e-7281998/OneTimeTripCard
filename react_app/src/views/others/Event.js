import React from "react";
import InfiniteCarousel from "react-leaf-carousel";

function Event(props) {
  const events = [
    {
      id: 1,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/pc_homebanner_s_nol_230425.jpg",
    },
    {
      id: 2,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/pc_homebanner_s_SSG_ED2.jpg",
    },
    {
      id: 3,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/pc_homebanner_s_naverhyundaicard.jpg",
    },
    {
      id: 4,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/pc_homebanner_s_goodfriendship.jpg",
    },

    {
      id: 5,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/pc_homebanner_s_thePink.jpg",
    },
    {
      id: 6,
      src: "https://www.hyundaicard.com/docfiles/resources/pc/images/hom/home_banner_m_emart.png",
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
        sideSize={1}
        slidesToScroll={2}
        slidesToShow={2}
        scrollOnDevice={true}
        animationDuration={50}
        autoCycle={true}
      >
        {events.map((a) => (
          <div>
            <img key={a.id} src={a.src} />
          </div>
        ))}
      </InfiniteCarousel>
    </div>
  );
}

export default Event;
