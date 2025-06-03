<script lang="ts">
  import "./app.css";
  import { switchLanguage } from "./i18n";
  import { isLoading, _ } from "svelte-i18n";
  import IMenu from "./IMenu.svelte";
  import IFooter from "./IFooter.svelte";
  import ICarousel from "./ICarousel.svelte";
  import IScroller from "./IScroller.svelte";
</script>

{#if $isLoading}{:else}
  <div class="flex flex-col">
    <IMenu />
    <IScroller />
    <IFooter />
  </div>
{/if}

<style>
</style>
