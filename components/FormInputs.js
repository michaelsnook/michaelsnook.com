const urlRegex = /^\S+\.(?:jpg|jpeg|gif|png|webp)$/i

export function InputTitle({ register, error }) {
  return (
    <div>
      <label htmlFor="postTitle">Post title</label>
      <input
        id="postTitle"
        type="text"
        {...register('title', { required: true, maxLength: 120 })}
        aria-invalid={error ? 'true' : 'false'}
        className={error ? 'border-red-600' : ''}
      />
      <span className={!error ? 'invisible' : ''} role="alert">
        Your post needs a title, silly
      </span>
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
        aria-invalid={error ? 'true' : 'false'}
        className={error ? 'border-red-600' : ''}
      />
      <span className={!error ? 'invisible' : ''} role="alert">
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

export function InputImage({ register, error }) {
  return (
    <div>
      <label htmlFor="postImage">Post image</label>
      <input
        id="postImage"
        type="text"
        {...register('image', { pattern: urlRegex })}
        aria-invalid={error ? 'true' : 'false'}
        className={error ? 'border-red-600' : ''}
      />
      <span className={!error ? 'invisible' : ''} role="alert">
        If you can&apos;t enter a valid image URL, just don&apos;t even bother
      </span>
    </div>
  )
}
