<!-- src/lib/components/Header.svelte -->
<script>
    import ThemeToggle from './ThemeToggle.svelte';
    import { fade, fly } from 'svelte/transition';
</script>

<header 
    in:fade={{duration: 300}}
    class="sticky top-0 z-30 w-full glass border-b border-white/20 dark:border-gray-700/20"
>
    <div class="container mx-auto px-4">
        <div class="flex h-20 items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-purple-500 p-[2px] animate-float">
                    <div class="h-full w-full rounded-[10px] glass flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-2xl font-bold gradient-text">
                        Svelte Notes
                    </h1>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Capture your thoughts in style</p>
                </div>
            </div>
            <ThemeToggle />
        </div>
    </div>
</header>