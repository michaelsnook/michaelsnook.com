import Image from 'next/image'
import faceImage from '../public/images/my-face-288.png'
import bannerImage from '../public/images/como.jpg'

export default function Banner({ title, description, small, medium }) {
	return (
		<header
			className={`bg-gray-500 w-full ${
				small ? 'min-h-[30vh]' : medium ? 'min-h-[45vh]' : 'h-[75vh]'
			} grid relative`}
			style={{ textShadow: '2px 2px 6px black' }}
		>
			<Image
				src={bannerImage}
				alt="A background image for the top section, a photo of mountains next
          to a lake, with clouds overhead"
				className="z-0"
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				sizes="100vw"
				priority
			/>
			<div
				className="z-10 container p-10 align-middle place-self-center text-white
          flex justify-between rounded-md"
			>
				<div>
					<h1 className="h1">{title}</h1>
					<p className="h1-sub">{description}</p>
				</div>
				{small ? null : (
					<div className="relative">
						<Image
							src={faceImage}
							alt="A cartoon face of the author, Michael"
							className="w-36 rounded-full"
							width="144"
							height="144"
						/>
					</div>
				)}
			</div>
		</header>
	)
}
