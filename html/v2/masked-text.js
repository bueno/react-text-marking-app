$(document).ready(function () {
  function addHighlight(range, className) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = range.toString();
    range.surroundContents(span);
  }

  function clearSelections() {
    $(".column-right p .default-highlight").each(function () {
      $(this).replaceWith($(this).text());
    });
  }

  $("#searchField").on("input", function () {
    const query = $(this).val().trim();
    const $pElements = $(".column-right p");

    if (query !== "") {
      $pElements.each(function () {
        const content = $(this).text();
        const regex = new RegExp(query, "gi");
        const markedContent = content.replace(
          regex,
          '<span class="default-highlight">$&</span>'
        );
        $(this).html(markedContent);
      });
    }
  });

  $("#markButton").click(function () {
    $(".column-right p .default-highlight").toggleClass("black-highlight");
    $("#searchField").val(""); // Limpa o campo de busca
  });

  $("#clearSelections").click(function () {
    clearSelections();
    $("#searchField").val(""); // Limpa o campo de busca
  });

  $(".column-right p").mouseup(function () {
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const isAlreadyMarked =
        $(range.commonAncestorContainer).closest(
          ".default-highlight.black-highlight"
        ).length > 0;
      if (!isAlreadyMarked) {
        addHighlight(range, "black-highlight");
        selection.empty();
      }
    }
  });

  $(".column-right p").on("click", ".black-highlight", function () {
    $(this).replaceWith($(this).text());
  });
});
