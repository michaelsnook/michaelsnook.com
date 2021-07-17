import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '../../components/Layout'
import ErrorList from '../../components/ErrorList'
import { InputContent, InputSlug } from '../../components/FormInputs'
import { postAPI } from '../../lib/api'

const urlRegex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpg|jpeg|gif|png|webp)$/i

export default function New() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [errorMsg, setError] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)
  const router = useRouter()

  const onSubmit = (data) => {
    setError([])
    setSubmitting(true)
    data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    postAPI('posts/create', data)
      .then(post => {
        router.push(`/posts/${post.id}/edit`)
      })
      .catch(error => {
        setError(error)
        console.log('Something went wrong creating this post', error)
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Layout>
      <section className="max-w-prose mx-auto">
        <h1 className="h1">
          Draft a new post
        </h1>
        <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isSubmitting ? 'disabled' : ''}>

            <div>
              <label htmlFor="postTitle">Post title</label>
              <input
                id="postTitle"
                type="text"
                {...register("title", {required: true, maxLength: 120})}
                aria-invalid={errors.title ? 'true' : 'false'}
                className={errors.title ? 'border-red-600' : ''}
              />
              <span className={!errors.title ? 'invisible' : ''} role="alert">
                Your post needs a title, silly
              </span>
            </div>

            <InputSlug register={register} error={errors.name}/>
            <InputContent register={register} />

            <div>
              <label htmlFor="postImage">Post image</label>
              <input
                id="postImage"
                type="text"
                {...register("image", {pattern: urlRegex})}
                aria-invalid={errors.image ? 'true' : 'false'}
                className={errors.image ? 'border-red-600' : ''}
              />
              <span className={!errors.image ? 'invisible' : ''} role="alert">
                If you can't enter a valid image URL, just don't even bother
              </span>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="button solid" disabled={isSubmitting ? 'disabled' : ''}>
                Create Post
              </button>
              <Link href="/">
                <a className="button outline">Back to Home</a>
              </Link>
            </div>

          </fieldset>
          <ErrorList errors={errorMsg} />
        </form>
      </section>
    </Layout>
  )
}
