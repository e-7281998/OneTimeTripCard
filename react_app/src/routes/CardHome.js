import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BenefitCustomPage from 'views/Card/BenefitCustomPage';
import CardManagePage from 'views/Card/CardManagePage';
import CardPurchasePage from 'views/Card/CardPurchasePage';
import CompletePurchasePage from 'views/Card/CompletePurchasePage';

function CardHome(props) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<CardManagePage />} />
                <Route path='/manage-card' element={<CardManagePage />} />
                <Route path='/purchase' element={<CardPurchasePage />} />
                <Route path='/benefit-custom' element={<BenefitCustomPage />} />
                <Route path='/complete-purchase' element={<CompletePurchasePage />} />
            </Routes>
        </div>
    );
}

export default CardHome;