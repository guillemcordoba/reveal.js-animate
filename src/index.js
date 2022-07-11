export default () => ({
  id: "fragments-rust",
  init: (deck) => {
    const codes = document.querySelectorAll("code.rust");

    for (const code of codes) {
      code.innerHTML = code.innerHTML.replace(
        /^([^{\n]*){$/gm,
        '<span class="fragment fade-in">$1{'
      );
      code.innerHTML = code.innerHTML.replace(/}/gm, "}</span>");
      code.innerHTML = code.innerHTML.replace(/^([^{}\n]*)$/gm, '<span class="fragment fade-in">$1</span>');
    }
  },
});
