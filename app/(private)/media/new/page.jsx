'use client'

import { useState } from 'react'
import ImageForm from '@/components/ImageForm'
import MediaArticle from '@/components/Media'

export default function Page() {
	const [imageURL, setImageURL] = useState()
	return (
		<main className="single-col">
			<h1 className="h1">Upload something</h1>
			<ImageForm
				confirmedURL={imageURL}
				onConfirm={(d) => {
					setImageURL(d)
					console.log(d)
				}}
			/>
			<h2 className="h4">Confirmed image (if any)</h2>
			<MediaArticle url={imageURL} />
		</main>
	)
}
