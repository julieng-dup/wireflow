import React from "react";
import Button from "antd/es/button";
import {FolderOpenOutlined} from "@ant-design/icons";

const Open = (props) => {
    return (
        <Button
          onClick={props.Onclick}
          type='dashed'
          size='large'
          shape='circle'
          className={'backup-openButton'}
          icon={<FolderOpenOutlined/>}
        />
    );
}

export default Open;
