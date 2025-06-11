import Char1 from '$lib/svg-icons/char-1.svg'
import Char2 from '$lib/svg-icons/char-2.svg'
import Chicken from '$lib/svg-icons/chicken.svg'

export type SvgIconName = keyof typeof icons

export const icons = {
	Char1,
	Char2,
	Chicken
}
