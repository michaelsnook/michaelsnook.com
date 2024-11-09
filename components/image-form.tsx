import { uploadImage, publicImageURL } from '../lib/media'
import { useState, useEffect } from 'react'
import { CopyInput, CloseButton } from './lib'
import { useForm } from 'react-hook-form'

const UploadSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-8 h-8 text-gray-600"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
		/>
	</svg>
)

const Buttons = ({
	previewURL,
	confirmedURL,
	clearForm,
	submitUpload,
	isUploading,
	confirmClear,
}) => (
	<nav className="flex flex-row gap-4">
		{previewURL ? (
			<button
				className="button outlines small"
				type="reset"
				onClick={clearForm}
			>
				clear
			</button>
		) : null}
		{previewURL && previewURL !== confirmedURL ? (
			<button
				className="button solid small"
				type="button"
				onClick={submitUpload}
				disabled={isUploading}
			>
				{isUploading ? 'uploading...' : 'upload'}
			</button>
		) : null}
		{!previewURL && confirmedURL ? (
			<button
				className="button solid small"
				type="button"
				onClick={confirmClear}
			>
				confirm clear
			</button>
		) : null}
	</nav>
)

export default function ImageForm({ onConfirm, confirmedURL = '' }) {
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			image_upload: confirmedURL,
		},
	})
	const [previewURL, setPreviewURL] = useState<string>('')
	const [isUploading, setIsUploading] = useState<boolean>(false)

	useEffect(() => {
		setPreviewURL(confirmedURL)
		setIsUploading(false)
	}, [confirmedURL])

	const clearForm = () => {
		setValue('image_upload', '')
		setPreviewURL('')
	}

	const onSubmit = (data) => {
		setError('image_upload', null)
		setIsUploading(true)
		uploadImage(data.image_upload[0])
			.then((filename) => {
				const url = publicImageURL(filename)
				console.log(
					'uploaded the image and set a new preview URL for image: ',
					url,
				)
				// confirming triggers a re-render
				onConfirm(url)
			})
			.catch((error) => {
				setIsUploading(false)
				setError('image_upload', error)
			})
	}

	// console.log('Confirmed image url', confirmedURL)
	// console.log('Preview image url', previewURL)

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-1 items-center border rounded p-4">
				{previewURL ? <CopyInput val={previewURL} /> : null}
				<label
					className={`relative flex flex-col w-full fit-content hover:bg-gray-100 ${
						previewURL ? 'shadow-lg' : 'border border-dashed rounded'
					} ${errors.image_upload ? 'border-red-600' : 'border-gray-300'}`}
				>
					{previewURL ? (
						<img className="w-full" src={previewURL} alt="" />
					) : null}

					<div
						className={`${
							previewURL ? 'opacity-0 hover:opacity-100 absolute' : ''
						} bg-white/50 h-full top-0 left-0 right-0 py-8`}
					>
						<div className="flex flex-col items-center justify-center py-7 h-full">
							<UploadSVG />
							<p className="pt-1 text-sm tracking-wider text-gray-600">
								Drag and drop an image or click to select one
							</p>
						</div>
					</div>

					<input
						type="file"
						className="absolute opacity-0 top-0 left-0 right-0 bottom-0"
						aria-invalid={!!errors?.image_upload}
						{...register('image_upload', {
							required: true,
						})}
						onChange={(e) => {
							const [file] = e.target.files
							if (file) {
								setPreviewURL(() => URL.createObjectURL(file))
							}
							console.log('logging onChange with file: ', file)
						}}
					/>
					{previewURL ? <CloseButton close={clearForm} /> : null}
				</label>

				{confirmedURL !== previewURL ? (
					<Buttons
						previewURL={previewURL}
						confirmedURL={confirmedURL}
						clearForm={() => {
							clearForm()
							onConfirm('')
						}}
						submitUpload={handleSubmit(onSubmit)}
						isUploading={isUploading}
						confirmClear={() => {
							clearForm()
							onConfirm('')
						}}
					/>
				) : null}

				{errors?.image_upload && (
					<div className="py-12 my-6">
						<span role="alert">{errors.image_upload.message}</span>
					</div>
				)}
			</div>
		</form>
	)
}
