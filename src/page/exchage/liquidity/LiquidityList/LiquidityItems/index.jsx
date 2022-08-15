import * as React from "react";
import LiquidityItem from "./LiquidityItem";

export default function LiquidityItems({ item, handleAdd }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <LiquidityItem
        handleAdd={handleAdd}
        item={item}
        expanded={expanded}
        handleChange={handleChange}
      />
    </>
  );
}
