import React from "react";
import "./item.homepage.scss";

function Item({ item, size }) {
  return (
    <>
      <div className={`${size} card`}>
        <div className="black" />
        <div
          className="background-image"
          style={{ backgroundImage: `url(${item.img})` }}
        ></div>
        <h1 className="content">{item.title}</h1>
      </div>
    </>
  );
}

export default Item;
