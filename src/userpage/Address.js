import { useState } from "react";
import AddressAPI from "./api/AddressAPI";
import "./User.scss";

const Address = () => {
  let [exist, setExist] = useState(false);
  let [data, setData] = useState();
  let [fullData, setFullData] = useState();
  let [code, setCode] = useState();

  return (
    <div className="addInfo">
      <div className="addManagement">
        <p className="addTitle">배송지 관리</p>
        <AddressAPI
          setData={setData}
          setFullData={setFullData}
          setCode={setCode}
          setExist={setExist}
        />
        {exist === true ? (
          <div className="user-address">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>주소: {fullData}</p>
            <p>우편번호: {code}</p>
          </div>
        ) : (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>배송지를 저장해주세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
