import { useState, useEffect, useCallback } from 'react'

export const Overlay = ({ close, children }) => (
  <div
    className="z-20 bg-black bg-opacity-50 px-2 pt-10 fixed top-0 left-0 right-0 bottom-0"
    onClick={close}
  >
    {children}
  </div>
)

export const CloseButton = ({ close }) => (
  <button
    onClick={e => {
      e.preventDefault()
      close(e)
    }}
    className="py-1 px-2 absolute top-2 right-3 text-xs text-gray-500 flex place-items-center"
  >
    close&nbsp;
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
)

export default function Modal({ showing, children }) {
  const [isShowing, setIsShowing] = useState(showing || false)

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      setIsShowing(false)
    }
  }, [])

  useEffect(() => {
    if (isShowing) document.addEventListener('keydown', escFunction, false)
    else document.removeEventListener('keydown', escFunction, false)
  }, [isShowing, escFunction])

  return isShowing ? (
    <Overlay
      close={event => {
        if (event.target === event.currentTarget) setIsShowing(false)
      }}
    >
      <div
        role="dialog"
        className="bg-white rounded max-w-xl mx-auto px-6 py-4 relative"
      >
        {children}
        <CloseButton close={() => setIsShowing(false)} />
      </div>
    </Overlay>
  ) : null
}

export function AlertBox({ type, children }) {
  const classes =
    type === 'success'
      ? 'border-green-400 text-green-800 bg-green-200'
      : // type === 'complete' ?
        'text-gray-600'
  // : ''
  return <div className={`border rounded p-10 py-6 ${classes}`}>{children}</div>
}
