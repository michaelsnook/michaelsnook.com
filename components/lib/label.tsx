import { cn } from '@/lib/utils'

export default function Label({ children, className = '', ...props }) {
	return (
		<label
			className={cn('block text-gray-600 text-sm my-1 font-bold', className)}
			{...props}
		>
			{children}
		</label>
	)
}
