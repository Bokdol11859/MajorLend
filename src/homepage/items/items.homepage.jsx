import React from "react";
import Item from "./item.homepage";
import "./items.homepage.scss";

import { Link } from "react-router-dom";

function Items({ items }) {
  return (
    <div className="menu">
      {items.map((item, i) => (
        <Link
          to={`/${item.name}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Item key={i} item={item} size={item.size} />
        </Link>
      ))}
    </div>
  );
}

export default Items;
