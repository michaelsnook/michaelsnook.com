import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '../../components/Layout'
import ErrorList from '../../components/ErrorList'
import { InputTitle, InputContent, InputSlug, InputImage } from '../../components/FormInputs'
import { postAPI } from '../../lib/api'

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

            <InputTitle register={register} error={errors.title} />
            <InputSlug register={register} error={errors.name} />
            <InputContent register={register} />
            <InputImage register={register} error={errors.image} />

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
