// src/lib/stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedTheme = browser ? localStorage.getItem('theme') : 'light';
const preferredTheme =
	browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const theme = writable(storedTheme || preferredTheme);

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
