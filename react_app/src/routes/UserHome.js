import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "views/User/MyPage";
import InfoUpdatePage from "views/User/InfoUpdatePage";
import ChargePage from "views/Card/ChargePage";

function UserHome(props) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/user-info-update" element={<InfoUpdatePage />} />
        {/* <Route path="/user-info-update" element={<ChargePage />} /> */}
      </Routes>
    </main>
  );
}

export default UserHome;
