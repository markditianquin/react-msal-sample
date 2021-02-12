import React, { useState, useEffect } from "react";

import { InteractiveBrowserCredential } from "@azure/identity";

import { BlobServiceClient, BlobItem } from "@azure/storage-blob";

import { blobStorageClient } from "./BlobService";
import { BlobUpload } from "./BlobUpload";

interface Prop {}
interface State {
  blobsWeFound: BlobItem[];
  containerUrl: string;
}

export const BlobView = () => {
  const [blobs, setBlobs] = useState({
    blobsWeFound: [],
    containerUrl: "",
  } as State);

  const [isError, setIsError] = useState(true);

  const streamToBuffer = async (
    readableStream: NodeJS.ReadableStream | undefined
  ) => {
    return new Promise((resolve, reject) => {
      const chunks: any = [];
      readableStream?.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream?.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream?.on("error", reject);
    });
  };

  async function blobToString(blob: Blob | undefined): Promise<string> {
    const fileReader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      fileReader.onloadend = (ev: any) => {
        resolve(ev.target!.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob!);
    });
  }

  const saveFile = (blobData: Blob, fileName: string) => {
    let url = window.URL.createObjectURL(blobData);
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const getBlobs = async (
    blobStorageClient: BlobServiceClient,
    containerName: string
  ) => {
    let container = blobStorageClient.getContainerClient(containerName);

    let localBlob = [];

    for await (const blob of container.listBlobsFlat()) {
      localBlob.push(blob);
    }

    setBlobs({
      blobsWeFound: localBlob,
      containerUrl: container.url,
    });
  };

  const onClick = async (fileName: string, containerName: string) => {
    const containerClient = blobStorageClient.getContainerClient(containerName);
    const some = await containerClient.getBlobClient(fileName).download(0);
    //console.log(some);

    if (some.blobBody) {
      saveFile(await some.blobBody, fileName);
    }
  };

  const onDelete = async (fileName: string, containerName: string) => {
    const containerClient = blobStorageClient.getContainerClient(containerName);

    const response = await containerClient.deleteBlob(fileName);

    const newBlobs = blobs.blobsWeFound.filter(
      (blob) => blob.name !== fileName
    );
    setBlobs({ ...blobs, blobsWeFound: newBlobs });
  };

  useEffect(() => {
    const callBlob = async () => {
      try {
        await getBlobs(blobStorageClient, "anothercontainer");
        setIsError(false);
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    };

    callBlob();
  }, []);
  return !isError ? (
    <div>
      <table>
        <thead>
          <tr>
            <th>blob name</th>
            <th>blob size</th>
            <th>download url</th>
          </tr>
        </thead>
        <tbody>
          {blobs.blobsWeFound.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.name}</td>
                <td>{x.properties.contentLength}</td>
                <td>
                  <button onClick={() => onClick(x.name, "anothercontainer")}>
                    Download
                  </button>
                  <button onClick={() => onDelete(x.name, "anothercontainer")}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <BlobUpload />
    </div>
  ) : (
    <div>Please Reload And SignIn</div>
  );
};
