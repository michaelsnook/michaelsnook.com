'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="max-w-xl border border-error p-6">
      <h2 className="h4 text-pink-800">Something went wrong!</h2>
      <code>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </code>
      <button
        className="button outlines mt-6"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
