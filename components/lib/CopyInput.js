import { useState } from 'react'

const CopyInput = ({ val }) => {
  const [status, setStatus] = useState('default')
  const copyVal = val => {
    navigator.clipboard.writeText(val)
    setStatus('confirming')
    setTimeout(() => setStatus('default'), 3000)
  }

  return (
    <div className="flex flex-row w-full gap-2">
      <input
        className="truncate copy-input text-left float-left"
        disabled
        dir="rtl"
        value={val}
      />
      <a
        onClick={() => copyVal(val)}
        className="float-right button small outlines"
      >
        {status === 'default' ? 'copy' : 'done!'}
      </a>
    </div>
  )
}

export default CopyInput
