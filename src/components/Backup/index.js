import React, {useState, useEffect} from "react";
import {ContextMenu, withPropsAPI} from "gg-editor";

import './style.css';
import {CloseOutlined, DownloadOutlined, FolderOpenOutlined, SaveOutlined} from "@ant-design/icons";
import Button from "antd/es/button";
import Open from "./Open";
import Save from "./Save";

const Backup = (props) => {
  const [display, setDisplay] = useState(true);
  const [data, setData] = useState(null);

  const {propsAPI} = props;

  useEffect(() => {
      if (data === null) {
        const d = localStorage.getItem('wireflow-backup') === null ? [] : JSON.parse(localStorage.getItem('wireflow-backup'));
        setData(d);
      }
    }
  );

  if (display === false) {
    return (
      <Open Onclick={() => setDisplay(true)}/>
    );
  }

  function saveProject(projectData) {
    const newProject = {name: document.getElementById('backupName').value, data: projectData};
    const d = [...data, newProject];
    setData(d);
    localStorage.setItem('wireflow-backup', JSON.stringify(d));

    document.getElementById('backupName').value = '';
  }

  function loadProject(projectName) {
    const projectData = data.filter((p) => p.name === projectName)[0].data;
    propsAPI.read(projectData);
  }

  function DownloadProject(projectName) {
    const projectData = data.filter((p) => p.name === projectName)[0].data;

    const tmpA = document.createElement('a');
    tmpA.setAttribute("href",     "data:text/json;charset=utf-8," + JSON.stringify(projectData));
    tmpA.setAttribute("download", projectName+".json");
    tmpA.click();
    tmpA.remove();
  }

  function loadFromFile() {
    const file = document.getElementById('loadBackupFile');

    const reader = new FileReader();

    reader.addEventListener('load', function() {
      propsAPI.read(JSON.parse(reader.result));
    });

    reader.readAsText(file.files[0]);
  }

  return (
    <ContextMenu>
      <div className={'backup-container'}>
        <Button
          onClick={() => setDisplay(false)}
          icon={<CloseOutlined/>}
          className={'backup-closeButton'}
        />
        {
          data && data.map((project, id) => (
            <div key={id}>
              <a onClick={(e) => loadProject(e.target.innerText)}>{project.name}</a>
              <Button
              icon={<DownloadOutlined/>}
              onClick={(e) => {DownloadProject(project.name)}}
              />
            </div>
          ))
        }
        <div>
          <input type={'text'} id={'backupName'}/>
          <Save saveAction={saveProject}/>
        </div>
        <div>
          <input type={'file'} id={'loadBackupFile'}/>
          <Button
            onClick={() => loadFromFile()}
            icon={<FolderOpenOutlined/>}
            className={''}
          />
        </div>
      </div>
    </ContextMenu>
  );
};

export default withPropsAPI(Backup);
