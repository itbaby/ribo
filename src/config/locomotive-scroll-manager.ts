import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

export class LocomotiveScrollManager {
  private locoScroll: LocomotiveScroll | null = null;

  init() {
    // 确保DOM已加载
    if (typeof document === 'undefined') return;

    const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement;
    const sections = document.querySelectorAll("[data-section]");

    // 检查必要元素是否存在
    if (!scrollContainer) {
      console.warn('LocomotiveScroll container not found');
      return;
    }

    // 初始化LocomotiveScroll
    this.locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      lerp: 0.25,
      inertia: 0.8,
      getDirection: true,
      multiplier: 0.8,
      class: "is-reveal",
      smoothMobile: true,
    });

    // 更新ScrollTrigger当locomotive更新时
    document.addEventListener("scroll", () => {
      ScrollTrigger.update();
    });

    const locoScroll = this.locoScroll;

    // 同步ScrollTrigger与locomotive
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll!.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll!.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // 为每个section添加动画效果
    sections.forEach((sec) => {
      gsap.to(sec, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          markers: true,
        },
      });
    });

    // 刷新ScrollTrigger
    ScrollTrigger.refresh();

    return this.locoScroll;
  }

  destroy() {
    if (this.locoScroll) {
      this.locoScroll.destroy();
      this.locoScroll = null;
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  getInstance() {
    return this.locoScroll;
  }
}

// 创建并导出一个全局实例
export const locomotiveScrollManager = new LocomotiveScrollManager();