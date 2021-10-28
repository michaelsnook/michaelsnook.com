import { uploadImage } from '../lib/media'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const CopyInput = ({ val }) => (
  <input className="truncate copy-input" disabled value={val} />
)

const Buttons = ({
  isThereAFile,
  previewURL,
  clearPreview,
  confirmImageInput,
  // isSubmitting,
  // isDirty,
}) => (
  <nav>
    {isThereAFile || previewURL ? (
      <div className="flex flex-row gap-4">
        <button className="button solid">Upload</button>
        <button
          className="button outline"
          type="reset"
          onClick={clearPreview}
          disabled={!previewURL}
        >
          Clear
        </button>
        <button
          className="button solid"
          type="button"
          onClick={() => confirmImageInput(previewURL)}
          disabled={!previewURL}
        >
          Confirm
        </button>
      </div>
    ) : null}
  </nav>
)

export default function ImageForm({ onConfirm }) {
  const defaultValues = { image_upload: '' }
  const {
    register,
    handleSubmit,
    // reset,
    watch,
    setValue,
    // control,
    formState: {
      errors,
      // isDirty,
      // isSubmitting,
      // isSubmitSuccessful,
    },
  } = useForm({ defaultValues })

  const watchImageList = watch('image_upload') // will be null at the start
  const [previewURL, setPreviewURL] = useState()
  // const [storageURL, setStorageURL] = useState()
  // const [previewObject, setPreviewObject] = useState()
  // const [storageObject, setStorageObject] = useState()

  const onSubmit = data =>
    uploadImage(data.image_upload[0]).then(url => {
      console.log(data.image_upload[0])
      // just change the preview URL, later the user will "confirm" it
      setPreviewURL(url)
      console.log('uploaded the image and set a new preview URL: ', url)
    })

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {previewURL ? <CopyInput val={previewURL} /> : null}
        <label
          className={`relative flex flex-col w-full fit-content ${
            previewURL
              ? 'shadow-lg hover:opacity-80'
              : 'border border-dashed rounded'
          } ${
            errors.image_upload ? 'border-red-600' : 'border-gray-300'
          } hover:bg-gray-100`}
        >
          {previewURL ? (
            <img src={previewURL} alt="" />
          ) : (
            <div className="flex flex-col items-center justify-center py-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
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
              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                Add your image here
              </p>
            </div>
          )}
          <input
            type="file"
            className="absolute opacity-0 top-0 left-0 right-0"
            aria-invalid={!!errors?.image_upload}
            {...register('image_upload', {
              required: true,
              defaultValue: '',
            })}
            onChange={e => {
              // setHasChanged(true)
              const [file] = e.target.files
              if (file) setPreviewURL(() => URL.createObjectURL(file))
              console.log('logging onChange with file: ', file)
            }}
          />
        </label>
      </div>
      <Buttons
        previewURL={previewURL}
        clearPreview={() => {
          setValue('image_upload', '')
          setPreviewURL()
        }}
        isThereAFile={!!watchImageList}
        // isSubmitting
        confirmImageInput={d => onConfirm(d)}
      />
      {errors?.length && (
        <div className="py-12 my-6">
          <span role="alert">{JSON.stringify(errors)}</span>
        </div>
      )}
    </form>
  )
}
