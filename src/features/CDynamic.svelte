<script>
  import { onMount, onDestroy } from 'svelte';

  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const phrases = [
    '你好,',
    'sooner or later',
    'you\'re going to realize',
    'just as I did',
    'that there\'s a difference',
    'between knowing the path',
    'and walking the path'
  ];

  let frame = 0;
  let frameRequest;
  let counter = 0;
  let output = '';
  let queue = [];

  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const setText = (newText) => {
    const oldText = output;
    const length = Math.max(oldText.length, newText.length);
    queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
  };

  const update = () => {
    let newOutput = '';
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      let { from, to, start, end } = queue[i];
      if (frame >= end) {
        complete++;
        newOutput += to;
      } else if (frame >= start) {
        newOutput += `<span class="dud">${randomChar()}</span>`;
      } else {
        newOutput += from;
      }
    }

    output = newOutput;

    if (complete === queue.length) {
      setTimeout(next, 800);
    } else {
      frameRequest = requestAnimationFrame(update);
      frame++;
    }
  };

  const next = () => {
    setText(phrases[counter]);
    counter = (counter + 1) % phrases.length;
  };

  onMount(() => {
    next();
  });

  onDestroy(() => {
    cancelAnimationFrame(frameRequest);
  });
</script>

<div class="container mt-20 text-white">
  <div class="text">{@html output}</div>
</div>

<style>
  .dud {
    opacity: 0.5;
  }
</style>
