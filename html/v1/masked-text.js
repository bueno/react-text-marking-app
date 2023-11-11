$(document).ready(function () {
  function addHighlight(range) {
    const span = document.createElement("span");
    span.className = "highlight";
    span.textContent = range.toString();
    range.surroundContents(span);
  }

  $(".column-right p").mouseup(function () {
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      addHighlight(selection.getRangeAt(0));
      selection.empty();
    }
  });

  $(".column-right p").on("click", ".highlight", function () {
    $(this).replaceWith($(this).text());
  });
});
