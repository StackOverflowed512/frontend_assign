<!-- src/lib/components/ThemeToggle.svelte -->
<script>
	import { theme } from '$lib/stores/theme';
	import { fly } from 'svelte/transition';

	function toggleTheme() {
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	}
</script>

<button
	on:click={toggleTheme}
	class="p-2 rounded-full bg-white/30 dark:bg-gray-800/30 text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 backdrop-blur-lg border border-white/10 dark:border-gray-700/10"
	aria-label="Toggle dark mode"
>
	{#if $theme === 'light'}
		<div in:fly={{ y: -10, duration: 200 }}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
		</div>
	{:else}
		<div in:fly={{ y: -10, duration: 200 }}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
		</div>
	{/if}
</button>