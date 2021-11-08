import React, { useState } from "react";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import { BiPlus } from "react-icons/bi";
import "../User.scss";

const AddressAPI = ({ setData, setFullData, setCode, setExist }) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <BiPlus className="plusBtn" size="30px" onClick={openPostCode} />
      <div id="popupDom">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostCode
              onClose={closePostCode}
              setData={setData}
              setFullData={setFullData}
              setCode={setCode}
              setExist={setExist}
            />
          </PopupDom>
        )}
      </div>
    </div>
  );
};

export default AddressAPI;
