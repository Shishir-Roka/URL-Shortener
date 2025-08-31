import React, { useState } from "react";
import { shortenUrl } from "../services/urlShortenAPI";

function url_Form() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [testCode, setTestCode] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await shortenUrl(url, code);

    setShortUrl(data.shortCode);
    setTestCode(data.shortCode)
  }

  function handleTest() {
  if (!testCode) return;
  window.open(`http://localhost:8000/${testCode}`, '_blank');
}

  return (
    <div>
      <div className="app-container">
        <h1>URL Shortener</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>URL to Shorten</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Custom Code (optional)</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Leave blank for auto-generated"
            />
          </div>

          <button type="submit">Shorten URL</button>
        </form>

        {shortUrl && (
          <div className="message success">
            <p>
              Short URL:{" "}
           
                {shortUrl}
            
            </p>
          </div>
        )}
        {/* 
        {error && (
          <div className="message error">
            <p>{error}</p>
          </div>
        )}
         */}
        <div className="test-section">
          <h2>Test Short URL</h2>
          <div className="flex">
            <input
              type="text"
              value={testCode}
              placeholder="Enter short code"
               onChange={(e) => setTestCode(e.target.value)}
              className="flex-1"
            />
            <button onClick={handleTest} className="test-button">
              Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default url_Form;
