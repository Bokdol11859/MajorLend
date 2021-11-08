import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Button,
  Image,
  Typography,
  Checkbox,
  Divider,
  notification,
} from "antd";
import { db } from "../firebase-config";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import "./Cart.css";

const { Title, Paragraph, Text } = Typography;

const CartCharge = ({ number, userId, cartList }) => {
  const [totalprice, setTotalPrice] = useState("");

  const onChangeTotalPrice = useCallback((e) => {
    setTotalPrice(e.target.value);
  }, []);

  const openNotificationPay = () => {
    notification.open({
      message: "결제가 완료되었습니다.",
      description: "다음날부터 대여기간이 시작됩니다.",
    });
  };

  const payment = async () => {
    const userRef = doc(db, "users", userId);
    const date = new Date();
    const dueDate = new Date(date);
    dueDate.setDate(date.getDate() + 4);

    cartList.map((book) => {
      updateDoc(userRef, {
        borrow: arrayUnion({
          key: book.id,
          date: date.toDateString(),
          due: dueDate.toDateString(),
          title: book.title,
        }),
      });
      updateDoc(userRef, {
        cart: arrayRemove(book.id),
      });
    });

    openNotificationPay();
  };

  return (
    <>
      <Card className="cartcharge">
        <div className="cartcharge">
          <div className="chargetext">
            <p>총 금액: {3000 * number}원</p>
            <p>담은 책 개수: {number}</p>
          </div>
          <Button
            size="large"
            type="primary"
            block
            className="btn btn-primary"
            htmlType="submit"
            className="input"
            onClick={payment}
          >
            결제하기
          </Button>
        </div>
      </Card>
    </>
  );
};

export default CartCharge;
