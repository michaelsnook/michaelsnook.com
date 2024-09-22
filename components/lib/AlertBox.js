const AlertBox = ({ type, children }) => {
	const classes =
		type === 'success' ? 'border-green-400 text-green-800 bg-green-200'
		: type === 'info' ? 'border-blue-400 text-blue-800 bg-blue-200'
		: type === 'neato' ? 'border-pink-400 text-pink-800 bg-pink-200'
		: 'text-gray-600'
	return <div className={`border rounded p-10 py-6 ${classes}`}>{children}</div>
}

export default AlertBox
