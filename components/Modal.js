import { useState } from 'react'

export default function Modal({ showing, children }) {
  const [ isShowing, setIsShowing ] = useState(showing || false)
  return (
    <div className={`z-40 bg-black bg-opacity-50 ${isShowing ? 'fixed' : 'hidden' } top-0 left-0 right-0 bottom-0`}>
      <div className="bg-white rounded-sm max-w-xl mx-auto px-4 relative mt-10">
        <button
          onClick={() => setIsShowing(false)}
          className="absolute top-2 right-3"
        >
          ⓧ
        </button>
        {children}
      </div>
    </div>
  )
}
