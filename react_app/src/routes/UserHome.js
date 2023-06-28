import React from "react";
import { Route, Routes } from "react-router-dom";
import InfoUpdatePage from "views/User/InfoUpdatePage";

function UserHome(props) {
  return (
    <main>
      <Routes>
        <Route path="/user-info-update" element={<InfoUpdatePage />} />
      </Routes>
    </main>
  );
}

export default UserHome;
