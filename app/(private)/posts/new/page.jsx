'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ErrorList } from '@/components/lib'
import {
  InputTitle,
  InputContent,
  InputSlug,
  InputImage,
} from '@/components/FormInputs'
import { createOnePost } from '@/lib/posts'

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    formState: { errors },
  } = useForm()
  const [formError, setFormError] = useState()
  const router = useRouter()

  const onSubmit = data => {
    setFormError()
    data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    createOnePost(data)
      .then(() => {
        router.push(`/posts/${data.slug}/edit`)
      })
      .catch(setFormError)
  }

  return (
    <main className="max-w-prose mx-auto">
      <h1 className="h1">Draft a new post</h1>
      <form
        className="form flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset disabled={isSubmitting}>
          <InputTitle register={register} error={errors.title} />
          <InputSlug register={register} error={errors.slug} />
          <InputImage
            register={register}
            error={errors.image}
            setImageValue={v => setValue('image', v)}
          />
          <InputContent register={register} />

          <div className="flex justify-between">
            <Link href="/" className="button outlines">
              Back to Home
            </Link>
            <button
              type="submit"
              className="button solid"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              Create Post
            </button>
          </div>
        </fieldset>
        <ErrorList summary="Error creating post" error={formError} />
      </form>
    </main>
  )
}
