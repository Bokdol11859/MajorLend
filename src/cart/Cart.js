import React, { useState, useEffect } from "react";
import { Card, List, Image, Typography, Checkbox, Divider } from "antd";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "./Cart.css";

import CartCard from "./CartCard";
import CartCharge from "./CartCharge";

import Header from "../header/header";
const { Title, Paragraph, Text } = Typography;

const Cart = () => {
  const id = useSelector((state) => state.user.id);
  const [cartList, setCartList] = useState([]);

  useEffect(async () => {
    if (id) {
      const userRef = doc(db, 'users', id);

      const docSnap = await getDoc(userRef);
      const cart = docSnap.data().cart;
      if (cart) {
        const books = await Promise.all(
          cart.map(async (bookId) => {
            const bookRef = doc(db, "books", bookId);
            const docSnap = await getDoc(bookRef);
            const bookObj = Object.assign(docSnap.data(), {id: bookRef.id});
            return bookObj;
          })
        );
        setCartList(books);
      }
    }
  }, [id, cartList]);

  return (
    <>
      <Header />
      <div className="width">
        <Title className="carttitle">장바구니</Title>
        <hr />
        <div className="cartList">
          <div className="cards">
            {cartList.map((book, i) => (
              <CartCard key={i} book={book} userId={id}></CartCard>
            ))}
          </div>

          <div className="charge">
            <CartCharge 
                number={cartList.length} 
                userId={id} 
                cartList={cartList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
