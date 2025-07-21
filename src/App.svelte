<script lang="ts">
  import "./app.css";
  import { switchLanguage } from "./i18n";
  import { isLoading, _ } from "svelte-i18n";
  import IMenu from "./IMenu.svelte";
  import IFooter from "./IFooter.svelte";
  import ICarousel from "./ICarousel.svelte";

</script>

{#if $isLoading}{:else}
  <div class="flex flex-col" > 
    <div class="fixed w-full top-0 z-50">
      <IMenu />
    </div>
    <ICarousel/>
    <IFooter />
  </div>
{/if}

<style>
</style>
