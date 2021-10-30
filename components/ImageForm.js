import { uploadImage, publicImageURL } from '../lib/media'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const CopyInput = ({ val }) => (
  <div className="flex flex-row w-full gap-2">
    <input
      className="truncate copy-input text-left float-left"
      disabled
      dir="rtl"
      value={val}
    />
    <a className="float-right button small outline">copy</a>
  </div>
)

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
  publicURL,
  clearForm,
  submitUpload,
  confirmImageInput,
}) => (
  <nav className="">
    {previewURL ? (
      <div className="flex flex-row gap-4">
        <button
          className="button outline small"
          type="reset"
          onClick={clearForm}
        >
          clear
        </button>
        {publicURL && publicURL === previewURL ? (
          <button
            className="button solid small"
            type="button"
            onClick={confirmImageInput}
          >
            confirm
          </button>
        ) : (
          <button
            className="button solid small"
            type="button"
            onClick={submitUpload}
          >
            upload
          </button>
        )}
      </div>
    ) : null}
  </nav>
)

export default function ImageForm({ onConfirm, startingImageURL = '' }) {
  const defaultValues = { image_upload: startingImageURL }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues })
  const [isOpen, setIsOpen] = useState(true)
  const [previewURL, setPreviewURL] = useState()
  const [publicURL, setPublicURL] = useState()

  const watchImageList = watch('image_upload')
  const onSubmit = data =>
    uploadImage(data.image_upload[0]).then(filename => {
      console.log(filename)
      // just change the preview URL, later the user will "confirm" it
      const url = publicImageURL(filename)
      setPreviewURL(url)
      setPublicURL(url)
      console.log(
        'uploaded the image and set a new preview URL for image: ',
        url
      )
    })

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 items-center">
        {previewURL ? <CopyInput val={previewURL} /> : null}
        <label
          className={`relative flex flex-col w-full fit-content ${
            previewURL ? 'shadow-lg' : 'border border-dashed rounded'
          } ${errors.image_upload ? 'border-red-600' : 'border-gray-300'}`}
        >
          {previewURL ? (
            <img className="w-full" src={previewURL || publicURL} alt="" />
          ) : null}

          <div
            className={`${
              previewURL ? 'opacity-0 hover:opacity-100 absolute' : ''
            } bg-white bg-opacity-50 h-full top-0 left-0 right-0 py-8`}
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
            className="absolute opacity-0 top-0 left-0 right-0"
            aria-invalid={!!errors?.image_upload}
            {...register('image_upload', {
              required: true,
              defaultValue: '',
            })}
            onChange={e => {
              const [file] = e.target.files
              if (file) {
                setPreviewURL(() => URL.createObjectURL(file))
                setIsOpen(true)
              }
              console.log('logging onChange with file: ', file)
            }}
          />
        </label>

        {isOpen ? (
          <Buttons
            previewURL={previewURL}
            publicURL={publicURL}
            clearForm={() => {
              setValue('image_upload', '')
              setPreviewURL()
            }}
            confirmImageInput={() => {
              onConfirm(publicURL)
              setIsOpen(false)
            }}
            submitUpload={handleSubmit(onSubmit)}
          />
        ) : null}

        {isOpen && errors?.length && (
          <div className="py-12 my-6">
            <span role="alert">{JSON.stringify(errors)}</span>
          </div>
        )}
      </div>
    </form>
  )
}
