<!-- src/lib/components/NoteCard.svelte -->
<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    export let note;
    const dispatch = createEventDispatcher();

    const formattedDate = new Date(note.createdAt).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted}
<div 
    in:fly={{y: 20, duration: 300}}
    class="group flex flex-col h-full bg-white dark:bg-gray-800/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:border-sky-500/50 dark:hover:border-sky-500/30"
>
    <div class="p-6 flex-grow">
        <h3 class="text-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-blue-400 mb-3">
            {note.title}
        </h3>
        <div class="prose prose-sm dark:prose-invert max-w-none opacity-80 line-clamp-4">
            {@html note.content.replace(/\n/g, '<br>')}
        </div>
    </div>
    <div class="p-4 border-t border-slate-200/50 dark:border-gray-700/50 flex justify-between items-center">
        <p class="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</p>
        <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                on:click={() => dispatch('edit', note)} 
                class="font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
            >
                Edit
            </button>
            <button 
                on:click={() => dispatch('delete', note)} 
                class="font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
                Delete
            </button>
        </div>
    </div>
</div>
{/if}