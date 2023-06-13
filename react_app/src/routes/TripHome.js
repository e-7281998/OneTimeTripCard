import Trip from "views/Trip/Trip";
import React from "react";
import { Route, Routes } from "react-router-dom";

function TripHome(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Trip />} />
      </Routes>
    </div>
  );
}

export default TripHome;
