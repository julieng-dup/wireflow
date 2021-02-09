import React from "react";
import {CanvasMenu, Command, ContextMenu, withPropsAPI} from "gg-editor";
import Button from "antd/es/button";
import IconFont from "../IconFont";
import {SaveOutlined} from "@ant-design/icons";

class Save extends React.Component {
  handleClick = () => {
    const {propsAPI} = this.props;

    const data = propsAPI.save();

    localStorage.setItem('graph', JSON.stringify(data));
  };

  render() {
    return (
        <Button
          onClick={this.handleClick}
          type='dashed'
          size='large'
          shape='circle'
          icon={<SaveOutlined/>}
        />
    );
  }
}

export default withPropsAPI(Save);
