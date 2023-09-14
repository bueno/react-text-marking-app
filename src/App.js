import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    function addHighlight(range) {
      const span = document.createElement("span");
      span.className = "highlight";
      span.textContent = range.toString();
      range.surroundContents(span);
    }

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

    document
      .querySelector(".column-right p")
      .addEventListener("mouseup", handleMouseUp);
    document
      .querySelector(".column-right p")
      .addEventListener("click", handleClick);

    return () => {
      document
        .querySelector(".column-right p")
        .removeEventListener("mouseup", handleMouseUp);
      document
        .querySelector(".column-right p")
        .removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>In a galaxy far, far away....</h1>
      <table>
        <tr>
          <td className="column-left">
            <p>
              Star Wars is a renowned science fiction franchise created by
              George Lucas, set in a distant galaxy where the eternal battle
              between the Sith and Jedi unfolds. The saga, which began in 1977
              with the original film, revolves around iconic characters like
              Luke Skywalker, Princess Leia, and Darth Vader, exploring themes
              of heroism, redemption, and the struggle between good and evil.
              Spanning multiple trilogies, standalone movies, TV series, books,
              and more, Star Wars has left an indelible mark on popular culture,
              captivating fans worldwide with its epic storytelling and rich
              universe.
            </p>
          </td>
          <td className="column-right">
            <p>
              <span className="highlight">Star Wars</span> is a renowned science
              fiction franchise created by George Lucas, set in a distant galaxy
              where the eternal battle between the Sith and Jedi unfolds. The
              saga, which began in 1977 with the original film, revolves around
              iconic characters like
              <span className="highlight">Luke Skywalker</span>,
              <span className="highlight">Princess Leia</span>, and
              <span className="highlight">Darth Vader</span>, exploring themes
              of heroism, redemption, and the struggle between good and evil.
              Spanning multiple trilogies, standalone movies, TV series, books,
              and more, <span className="highlight">Star Wars</span> has left an
              indelible mark on popular culture, captivating fans worldwide with
              its epic storytelling and rich universe.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
