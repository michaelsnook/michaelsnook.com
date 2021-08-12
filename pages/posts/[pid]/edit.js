import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { fetchPost, postAPI } from '../../../lib/api'
import Layout from '../../../components/Layout'
import ErrorList from '../../../components/ErrorList'
import { InputTitle, InputContent, InputImage } from '../../../components/FormInputs'
import { PostArticle } from "../[pid]"

export default function EditPost() {
  const [isLoading, setLoading] = useState()
  const [loadErrors, setLoadErrors] = useState([])
  const [formErrors, setFormErrors] = useState([])
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful }
  } = useForm()
  const { isReady, query: { pid } } = useRouter()

  const thePost = watch()

  const onSubmit = (data) => {
    setFormErrors([])
    reset(data) // reset isDirty immediately, before fetch
    data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    postAPI(`posts/update/${pid}`, data)
      .catch(errors => {
        setFormErrors(errors)
        console.log('Something went wrong updating this post', errors)
      })
  }

  useEffect(() => {
    setLoading(true)
    if (isReady) {
      fetchPost(pid)
        .then(post => {
          setLoadErrors([])
          reset(post)
          setLoading(false)
        })
        .catch(errors => setLoadErrors(errors))
    }
  }, [isReady, pid, reset])
  
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        <div className="col-span-2">
          <h1 className="h3">Edit your post</h1>
          <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting || isLoading}>

              <InputTitle register={register} error={errors.title} />
              <InputContent register={register} />
              <InputImage register={register} error={errors.image} />

              <div className="flex justify-between">
                <span className="flex">
                  <button
                    type="submit"
                    className="button solid"
                    disabled={!isDirty || isSubmitting}
                    aria-disabled={!isDirty || isSubmitting}
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : 'Save edits'
                    }
                  </button>
                  {isSubmitSuccessful && !isDirty && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 place-self-center text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <Link href={`/posts/${pid}`}>
                  <a className="button outline">
                    {isDirty ? 'Cancel' : 'Go back'}
                  </a>
                </Link>
              </div>

            </fieldset>
            <ErrorList summary="Error saving post" errors={formErrors} />
          </form>
        </div>
        <div className="col-span-2 lg:col-span-3">
          <ErrorList summary="Error loading post" errors={loadErrors} />
          <PostArticle {...thePost} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  )
}
