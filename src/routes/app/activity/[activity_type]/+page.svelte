<script lang="ts">
	import Button from '$lib/components/base/Button.svelte'
	import { icons } from '$lib/components/base/icons'
	import RadioButton from '$lib/components/base/RadioButton.svelte'
	import {
		useAdditionQuestion,
		useCountObjectsQuestion,
		type Option,
		type Question
	} from '$lib/modules/activity'
	import { Variants, type VariantsValues } from '$lib/types'
	import { onMount } from 'svelte'

	let questions = $state<Question[]>()
	let currentRound = $state(1)
	let maxRounds = $state(10)
	let progressWidth = $derived.by(() => {
		return `${(currentRound / maxRounds) * 100}%`
	})

	let currentQuestion = $derived.by(() => {
		return questions?.[currentRound - 1]
	})

	let selectedAnswer = $state<Option>()
	let gotCorrect = $state<true | false | undefined>()

	const checkOption = (option: Option) => {
		let variant: VariantsValues = Variants.NEUTRAL_LIGHT
		let useBgWhite = true

		if (selectedAnswer && gotCorrect && option.value === selectedAnswer.value) {
			variant = Variants.FERN_GREEN
			useBgWhite = false
		}

		if (
			selectedAnswer &&
			gotCorrect === false &&
			option.value === selectedAnswer?.value
		) {
			variant = Variants.BITTERSWEET_RED
			useBgWhite = false
		}

		return {
			variant,
			useBgWhite
		}
	}

	const handleContinue = () => {
		if (gotCorrect === undefined) {
			return handleCheck()
		}

		selectedAnswer = undefined
		gotCorrect = undefined

		if (currentRound <= maxRounds) {
			currentRound++
		}
	}

	const handleCheck = () => {
		if (!selectedAnswer) {
			return
		}

		if (selectedAnswer?.value === currentQuestion?.correctAnswer.value) {
			return (gotCorrect = true)
		}

		return (gotCorrect = false)
	}

	const handleBack = () => {
		history.back()
	}

	onMount(() => {
		// Initialize the first question when the component mounts
		questions = Array(10)
			.fill(null)
			.map(() => {
				return Math.random() < 0.5
					? useAdditionQuestion()
					: useCountObjectsQuestion()
			})

		maxRounds = questions.length
	})
</script>

<div class="flex h-full flex-col items-center gap-4 py-4">
	<div class="mx-auto w-3/4 shrink-0">
		<!-- header with back button and progress -->
		<div class="mb-2 flex items-center justify-between">
			<button
				class="inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-semibold
                transition-colors duration-200 hover:bg-gray-200"
				onclick={handleBack}
			>
				<icons.arrowLeft12Regular />
			</button>

			<!-- # of rounds -->
			<div class="flex items-center gap-2">
				<icons.targetArrow16Filled />
				<span class="font-bold">{currentRound} / {maxRounds}</span>
			</div>
		</div>

		<!-- progress bar container-->
		<div class="relative mb-4 h-4 w-full rounded-full bg-gray-300">
			<!-- progress bar -->
			<div
				class="bg-texas-yellow absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
				style:width={progressWidth}
			></div>
		</div>
	</div>

	<div class="flex w-3/4 grow flex-col items-center justify-center rounded-lg">
		<!-- main quiz screen -->
		<p class="mb-10 text-4xl font-semibold break-words select-none">
			{@html currentQuestion?.question}
		</p>

		<!-- options  -->
		<div class="grid w-full grid-cols-2 grid-rows-2 gap-4">
			{#each currentQuestion?.options ?? [] as option}
				<RadioButton
					bind:group={selectedAnswer}
					class={[
						'col-span-1 flex h-24 items-center justify-center text-4xl',
						String(checkOption(option).useBgWhite && 'bg-white')
					]}
					variant={checkOption(option).variant}
					value={option}
					disabled={gotCorrect !== undefined &&
						selectedAnswer?.value !== option.value}
				>
					{option.label}
				</RadioButton>
			{/each}
		</div>
	</div>

	<div
		class="flex w-3/4 shrink-0 items-center justify-center gap-4 rounded-lg pb-10"
	>
		{#if gotCorrect === undefined}
			<Button
				variant={Variants.FERN_GREEN}
				onclick={handleCheck}
				disabled={!selectedAnswer}
				class="w-[500px]"
			>
				Check
			</Button>
		{:else}
			<Button
				variant={Variants.FERN_GREEN}
				onclick={handleContinue}
				class="w-[500px]"
			>
				Continue
			</Button>
		{/if}
	</div>
</div>
