import ImageForm from './ImageForm'

export function InputTitle({ register, error }) {
  return (
    <div>
      <label htmlFor="postTitle">Post title</label>
      <input
        id="postTitle"
        type="text"
        {...register('title', { required: true, maxLength: 120 })}
        aria-invalid={!!error}
        className={error ? 'border-red-600' : ''}
      />
      <span className={error ? '' : 'invisible'} role="alert">
        Your post needs a title, silly
      </span>
    </div>
  )
}

export function InputDatestamp({ register }) {
  return (
    <div>
      <label htmlFor="postDatestamp">Post datestamp</label>
      <input id="postDatestamp" type="date" {...register('published_at')} />
    </div>
  )
}

export function InputExcerpt({ register }) {
  return (
    <div>
      <label htmlFor="excerpt">Post Excerpt</label>
      <textarea id="excerpt" rows="3" {...register('excerpt')} />
      <span className="invisible">&nbsp;</span>
    </div>
  )
}

export function InputSlug({ register, error }) {
  return (
    <div>
      <label htmlFor="postSlug">Post slug e.g. `/posts/[slug-post-name]`</label>
      <input
        id="postSlug"
        type="text"
        {...register('slug', {
          pattern: /^[a-z0-9][a-z0-9-_]+[a-z0-9]$/,
          required: 'required',
        })}
        aria-invalid={!!error}
        className={error ? 'border-red-600' : ''}
      />
      <span className={error ? '' : 'invisible'} role="alert">
        You need a valid URL slug
      </span>
    </div>
  )
}

export function InputContent({ register }) {
  return (
    <div>
      <label htmlFor="content">Post content</label>
      <textarea id="content" rows="10" {...register('content')} />
      <span className="invisible">&nbsp;</span>
    </div>
  )
}

export function InputImage({ register, error, startingValue, setImageValue }) {
  const reg = register('image', { pattern: /(?<!\bblob\:)/i })
  return (
    <div>
      <input type="hidden" {...reg} />
      <label>Upload image</label>
      <ImageForm onConfirm={setImageValue} confirmedURL={startingValue} />
      <span className={error ? '' : 'invisible'} role="alert">
        This image URL isn&rsquo;t working
      </span>
    </div>
  )
}

export function InputPublish({ register }) {
  return (
    <div className="flex items-baseline gap-2 mb-4">
      <input id="postPublish" type="checkbox" {...register('published')} />
      <label htmlFor="postPublish">Publish post</label>
    </div>
  )
}
