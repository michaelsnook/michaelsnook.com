import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '../../components/Layout'
import { InputContent } from '../../components/FormInputs'
import { postAPI } from '../../lib/api'

const urlRegex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpg|jpeg|gif|png|webp)$/i

const onSubmit = async (data) => {
  data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const post = await postAPI('posts/create', data)
  if (post?.id) alert(`success. go to /posts/${post.id}/edit`)
  else alert(`fail`)
}

export default function New() { 
  const { register, handleSubmit, formState: { errors } } = useForm()

  console.log(Object.keys(errors).length === 0 ? 'no errors' : errors)

  return (
    <Layout>
      <section className="max-w-prose mx-auto">
        <h1 className="h1">
          Draft a new post
        </h1>
        <form className="form flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

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
            <button type="submit" className="button solid">
              Create Post
            </button>
            <Link href="/">
              <a className="button outline">Back to Home</a>
            </Link>
          </div>

        </form>
      </section>
    </Layout>
  )
}
