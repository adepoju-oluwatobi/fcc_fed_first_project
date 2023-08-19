import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF"); // Default background color

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);

      // Update background color and set text color to match
      setBackgroundColor(getRandomColor());
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FFA5", "#334CFF", "#FF33F7", "#abc123"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div style={{ backgroundColor, color: backgroundColor }} id="container">
      <div id="quote-box" className="text-center">
        <p id="text">
          {quote}
        </p>
        <p id="author">- {author}</p>
        <button id="new-quote" onClick={handleNewQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote}" - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}

export default App;
