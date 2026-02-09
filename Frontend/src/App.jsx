import "./App.css";
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import axios from "axios";
import Editor from "react-simple-code-editor";
import ReactMarkdown from "react-markdown";

// ✅ READ API BASE URL FROM ENV
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(`// Write your code here...`);
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ai/get-review`,
        { code }
      );

      console.log("API Response:", response.data);

      if (response.data?.response) {
        setReview(response.data.response);
      } else {
        setReview("No response received.");
      }
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("Error fetching review.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  }

  async function pasteFromClipboard() {
    const text = await navigator.clipboard.readText();
    setCode(text);
  }

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Reviewing your code...</p>
        </div>
      ) : (
        <main>
          <div className="left">
            <h2 className="heading">✍️ Write & Paste Your Code Here</h2>
            <div className="code">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.javascript, "javascript")
                }
                padding={10}
                style={{
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 16,
                  color: "white",
                  borderRadius: "8px",
                  minHeight: "200px",
                  width: "100%",
                  overflowX: "auto",
                  background: "transparent",
                }}
              />
            </div>

            <div className="button-container">
              <button className="copy" onClick={copyToClipboard}>
                Copy Code
              </button>
              <button className="paste" onClick={pasteFromClipboard}>
                Paste Code
              </button>
              <button className="review" onClick={reviewCode}>
                Review
              </button>
            </div>
          </div>

          <div className="right">
            <h2 className="heading">🔍 Your AI Review Response</h2>
            <div className="markdown-output">
              <ReactMarkdown>
                {review || "Waiting for review..."}
              </ReactMarkdown>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
