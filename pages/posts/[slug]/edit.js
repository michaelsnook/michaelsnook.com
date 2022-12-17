import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { fetchOnePost, updateOnePost } from '../../../lib/posts'
import Layout from '../../../components/Layout'
import { LoginChallenge } from '../../../components/LoginForm'
import { useSession } from '../../../lib/auth'
import { ErrorList } from '../../../components/lib'
import {
  InputTitle,
  InputExcerpt,
  InputContent,
  InputImage,
  InputPublish,
  InputDatestamp,
} from '../../../components/FormInputs'
import { PostArticle } from '../../../components/Post'

export default function EditPost() {
  const [formError, setFormError] = useState()
  const { session } = useSession()
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm()

  const thePost = watch()
  const {
    back,
    query: { slug },
  } = useRouter()

  const onSubmit = data => {
    setFormError()
    reset(data) // reset isDirty immediately, before fetch
    data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    updateOnePost(data).catch(setFormError)
  }

  const { data: post, error: loadError } = useSWR(slug ?? null, fetchOnePost, {
    onSuccess: post => reset(post),
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  })
  const isLoading = !post && !loadError

  return (
    <Layout noFooter>
      <LoginChallenge />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 lg:px-4">
        <div className="col-span-2">
          <h1 className="h3">Edit your post</h1>
          <form
            className="form flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" {...register('id')} />
            <fieldset disabled={!session || isSubmitting || isLoading}>
              <InputTitle register={register} error={errors.title} />
              <InputExcerpt register={register} />
              <InputContent register={register} />
              <InputImage
                register={register}
                error={errors.image}
                setImageValue={v => setValue('image', v, { shouldDirty: true })}
                startingValue={thePost.image}
              />
              <InputPublish register={register} />
              {thePost.published || thePost.published_at ? (
                <InputDatestamp register={register} />
              ) : null}

              <div className="flex justify-between my-4">
                <a className="button outlines" onClick={() => back()}>
                  {isDirty ? 'Cancel' : 'Go back'}
                </a>
                <span className="flex">
                  <button
                    type="submit"
                    className="button solid"
                    disabled={!isDirty || isSubmitting || !session}
                    aria-disabled={!isDirty || isSubmitting || !session}
                  >
                    {isSubmitting ? 'Saving...' : 'Save edits'}
                  </button>
                  {isSubmitSuccessful && !isDirty && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5 place-self-center text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </fieldset>
            <ErrorList summary="Error saving post" error={formError} />
          </form>
        </div>
        <div className="col-span-2 lg:col-span-3 flex flex-col">
          <ErrorList summary="Error loading post" error={loadError} />
          <div
            style={{
              height: '95vh',
              marginTop: '2.5vh',
              marginBottom: '2.5vh',
            }}
            className="border rounded-lg p-6 pb-16 mx-1 lg:mx-6 overflow-y-auto shadow-lg"
          >
            <PostArticle {...thePost} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
