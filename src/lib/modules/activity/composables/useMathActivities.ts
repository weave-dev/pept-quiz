import type { Option, Question } from '$lib/modules/activity/types'
import { shuffle } from 'remeda'

export const useRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const useGenerateNumberOptions = (
	correctAnswer: Option,
	numberOfOptions = 1,
	min = 1,
	max = 2
) => {
	const options: number[] = []

	for (let index = 1; index <= numberOfOptions; index++) {
		let value = null
		do {
			value = useRandomNumber(min, max)
		} while (value === correctAnswer.value || options.includes(value))
		options.push(value)
	}

	return shuffle([
		correctAnswer,
		...options.map(
			(value): Option => ({
				label: value,
				value
			})
		)
	])
}

// Generates addition question with random options and a correct answer
export const useAdditionQuestion = (): Question => {
	const [MIN, MAX] = [1, 10]

	const first = useRandomNumber(MIN, MAX)
	const second = useRandomNumber(MIN, MAX)
	const correctAnswer = {
		label: first + second,
		value: first + second
	}

	const question = `What is ${first} + ${second}?`

	return {
		question,
		options: useGenerateNumberOptions(
			correctAnswer,
			3,
			correctAnswer.value <= 5 ? correctAnswer.value : correctAnswer.value - 5,
			correctAnswer.value + 5
		),
		correctAnswer
	}
}

export const useCountObjectsQuestion = (): Question => {
	const [MIN, MAX] = [1, 10]
	const count = useRandomNumber(MIN, MAX)

	const correctAnswer = {
		label: count,
		value: count
	}

	const objects = [
		{
			word: 'apples',
			emoji: '🍎'
		},
		{
			word: 'bananas',
			emoji: '🍌'
		},
		{
			word: 'oranges',
			emoji: '🍊'
		},
		{
			word: 'grapes',
			emoji: '🍇'
		},
		{
			word: 'pears',
			emoji: '🍐'
		}
	]

	const selectedObject = objects[useRandomNumber(0, objects.length - 1)]
	const nObjects = selectedObject.emoji.repeat(count)
	const question = `How many ${selectedObject.word} are there?\n${nObjects}`

	return {
		question,
		options: useGenerateNumberOptions(
			correctAnswer,
			3,
			correctAnswer.value <= 5 ? correctAnswer.value : correctAnswer.value - 5,
			correctAnswer.value + 5
		),
		correctAnswer
	}
}

export const useCountTapQuestion = (): Question => {
	const [MIN, MAX] = [1, 6]
	const count = useRandomNumber(MIN, MAX)

	const correctAnswer = {
		label: '',
		value: count
	}

	const objects = [
		{
			word: 'stars',
			emoji: '⭐'
		},
		{
			word: 'hearts',
			emoji: '❤️'
		},
		{
			word: 'rainbows',
			emoji: '🌈'
		},
		{
			word: 'snowflakes',
			emoji: '❄️'
		},
		{
			word: 'clouds',
			emoji: '☁️'
		}
	]

	const selectedObject = objects[useRandomNumber(0, objects.length - 1)]
	correctAnswer.label = selectedObject.emoji
	const question = `Tap ${correctAnswer.value}${selectedObject.emoji} ${selectedObject.word}.`

	const generateOptions = (length: number): Option[] => {
		const options: Option[] = []
		for (let i = 0; i <= length; i++) {
			options.push({
				value: i + 1,
				label: `${correctAnswer.label}`
			})
		}

		return options
	}

	const length = useRandomNumber(
		correctAnswer.value,
		useRandomNumber(
			correctAnswer.value + 1,
			useRandomNumber(correctAnswer.value + 1, correctAnswer.value + 6)
		)
	)

	return {
		question,
		options: generateOptions(length),
		correctAnswer
	}
}
