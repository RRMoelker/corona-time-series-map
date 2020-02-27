import { derived, writable } from 'svelte/store';
import dayjs from 'dayjs';

export const dayIdx = writable(0);
export const dayHeader = writable([]);
export const sites = writable([]);

export const day = derived([dayHeader, dayIdx], ([$dayHeader, $dayIdx]) => dayjs($dayHeader[$dayIdx]));
export const numberOfDays = derived(dayHeader, $dayHeader => $dayHeader && $dayHeader.length || 0);
export const numberOfDays0 = derived(numberOfDays, $numberOfDays => Math.max($numberOfDays - 1, 0))
