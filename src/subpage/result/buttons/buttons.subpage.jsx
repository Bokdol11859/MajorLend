import React from "react";
import { Button, Radio } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

function Buttons({ setShowGrid }) {
  return (
    <div className="buttons">
      <Button
        type="default"
        icon={<BarsOutlined />}
        onClick={() => {
          setShowGrid(false);
        }}
        style={{marginRight:'5px'}}
      />
      <Button
        type="default"
        icon={<AppstoreOutlined />}
        onClick={() => {
          setShowGrid(true);
        }}
      />
    </div>
  );
}

export default Buttons;
