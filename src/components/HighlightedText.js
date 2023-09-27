import React, { useEffect } from "react";

export function HighlightedText({ text }) {
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
  }, [text]);

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export function RemoveHighlights(textWithHighlights) {
	const div = document.createElement("div");
	div.innerHTML = textWithHighlights;
	const highlights = div.querySelectorAll(".highlight");
	highlights.forEach((highlight) => {
		const textNode = document.createTextNode(highlight.textContent);
		highlight.parentNode.replaceChild(textNode, highlight);
	});
	return div.innerHTML;
}
