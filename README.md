# reveal.js-eliminate-emtpy-lines

A [Reveal.js](https://revealjs.com/) plugin to eliminate line breaks in &lt;pre&gt; tags in lines that don't contain anything other than an html tag.

## Installation

```bash
npm i reveal.js-eliminate-emtpy-lines
```

## Usage

Add the plugin:

```html
  <script type="module">
    import RevealEliminateEmtpyLines from "reveal.js-eliminate-empty-lines";

    import Reveal from "reveal.js";

    let deck = new Reveal({
      plugins: [RevealEliminateEmtpyLines],
    });
    deck.initialize();
  </script>
```

Now you can write this HTML (much easier to read): 

```html
<section>

<pre>
<code class="rust">
<span class="fragment fade-in">
struct Person {
  <span class="fragment fade-in">
  name: String,
  age: u32
  </span>
}
</span>
<span class="fragment fade-in">
struct C;
</span>
</code>
</pre>

</section>
```

And it would be rendered like this:

```html
<section>

<pre><code class="rust"><span class="fragment fade-in visible" data-fragment-index="0">struct Person {
<span class="fragment fade-in visible" data-fragment-index="1">  name: String,
  age: u32</span>
}</span>
<span class="fragment fade-in visible current-fragment" data-fragment-index="2">struct C;</span></code></pre>

</section>
```