import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPage from "views/User/MyPage";
import InfoUpdatePage from "views/User/InfoUpdatePage";

function UserHome(props) {
  return (
    <main>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/user-info-update" element={<InfoUpdatePage />} />
      </Routes>
    </main>
  );
}

export default UserHome;
