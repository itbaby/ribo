<script lang="ts">
    import { Fullpage, FullpageSection } from "svelte-fullpage";
    import { _, locale } from "svelte-i18n";
    import CFooter from "./CFooter.svelte";
    const savedFlag = localStorage.getItem("selectedFlag");
    let languages = {
        "fi-us": "en",
        "fi-jp": "jp",
        "fi-cn": "zh",
    };
    locale.set(languages[savedFlag as keyof typeof languages]);
</script>

<div class="flex items-center justify-center w-screen h-screen">
    <Fullpage>
        <FullpageSection
            class="h-screen flex items-center justify-center"
            style="background: url('/src/assets/aboutus.jpg') no-repeat center center; background-size: cover;"
        >
            <div
                class="relative w-10/12 h-80 overflow-hidden flex justify-center"
            >
                <div
                    class="slider__word flex flex-col justify-center items-center"
                >
                    <h1 class="text-5xl mb-10">
                        {$_("carousel.techDrivenFuture")}
                    </h1>
                    <h5>{$_("carousel.techDescription")}</h5>
                </div>
                <div
                    class="slider__word flex flex-col justify-center items-center"
                >
                    <h1 class="text-5xl mb-10">{$_("carousel.talentPool")}</h1>
                    <h5>{$_("carousel.talentDescription")}</h5>
                </div>
                <div
                    class="slider__word flex flex-col justify-center items-center"
                >
                    <h1 class="text-5xl mb-10">{$_("carousel.fullService")}</h1>
                    <h5>{$_("carousel.serviceDescription")}</h5>
                </div>
            </div>
        </FullpageSection>
        <FullpageSection class="h-screen">
            <CFooter />
        </FullpageSection>
    </Fullpage>
</div>

<style>
    .slider__word {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateY(100%);
        animation: slide 12s linear infinite;
        color: #f5f5f5;
    }

    .slider__word:nth-child(2) {
        animation-delay: 4s;
    }

    .slider__word:nth-child(3) {
        animation-delay: 8s;
    }

    @keyframes slide {
        0% {
            transform: translateY(100%);
            opacity: 0.1;
        }
        15% {
            transform: translateY(0);
            opacity: 1;
        }
        30% {
            transform: translateY(0);
            opacity: 1;
        }
        45% {
            transform: translateY(-100%);
            opacity: 1;
        }
        100% {
            transform: translateY(-100%);
            opacity: 0.1;
        }
    }
</style>
