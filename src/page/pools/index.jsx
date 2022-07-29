import LacaPageLayout from "Layout/LacaPageLayout";
import React from "react";
import PoolContent from "./PoolContent";
import PoolHeader from "./PoolHeader";

const Pools = () => {
  return (
    <div>
      <LacaPageLayout header={<PoolHeader />} content={<PoolContent />} />
    </div>
  );
};

export default Pools;
