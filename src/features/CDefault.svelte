<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import LocomotiveScroll from "locomotive-scroll";
    import CScroller from "./CScroller.svelte";
    import { _, locale } from "svelte-i18n";
    import CText from "./CText.svelte";
    import ISponsor from "./ISponsor.svelte";

    let languages = {
        "fi-us": "en",
        "fi-jp": "jp",
        "fi-cn": "zh",
    };
    locale.set(
        languages[
            localStorage.getItem("selectedFlag") as keyof typeof languages
        ] || "zh",
    );

    gsap.registerPlugin(ScrollTrigger);
    onMount(() => {
        const scrollContainer = document.querySelector(
            "[data-scroll-container]",
        ) as HTMLElement;
        const sections = document.querySelectorAll("[data-section]");

        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            lerp: 0.25,
            inertia: 0.8,
            getDirection: true,
            multiplier: 0.8,
            class: "is-reveal",
            smoothMobile: true,
        });
        document.addEventListener("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy("[data-scroll-container]", {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, {
                          duration: 0,
                          disableLerp: true,
                      })
                    : locoScroll.scroll.y;
            },
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            }),
        });

        // 刷新并设置动画
        ScrollTrigger.refresh();

        // 为每个部分添加动画
        sections.forEach((sec) => {
            // 使用GSAP实现类似AOS zoom-in的效果
            gsap.fromTo(
                sec,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "play reverse play reverse",
                        markers: false,
                    },
                },
            );
        });

        return () => {
            locoScroll.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    });
</script>

<div
    data-scroll-container
    class="bg-gray-900 flex flex-col justify-center justify-around"
>
    <section
        data-section
        data-scroll-section
        class="flex items-center justify-center h-screen bg-cover bg-center md:w-full 0"
        style="background-image: url('/src/assets/aboutus.jpg')"
    >
        <CText />
    </section>
    <section
        data-section
        data-scroll-section
        class="w-full mx-auto bg-cover bg-center flex flex-col items-center justify-center h-[40vh]"
        style="background-image: url('/src/assets/earth.png')"
    >
        <div
            class="text-white  w-10/12 mx-auto text-2xl animate-pulse md:text-4xl text-center"
        >
            {$_("cserve.headline")}
        </div>
        <h2
            class="text-white w-10/12 mx-auto lg:text-2xl animate-pulsemd:text-3xl mt-20 text-center"
        >
            {$_("cserve.subhead")}
        </h2>
    </section>

    <section
        data-section
        data-scroll-section
        class="flex flex-col items-center bg-gray-900 justify-center h-[45vh]"
    >
        <CScroller />
    </section>
    <section
        data-section
        data-scroll-section
        class="flex flex-col text-white bg-gray-700 items-center justify-center h-[65vh]"
    >
        <h1 class="mb-[4vh] text-2xl md:text-4xl">{$_('serviceGlobalClients')}</h1>
        <ISponsor />
    </section>
</div>

<style>
</style>
