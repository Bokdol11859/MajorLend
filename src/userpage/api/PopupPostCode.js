import React from "react";
import DaumPostcode from "react-daum-postcode";
import { Button } from "antd";

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setFullData(fullAddress);
    props.setCode(data.zonecode);
    props.setExist(true);
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />

      <Button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
        style={{
          position: "relative",
          left: "45%",
        }}
      >
        닫기
      </Button>
    </div>
  );
};

export default PopupPostCode;
