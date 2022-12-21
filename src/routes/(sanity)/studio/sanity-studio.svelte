<script lang="ts">
  import { renderStudio, createConfig, type StudioProps } from "sanity";

  export let config: StudioProps["config"];
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="noindex" />
  <meta name="referrer" content="same-origin" />
</svelte:head>

<div id="svelte-studio" on:load={(event) => renderStudio(event.target, createConfig(config))}></div>

<style>
  #svelte-studio {
    height: 100vh;
  }

  #svelte-studio > div {
    height: 100%;
  }
</style>