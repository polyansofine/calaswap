import LacaPageLayout from "Layout/LacaPageLayout";
import React from "react";
import FarmContent from "./FarmContent";
import FarmHeader from "./FarmHeader";

const Farm = () => {
  return (
    <div>
      <LacaPageLayout header={<FarmHeader />} content={<FarmContent />} />
    </div>
  );
};

export default Farm;
