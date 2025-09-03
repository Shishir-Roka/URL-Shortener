import React from "react";
import { useState } from "react";
import { allUrls, deleteUrl} from "../services/urlShortenAPI";
import { useEffect } from "react";

function UrlsLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUrls();
  }, []);

  async function getUrls() {
    const respond = await allUrls();
    console.log(respond.urls);
    
    if (!respond.error) {
      setData(respond.urls);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    const respond = await deleteUrl(id);
    if (!respond.error) {
      setData(prev => prev.filter(url => url.id !== respond.deletedId));
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Data</h1>
      <ul>
        {data.map((url) => (
          <li key={url.id}>
            {url.shortCode} 
            <button onClick={() => handleDelete(url.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UrlsLists;
