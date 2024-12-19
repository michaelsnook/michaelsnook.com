export default function Label({ children, className = '', ...props }) {
	return (
		<label
			className={`block text-gray-600 text-sm my-1 font-bold ${className}`}
			{...props}
		>
			{children}
		</label>
	)
}
