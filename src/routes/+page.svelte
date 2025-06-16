<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import * as api from '$lib/services/api.js';
	import NoteCard from '$lib/components/NoteCard.svelte';
	import NoteForm from '$lib/components/NoteForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { fade, fly } from 'svelte/transition';

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
		const formData = event.detail;
		isSubmitting = true;
		
		try {
			let updatedNote;
			
			if (currentNote?.id) {
				// Update existing note
				updatedNote = await api.updateNote(currentNote.id, {
					title: formData.title,
					content: formData.content
				});
				notes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
			} else {
				// Create new note
				const newNote = {
					title: formData.title,
					content: formData.content,
					createdAt: new Date().toISOString()
				};
				updatedNote = await api.createNote(newNote);
				notes = [...notes, updatedNote];
			}
			
			showNoteFormModal = false;
			currentNote = null;
		} catch (error) {
			alert(`Error: ${error.message}`);
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

<div class="container mx-auto px-4 py-8 min-h-screen" in:fade={{duration: 300}}>
	<!-- Action Bar -->
	<div class="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between glass p-5 rounded-xl shadow-lg shadow-sky-500/5 dark:shadow-sky-400/5 border border-white/30 dark:border-gray-700/30">
		<div class="relative w-full md:w-auto">
			<input 
				type="search" 
				bind:value={searchTerm} 
				placeholder="Search notes..." 
				class="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/20 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500/20 dark:focus:ring-sky-400/20 transition-all shadow-inner"
			/>
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
				</svg>
			</div>
		</div>
		<div class="flex gap-4 w-full md:w-auto">
			<select 
				bind:value={sortBy} 
				class="flex-grow md:flex-grow-0 rounded-lg bg-white/50 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/20 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-sky-500/20 dark:focus:ring-sky-400/20 transition-all shadow-inner"
			>
				<option value="createdAt_desc">Sort: Newest</option>
				<option value="createdAt_asc">Sort: Oldest</option>
				<option value="title_asc">Sort: Title (A-Z)</option>
				<option value="title_desc">Sort: Title (Z-A)</option>
			</select>
			<button 
				on:click={openCreateForm} 
				class="btn-primary flex items-center gap-1"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12h14" />
				</svg>
				New Note
			</button>
		</div>
	</div>

	<!-- Notes Grid -->
	{#if isLoading}
		<div class="flex justify-center items-center h-64" in:fade>
			<div class="flex flex-col items-center gap-4">
				<div class="relative">
					<div class="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
					<Spinner />
				</div>
				<span class="text-lg text-slate-600 dark:text-slate-400">Loading your notes...</span>
			</div>
		</div>
	{:else if error}
		<div class="text-center text-red-500 bg-red-100/50 dark:bg-red-900/30 p-6 rounded-xl shadow-lg border border-red-200/50 dark:border-red-800/30"><p><strong>Error:</strong> {error}</p></div>
	{:else if filteredAndSortedNotes.length === 0}
		<div class="text-center glass p-16 rounded-xl">
			<div class="inline-block p-6 rounded-full bg-slate-100/50 dark:bg-slate-800/50 mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M8 10h8M8 14h4M12 3H8a2 2 0 00-2 2v15a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2h-4z" />
				</svg>
			</div>
			<h2 class="text-2xl font-semibold mb-2 gradient-text inline-block">No Notes Found</h2>
			<p class="text-slate-500 dark:text-slate-400 mb-6">{#if searchTerm}Try a different search term.{:else}Click "New Note" to get started!{/if}</p>
			{#if !searchTerm}
			<button 
				on:click={openCreateForm} 
				class="btn-primary inline-flex items-center gap-1"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12h14" />
				</svg>
				Create Your First Note
			</button>
			{/if}
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each filteredAndSortedNotes as note, i (note.id)}
				<div style="animation-delay: {i * 50}ms;">
					<NoteCard {note} on:edit={handleEditRequest} on:delete={handleDeleteRequest} />
				</div>
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
		<h2 class="text-2xl font-bold mb-4 gradient-text inline-block">Confirm Deletion</h2>
		<p class="mb-6">Are you sure you want to delete "<strong>{currentNote.title}</strong>"? This cannot be undone.</p>
		<div class="flex justify-end gap-3">
			<button on:click={() => (showDeleteConfirmModal = false)} class="btn-secondary">Cancel</button>
			<button on:click={confirmDelete} disabled={isSubmitting} class="btn-danger">
				{#if isSubmitting}<Spinner /><span class="ml-2">Deleting...</span>{:else}Delete{/if}
			</button>
		</div>
	{/if}
</Modal>