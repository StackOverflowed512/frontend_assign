<!-- src/lib/components/NoteForm.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
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
    <h2 class="text-2xl font-bold mb-6 gradient-text inline-block">
        {isEditing ? 'Edit Note' : 'Create New Note'}
    </h2>

    <div class="space-y-4">
        <div in:fly={{y: 10, duration: 200, delay: 100}}>
            <label for="title" class="block text-sm font-medium mb-1">
                Title
            </label>
            <input
                type="text"
                id="title"
                bind:value={formData.title}
                placeholder="Enter note title"
                class="form-input"
                required
            />
        </div>

        <div in:fly={{y: 10, duration: 200, delay: 200}}>
            <label for="content" class="block text-sm font-medium mb-1">
                Content
            </label>
            <textarea
                id="content"
                bind:value={formData.content}
                placeholder="Enter note content"
                rows="6"
                class="form-input"
                required
            ></textarea>
        </div>
    </div>

    <div class="flex justify-end gap-3 pt-4" in:fly={{y: 10, duration: 200, delay: 300}}>
        <button
            type="button"
            on:click={handleCancel}
            class="btn-secondary"
        >
            Cancel
        </button>
        <button
            type="submit"
            disabled={isSubmitting}
            class="btn-primary"
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