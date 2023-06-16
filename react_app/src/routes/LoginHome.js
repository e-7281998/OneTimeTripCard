import React from "react";
import { Route, Routes } from "react-router-dom";
import FindEmailPage from "views/Login/FindEmailPage";
import FindPasswordPage from "views/Login/FindPasswordPage";
import Login from "views/Login/Login";
import SignUpPage from "views/Login/SignUpPage";

function LoginHome(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
      </Routes>
    </div>
  );
}

export default LoginHome;
