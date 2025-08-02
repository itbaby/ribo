<div class="wrapper">
  <div class="carousel">
    <div class="carousel__item">
      <div class="carousel__item-head">🐳</div>
      <div class="carousel__item-body">
        <p class="title">spouting whale</p>
        <p>Unicode: U+1F433</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐋</div>
      <div class="carousel__item-body">
        <p class="title">whale</p>
        <p>Unicode: U+1F40B</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐬</div>
      <div class="carousel__item-body">
        <p class="title">dolphin</p>
        <p>Unicode: U+1F42C</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐟</div>
      <div class="carousel__item-body">
        <p class="title">fish</p>
        <p>Unicode: U+1F41F</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐠</div>
      <div class="carousel__item-body">
        <p class="title">tropical fish</p>
        <p>Unicode: U+1F420</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐡</div>
      <div class="carousel__item-body">
        <p class="title">blowfish</p>
        <p>Unicode: U+1F421</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🦈</div>
      <div class="carousel__item-body">
        <p class="title">shark</p>
        <p>Unicode: U+1F988</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐙</div>
      <div class="carousel__item-body">
        <p class="title">octopus</p>
        <p>Unicode: U+1F419</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head">🐚</div>
      <div class="carousel__item-body">
        <p class="title">spiral shell</p>
        <p>Unicode: U+1F41A</p>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "tailwindcss";
  $animation-timing: 27s;
  $carousel-items: 9;
  $animation-delay-fraction: calc($animation-timing / $carousel-items);
  $animation-steps-fraction: calc(100 / $carousel-items);
  $slide-change-timing: 3;
  .wrapper {
    background: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .carousel {
    position: relative;
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .carousel__item {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    padding: 0 12px;
    opacity: 0;
    filter: drop-shadow(0 2px 2px #555);
    will-change: transform, opacity;
    animation: carousel-animate-vertical $animation-timing linear infinite;
  }

  @for $i from 1 through ($carousel-items - 1) {
    .carousel__item:nth-child(#{$i}) {
      animation-delay: calc(#{$animation-delay-fraction} * #{$i - 2});
    }
  }

  .carousel__item:last-child {
    animation-delay: calc(-#{$animation-delay-fraction} * 2);
  }

  .carousel__item-head {
    border-radius: 50%;
    background-color:var(--color-gray-900);
    width: 90px;
    height: 90px;
    padding: 14px;
    position: relative;
    margin-right: -45px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
  }

  .carousel__item-body {
    width: 100%;
    background-color: var(--color-gray-400);
    border-radius: 8px;
    padding: 16px 20px 16px 70px;
  }

  .title {
    text-transform: uppercase;
    font-size: 20px;
    margin-top: 10px;
  }

  @keyframes carousel-animate-vertical {
    0% {
      transform: translateY(100%) scale(0.5);
      opacity: 0;
      visibility: hidden;
    }
    #{$slide-change-timing}%,
    #{$animation-steps-fraction}% {
      transform: translateY(100%) scale(0.7);
      opacity: 0.4;
      visibility: visible;
    }
    #{$animation-steps-fraction + $slide-change-timing}%,
    #{$animation-steps-fraction * 2}% {
      transform: translateY(0) scale(1);
      opacity: 1;
      visibility: visible;
    }
    #{($animation-steps-fraction * 2) + $slide-change-timing}%,
    #{$animation-steps-fraction * 3}% {
      transform: translateY(-100%) scale(0.7);
      opacity: 0.4;
      visibility: visible;
    }
    #{($animation-steps-fraction * 3) + $slide-change-timing}% {
      transform: translateY(-100%) scale(0.5);
      opacity: 0;
      visibility: visible;
    }
    100% {
      transform: translateY(-100%) scale(0.5);
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
