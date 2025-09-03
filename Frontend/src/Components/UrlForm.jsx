import React, { useState } from "react";
import { shortenUrl } from "../services/urlShortenAPI";
import { Link2, Copy, ExternalLink, Check } from 'lucide-react';

function UrlForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(null);
  const [testCode, setTestCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setShortUrl("");
    setIsLoading(true);
    
    try {
      const respond = await shortenUrl(url, code);
      console.log(respond.data.shortCode);

      const generatedUrl = `http://localhost:8000/${respond.data.shortCode}`;
      setShortUrl(generatedUrl);
      setTestCode(respond.data.shortCode);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  }

  function handleTest() {
    if (!testCode) return;
    window.open(`http://localhost:8000/${testCode}`, "_blank");
  }

  async function handleCopy() {
    if (!shortUrl) return;
    
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Link2 className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">URL Shortener</h1>
          <p className="text-gray-600 text-sm">Transform long URLs into short, shareable links</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            URL to Shorten
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/path"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Custom Code
            <span className="text-gray-500 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="my-custom-code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank for auto-generated code
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Shortening...
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Shorten URL
            </>
          )}
        </button>
      </div>

      {/* Success Result */}
      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 mb-2">Short URL Created!</p>
              <div className="flex items-center gap-2 bg-white p-3 rounded border">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-blue-600 hover:text-blue-800 font-medium truncate"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Test Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Short URL</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={testCode}
            placeholder="Enter short code to test"
            onChange={(e) => setTestCode(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <button
            onClick={handleTest}
            disabled={!testCode}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Test
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Enter a short code to test if it redirects properly
        </p>
      </div>
    </div>
  );
}

export default UrlForm;



