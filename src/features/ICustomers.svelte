<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  import { images } from './images';
  
  const imagePaths = images.map(img => img.src);

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationId: number;
  let loadingComplete = false;
  let loadedImages = 0;

  class Utilities {
    static norm(value: number, min: number, max: number): number {
      return (value - min) / (max - min);
    }

    static lerp(norm: number, min: number, max: number): number {
      return (max - min) * norm + min;
    }

    static map(value: number, sourceMin: number, sourceMax: number, destMin: number, destMax: number): number {
      return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
    }

    static clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    }

    static distance(x0: number, y0: number, x1: number, y1: number): number {
      const dx = x1 - x0;
      const dy = y1 - y0;
      return Math.sqrt(dx * dx + dy * dy);
    }

    static randomRange(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    static randomInt(min: number, max: number): number {
      return Math.floor(min + Math.random() * (max - min + 1));
    }

    static degreesToRads(degrees: number): number {
      return degrees / 180 * Math.PI;
    }

    static radsToDegrees(radians: number): number {
      return radians * 180 / Math.PI;
    }
  }

  class Shape {
    x: number = 0;
    y: number = 0;
    xIndex: number;
    yIndex: number;
    index: number;
    radius: number;
    numberOfShape: number;
    size: number;
    image: HTMLImageElement;
    ratio: number = 0;
    displayed: boolean = true;
    ctx: CanvasRenderingContext2D;
    xRadian: number = 0;
    yRadian: number = 0;

    constructor(params: any) {
      this.ctx = params.c;
      this.xIndex = params.x;
      this.yIndex = params.y;
      this.index = params.i;
      this.radius = params.r;
      this.numberOfShape = params.n;
      this.size = params.s;
      this.image = new Image();
      this.image.crossOrigin = "anonymous";
      this.image.src = params.p;
      this.initialize();
    }

    initialize() {
      this.xRadian = Math.PI * 2 / this.numberOfShape * this.xIndex;
      this.yRadian = Math.PI * 2 / this.numberOfShape * this.yIndex;
    }

    updateParams(infos: any) {
      this.x = Math.sin(this.xRadian + infos.delta.x) * this.radius;
      this.y = Math.cos(this.yRadian + infos.delta.y) * this.radius;
      this.ratio = this.getNormalizedDist(infos);
    }

    getNormalizedDist(infos: any): number {
      let tmp = Math.sqrt(this.x * this.x + this.y * this.y) / this.radius;
      tmp = this.ease(tmp);
      tmp = 1 - Math.min(tmp, 1);
      return tmp;
    }

    ease(t: number): number {
      return t * t * t;
    }

    draw(infos: any) {
      this.updateParams(infos);

      if (Math.sin(this.yRadian + infos.delta.y) > 0 || Math.cos(this.xRadian + infos.delta.x) > 0) {
        this.displayed = false;
        return;
      }

      this.displayed = true;

      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.scale(this.ratio, this.ratio);
      this.ctx.translate(-this.x, -this.y);

      this.ctx.globalAlpha = this.ratio;
      this.ctx.drawImage(
        this.image,
        this.image.width / 2 - this.size / 2,
        this.image.height / 2 - this.size / 2,
        this.size,
        this.size,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      this.ctx.restore();
    }
  }

  class Gallery {
    shapes: Shape[] = [];
    width: number;
    height: number;
    radius: number = 0;
    numberOfShape: number = 16;
    size: number = 0;
    focus = { x: 0, y: 0, s: 0 };
    touchInfos = {
      mouse: { x: 0, y: 0 },
      delta: { x: 0, y: 0 }
    };
    isDisplayed: boolean = false;
    isDeleating: boolean = false;
    hover: boolean = false;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.initialize();
    }

    ctx: CanvasRenderingContext2D;

    initialize() {
      const edge = Math.max(this.width, this.height);
      this.radius = edge / 2;
      this.size = this.radius / (this.numberOfShape / 6);
      this.setupShapes();
      this.focus.s = this.size;
    }

    setupShapes() {
      this.shapes = [];
      let index = 0;
      
      for (let x = 0; x < this.numberOfShape; x++) {
        for (let y = 0; y < this.numberOfShape; y++) {
          const params = {
            x: x,
            y: y,
            i: index++,
            c: this.ctx,
            s: this.size,
            r: this.radius,
            n: this.numberOfShape,
            p: imagePaths[Math.floor(Math.random() * imagePaths.length)]
          };

          const s = new Shape(params);
          this.shapes.push(s);
        }
      }
    }

    isHovered(shape: Shape, x: number, y: number): boolean {
      return shape.displayed === true &&
        x > shape.x - this.size / 2 * shape.ratio &&
        x < shape.x + this.size / 2 * shape.ratio &&
        y > shape.y - this.size / 2 * shape.ratio &&
        y < shape.y + this.size / 2 * shape.ratio;
    }

    drawFocus(s: Shape | undefined, hover: boolean) {
      if (!s) return;
      
      if (hover === false) {
        this.focus.s += (0 - this.focus.s) * 0.16;
        this.focus.x += (this.touchInfos.mouse.x - this.focus.x) * 0.16;
        this.focus.y += (this.touchInfos.mouse.y - this.focus.y) * 0.16;

        this.ctx.save();
        this.ctx.strokeStyle = '#FE296D';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(this.focus.x - this.focus.s / 2, this.focus.y - this.focus.s / 2, this.focus.s, this.focus.s);
        this.ctx.restore();
      } else {
        this.focus.s += (this.size * s.ratio - this.focus.s) * 0.16;
        this.focus.x += (s.x - this.focus.x) * 0.16;
        this.focus.y += (s.y - this.focus.y) * 0.16;

        this.ctx.save();
        this.ctx.strokeStyle = '#FE296D';
        this.ctx.lineWidth = 5 * s.ratio;
        this.ctx.strokeRect(this.focus.x - this.focus.s / 2, this.focus.y - this.focus.s / 2, this.focus.s, this.focus.s);
        this.ctx.restore();
      }
    }

    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.save();
      this.ctx.translate(this.width / 2, this.height / 2);

      let hoveredIndex: number | undefined;
      
      for (let i = 0; i < this.shapes.length; i++) {
        const s = this.shapes[i];
        s.draw(this.touchInfos);

        if (this.isHovered(s, this.touchInfos.mouse.x, this.touchInfos.mouse.y)) {
          this.hover = true;
          hoveredIndex = i;
        }
      }

      if (hoveredIndex !== undefined) {
        this.drawFocus(this.shapes[hoveredIndex], this.hover);
      }

      this.ctx.restore();
    }

    handleMouseMove(e: MouseEvent, rect: DOMRect) {
      this.touchInfos.mouse.x = (e.clientX - rect.left) / this.width * this.width - this.width / 2;
      this.touchInfos.mouse.y = (e.clientY - rect.top) / this.height * this.height - this.height / 2;
    }

    handleWheel(e: WheelEvent) {
      this.touchInfos.delta.x += e.deltaX * 0.0005;
      this.touchInfos.delta.y += e.deltaY * 0.0005;
    }

    handleClick(e: MouseEvent, rect: DOMRect) {
      const x = (e.clientX - rect.left) / this.width * this.width - this.width / 2;
      const y = (e.clientY - rect.top) / this.height * this.height - this.height / 2;

      for (let i = 0; i < this.shapes.length; i++) {
        const s = this.shapes[i];
        if (this.isHovered(s, x, y)) {
          // Handle image click
          console.log('Image clicked:', i);
          break;
        }
      }
    }

    resize(width: number, height: number) {
      this.width = width;
      this.height = height;
      const edge = Math.max(this.width, this.height);
      this.radius = edge / 2;
      this.size = this.radius / (this.numberOfShape / 6);
      this.setupShapes();
      this.focus.s = this.size;
    }
  }

  let gallery: Gallery;

  function handleResize() {
    if (canvas && gallery) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gallery.resize(rect.width, rect.height);
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (gallery && canvas) {
      const rect = canvas.getBoundingClientRect();
      gallery.handleMouseMove(e, rect);
    }
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    if (gallery) {
      gallery.handleWheel(e);
    }
  }

  function handleClick(e: MouseEvent) {
    if (gallery && canvas) {
      const rect = canvas.getBoundingClientRect();
      gallery.handleClick(e, rect);
    }
  }

  function animate() {
    if (gallery) {
      gallery.render();
      animationId = requestAnimationFrame(animate);
    }
  }

  onMount(() => {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      ctx = canvas.getContext('2d')!;
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Preload images
      let loadedCount = 0;
      imagePaths.forEach(src => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imagePaths.length) {
            loadingComplete = true;
            gallery = new Gallery(ctx, canvas.width, canvas.height);
            animate();
          }
        };
        img.src = src;
      });

      window.addEventListener('resize', handleResize);
    }
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', handleResize);
  });



</script>

<div class="gallery-container">
  <canvas 
    bind:this={canvas}
    class="gallery-canvas"
    aria-label="Interactive image gallery"
    role="img"
    on:mousemove={handleMouseMove}
    on:wheel={handleWheel}
    on:click={handleClick}
  ></canvas>
  
  {#if !loadingComplete}
    <div class="loading">
      <div class="loading-container">
        <p class="counter">Loading...</p>
        <div class="line"></div>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .gallery-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #01012a;
  }

  .gallery-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }

  .loading {
    z-index: 9999;
    background: #01012a;
    color: #33def4;
    text-align: center;
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    visibility: visible;
    transition: opacity 0.8s ease;
  }

  .loading-container {
    position: relative;
    width: 200px;
  }

  .counter {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: monospace;
  }

  .line {
    height: 2px;
    background: #33def4;
    width: 0%;
    transition: width 0.3s ease;
  }

  .line.loaded {
    width: 100%;
  }
</style>