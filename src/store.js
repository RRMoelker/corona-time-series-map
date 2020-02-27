import { derived, writable } from 'svelte/store';

export const dayIdx = writable(0);
export const dayHeader = writable([]);
export const sites = writable([]);

export const day = derived([dayHeader, dayIdx], ([$dayHeader, $dayIdx]) => $dayHeader[$dayIdx]);
export const numberOfDays = derived(dayHeader, $dayHeader => $dayHeader && $dayHeader.length || 0);
export const numberOfDays0 = derived(numberOfDays, $numberOfDays => Math.max($numberOfDays - 1, 0))
