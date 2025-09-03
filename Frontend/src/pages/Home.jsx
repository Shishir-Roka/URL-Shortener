import React from 'react'
import UrlForm from '../Components/URLForm.jsx'
import UrlsLists from '../Components/UrlsLists.jsx'

function Home() {
return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">URL Shortener</h1>
          <p className="text-xl text-gray-600">Create short, memorable links in seconds</p>
        </div>
        
        <UrlForm />
        <UrlsLists />
      </div>
    </div>
  );
}

export default Home
