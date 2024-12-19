import { useState, useEffect, useCallback } from 'react'
import { CloseButton, Overlay } from '../components/lib'

interface ModalProps {
	showing?: boolean
	children: React.ReactNode
}

export default function Modal({ showing, children }: ModalProps) {
	const [isShowing, setIsShowing] = useState(showing || false)
	const close = () => setIsShowing(false)

	const escFunction = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close()
		}
	}, [])

	useEffect(() => {
		if (isShowing) document.addEventListener('keydown', escFunction, false)
		else document.removeEventListener('keydown', escFunction, false)
	}, [isShowing, escFunction])

	return isShowing ? (
		<Overlay close={close}>
			<div
				role="dialog"
				className="bg-white rounded-sm max-w-xl mx-auto px-6 py-4 relative"
			>
				{children}
				<CloseButton close={close} />
			</div>
		</Overlay>
	) : null
}
