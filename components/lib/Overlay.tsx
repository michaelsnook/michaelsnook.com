interface OverlayProps extends React.ReactPortal {
	close: () => void
}
const Overlay = ({ close, children }) => (
	<div
		className="z-20 bg-black/50 px-2 pt-10 fixed top-0 left-0 right-0 bottom-0"
		onClick={close}
	>
		{children}
	</div>
)

export default Overlay
