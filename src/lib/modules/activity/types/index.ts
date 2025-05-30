export type Option = {
	label: number | string
	value: number
}

export type Question = {
	question: string
	options: Option[]
	correctAnswer: Option
}
