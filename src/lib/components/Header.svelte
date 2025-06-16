<!-- src/lib/components/Header.svelte -->
<script>
    import ThemeToggle from './ThemeToggle.svelte';
    import { fade } from 'svelte/transition';
</script>

<header 
    in:fade={{duration: 300}}
    class="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/75 dark:bg-gray-900/75 border-b border-slate-200/50 dark:border-gray-800/50"
>
    <div class="container mx-auto px-4">
        <div class="flex h-20 items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-blue-400">
                    Svelte Notes
                </h1>
            </div>
            <ThemeToggle />
        </div>
    </div>
</header>