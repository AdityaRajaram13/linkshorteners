// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('/api/createShortUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create short link');
    }
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="w-full h-12 px-3 py-2 border border-black rounded-md"
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Your short link: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
