import React from "react";
import {withPropsAPI} from "gg-editor";
import Button from "antd/es/button";
import {SaveOutlined} from "@ant-design/icons";

const Save = (props) => {
  function handleClick() {
    const {propsAPI} = props;

    const data = propsAPI.save();

    props.saveAction(data);
  }

  return (
    <Button
      onClick={handleClick}
      type='dashed'
      size='large'
      shape='circle'
      icon={<SaveOutlined/>}
    />
  );
}


export default withPropsAPI(Save);
