import type { Component } from 'svelte'

export type Option = {
	[key: string]: unknown
	label: number | string
	value: number
}

export type DisableableOption = Option & { disabled: boolean }

export type Question = {
	question: string
	options: Option[]
	correctAnswer: Option
	component?: Component<QuestionComponentProps>
}

export type QuestionComponentProps = {
	currentQuestion: Question
	selectedAnswer?: Option
	gotCorrect?: boolean
}
