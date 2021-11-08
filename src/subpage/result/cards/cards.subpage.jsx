import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import "./cards.subpage.scss";
import { Link } from "react-router-dom";

import { db } from "../../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

function Cards({ showGrid, category }) {
  const { Meta } = Card;
  const [docs, setDocs] = useState([]);

  useEffect(async () => {
    const q = query(collection(db, "books"), where("category", "==", category));

    const querySnap = await getDocs(q);
    setDocs(querySnap.docs);
  }, []);

  return showGrid === true ? (
    <div>
      <Row justify="center">
        {docs.map((doc, i) => (
          <Col span={8} key={i}>
            <Link
              to={"/detail/" + doc.id}
              className="test"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={doc.data().img}
                    style={{ height: "400px" }}
                  />
                }
                size="small"
                style={{ margin: "10px" }}
              >
                <Meta
                  title={doc.data().title}
                  description={doc.data().author}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <div>
      {docs.map((doc, i) => (
        <Link
          to={"/detail/" + doc.id}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Card
            className="border"
            style={{
              width: "60vw",
              height: "100%",
              border: "2px solid #3f5696",
            }}
            hoverable
            key={i}
          >
            <div className="card-horizontal">
              <img
                alt="example"
                src={doc.data().img}
                style={{ width: "150px" }}
              />
              <div
                style={{
                  width: "100%",
                  paddingLeft: "20px",
                }}
              >
                <h1 className="linear-title" style={{ fontSize: "2rem" }}>
                  {doc.data().title}
                </h1>
                <p style={{ opacity: "70%" }}>{doc.data().author}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
