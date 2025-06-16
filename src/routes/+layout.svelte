<!-- src/routes/+layout.svelte -->
<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import '$lib/stores/theme'; // Import to initialize theme logic
</script>

<div class="min-h-screen">
	<Header />
	<main>
		<slot />
	</main>
</div>