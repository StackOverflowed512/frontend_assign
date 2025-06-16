<!-- src/lib/components/Modal.svelte -->
<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
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
        class="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
        on:click|self={close}
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
    >
        <div 
            class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 m-4"
            role="document"
        >
            <slot />
        </div>
    </div>
{/if}