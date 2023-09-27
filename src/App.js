import React, { useEffect, useState } from "react";
import "./App.css";
import { LeftColumn, RightColumn } from "./components/ColumnComponent"; 
import { RemoveHighlights } from "./components/HighlightedText";

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

  return (
    <div className="container mx-auto font-sans bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1 className="text-center text-3xl text-gray-700 font-bold p-4 mb-5">
        {text.textTitle}!
      </h1>
      <div className="flex flex-col md:flex-row">
        <LeftColumn text={RemoveHighlights(text.textMarked)} />
        <RightColumn text={text.textMarked} />
      </div>
    </div>
  );
}

export default App;
