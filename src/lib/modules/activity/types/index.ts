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
}
