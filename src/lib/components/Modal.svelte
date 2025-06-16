<!-- src/lib/components/Modal.svelte -->
<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { browser } from '$app/environment';

    export let show = false;
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    function handleKeydown(e) { 
        if (e.key === 'Escape') close(); 
    }

    onMount(() => {
        if (browser) {
            window.addEventListener('keydown', handleKeydown);
        }
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('keydown', handleKeydown);
        }
    });
</script>

{#if show}
    <div
        transition:fade={{ duration: 200 }}
        class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        on:click|self={close}
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
    >
        <div 
            transition:scale={{duration: 200, easing: cubicOut, start: 0.95}}
            class="relative w-full max-w-lg bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl backdrop-blur-xl border border-slate-200/50 dark:border-gray-700/50 p-6"
            role="document"
        >
            <slot />
        </div>
    </div>
{/if}