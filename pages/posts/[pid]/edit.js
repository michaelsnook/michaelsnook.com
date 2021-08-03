import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getAPI, postAPI } from '../../../lib/api'
import Layout from '../../../components/Layout'
import ErrorList from '../../../components/ErrorList'
import { InputTitle, InputContent, InputImage } from '../../../components/FormInputs'
import { PostArticle } from "../[pid]"

export default function EditPost() {
  const [isLoading, setLoading] = useState()
  const [isSubmitting, setSubmitting] = useState(false)
  const [loadErrors, setLoadErrors] = useState([])
  const [formErrors, setFormErrors] = useState([])
  const [thePost, setPost] = useState()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = (data) => {
    setFormErrors([])
    setSubmitting(true)
    data.content = data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    postAPI(`posts/update/${router.query.pid}`, data)
      .then(() => {
        setPost(data)
      })
      .catch(errors => {
        setFormErrors(errors)
        console.log('Something went wrong updating this post', errors)
      })
      .finally(() => setSubmitting(false))
  }

  useEffect(() => {
    setLoading(true)
    if (router.isReady) {
      getAPI(`posts/show/${router.query.pid}`)
        .then(post => {
          setLoadErrors([])
          reset(post)
          setLoading(false)
          setPost(post)
        })
        .catch(errors => setLoadErrors(errors))
    }
  }, [router.isReady])
  
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        <div className="col-span-2">
          <h1 className="h3">Edit your post</h1>
          <form className="form flex flex-col gap-4 overflow-scroll" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting || isLoading ? 'disabled' : ''}>

              <InputTitle register={register} error={errors.title} />
              <InputContent register={register} />
              <InputImage register={register} error={errors.image} />

              <div className="flex justify-between">
                <button type="submit" className="button solid" disabled={isSubmitting ? 'disabled' : ''}>
                  Save edits
                </button>
                <Link href={`/posts/${router.query.pid}`}>
                  <a className="button outline">Cancel</a>
                </Link>
              </div>

            </fieldset>
            <ErrorList summary="Error saving post" errors={formErrors} />
          </form>
        </div>
        <div className="col-span-2 lg:col-span-3">
          <ErrorList summary="Error loading post" errors={loadErrors} />
          { isLoading
            ? <p>Loading...</p>
            : <PostArticle {...thePost} />
          }
        </div>
      </div>
    </Layout>
  )
}