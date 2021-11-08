import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Navbar, Container, Form, FloatingLabel, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./header.scss";
import { auth, db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../state/userSlice";

function Header({ isHome }) {
  const [isLogin, setIsLogin] = useState(false);
  const username = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogin(true);
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnap = await getDocs(q);
        const queryDoc = querySnap.docs[0];
        dispatch(login(Object.assign(queryDoc.data(), {id: queryDoc.id})));
      } else {
        setIsLogin(false);
        dispatch(logout());
      }
    });
  }, []);

  const onLogout = async () => {
    await auth.signOut();
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/user" style={{ textDecoration: "none", color: "black" }}>
          마이페이지
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
          장바구니
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={onLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Navbar className="Navbar">
        <Container className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="Logo">전공을 빌리다</Navbar.Brand>
          </Link>

          {isLogin === false ? (
            <Nav className="User">
              <Link to="/login">
                <div style={{ color: "white" }} className="login-button">
                  {/* <span>로그인 하세요</span> */}
                  <Button>로그인</Button>
                </div>
              </Link>
            </Nav>
          ) : (
            <Nav className="User">
              <div style={{ color: "white" }} className="username">
                <span>{username}님</span>
              </div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <img src="/images/user.png" style={{ width: "35px" }} />
                  <DownOutlined />
                </a>
              </Dropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
