let AOS: any = null;

export async function initAOS() {
  if (!AOS) {
    const aosModule = await import('aos');
    AOS = aosModule.default;
    AOS.init({
      duration: 1000,
      once: false,
    });
  }
  
  return AOS;
}

export default initAOS;