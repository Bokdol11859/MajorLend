import Address from "./Address";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./User.scss";

const RentalList = ({ borrowList }) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="rentalList">
        <h1>대여 목록</h1>
        <div>
          {borrowList &&
            borrowList.map((book, i) => (
              <Link
                to={"/detail/" + book.key}
                style={{ textDecoration: "none", color: "black" }}
                key={i}
              >
                <Card
                  className="border"
                  style={{
                    width: "55vw",
                    height: "100%",
                    border: "2px solid #3f5696",
                    margin: "5px auto",
                    textAlign: "center",
                    zIndex: "-1",
                  }}
                  hoverable
                  key={i}
                >
                  <div className="borrowed">
                    <div>
                      <h1
                        className="linear-title"
                        style={{ marginTop: "10px", fontSize: "2rem" }}
                      >
                        {book.title}
                      </h1>
                      <p style={{ opacity: "70%" }}>대여일: {book.date}</p>
                      <p style={{ opacity: "70%" }}>반납일: {book.due}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RentalList;
