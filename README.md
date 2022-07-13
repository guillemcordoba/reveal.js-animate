# reveal.js-animate-fragments

A [Reveal.js](https://revealjs.com/) plugin that adds new animations styles

## Installation

```bash
npm i reveal.js-animate-fragments
```

## Usage

Add the plugin:

```html
<script type="module">
  import RevealAnimate from "reveal.js-animate-fragments";

  import Reveal from "reveal.js";

  let deck = new Reveal({
    plugins: [RevealAnimate],
  });
  deck.initialize();
</script>
```

Animate options:

- Balanced: whenever an opening delimiter is encountered, add the fragment with the balanced closing delimiter to the same animation fragment set as its corresponding opening line.

- By-line: splits each line of text (as rendered) from a block of html at the newlines
 - Wraps each line in a separate fragment

- Separate comments
 - Whenever a line includes both non-comment code and a comment, the line is broken into two fragments

- with-ancestry: all parent fragemnts are also visible

```html
<section animate="by-line balanced separate-comments with-ancestry">
<pre>
<code class="rust">
struct Person {
  name: String, // Comment!
  age: u32
}
</code>
</pre>
</section>

<section language="markdown" animate="by-line with-ancestry">
- point 1
  - point 1b
- point 2   
</section>
```
