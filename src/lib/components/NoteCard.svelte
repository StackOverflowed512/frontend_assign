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
    class="group glass flex flex-col h-full rounded-xl shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-500 border border-white/20 dark:border-gray-700/20 overflow-hidden transform hover:-translate-y-1"
>
    <div class="p-6 flex-grow space-y-4">
        <h3 class="text-xl font-semibold gradient-text">
            {note.title}
        </h3>
        <div class="prose prose-sm dark:prose-invert max-w-none opacity-90 line-clamp-4">
            {@html note.content.replace(/\n/g, '<br>')}
        </div>
    </div>
    <div class="px-6 py-4 border-t border-slate-200/20 dark:border-gray-700/20 flex justify-between items-center bg-white/50 dark:bg-gray-800/50">
        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">{formattedDate}</p>
        <div class="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <button 
                on:click={() => dispatch('edit', note)} 
                class="font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors flex items-center gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
            </button>
            <button 
                on:click={() => dispatch('delete', note)} 
                class="font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
            </button>
        </div>
    </div>
</div>
{/if}