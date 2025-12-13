import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${apiUrl}/api/create`, {
      url,
    });
    setShortUrl(data);
    console.log(data);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    //make it false affter two sec
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        URL Shortener
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Make your long URLs short and shareable
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your URL
          </label>
          <input
            type="url"
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            id="url"
            placeholder="https://example.com/very/long/url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )} */}

        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-200 shadow-md hover:shadow-lg">
          Shorten URL
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
          {copied && (
            <p className="text-sm text-gray-600 mb-2">
              Url copied to Clipboard
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
