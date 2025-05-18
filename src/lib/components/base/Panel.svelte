<script lang="ts">
	import { Variants, type VariantsValues } from '$lib/types';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		children: Snippet;
		class?: string;
		variant?: VariantsValues;
	}

	let {
		children,
		class: customClass,
		variant = Variants.NEUTRAL
	}: Props = $props();

	let variantClass = $derived([`border-${variant}`, `shadow-${variant}`]);

	let mergedClass = $derived(
		twMerge(['rounded-lg border-2 p-4 bg-white', variantClass, customClass])
	);
</script>

<div class={mergedClass}>
	{@render children?.()}
</div>
