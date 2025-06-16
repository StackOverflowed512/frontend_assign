<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import * as api from '$lib/services/api.js';
	import NoteCard from '$lib/components/NoteCard.svelte';
	import NoteForm from '$lib/components/NoteForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let notes = [];
	let isLoading = true;
	let error = null;

	let showNoteFormModal = false;
	let showDeleteConfirmModal = false;
	let isSubmitting = false;
	let currentNote = null; 

	let searchTerm = '';
	let sortBy = 'createdAt_desc';

	onMount(async () => {
		try {
			notes = await api.getNotes();
		} catch (e) {
			error = e.message;
		} finally {
			isLoading = false;
		}
	});

	$: filteredAndSortedNotes = notes
		.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			switch (sortBy) {
				case 'title_asc': return a.title.localeCompare(b.title);
				case 'title_desc': return b.title.localeCompare(a.title);
				case 'createdAt_asc': return new Date(a.createdAt) - new Date(b.createdAt);
				default: return new Date(b.createdAt) - new Date(a.createdAt);
			}
		});

	function openCreateForm() {
		currentNote = null;
		showNoteFormModal = true;
	}

	function handleEditRequest(event) {
		currentNote = event.detail;
		showNoteFormModal = true;
	}

	async function handleFormSubmit(event) {
		isSubmitting = true;
		try {
			if (currentNote?.id) {
				const updatedNote = await api.updateNote(currentNote.id, { ...currentNote, ...event.detail });
				notes = notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
			} else {
				const newNote = await api.createNote({ ...event.detail, createdAt: new Date().toISOString() });
				notes = [...notes, newNote];
			}
			showNoteFormModal = false;
		} catch (e) {
			alert(`Error saving note: ${e.message}`);
		} finally {
			isSubmitting = false;
		}
	}

	function handleDeleteRequest(event) {
		currentNote = event.detail;
		showDeleteConfirmModal = true;
	}

	async function confirmDelete() {
		isSubmitting = true;
		try {
			await api.deleteNote(currentNote.id);
			notes = notes.filter((n) => n.id !== currentNote.id);
			showDeleteConfirmModal = false;
		} catch (e) {
			alert(`Error deleting note: ${e.message}`);
		} finally {
			isSubmitting = false;
			currentNote = null;
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Action Bar -->
	<div class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
		<div class="relative w-full md:w-auto">
			<input type="search" bind:value={searchTerm} placeholder="Search notes..." class="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg></div>
		</div>
		<div class="flex gap-4 w-full md:w-auto">
			<select bind:value={sortBy} class="flex-grow md:flex-grow-0 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500">
				<option value="createdAt_desc">Sort: Newest</option>
				<option value="createdAt_asc">Sort: Oldest</option>
				<option value="title_asc">Sort: Title (A-Z)</option>
				<option value="title_desc">Sort: Title (Z-A)</option>
			</select>
			<button on:click={openCreateForm} class="flex-shrink-0 px-4 py-2 font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors">+ New Note</button>
		</div>
	</div>

	<!-- Notes Grid -->
	{#if isLoading}
		<div class="flex justify-center items-center h-64"><Spinner /><span class="ml-4 text-lg">Loading Notes...</span></div>
	{:else if error}
		<div class="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg"><p><strong>Error:</strong> {error}</p></div>
	{:else if filteredAndSortedNotes.length === 0}
		<div class="text-center text-slate-500 dark:text-slate-400 py-16">
			<h2 class="text-2xl font-semibold mb-2">No Notes Found</h2>
			<p>{#if searchTerm}Try a different search term.{:else}Click "New Note" to get started!{/if}</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each filteredAndSortedNotes as note (note.id)}
				<NoteCard {note} on:edit={handleEditRequest} on:delete={handleDeleteRequest} />
			{/each}
		</div>
	{/if}
</div>

<!-- Modals -->
<Modal show={showNoteFormModal} on:close={() => (showNoteFormModal = false)}>
	<NoteForm note={currentNote} {isSubmitting} on:submit={handleFormSubmit} on:close={() => (showNoteFormModal = false)} />
</Modal>

<Modal show={showDeleteConfirmModal} on:close={() => (showDeleteConfirmModal = false)}>
	{#if currentNote}
		<h2 class="text-2xl font-bold mb-4">Confirm Deletion</h2>
		<p class="mb-6">Are you sure you want to delete "<strong>{currentNote.title}</strong>"? This cannot be undone.</p>
		<div class="flex justify-end gap-3">
			<button on:click={() => (showDeleteConfirmModal = false)} class="px-4 py-2 text-sm font-medium bg-slate-200 dark:bg-gray-600 rounded-md hover:bg-slate-300 dark:hover:bg-gray-500">Cancel</button>
			<button on:click={confirmDelete} disabled={isSubmitting} class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400">
				{#if isSubmitting}<Spinner /><span class="ml-2">Deleting...</span>{:else}Delete{/if}
			</button>
		</div>
	{/if}
</Modal>