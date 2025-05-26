import FluentEmojiFlatAbacus from '~icons/fluent-emoji-flat/abacus'
import FluentEmojiFlatInputLatinLetters from '~icons/fluent-emoji-flat/input-latin-letters'
import FluentStar12Filled from '~icons/fluent/star-12-filled'
import FluentLockClosed16Filled from '~icons/fluent/lock-closed-16-filled'

export type UnpluginIconName = keyof typeof icons

export const icons = {
	abacus: FluentEmojiFlatAbacus,
	inputLatinLetters: FluentEmojiFlatInputLatinLetters,
	star12Filled: FluentStar12Filled,
	lockClosed16Filled: FluentLockClosed16Filled
}
