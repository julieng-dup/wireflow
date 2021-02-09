import React from "react";
import {CanvasMenu, Command, ContextMenu, withPropsAPI} from "gg-editor";
import Save from "./Save";
import Load from "./Load";

class Backup extends React.Component {
  render() {
    return (
      <ContextMenu>
        <CanvasMenu>
          <Command name='autoZoom'>
            <div className='export' style={{marginLeft: '160px'}}>
              <Save/>
              <Load/>
            </div>
          </Command>
        </CanvasMenu>
      </ContextMenu>
    );
  }
}

export default withPropsAPI(Backup);
