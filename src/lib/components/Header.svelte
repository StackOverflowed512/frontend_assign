<!-- src/lib/components/Header.svelte -->
<script>
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="sticky top-0 z-30 w-full bg-slate-50/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Svelte Notes</h1>
			<ThemeToggle />
		</div>
	</div>
</header>