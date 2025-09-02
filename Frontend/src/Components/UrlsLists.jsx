import React from "react";
import { useState } from "react";
import { allUrls, deleteUrl} from "../services/urlShortenAPI";
import { useEffect } from "react";

function UrlsLists() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUrls();
  }, []);

  async function getUrls() {
    const respond = await allUrls();
    setData(respond.result);
    setLoading(false);
  }


  if (loading) return <div>Loading...</div>;

  // createdAt: "2025-08-30T14:53:56.485Z";
  // id: "e518d16e-1625-41b1-81a9-914417aa8490";
  // shortCode: "vf_L6x";
  // targetURl: "https://chatgpt.com/";
  // updatedAt: "2025-08-30T14:53:56.406Z";
  // userID: "8f1c274f-e2f5-46c6-9309-9bcc5e6daec3";

  return (
    <>
      <h1>Data</h1>
      <u>
        {data.map((url) => (
          <li key={url.id}> {url.shortCode} <button onClick={()=>{deleteUrl(url.id)}}>delete</button></li>
        ))}
      </u>
    </>
  );
}

export default UrlsLists;
