import React, { useEffect, useState } from "react";
import "./App.css";

function removeHighlights(textWithHighlights) {
  const div = document.createElement("div");
  div.innerHTML = textWithHighlights;
  const highlights = div.querySelectorAll(".highlight");
  highlights.forEach((highlight) => {
    const textNode = document.createTextNode(highlight.textContent);
    highlight.parentNode.replaceChild(textNode, highlight);
  });
  return div.innerHTML;
}

function App() {
  const [text, setText] = useState({});

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setText(data);
      })
      .catch((error) => {
        console.error("An error occurs when loading content:", error);
      });
  }, []);

  useEffect(() => {
    const addHighlight = (range) => {
      const span = document.createElement("span");
      span.className = "highlight";

      // Check if the range is valid and contains nodes
      if (range && range.cloneContents().textContent.trim() !== "") {
        span.textContent = range.toString();
        range.deleteContents();
        range.insertNode(span);
      }
    };

    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection.toString().trim() !== "") {
        addHighlight(selection.getRangeAt(0));
        selection.empty();
      }
    };

    const handleClick = (e) => {
      if (e.target.classList.contains("highlight")) {
        const span = e.target;
        const text = document.createTextNode(span.textContent);
        span.parentNode.replaceChild(text, span);
      }
    };

    const columnRight = document.querySelector(".column-right");

    columnRight.addEventListener("mouseup", handleMouseUp);
    columnRight.addEventListener("click", handleClick);

    return () => {
      columnRight.removeEventListener("mouseup", handleMouseUp);
      columnRight.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>{text.textTitle}</h1>
      <table>
        <tr>
          <td className="column-left">
            <p>{removeHighlights(text.textMarked)}</p>
          </td>
          <td className="column-right">
            <p dangerouslySetInnerHTML={{ __html: text.textMarked }}></p>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
