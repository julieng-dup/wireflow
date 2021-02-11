import React, {useState, useEffect} from "react";
import {ContextMenu, withPropsAPI} from "gg-editor";

import './style.css';
import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
  SaveOutlined
} from "@ant-design/icons";
import Button from "antd/es/button";
import Open from "./Open";
import * as htmlToImage from "html-to-image";

const Backup = (props) => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState(null);

  const {propsAPI} = props;

  useEffect(() => {
      if (data === null) {
        const d = localStorage.getItem('wireflow-backup') === null ? [] : JSON.parse(localStorage.getItem('wireflow-backup'));
        setData(d);
      }
    }, [data]);

  if (display === false) {
    return (
      <Open Onclick={() => setDisplay(true)}/>
    );
  }

  function saveProject() {
    const projectData = propsAPI.save();
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

  function DeleteProject(projectName) {
    if(window.confirm('Are you sure to delete ' + projectName + ' ?')) {
      const d = data.filter((p) => p.name !== projectName);
      setData(d);
      localStorage.setItem('wireflow-backup', JSON.stringify(d));
    }
  }

  function loadFromFile() {
    const file = document.getElementById('loadBackupFile');

    const reader = new FileReader();

    reader.addEventListener('load', function() {
      propsAPI.read(JSON.parse(reader.result));
    });

    reader.readAsText(file.files[0]);
  }

  function exportToImage() {
    htmlToImage
      .toJpeg(document.getElementById('canvas_1'), { quality: 1 })
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'wireflow.jpg';
        link.href = dataUrl;
        link.click();
        link.remove();
      });
  }

  return (
    <ContextMenu>
      <div className={'backup-container'}>
        <h2>Load existing project</h2>
        <Button
          onClick={() => setDisplay(false)}
          icon={<CloseOutlined/>}
          className={'backup-closeButton'}
        />
        {
          data && data.map((project, id) => (
            <div key={id} className={'backup-project'}>
              <Button
                icon={<DeleteOutlined/>}
                onClick={(e) => {DeleteProject(project.name)}}
              />
              <Button
              icon={<DownloadOutlined/>}
              onClick={(e) => {DownloadProject(project.name)}}
              />
              <a href={''} onClick={(e) => loadProject(e.target.innerText)}>{project.name}</a>
            </div>
          ))
        }
        <h2>Save as new project</h2>
        <div>
          <input type={'text'} id={'backupName'}/>
          <Button
            onClick={() => saveProject()}
            icon={<SaveOutlined/>}
          />
        </div>
        <h2>Save as image</h2>
        <div>
          <Button
            onClick={() => exportToImage()}
            icon={<FileImageOutlined/>}
          />
        </div>
        <h2>Load project from file</h2>
        <div>
          <input type={'file'} id={'loadBackupFile'}/>
          <Button
            onClick={() => loadFromFile()}
            icon={<FolderOpenOutlined/>}
          />
        </div>
      </div>
    </ContextMenu>
  );
};

export default withPropsAPI(Backup);
