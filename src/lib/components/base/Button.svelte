<script lang="ts">
	import { BgColors, Variants } from '$lib/types'
	import type { VariantsValues } from '$lib/types'
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		variant: VariantsValues
		children?: Snippet
		class?: string | string[]
		onclick?: MouseEventHandler<HTMLButtonElement>
		rounded?: boolean
		disabled?: boolean
	}

	const {
		children,
		variant = Variants.NEUTRAL,
		class: customClass,
		disabled,
		rounded,
		onclick,
		...rest
	}: Props = $props()

	const bgColor = $derived.by(() => {
		if (variant.includes('neutral')) {
			return 'bg-neutral-700'
		}

		return !variant.includes('dark') ? `bg-${variant}-darker` : `bg-${variant}`
	})

	const roundedClass = $derived(rounded ? 'rounded-full' : 'rounded-lg')

	const btnClass = $derived(
		twMerge([
			'hover:[&>span]:-translate-y-0.5 active:[&>span]:translate-y-0',
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
		txtColor.includes('neutral') ? txtColor : txtColor + '-content'
	])

	const frontClass = $derived(
		twMerge([
			`transition-all duration-50 -translate-y-1 px-8 py-2`,
			`font-bold grow`,
			frontBorder,
			textColor,
			roundedClass,
			`bg-${variant}`,
			customClass,
			disabled && ['translate-y-0 border-transparent', BgColors.NEUTRAL_LIGHTER]
		])
	)
</script>

<button class={btnClass} {onclick} {...rest} {disabled}>
	<span class={frontClass}>
		{@render children?.()}
	</span>
</button>
