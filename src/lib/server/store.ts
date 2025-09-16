import { writable } from 'svelte/store';
export const searchterm = writable('');

// This store holds the current search term for filtering tasks.
// It can be updated from any component that imports it.