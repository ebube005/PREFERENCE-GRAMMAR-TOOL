import React, { useState, useRef } from "react";
import "./File.css";
import Cloud from "./clouduploaderr.svg";

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="uploader">
      <div>
        <img src={Cloud} alt="cloud" className="cloud" />
        <p style={{ marginTop: "1rem" }}>
          Drag & drop audio files or{" "}
          <span onClick={handleBrowseClick} className="textupload">
            Browse
          </span>
        </p>
        <p className="format">Supported format: .mp3, .wav, .ogg</p>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {audioFile && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontWeight: "bold" }}>{audioFile.name}</p>
            <audio
              controls
              src={audioUrl}
              style={{ width: "100%", marginTop: "0.5rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
