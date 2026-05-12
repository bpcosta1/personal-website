<script lang="ts">
  let { children } = $props<{ children: any }>();
  let y = $state(0);
  let isScrolled = $derived(y > 20);
</script>

<svelte:window bind:scrollY={y} />

<div class="sticky top-4 z-50 mb-16 transition-all duration-300">
  <header
    class="flex items-center justify-between font-mono text-md transition-all duration-300
    {isScrolled
      ? 'bg-zinc-950/80 backdrop-blur-md border border-brand/50 shadow-lg shadow-brand/5 rounded-full px-8 py-3 -mx-8'
      : 'bg-transparent border-transparent px-4 py-4 -mx-16'}"
  >
    {@render children()}
  </header>
</div>
