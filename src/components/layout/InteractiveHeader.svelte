<script lang="ts">
    let { children } = $props<{ children: any }>();
    let y = $state(0);
    let isScrolled = $derived(y > 20);
</script>

<svelte:window bind:scrollY={y} />

<div
    class="sticky top-4 z-50 mb-16 [--header-effective-bleed:min(var(--header-bleed),max(0px,calc(var(--page-gutter)-var(--header-edge-gap))))] w-[calc(100%+var(--header-effective-bleed)*2)] -ml-(--header-effective-bleed)"
>
    <header
        class="mx-auto flex w-full max-w-full transform-gpu items-center justify-between gap-4 rounded-full border font-mono text-md shadow-lg transition-[background-color,border-color,box-shadow,padding] duration-300 ease-out will-change-[background-color,border-color,box-shadow,padding]
    {isScrolled
            ? 'border-brand/50 bg-zinc-950/80 px-4 py-3 shadow-brand/5 backdrop-blur-md sm:px-5 md:px-6'
            : 'border-transparent bg-transparent px-2 py-4 shadow-transparent backdrop-blur-[0px] sm:px-3'}"
    >
        {@render children()}
    </header>
</div>
