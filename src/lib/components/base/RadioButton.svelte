<script lang="ts">
	import { BgColors, Variants } from '$lib/types'
	import type { VariantsValues } from '$lib/types'
	import type { Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	type Props = {
		variant: VariantsValues
		class?: string | string[]
		value: unknown
		group?: unknown
		children: Snippet
		disabled?: boolean
	}

	let {
		variant = Variants.NEUTRAL,
		class: customClass,
		value,
		group = $bindable(),
		children,
		disabled,
		...rest
	}: Props = $props()

	const bgColor = $derived.by(() => {
		if (variant.includes('neutral')) {
			return 'bg-neutral-700'
		}

		return !variant.includes('dark') ? `bg-${variant}-darker` : `bg-${variant}`
	})

	// Darker part of the button (shadow)
	const btnClass = $derived(
		twMerge([
			'group rounded-lg active:[&>span]:translate-y-0',
			'cursor-pointer select-none inline-flex',
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

	// The highlighted part of the button on top of the shadow
	const frontClass = $derived(
		twMerge([
			`transition-all duration-75 -translate-y-1 rounded-lg px-8 py-2 peer-checked:translate-y-0`,
			`font-bold grow group-hover:-translate-y-0.5`,
			frontBorder,
			textColor,
			`bg-${variant}`,
			customClass,
			disabled && ['translate-y-0 border-transparent', BgColors.NEUTRAL_LIGHTER]
		])
	)
</script>

<label class={btnClass}>
	<input type="radio" class="peer sr-only" bind:group {value} {disabled} />
	<span class={frontClass}>
		{@render children()}
	</span>
</label>
