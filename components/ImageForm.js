import { uploadImage, publicImageURL } from '../lib/media'
import { useState, useEffect } from 'react'
import { CloseButton } from './Modal'
import { useForm } from 'react-hook-form'

export const CopyInput = ({ val }) => {
  const [status, setStatus] = useState('default')
  const copyVal = val => {
    navigator.clipboard.writeText(val)
    setStatus('confirming')
    setTimeout(() => setStatus('default'), 3000)
  }
  return (
    <div className="flex flex-row w-full gap-2">
      <input
        className="truncate copy-input text-left float-left"
        disabled
        dir="rtl"
        value={val}
      />
      <a
        onClick={() => copyVal(val)}
        className="float-right button small outline"
      >
        {status === 'default' ? 'copy' : 'done!'}
      </a>
    </div>
  )
}

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
  confirmedURL,
  clearForm,
  submitUpload,
  confirmImageInput,
}) => (
  <nav className="flex flex-row gap-4">
    {previewURL ? (
      <button className="button outline small" type="reset" onClick={clearForm}>
        clear
      </button>
    ) : null}
    {confirmedURL !== previewURL && previewURL === publicURL ? (
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
  </nav>
)

export default function ImageForm({ onConfirm, confirmedURL }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [previewURL, setPreviewURL] = useState()
  const [publicURL, setPublicURL] = useState()

  useEffect(() => {
    setPreviewURL(confirmedURL)
    setPublicURL(confirmedURL)
  }, [confirmedURL])

  const clearForm = () => {
    setValue('image_upload', '')
    setPreviewURL()
    setPublicURL()
  }

  const onSubmit = data =>
    uploadImage(data.image_upload[0]).then(filename => {
      // just change the preview URL, later the user will "confirm" it
      const url = publicImageURL(filename)
      onConfirm(url)
      console.log(
        'uploaded the image and set a new preview URL for image: ',
        url
      )
    })

  // console.log('Confirmed image url', confirmedURL)
  // console.log('Preview image url', previewURL)
  // console.log('Public image url', publicURL)

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
              }
              console.log('logging onChange with file: ', file)
            }}
          />
          {previewURL ? (
            <CloseButton
              close={() => {
                clearForm()
                onConfirm('')
              }}
            />
          ) : null}
        </label>

        {confirmedURL !== previewURL ? (
          <Buttons
            previewURL={previewURL}
            publicURL={publicURL}
            confirmedURL={confirmedURL}
            clearForm={() => {
              setValue('image_upload', '')
              setPreviewURL()
              setPublicURL()
            }}
            confirmImageInput={() => {
              onConfirm(publicURL)
            }}
            submitUpload={handleSubmit(onSubmit)}
          />
        ) : null}

        {errors?.length && (
          <div className="py-12 my-6">
            <span role="alert">{JSON.stringify(errors)}</span>
          </div>
        )}
      </div>
    </form>
  )
}
