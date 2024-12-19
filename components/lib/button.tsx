import { cn } from '@/lib/utils'
import { buttonStyles } from '@/components/lib'

export default function Button({
	className = '',
	variant,
	size,
	children,
	...props
}) {
	return (
		<button
			className={cn(buttonStyles({ variant, size }), className)}
			{...props}
		>
			{children}
		</button>
	)
}
