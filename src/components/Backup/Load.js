import React from "react";
import {withPropsAPI} from "gg-editor";
import Button from "antd/es/button";
import {FolderOpenOutlined} from "@ant-design/icons";

class Load extends React.Component {
  handleClick = () => {
    const {propsAPI} = this.props;

    const data = JSON.parse(localStorage.getItem('graph'));

    propsAPI.read(data);
  };

  render() {
    return (
        <Button
          onClick={this.handleClick}
          type='dashed'
          size='large'
          shape='circle'
          icon={<FolderOpenOutlined/>}
        />
    );
  }
}

export default withPropsAPI(Load);
