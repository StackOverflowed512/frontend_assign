<!-- src/lib/components/Modal.svelte -->
<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade, scale, fly } from 'svelte/transition';
    import { cubicOut, elasticOut } from 'svelte/easing';
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        on:click|self={close}
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
    >
        <div 
            transition:scale={{duration: 400, easing: elasticOut, start: 0.95}}
            class="relative w-full max-w-lg glass rounded-2xl shadow-2xl shadow-sky-500/20 dark:shadow-sky-400/20 p-6 border border-white/30 dark:border-gray-700/30 overflow-hidden"
            role="document"
        >
            <div class="absolute top-0 right-0 w-64 h-64 -mt-32 -mr-32 bg-gradient-to-br from-sky-400/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10">
                <slot />
            </div>
        </div>
    </div>
{/if}