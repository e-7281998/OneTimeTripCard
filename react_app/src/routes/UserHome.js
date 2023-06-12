import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from 'views/User/MyPage';

function UserHome(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MyPage />} />
            </Routes>
        </div>
    );
}

export default UserHome;