import React, { useState } from "react";
import "./result.subpage.scss";
import Buttons from "./buttons/buttons.subpage";
import Cards from "./cards/cards.subpage";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

function Result({ category }) {
  let [showGrid, setShowGrid] = useState(true);

  const books = collection(db, "books");

  const q = query(books, where("country", "in", ["USA", "Japan"]));

  return (
    <>
      <Buttons setShowGrid={setShowGrid} />
      <br />
      <br />
      <br />
      <Cards showGrid={showGrid} category={category} />
    </>
  );
}

export default Result;
