import React from "react";
import { HighlightedText } from "./HighlightedText";

function LeftColumn({ text }) {
  return (
    <div className="column-left p-4">
      <p className="text-gray-500 text-lg">{text}</p>
    </div>
  );
}

function RightColumn({ text }) {
  return (
    <div className="column-right p-4">
      <p className="text-gray-500 text-lg">
        <HighlightedText text={text} />
      </p>
    </div>
  );
}

export { LeftColumn, RightColumn };
