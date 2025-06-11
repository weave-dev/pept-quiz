<script lang="ts">
	import RadioButton from '$lib/components/base/RadioButton.svelte'
	import type {
		DisableableOption,
		Option,
		QuestionComponentProps
	} from '$lib/modules/activity/types'
	import { BgColors } from '$lib/types/colors'

	let {
		currentQuestion,
		selectedAnswer = $bindable(),
		gotCorrect
	}: QuestionComponentProps = $props()

	let currentOptions = $derived.by(() => {
		if (currentQuestion) {
			return currentQuestion?.options.map((option) => {
				const disabled = gotCorrect !== undefined
				return { ...option, disabled }
			})
		}

		return []
	})

	const optionBg = (option: Option) => {
		if (
			selectedAnswer &&
			gotCorrect !== undefined &&
			option.value !== selectedAnswer.value
		) {
			return BgColors.NEUTRAL_LIGHTER
		}

		if (selectedAnswer && gotCorrect && option.value === selectedAnswer.value) {
			return BgColors.FERN_GREEN
		}

		if (
			selectedAnswer &&
			gotCorrect === false &&
			option.value === selectedAnswer.value
		) {
			return BgColors.BITTERSWEET_RED
		}
	}
</script>

<p class="mb-10 text-4xl font-semibold break-words select-none">
	{@html currentQuestion?.question}
</p>

<div class="flex w-full justify-center gap-4">
	<RadioButton
		bind:group={selectedAnswer as DisableableOption}
		class="flex h-50 min-w-[200px] shrink-0 items-center justify-center bg-white text-4xl "
		choices={currentOptions}
	>
		{#snippet child(choice, props)}
			<span
				class={props.merge([
					props.frontClass,
					props.disabledFront(choice.disabled) as string[],
					optionBg(choice)
				])}
			>
				{choice.label}
			</span>
		{/snippet}
	</RadioButton>
</div>
