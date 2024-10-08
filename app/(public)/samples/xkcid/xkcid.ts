type XkcidString = string // like 2zwy3427-d3frvt or 2nNCNBq-ytgv2

// produced by xkcid.make()
interface XkcidRecord {
	id: XkcidString
	variant: XkcidVariantOptions
	timeString: string
	randomnessString: string
	timeTickSizeMs: number
	timeInMilliseconds: number
}

type XkcidVariantOptions = 'lowercase' | 'shortest' | string

interface XkcidSettings {
	timeLength: number
	randomnessLength: number
	alphabet: string
	timeDropPrecision: number
}

// These are the different types of xkcID, using different alphabets/bases,
// and different time-precision. These don't get set in user-land so the values
// must be double checked by humans / debated / PR'd etc.
const settings: Record<XkcidVariantOptions, XkcidSettings> = {
	lowercase: {
		timeLength: 8,
		randomnessLength: 6,
		alphabet: '123456789abcdefghijkmnopqrstuvwxyz',
		timeDropPrecision: 1, // 34ms ticks
	},
	shortest: {
		timeLength: 7,
		randomnessLength: 5,
		alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
		timeDropPrecision: 1, // 58ms ticks
	},
}

function numberToBaseX(variant: XkcidVariantOptions, num: number): string {
	const { alphabet } = settings[variant]
	const base = alphabet.length
	if (num === 0) return alphabet[0]
	let result = ''
	while (num > 0) {
		result = alphabet[num % base] + result
		num = Math.floor(num / base)
	}
	return result
}

function parseNumberFromBaseX(
	variant: XkcidVariantOptions,
	baseXStr: string
): number {
	const { alphabet } = settings[variant]
	const base = alphabet.length
	let result = 0 // getTime is always a number

	// Use this throughout; remove base from the item and calculate in each function instead
	for (let i = 0; i < baseXStr.length; i++) {
		const char = baseXStr[baseXStr.length - 1 - i]
		const value = alphabet.indexOf(char)
		result += value * base ** i
	}

	return result
}

function generateRandomBaseX(variant: XkcidVariantOptions): string {
	const { alphabet, randomnessLength } = settings[variant]
	const base = alphabet.length
	return Array.from(
		{ length: randomnessLength },
		() => alphabet[Math.floor(Math.random() * base)]
	).join('')
}

function padAndOrTrimString(
	variant: XkcidVariantOptions,
	inputString: string
): string {
	const { alphabet, timeDropPrecision, timeLength } = settings[variant]
	const trimmedTimeString = inputString.substring(
		0,
		inputString.length - timeDropPrecision
	)
	if (timeLength === trimmedTimeString.length) return trimmedTimeString
	return `${Array.from(
		{ length: timeLength - trimmedTimeString.length },
		() => alphabet[0]
	).join('')}${trimmedTimeString}`
}

function xkcid(variant: XkcidVariantOptions = 'lowercase') {
	const { alphabet, randomnessLength, timeDropPrecision } = settings[variant]
	const base = alphabet.length

	return {
		// the immediate context of the thing
		variant,
		...settings[variant],
		base,
		// the main event: the make() function
		make: (timeInMilliseconds?: number): XkcidRecord => {
			timeInMilliseconds ??= new Date().getTime()
			const timeStringMs = numberToBaseX(variant, timeInMilliseconds)
			// lower the precision and then perhaps pad by 1
			const timeString = padAndOrTrimString(variant, timeStringMs)
			const randomnessString = generateRandomBaseX(variant)

			return {
				variant,
				id: `${timeString}-${randomnessString}`,
				timeInMilliseconds,
				timeString,
				timeTickSizeMs: base ** timeDropPrecision,
				randomnessString,
			}
		},
		// parse and return a time (number) or a new Date()
		parseTime: (id: XkcidString) => {
			const dateSegment = id.split('-')[0] as string
			return parseNumberFromBaseX(variant, dateSegment)
		},
		parseDate: (id: XkcidString) => {
			const dateSegment = id.split('-')[0] as string
			return new Date(parseNumberFromBaseX(variant, dateSegment))
		},
		ticksPerSecond: Math.round(1000 / base),
		ticksPerMinute: Math.round((60 * 1000) / base),
		ticksPerHourInThousands: Math.round((60 * 60 * 10) / base) / 10,
		randomnessSizeInMillions:
			Math.round(Math.pow(base, randomnessLength) / 100_000) / 10,
	}
}

export default xkcid
export type XkcidModule = typeof xkcid
