import { useState, useEffect, useCallback } from 'react'
import { CloseButton, Overlay } from '../components/lib'

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
