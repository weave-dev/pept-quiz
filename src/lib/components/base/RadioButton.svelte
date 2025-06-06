<script lang="ts" generics="T">
	import { BgColors, Variants } from '$lib/types'
	import type { VariantsValues } from '$lib/types'
	import type { Snippet } from 'svelte'
	import { twMerge } from 'tailwind-merge'

	type ChildProps = [
		Choice<T>,
		{
			frontClass: FrontClass
			disabledFront: DisabledFront
			merge: typeof twMerge
		}
	]
	type Choice<T> = T & { value: unknown; disabled: boolean }
	type FrontClass = string | string[]
	type DisabledFront = (state: boolean) => string[] | boolean
	type Props = {
		variant?: VariantsValues
		class?: string | string[]
		choices: Choice<T>[]
		group?: Choice<T>
		children?: Snippet<[Choice<T>]>
		child?: Snippet<ChildProps>
	}

	let {
		variant = Variants.NEUTRAL,
		class: customClass,
		choices,
		group = $bindable(),
		children,
		child
	}: Props = $props()

	const bgColor = $derived.by(() => {
		if (variant.includes('neutral')) {
			return 'bg-neutral-700'
		}

		return !variant.includes('dark') ? `bg-${variant}-darker` : `bg-${variant}`
	})

	// Darker part of the button (shadow)

	const disabledBtn = (state = false) =>
		state && ['hover:[&>span]:translate-y-0', BgColors.NEUTRAL_LIGHTER]
	const btnClass = $derived(
		twMerge([
			'group rounded-lg active:[&>span]:translate-y-0',
			'cursor-pointer select-none inline-flex',
			bgColor
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
	const disabledFront = (state = false) =>
		state && ['translate-y-0 border-transparent', BgColors.NEUTRAL_LIGHTER]
	const frontClass = $derived(
		twMerge([
			`transition-all duration-75 -translate-y-1 rounded-lg px-8 py-2 peer-checked:translate-y-0`,
			`font-bold grow group-hover:-translate-y-0.5`,
			frontBorder,
			textColor,
			`bg-${variant}`,
			customClass
		])
	)
</script>

{#each choices as choice (choice.value)}
	<label class={twMerge([btnClass, disabledBtn(choice.disabled)])}>
		<input
			type="checkbox"
			class="peer sr-only"
			bind:group
			value={choice}
			disabled={choice.disabled}
		/>

		{#if child}
			{@render child?.(choice, { frontClass, disabledFront, merge: twMerge })}
		{:else}
			<span class={twMerge([frontClass, disabledFront(choice.disabled)])}>
				{@render children?.(choice)}
			</span>
		{/if}
	</label>
{/each}
