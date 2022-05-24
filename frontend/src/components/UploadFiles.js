import React, { useEffect, useState } from "react";
import fileService from "../services/fileService";
import PDF from "../assets/pdf.png";
import WORD from "../assets/word.png";
import EXCEL from "../assets/excel.png";
import JPEG from "../assets/jpeg.png";
import TXT from "../assets/txt.png";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  useEffect(() => {
    fileService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = async () => {
    setProgress(0);

    fileService
      .fileLoad(selectedFiles, (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
      .then((response) => {
        setMessage(response.data.message);
        return fileService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch((err) => {
        console.log(err);
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  return (
    <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}
      <div>
        <label className="btn btn-default">
          <input type="file" onChange={selectFile} multiple />
        </label>
        <label></label>
        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>
      </div>
      <div className="alert alert-warning" role="alert">
        {message}
      </div>
      <table className="table">
        <thead className="bg-dark text-light">
          <tr>
            <th>Icon</th>
            <th>File Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {fileInfos &&
            fileInfos.map((file, index) => (
              <tr key={index}>
                <td>
                  {file.name.ext === ".xls" ? (
                    <img src={EXCEL} alt="" className="logo" />
                  ) : file.name.ext === ".doc" ? (
                    <img src={WORD} alt="" className="logo" />
                  ) : file.name.ext === ".jpeg" ? (
                    <img src={JPEG} alt="" className="logo" />
                  ) : file.name.ext === ".txt" ? (
                    <img src={TXT} alt="" className="logo" />
                  ) : (
                    <img src={PDF} alt="" className="logo" />
                  )}
                </td>
                <td>
                  <a href={file.url}>{file.name} : Download</a>
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadFiles;
