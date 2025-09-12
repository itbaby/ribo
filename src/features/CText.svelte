<script>
    import { _, locale } from "svelte-i18n";
</script>

<div class="text-container w-full min-h-screen text-white flex flex-col md:block">
    <div class="content-item mb-8 md:mb-0 md:w-5/12 md:h-[3vh]">
        <h1 class="text-lg md:text-4xl font-bold mb-2">{$_("carousel.techDrivenFuture")}</h1>
        <p class="text-sm md:text-base">{$_("carousel.techDescription")}</p>
    </div>
    <div class="content-item mb-8 md:mb-0 md:w-5/12 md:h-[3vh]">
        <h1 class="text-lg md:text-4xl font-bold mb-2">{$_("carousel.talentPool")}</h1>
        <p class="text-sm md:text-base">{$_("carousel.talentDescription")}</p>
    </div>
    <div class="content-item mb-8 md:mb-0 md:w-5/12 md:h-[3vh]">
        <h1 class="text-lg md:text-4xl font-bold mb-2">{$_("carousel.fullService")}</h1>
        <p class="text-sm md:text-base">{$_("carousel.serviceDescription")}</p>
    </div>
</div>

<style>
    .text-container {
        font-weight: bold;
        position: relative;
        overflow: hidden;
        padding: 2rem;
        justify-content: center;
        align-items: center;
    }

    /* Mobile styles - stack vertically */
    @media (max-width: 768px) {
        .content-item {
            opacity: 1;
            position: relative;
            animation: none;
        }
    }

    /* Desktop styles - animated positioning */
    @media (min-width: 769px) {
        .text-container {
            font-size: 36px;
        }
        
        .content-item {
            animation: come2life linear 10s infinite;
            transform-origin: center center;
            opacity: 0;
            position: absolute;
            backface-visibility: hidden;
        }

        .content-item:nth-child(1) {
            left: 15vw;
            top: 20vh;
            animation-delay: 0s;
        }

        .content-item:nth-child(2) {
            left: 60vw;
            top: 30vh;
            animation-delay: 4s;
        }

        .content-item:nth-child(3) {
             left: 40vw;
             top: 50vh;
             animation-delay: 8s;
         }
     }

    @keyframes come2life {
        0% {
            transform: scale3d(0, 0, 1) rotate(0.02deg);
            opacity: 0;
            filter: blur(10px);
        }
        25% {
            transform: scale3d(1, 1, 1) rotate(0.02deg);
            opacity: 1;
            filter: blur(0px);
        }
        40% {
            opacity: 1;
            filter: blur(0px);
        }

        80% {
            opacity: 0;
        }

        100% {
            transform: scale3d(4, 4, 1) rotate(0.02deg);
            filter: blur(10px);
        }
    }
</style>
