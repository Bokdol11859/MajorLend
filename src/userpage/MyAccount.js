import { useState, useEffect } from "react";
import { MdAccountBox } from "react-icons/md";
import "./User.scss";

const MyAccount = ({ username, usermail }) => {
  return (
    <>
      <div className="myAccount">
        <MdAccountBox
          style={{ width: "250px", height: "250px" }}
          color="#FFF"
        />
        <h1
          style={{
            color: "white",
            fontSize: "1.5rem",
          }}
          className="UserName"
        >
          {username}
          <br />
          <br />
          {usermail}
        </h1>
      </div>
    </>
  );
};

export default MyAccount;
