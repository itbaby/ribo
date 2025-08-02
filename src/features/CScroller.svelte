<script>
  import alibaba from '../assets/icons-trans/alibaba.png';
  import alo from '../assets/icons-trans/alo.png';
  import cisco from '../assets/icons-trans/cisco.png';
  import colt from '../assets/icons-trans/colt.png';
  import fcn from '../assets/icons-trans/fcn.png';
  import fil from '../assets/icons-trans/fil.png';
  import hitachi from '../assets/icons-trans/hitachi.png';
  import lenovo from '../assets/icons-trans/lenovo.png';
  import tcl from '../assets/icons-trans/tcl.png';
  import { _ } from "svelte-i18n";
</script>

<div class="wrapper">
  <div class="carousel">
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={alibaba} alt="alibaba" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.alibaba.title")}</p>
        <p>{$_("carousel.alibaba.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={alo} alt="alo" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.alo.title")}</p>
        <p>{$_("carousel.alo.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={cisco} alt="cisco" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.cisco.title")}</p>
        <p>{$_("carousel.cisco.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={colt} alt="colt" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.colt.title")}</p>
        <p>{$_("carousel.colt.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={fcn} alt="fcn" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.fcn.title")}</p>
        <p>{$_("carousel.fcn.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={fil} alt="fil" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.fil.title")}</p>
        <p>{$_("carousel.fil.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={hitachi} alt="hitachi" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.hitachi.title")}</p>
        <p>{$_("carousel.hitachi.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={lenovo} alt="lenovo" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.lenovo.title")}</p>
        <p>{$_("carousel.lenovo.description")}</p>
      </div>
    </div>
    <div class="carousel__item">
      <div class="carousel__item-head"><img src={tcl} alt="tcl" /></div>
      <div class="carousel__item-body">
        <p class="title">{$_("carousel.tcl.title")}</p>
        <p>{$_("carousel.tcl.description")}</p>
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
    background-color:var(--color-white);
    width: 120px;
    height: 120px;
    padding: 4px;
    position: relative;
    margin-right: -60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    overflow: hidden;
  }
  .carousel__item-head img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .carousel__item-body {
    width: 100%;
    background-color: var(--color-gray-200);
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
    3%,
    11.11% {
      transform: translateY(100%) scale(0.7);
      opacity: 0.4;
      visibility: visible;
    }
    14.11%,
    22.22% {
      transform: translateY(0) scale(1);
      opacity: 1;
      visibility: visible;
    }
    25.22%,
    33.33% {
      transform: translateY(-100%) scale(0.7);
      opacity: 0.4;
      visibility: visible;
    }
    36.33% {
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
