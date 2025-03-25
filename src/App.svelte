<script lang="ts">
  import { switchLanguage } from "./i18n";
  import { isLoading, _ } from "svelte-i18n";
</script>

<main>
  {#if $isLoading}{:else}
    <a href="/">{$_("index")}</a>
    <a href={"#"} on:click={() => switchLanguage("zh")}>中文</a>
    <a href={"#"} on:click={() => switchLanguage("en")}>英文</a>
  {/if}
</main>

<style>
</style>
