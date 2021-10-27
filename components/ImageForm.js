import { uploadImage } from '../lib/media'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Buttons = ({ localURL, isSubmitting, hasChanged }) => (
  <nav>
    {!localURL ? null : (
      <div className="flex flex-row">
        <button
          className="button solid"
          //disabled={isSubmitting || !hasChanged}
          //aria-disabled={isSubmitting || !hasChanged}
        >
          Upload
        </button>
      </div>
    )}
  </nav>
)

export default function ImageForm({ publicURL, onUpload }) {
  const [serverURL, setServerURL] = useState(publicURL)
  const [localURL, setLocalURL] = useState(serverURL)
  const [hasChanged, setHasChanged] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      // isDirty,
      // isSubmitting,
      // isSubmitSuccessful,
    },
  } = useForm()

  const onSubmit = data =>
    uploadImage(data).then(data => {
      onUpload(data)
      setServerURL(data)
    })

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        {serverURL ? <input disabled value={serverURL} /> : null}
        <label
          className={`relative flex flex-col w-full fit-content ${
            localURL
              ? 'shadow-lg hover:opacity-80'
              : 'border border-dashed rounded'
          } ${
            errors.image_upload ? 'border-red-600' : 'border-gray-300'
          } hover:bg-gray-100`}
        >
          {localURL ? (
            <img src={localURL} alt="" />
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
            })}
            onChange={e => {
              setHasChanged(true)
              const [file] = e.target.files
              if (file) setLocalURL(() => URL.createObjectURL(file))
              setHasChanged(localURL === serverURL)
              console.log(file)
            }}
          />
        </label>
      </div>
      <Buttons localURL isSubmitting hasChanged />
      {errors?.length && (
        <div className="py-12 my-6">
          <span role="alert">{JSON.stringify(errors)}</span>
        </div>
      )}
    </form>
  )
}
