declare module 'locomotive-scroll' {
  interface CustomOptions {
    el?: HTMLElement | string;
    smooth?: boolean;
    lerp?: number;
    inertia?: number;
    getDirection?: boolean;
    multiplier?: number;
    class?: string;
    smoothMobile?: boolean;
  }
  
  interface CustomInstance {
    on: (event: string, callback: Function) => void;
    update: () => void;
    destroy: () => void;
    scrollTo: (target: any, options?: {duration?: number, disableLerp?: boolean}) => void;
    scroll: {
      y: number;
    };
  }

  class LocomotiveScroll implements CustomInstance {
    constructor(options?: CustomOptions);
    on: (event: string, callback: Function) => void;
    update: () => void;
    destroy: () => void;
    scrollTo: (target: any, options?: {duration?: number, disableLerp?: boolean}) => void;
    scroll: {
      y: number;
    };
  }

  export default LocomotiveScroll;
}
