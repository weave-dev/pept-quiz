<script lang="ts">
	import { BgColors } from '$lib/types';
 	import type { BgColorsValues } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		variant: BgColorsValues;
		children: Snippet;
		class?: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	};

	const {
		children,
		variant = BgColors.NEUTRAL,
		class: customClass,
		onclick,
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
			'rounded-lg hover:[&>span]:-translate-y-1.5 active:[&>span]:translate-y-0',
			'cursor-pointer select-none inline-flex',
			bgColor,
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
			`transition-all duration-75 -translate-y-2 rounded-lg px-8 py-2`,
			`font-bold grow`,
			frontBorder,
			textColor,
			variant,
			customClass
		])
	);
</script>

<button class={btnClass} {onclick} {...rest}>
	<span class={frontClass}>
		{@render children()}
	</span>
</button>
