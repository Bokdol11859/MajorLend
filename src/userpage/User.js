import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import MyAccount from "./MyAccount";
import SearchList from "./SearchList";
import RentalList from "./RentalList";
import Header from "../header/header";
import Address from "./Address";
import { useEffect, useState } from "react";

function User() {
  const username = useSelector((state) => state.user.name);
  const usermail = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.id);
  const [borrowList, setBorrowList] = useState([]);

  useEffect(async () => {
    if (userId) {
      const userRef = doc(db, "users", userId);

      const docSnap = await getDoc(userRef);
      console.log(docSnap.data().borrow);
      setBorrowList(docSnap.data().borrow);
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <div
        className="User"
        style={{
          width: "60vw",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <MyAccount username={username} usermail={usermail} />
          <Address />
        </div>
        <RentalList borrowList={borrowList} />
      </div>
    </div>
  );
}

export default User;
