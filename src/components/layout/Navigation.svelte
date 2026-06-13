<script lang="ts">
  import { crossfade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let { initialPath } = $props<{ initialPath: string }>();
  let currentPath = $state(initialPath);

  // Subscribe to Astro's page loaded event to update the path
  function updatePath() {
    currentPath = window.location.pathname;
  }

  $effect(() => {
    // When Astro view transitions are enabled, this event fires on navigation
    document.addEventListener('astro:page-load', updatePath);
    return () => document.removeEventListener('astro:page-load', updatePath);
  });

  const [send, receive] = crossfade({
    duration: 300,
    easing: cubicOut,
    fallback(node, params) {
      return {
        duration: 300,
        easing: cubicOut,
        css: (t) => `opacity: ${t}`
      };
    }
  });

  const links = [
    { href: '/', label: 'Me' },
    { href: '/uses', label: 'Uses' },
    { href: '/writings', label: 'Writings' },
  ];

  function isActive(href: string, path: string) {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  }
</script>

<nav class="flex gap-4">
  {#each links as link (link.href)}
    {@const active = isActive(link.href, currentPath)}
    <a
      href={link.href}
      onclick={() => currentPath = link.href}
      class="relative transition-all hover:text-brand {active
        ? 'text-white'
        : 'text-text-main'}"
    >
      {link.label}
      {#if active}
        <span
          in:receive={{ key: 'active-indicator' }}
          out:send={{ key: 'active-indicator' }}
          class="absolute -bottom-2 left-1/2 w-4 h-0.5 bg-brand rounded-full -translate-x-1/2"
        ></span>
      {/if}
    </a>
  {/each}
</nav>
