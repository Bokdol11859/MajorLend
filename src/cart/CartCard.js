import { Card, List, Image, Typography, Checkbox, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";
import "./Cart.css";

const { Title, Paragraph, Text } = Typography;
// import './CartCard.css'

const CartCard = ({ book, userId }) => {
  const { title, category, author, publisher, img, id } = book;

  const deleteBook = async () => {
    const userRef = doc(db, 'users', userId);
    updateDoc(userRef, {
      cart: arrayRemove(id),
    });
  };

  return (
    <>
      <Card className="cartcard">
        <div className="bookcontent">
          <img className="bookphoto" alt="bookphoto" src={img} />
          <div className="booktext">
            <h1 name="book-title">{title}</h1>
            <br />
            <p name="book-author">저자: {author}</p>
            <p name="book-price">가격: 3000원</p>
          </div>
          <div className="bookdelete" onClick={deleteBook}>
            <Button>
              <DeleteOutlined />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CartCard;
