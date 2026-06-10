<script lang="ts">
  let { initialPath } = $props<{ initialPath: string }>();
  let currentPath = $state('');
  let navElement: HTMLElement | undefined = $state();
  let linkElements: (HTMLAnchorElement | undefined)[] = [];
  let indicatorLeft = $state(0);
  let indicatorWidth = $state(16);

  const links = [
    { href: '/', label: 'Me' },
    { href: '/uses', label: 'Uses' },
    { href: '/writings', label: 'Writings' },
  ];

  let displayPath = $derived(currentPath || initialPath);
  let activeIndex = $derived(links.findIndex((link) => isActive(link.href, displayPath)));

  function normalizePath(path: string) {
    if (path === '/') return path;
    return path.replace(/\/$/, '');
  }

  function isActive(href: string, path: string) {
    const normalizedPath = normalizePath(path);
    if (href === '/') return normalizedPath === '/';
    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  }

  function updatePath() {
    currentPath = window.location.pathname;
  }

  function updateIndicator() {
    if (!navElement || activeIndex < 0) return;

    const activeLink = linkElements[activeIndex];
    if (!activeLink) return;

    const navRect = navElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    indicatorWidth = Math.min(16, linkRect.width);
    indicatorLeft = linkRect.left - navRect.left + (linkRect.width - indicatorWidth) / 2;
  }

  function registerLink(node: HTMLAnchorElement, index: number) {
    linkElements[index] = node;
    updateIndicator();

    return {
      destroy() {
        linkElements[index] = undefined;
      }
    };
  }

  function handleClick(event: MouseEvent, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    currentPath = href;
  }

  $effect(() => {
    currentPath;
    requestAnimationFrame(updateIndicator);
  });

  $effect(() => {
    document.addEventListener('astro:page-load', updatePath);

    document.fonts?.ready.then(updateIndicator);

    return () => document.removeEventListener('astro:page-load', updatePath);
  });
</script>

<svelte:window onresize={updateIndicator} />

<nav bind:this={navElement} class="relative flex gap-4">
  {#each links as link (link.href)}
    {@const active = isActive(link.href, displayPath)}
    <a
      href={link.href}
      use:registerLink={links.indexOf(link)}
      onclick={(event) => handleClick(event, link.href)}
      class="relative transition-all hover:text-brand {active
        ? 'text-white'
        : 'text-text-main'}"
    >
      {link.label}
    </a>
  {/each}

  <span
    aria-hidden="true"
    class="absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand transition-transform duration-200 ease-out"
    style={`width: ${indicatorWidth}px; transform: translate3d(${indicatorLeft}px, 0, 0);`}
  ></span>
</nav>
