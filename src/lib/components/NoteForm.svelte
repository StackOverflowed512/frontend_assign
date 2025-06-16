<!-- src/lib/components/NoteForm.svelte -->
<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Spinner from './Spinner.svelte';

	export let note = { title: '', content: '' };
	export let isSubmitting = false;

	const dispatch = createEventDispatcher();
	let formTitle = note.title;
	let formContent = note.content;
	$: isEditing = !!note.id;

	function handleSubmit() {
		if (!formTitle.trim() || !formContent.trim()) {
			alert('Title and content cannot be empty.');
			return;
		}
		dispatch('submit', { title: formTitle, content: formContent });
	}
</script>

<h2 class="text-2xl font-bold mb-6">{isEditing ? 'Edit Note' : 'Create a New Note'}</h2>
<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<label for="title" class="block text-sm font-medium">Title</label>
		<input type="text" id="title" bind:value={formTitle} required class="mt-1 block w-full rounded-md shadow-sm" />
	</div>
	<div>
		<label for="content" class="block text-sm font-medium">Content</label>
		<textarea id="content" bind:value={formContent} required rows="6" class="mt-1 block w-full rounded-md shadow-sm" />
	</div>
	<div class="mt-8 flex justify-end gap-3">
		<button type="button" on:click={() => dispatch('close')} class="px-4 py-2 text-sm font-medium bg-slate-200 dark:bg-gray-600 rounded-md hover:bg-slate-300 dark:hover:bg-gray-500">Cancel</button>
		<button type="submit" disabled={isSubmitting} class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed">
			{#if isSubmitting}
				<Spinner /> <span class="ml-2">Saving...</span>
			{:else}
				Save Note
			{/if}
		</button>
	</div>
</form>