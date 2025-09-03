import React from "react";
import { useState } from "react";
import { allUrls, deleteUrl} from "../services/urlShortenAPI";
import { useEffect } from "react";
import { Link2, Copy, ExternalLink, Check, Trash2, Calendar, BarChart3 } from 'lucide-react';

function UrlsLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    getUrls();
  }, []);

  async function getUrls() {
    const respond = await allUrls();
    if (!respond.error) {
      setData(respond.urls);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    setDeletingId(id);
    const respond = await deleteUrl(id);
    if (!respond.error) {
      setData(prev => prev.filter(url => url.id !== respond.deletedId));
    }
    setDeletingId(null);
  }

  async function handleCopy(shortCode) {
    const shortUrl = `http://localhost:8000/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(shortCode);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  function truncateUrl(url, maxLength = 50) {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Loading your URLs...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your URLs</h1>
          <p className="text-xl text-gray-600">
            Manage all your shortened links in one place
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">URL Collection</h2>
                <p className="text-gray-600 text-sm">
                  {data.length} {data.length === 1 ? 'URL' : 'URLs'} created
                </p>
              </div>
            </div>
          </div>

          {/* URL List */}
          {data.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Link2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs yet</h3>
              <p className="text-gray-600">Create your first shortened URL to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.reverse().map((url) => (
                <div 
                  key={url.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Short URL */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 px-3 py-1 rounded-full">
                          <code className="text-blue-700 font-mono text-sm font-medium">
                            {url.shortCode}
                          </code>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(url.shortCode)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Copy short URL"
                          >
                            {copiedId === url.shortCode ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          <a
                            href={`http://localhost:8000/${url.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Open short URL"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-500" />
                          </a>
                        </div>
                      </div>
                      
                      {/* Original URL */}
                      <p className="text-gray-600 text-sm mb-3 break-all">
                        <span className="font-medium">Target: </span>
                        <a 
                          href={url.targetURl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title={url.targetURl}
                        >
                          {truncateUrl(url.targetURl)}
                        </a>
                      </p>
                      
                      {/* Date Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Created {formatDate(url.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(url.id)}
                      disabled={deletingId === url.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete URL"
                    >
                      {deletingId === url.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlsLists;