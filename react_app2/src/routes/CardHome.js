import React from "react";
import { Route, Routes } from "react-router-dom";
import BenefitCustomPage from "views/Card/BenefitCustomPage";
import CardManagePage from "views/Card/CardManagePage";
import CardPurchasePage from "views/Card/CardPurchasePage";
import ChargePage from "views/Card/ChargePage";
import CompletePurchasePage from "views/Card/CompletePurchasePage";
import HistoryPage from "views/Card/HistoryPage";
import TransferPage from "views/Card/TransferPage";
import TravelCardPage from "views/Card/TravelCardPage";

function CardHome(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CardManagePage />} />
        <Route path="/manage-card" element={<CardManagePage />} />
        <Route path="/purchase" element={<CardPurchasePage />} />
        <Route path="/benefit-custom" element={<BenefitCustomPage />} />
        <Route path="/complete-purchase" element={<CompletePurchasePage />} />
        <Route path="/charge/:userCardId" element={<ChargePage />} />
        <Route path="/history/:userCardId" element={<HistoryPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/travelCard" element={<TravelCardPage />} />
      </Routes>
    </div>
  );
}

export default CardHome;
