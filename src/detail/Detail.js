import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, notification } from "antd";
import { Button, Spin } from "antd";
import Header from "../header/header";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Detail.css";

const Detail = () => {
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [publisher, setPublisher] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [init, setInit] = useState(false);

  const uid = useSelector((state) => state.user.uid);
  const { id } = useParams();

  const openNotificationCart = () => {
    notification.open({
      message: "장바구니에 추가했습니다!",
      // description: "장바구니를 확인해주세요.",
    });
  };

  useEffect(async () => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    const book = docSnap.data();

    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setImgUrl(book.img);
    setCategory(book.category);
    setInit(true);
  }, []);

  const addCartList = async () => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnap = await getDocs(q);
    const userRef = querySnap.docs[0].ref;
    updateDoc(userRef, {
      cart: arrayUnion(id),
    });
  };

  return (
    <>
      <Header />
      <div className="bookWrap">
        {init ? (
          <>
            <div style={{}}>
              <Card
                className="bookImg"
                style={{ width: 350, marginTop: "25px" }}
                cover={<img alt="example" src={imgUrl} />}
              />
            </div>
            <Card className="bookInfo">
              <p className="bookTitle">{title}</p>
              <br />
              <p className="bookAuth">{author} 지음</p>
              <p>출판사: {publisher}</p>
              <p>카테고리: {category}</p>
              <Button
                className="cartBtn"
                onClick={() => {
                  addCartList();
                  openNotificationCart();
                }}
              >
                장바구니 담기
              </Button>
              <br />
              <Link to="/cart">
                <Button className="payBtn" type="primary" onClick={addCartList}>
                  바로 결제하기
                </Button>
              </Link>
            </Card>
          </>
        ) : (
          <Spin size="large" />
        )}
      </div>
    </>
  );
};

export default Detail;
