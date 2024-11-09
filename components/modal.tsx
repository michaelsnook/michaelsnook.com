import { useState, useEffect, useCallback } from 'react'
import { CloseButton, Overlay } from '../components/lib'

interface ModalProps extends React.ReactPortal {
	showing?: boolean
}

export default function Modal({ showing, children }: ModalProps) {
	const [isShowing, setIsShowing] = useState(showing || false)

	const escFunction = useCallback((event) => {
		if (event.keyCode === 27) {
			setIsShowing(false)
		}
	}, [])

	useEffect(() => {
		if (isShowing) document.addEventListener('keydown', escFunction, false)
		else document.removeEventListener('keydown', escFunction, false)
		return document.removeEventListener('keydown', escFunction, false)
	}, [isShowing, escFunction])

	return isShowing ? (
		<Overlay
			close={() => {
				setIsShowing(false)
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
