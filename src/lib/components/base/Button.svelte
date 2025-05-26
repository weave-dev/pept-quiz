<script lang="ts">
	import { BgColors, BorderColors } from '$lib/types'
	import type { BgColorsValues } from '$lib/types'
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		variant: BgColorsValues
		children: Snippet
		class?: string
		onclick?: MouseEventHandler<HTMLButtonElement>
		rounded?: boolean
		disabled?: boolean
	}

	const {
		children,
		variant = BgColors.NEUTRAL,
		class: customClass,
		disabled,
		rounded,
		onclick,
		...rest
	}: Props = $props()

	const bgColor = $derived(
		!variant.includes('dark')
			? variant.includes('gray')
				? 'bg-gray-700'
				: `${variant}-darker`
			: `${variant}-darker`
	)

	const roundedClass = $derived(rounded ? 'rounded-full' : 'rounded-lg')

	const btnClass = $derived(
		twMerge([
			'hover:[&>span]:-translate-y-1.5 active:[&>span]:translate-y-0',
			'cursor-pointer select-none inline-flex',
			roundedClass,
			bgColor,

			disabled && ['hover:[&>span]:translate-y-0', BgColors.NEUTRAL_LIGHTER]
		])
	)

	const frontBorder = $derived(['border-2', bgColor.replace('bg', 'border')])
	const txtColor = $derived(
		bgColor.replace('bg', 'text').replace('-darker', '').replace('-dark', '')
	)

	const textColor = $derived([
		txtColor.includes('gray') ? txtColor : txtColor + '-content'
	])

	const frontClass = $derived(
		twMerge([
			`transition-all duration-75 -translate-y-2 px-8 py-2`,
			`font-bold grow`,
			frontBorder,
			textColor,
			roundedClass,
			variant,
			customClass,
			disabled && ['translate-y-0 border-transparent', BgColors.NEUTRAL_LIGHTER]
		])
	)
</script>

<button class={btnClass} {onclick} {...rest} {disabled}>
	<span class={frontClass}>
		{@render children()}
	</span>
</button>
