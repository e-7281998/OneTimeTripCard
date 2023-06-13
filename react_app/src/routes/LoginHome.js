import React from "react";
import { Route, Routes } from "react-router-dom";
import FindEmailPage from "views/Login/FindEmailPage";
import FindPwdPage from "views/Login/FindPwdPage";
import Login from "views/Login/Login";

function LoginHome(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path="/find-password" element={<FindPwdPage />} />
      </Routes>
    </div>
  );
}

export default LoginHome;
