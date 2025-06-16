<!-- src/lib/components/NoteForm.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import Spinner from './Spinner.svelte';

    export let note = null;
    export let isSubmitting = false;

    const dispatch = createEventDispatcher();
    
    // Initialize form data
    let formData = {
        title: note?.title || '',
        content: note?.content || ''
    };

    $: isEditing = !!note?.id;

    function handleSubmit() {
        // Validate form
        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Title and content are required');
            return;
        }

        // Dispatch form data
        dispatch('submit', {
            ...formData,
            id: note?.id, // Include ID if editing
            createdAt: note?.createdAt || new Date().toISOString()
        });
    }

    function handleCancel() {
        dispatch('close');
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <h2 class="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Note' : 'Create New Note'}
    </h2>

    <div class="space-y-4">
        <div>
            <label for="title" class="block text-sm font-medium mb-1">
                Title
            </label>
            <input
                type="text"
                id="title"
                bind:value={formData.title}
                placeholder="Enter note title"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-sky-500 dark:focus:border-sky-400"
                required
            />
        </div>

        <div>
            <label for="content" class="block text-sm font-medium mb-1">
                Content
            </label>
            <textarea
                id="content"
                bind:value={formData.content}
                placeholder="Enter note content"
                rows="6"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-sky-500 dark:focus:border-sky-400"
                required
            ></textarea>
        </div>
    </div>

    <div class="flex justify-end gap-3 pt-4">
        <button
            type="button"
            on:click={handleCancel}
            class="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
            Cancel
        </button>
        <button
            type="submit"
            disabled={isSubmitting}
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors"
        >
            {#if isSubmitting}
                <Spinner />
                <span class="ml-2">Saving...</span>
            {:else}
                {isEditing ? 'Save Changes' : 'Create Note'}
            {/if}
        </button>
    </div>
</form>