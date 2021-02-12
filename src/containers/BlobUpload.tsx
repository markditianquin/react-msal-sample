import React, { useState, useRef } from "react";

import { blobStorageClient } from "./BlobService";

export const BlobUpload = () => {
  const [file, setFile] = useState<FileList | null>({} as FileList); // storing the uploaded file
  // storing the recived file from backend

  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(null); // accesing input element

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setProgess(0);
    if (e) {
      const file = e.target.files; // accessing file
      console.log(file);
      setFile(file); // storing file
    }
  };

  const uploadFile = async (containerName: string) => {
    const containerClient = blobStorageClient.getContainerClient(containerName);

    if (file) {
      for (let i = 0; i < file?.length; i++) {
        console.log(file[i]);
        await containerClient.uploadBlockBlob(
          file[i].name,
          file[i],
          Buffer.byteLength(file[i] as any)
        );
        setProgess((i + 1 / file.length) * 100);
      }
    }

    console.log(el);
  };

  return (
    <div>
      <div className="file-upload">
        <input type="file" ref={el} onChange={handleChange} multiple />
        <progress value={progress} max="100">
          {progress}%
        </progress>
        <button
          onClick={() => {
            uploadFile("anothercontainer");
          }}
          className="upbutton"
        >
          Upload
        </button>
      </div>
    </div>
  );
};
