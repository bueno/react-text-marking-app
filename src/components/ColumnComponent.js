import React from "react";

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
      <p
        className="text-gray-500 text-lg"
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
    </div>
  );
}

export { LeftColumn, RightColumn };
