import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CardManagePage from 'views/Card/CardManagePage';
import CardPurchasePage from 'views/Card/CardPurchasePage';

function CardHome(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<CardManagePage />} />
                <Route path='/manage-card' element={<CardManagePage />} />
                <Route path='/purchase' element={<CardPurchasePage />} />
            </Routes>
        </div>
    );
}

export default CardHome;