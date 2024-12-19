'use client'

import { useEffect } from 'react'
import { PostgrestError } from '@supabase/supabase-js'
import { Button } from '@/components/lib'

interface ErrorElementProps {
	error: PostgrestError | { message: string }
	reset: () => void
}

export default function Error({ error, reset }: ErrorElementProps) {
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
			<Button
				variant="outlines"
				className="mt-6"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	)
}
