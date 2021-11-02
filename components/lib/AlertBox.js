const AlertBox = ({ type, children }) => {
  const classes =
    type === 'success'
      ? 'border-green-400 text-green-800 bg-green-200'
      : 'text-gray-600'
  return <div className={`border rounded p-10 py-6 ${classes}`}>{children}</div>
}

export default AlertBox
