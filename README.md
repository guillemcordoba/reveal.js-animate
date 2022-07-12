# reveal.js-animate

A [Reveal.js](https://revealjs.com/) plugin that adds new animations styles

## Installation

```bash
npm i reveal.js-animate
```

## Usage

Add the plugin:

```html
<script type="module">
  import RevealAnimate from "reveal.js-animate";

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

```html
<section>

<pre>
<code class="rust">
<fragment animate="by-line balanced">
struct Person {
  name: String,
  age: u32
}
</fragment>
</code>
</pre>

</section>
```
