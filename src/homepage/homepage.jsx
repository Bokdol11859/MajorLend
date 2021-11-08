import React, { useState } from "react";
import Header from "../header/header";
import Items from "./items/items.homepage";
import Data from "./data";

function Homepage() {
  let [items, setItems] = useState(Data);

  return (
    <>
      <Header isHome={true} />
      <Items items={items} />
    </>
  );
}

export default Homepage;
