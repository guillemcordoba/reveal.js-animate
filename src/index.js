export default () => ({
  id: "animate",
  init: (deck) => {
    const codes = document.querySelectorAll(".balanced");

    for (const code of codes) {
      code.innerHTML = code.innerHTML.replace(
        /^(.*){(.*)$/gm,
        '<span class="fragment fade-in">$1{$2'
      );
      code.innerHTML = code.innerHTML.replace(/}(.*)$/gm, "}$1</span>");
      code.innerHTML = code.innerHTML.replace(
        /\(([^\)])/gm,
        '(<span class="fragment fade-in">$1'
      );
      code.innerHTML = code.innerHTML.replace(/([^\(\)])\)([^\)])/gm, "$1</span>)$2");
      code.innerHTML = code.innerHTML.replace(/([^\(])\)\)/gm, "$1</span>)</span>)");
      code.innerHTML = code.innerHTML.replace(/\(\)\)/gm, "()</span>)");
    }

    const byLines = document.querySelectorAll(".by-line");

    for (const byLine of byLines) {
      byLine.innerHTML = byLine.innerHTML.replace(
        /^(\ *(?:[^{} \n]+) *[^{}\n]*)$/gm,
        '<span class="fragment fade-in">$1</span>'
      );
    }
  },
});
