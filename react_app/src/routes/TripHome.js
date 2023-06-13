import Map from "components/Trip/Map";
import React from "react";
import { Route, Routes } from "react-router-dom";

function TripHome(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
}

export default TripHome;
