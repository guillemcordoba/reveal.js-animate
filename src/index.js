function nodeHasAnimateValue(node, animateValue) {
  return (
    node.attributes.animate &&
    node.attributes.animate.nodeValue.split(" ").includes(animateValue)
  );
}

export default () => ({
  id: "animate-fragments",
  init: (deck) => {
    const fragments = document.querySelectorAll("fragment");

    for (const fragment of fragments) {
      if (nodeHasAnimateValue(fragment, "balanced")) {
        fragment.innerHTML = fragment.innerHTML.replace(
          /^(.*){(.*)$/gm,
          '<span class="fragment fade-in">$1{$2'
        );
        fragment.innerHTML = fragment.innerHTML.replace(
          /}(.*)$/gm,
          "}$1</span>"
        );
        fragment.innerHTML = fragment.innerHTML.replace(
          /}(.*)$/gm,
          "}$1</span>"
        );
        /* 
        fragment.innerHTML = fragment.innerHTML.replace(
          /\(([^\)])/gm,
          '(<span class="fragment fade-in">$1'
        );
        fragment.innerHTML = fragment.innerHTML.replace(
          /([^\(\)])\)([^\)])/gm,
          "$1</span>)$2"
        );
        fragment.innerHTML = fragment.innerHTML.replace(
          /([^\(])\)\)/gm,
          "$1</span>)</span>)"
        );
        fragment.innerHTML = fragment.innerHTML.replace(
          /\(\)\)/gm,
          "()</span>)"
          );
          */
      }

      if (nodeHasAnimateValue(fragment, "separate-comments")) {
        fragment.innerHTML = fragment.innerHTML.replace(/\/\/(.*)$/gm, '<span class="fragment fade-in">//$1</span>');
      }

      if (nodeHasAnimateValue(fragment, "by-line")) {
        fragment.innerHTML = fragment.innerHTML.replace(
          /^(\ *(?:[^{} \n]+) *[^{}\n]*)$/gm,
          '<span class="fragment fade-in">$1</span>'
        );
      }
    }
  },
});
