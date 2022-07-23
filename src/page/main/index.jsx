import LacaPageLayout from "Layout/LacaPageLayout";
import React from "react";
import HomeContent from "./HomeContent";
import HomeHeader from "./HomeHeader";

const HomePage = () => {
  return (
    <div>
      <LacaPageLayout header={<HomeHeader />} content={<HomeContent />} />
    </div>
  );
};

export default HomePage;
