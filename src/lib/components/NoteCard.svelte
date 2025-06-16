<!-- src/lib/components/NoteCard.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	export let note;
	const dispatch = createEventDispatcher();

	const formattedDate = new Date(note.createdAt).toLocaleString('en-US', {
		year: 'numeric', month: 'short', day: 'numeric'
	});
</script>

<div class="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200 dark:border-gray-700">
	<div class="p-6 flex-grow">
		<h3 class="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-2">{note.title}</h3>
		<!-- Using the typography plugin class `prose` for nice content styling -->
		<div class="prose prose-sm dark:prose-invert max-w-none">{@html note.content.replace(/\n/g, '<br>')}</div>
	</div>
	<div class="p-4 bg-slate-50 dark:bg-gray-800/50 border-t border-slate-200 dark:border-gray-700 flex justify-between items-center">
		<p class="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</p>
		<div class="flex gap-3">
			<button on:click={() => dispatch('edit', note)} class="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Edit</button>
			<button on:click={() => dispatch('delete', note)} class="font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 transition-colors">Delete</button>
		</div>
	</div>
</div>