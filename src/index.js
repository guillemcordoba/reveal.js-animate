import { marked } from "marked";

function nodeHasLanguageValue(node, value) {
  return (
    node.attributes.language && node.attributes.language.nodeValue === value
  );
}

function nodeHasAnimateValue(node, animateValue) {
  return (
    node.attributes.animate &&
    node.attributes.animate.nodeValue.split(" ").includes(animateValue)
  );
}

function getParents(elem) {
  // Set up a parent array
  var parents = [];

  // Push each parent element to the array
  for (; elem && elem !== document; elem = elem.parentNode) {
    parents.push(elem);
  }

  // Return our parent array
  return parents;
}

function hasClass(elem, clas) {
  return elem.classList.contains(clas);
}

function addFragmentToParents(elem) {
  // event.fragment = the fragment DOM element
  const parentFragments = getParents(elem).filter((e) =>
    hasClass(e, "fragment")
  );
  for (const el of parentFragments) {
    el.classList.add("current-fragment");
  }
}

function getCurrentFragment() {
  const currentFragmentEls = document.querySelectorAll(".current-fragment");

  let highestIndex = 0;
  let currentFragment = undefined;

  for (const el of currentFragmentEls) {
    if (
      el.hasAttribute("data-fragment-index") &&
      parseInt(el.attributes["data-fragment-index"].value) > highestIndex
    ) {
      currentFragment = el;
      highestIndex = parseInt(el.attributes["data-fragment-index"].value);
    }
  }

  return currentFragment;
}

export default () => ({
  id: "animate-fragments",
  init: async (deck) => {
    deck.on("fragmentshown", (event) => {
      const parents = getParents(event.fragment.parentNode)
      if (
        !parents.some((p) =>
          nodeHasAnimateValue(p, "with-ancestry")
        )
      )
        return;

      addFragmentToParents(event.fragment.parentNode);
    });
    deck.on("fragmenthidden", (event) => {
      const currentFragment = getCurrentFragment();
      if (!currentFragment) return;
      if (
        !getParents(event.fragment.parentNode).some((p) =>
          nodeHasAnimateValue(p, "with-ancestry")
        )
      )
        return;

      addFragmentToParents(currentFragment);
    });

    const fragments = document.querySelectorAll("fragment");

    for (const fragment of fragments) {
      if (nodeHasLanguageValue(fragment, "markdown")) {
        const lines = fragment.innerHTML.split("\n");

        const isEmptyLine = (line) => line.match(/[^\W]/gm);

        const countWhitespaces = (line) => line.search(/[^\ \t]/gm);

        const minWhitespaces = lines
          .filter(isEmptyLine)
          .map(countWhitespaces)
          .reduce((acc, next) => (acc > next ? next : acc), 1000);

        const leadingWhitespacesString = Array(minWhitespaces).fill(" ").join('');

        const leadingWhitespaces = new RegExp(
          `^${leadingWhitespacesString}`,
          "gm"
        );

        const removeLeadingWhitespaces = (line) =>
          line.replace(leadingWhitespaces, "");

        fragment.innerHTML = lines.map(removeLeadingWhitespaces).join("\n");

        fragment.innerHTML = marked.parse(fragment.innerHTML);
      }

      if (nodeHasAnimateValue(fragment, "balanced")) {
        fragment.innerHTML = fragment.innerHTML.replace(
          /^(.*){(.*)$/gm,
          '<span class="fragment fade-in">$1{$2'
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
        fragment.innerHTML = fragment.innerHTML.replace(
          /\/\/(.*)$/gm,
          '<span class="fragment fade-in">//$1</span>'
        );
      }

      if (nodeHasAnimateValue(fragment, "by-line")) {
        if (nodeHasLanguageValue(fragment, "markdown")) {
          fragment.innerHTML = fragment.innerHTML.replace(
            /<li>/gm,
            '<li class="fragment fade-in-then-semi-out">'
          );
          fragment.innerHTML = fragment.innerHTML.replace(
            /<h3([^>]*)*>/gm,
            '<h3 $1 class="fragment fade-in">'
          );
          fragment.innerHTML = fragment.innerHTML.replace(
            /<h2>/gm,
            '<h2 class="fragment fade-in">'
          );
        } else {
          fragment.innerHTML = fragment.innerHTML.replace(
            /^(\ *(?:[^{} \n]+) *[^{}\n]*)$/gm,
            '<span class="fragment fade-in">$1</span>'
          );
        }
      }
    }

    for (const fragment of fragments) {
      /*  if (isNodeLanguageMarkdown(fragment)) {
        fragment.innerHTML = fragment.innerHTML.replace(
          /<li>/gm,
          '<li class="fragment fade-in-then-semi-out">'
        );
      } */
    }
  },
});
