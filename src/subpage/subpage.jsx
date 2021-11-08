import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import Search from "./search/search.subpage";
import Result from "./result/result.subpage";
import "./subpage.scss";

function Subpage({ title, category }) {
  let [search, setSearch] = useState("");

  function onSearchChange(e) {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="contain">
        <h1 className="Topic">{title}</h1>
        <Search onSearchChange={onSearchChange} />
        <hr />
        <Result search={search} category={category} />
      </div>
    </>
  );
}

export default Subpage;
