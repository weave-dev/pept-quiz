import FluentEmojiFlatAbacus from '~icons/fluent-emoji-flat/abacus'
import FluentEmojiFlatInputLatinLetters from '~icons/fluent-emoji-flat/input-latin-letters'
import FluentStar12Filled from '~icons/fluent/star-12-filled'
import FluentLockClosed16Filled from '~icons/fluent/lock-closed-16-filled'
import FluentArrowLeft12Regular from '~icons/fluent/arrow-left-12-regular'
import FluentTargetArrow16Filled from '~icons/fluent/target-arrow-16-filled'

export type UnpluginIconName = keyof typeof icons

export const icons = {
	abacus: FluentEmojiFlatAbacus,
	arrowLeft12Regular: FluentArrowLeft12Regular,
	inputLatinLetters: FluentEmojiFlatInputLatinLetters,
	lockClosed16Filled: FluentLockClosed16Filled,
	star12Filled: FluentStar12Filled,
	targetArrow16Filled: FluentTargetArrow16Filled
}
