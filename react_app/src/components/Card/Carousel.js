import React from "react";

import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("assets/img/card/unregisteredCard.gif"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/card/5.png"),
    altText: "",
    caption: "",
    header: "",
  },
];

class Carousels extends React.Component {
  render() {
    return (
      <>
        <div style={{ width: "500px" }}>
          <UncontrolledCarousel items={items} />
        </div>
      </>
    );
  }
}

export default Carousels;
