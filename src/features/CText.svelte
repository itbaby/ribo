<script>
    import { _, locale } from "svelte-i18n";
</script>

<div class="text-container w-full h-screen text-white">
    <div class="w-5/12 h-[3vh]">
        <h1>{$_("carousel.techDrivenFuture")}</h1>
        <p>{$_("carousel.techDescription")}</p>
    </div>
    <div class="w-5/12 h-[3vh]">
        <h1>{$_("carousel.talentPool")}</h1>
        <p>{$_("carousel.talentDescription")}</p>
    </div>
    <div class="w-5/12 h-[3vh]">
        <h1>{$_("carousel.fullService")}</h1>
        <p>{$_("carousel.serviceDescription")}</p>
    </div>
</div>

<style>
    .text-container {
        font-weight: bold;
        font-size: 36px;
        position: relative;
        overflow: hidden;
    }

    .text-container > div {
        animation: come2life linear 10s infinite;
        transform-origin: center center;
        opacity: 0;
        position: absolute;
        backface-visibility: hidden;
    }

    .text-container > div:nth-child(1) {
        left: 15vw;
        top: 20vh;
        animation-delay: 0s;
    }

    .text-container > div:nth-child(2) {
        left: 60vw;
        top: 30vh;
        animation-delay: 4s;
    }

    .text-container > div:nth-child(3) {
        left: 40vw;
        top: 50vh;
        animation-delay: 8s;
    }

    .text-container > div:nth-child(4) {
        left: 30vw;
        top: 70vh;
        animation-delay: 6s;
    }

    .text-container > div:nth-child(5) {
        left: 70vw;
        top: 60vh;
        animation-delay: 2s;
    }

    @keyframes come2life {
        0% {
            transform: scale3d(0, 0, 1) rotate(0.02deg);
            opacity: 0;
            filter: blur(5px);
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
            opacity: 0;
            filter: blur(5px);
        }
    }
</style>
