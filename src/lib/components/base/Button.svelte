<script lang="ts">
	import { BgColors } from '$lib/types';
	import type { BgColorsValues, TextColorsValues } from '$lib/types';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		variant: BgColorsValues;
		children: Snippet;
		class?: string;
	}

	const {
		children,
		variant = BgColors.NEUTRAL,
		class: customClass,
		...rest
	}: Props = $props();

	const bgColor = $derived(
		!variant.includes('dark')
			? variant.includes('gray')
				? 'bg-gray-700'
				: `${variant}-darker`
			: `${variant}-darker`
	);

	const btnClass = $derived(
		twMerge([
			'rounded-lg hover:[&>span]:-translate-y-1.5 active:[&>span]:translate-y-0 cursor-pointer select-none',
			bgColor,
			customClass
		])
	);

	const frontBorder = $derived(['border-2', bgColor.replace('bg', 'border')]);
	const txtColor = $derived(
		bgColor.replace('bg', 'text').replace('-darker', '').replace('-dark', '')
	);

	const textColor = $derived([
		txtColor.includes('gray') ? txtColor : txtColor + '-content'
	]);

	const frontClass = $derived(
		twMerge([
			`transition-all duration-75 block -translate-y-2 rounded-lg px-8 py-2`,
			frontBorder,
			textColor,
			customClass,
			variant
		])
	);
</script>

<button class={btnClass} {...rest}>
	<span class={frontClass}>
		{@render children()}
	</span>
</button>
