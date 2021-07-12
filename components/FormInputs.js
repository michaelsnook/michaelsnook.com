export function InputExcerpt({register}) {
  return (
    <div>
      <label htmlFor="excerpt">Post Excerpt</label>
      <textarea
        id="excerpt"
        rows="3"
        {...register("excerpt")}
      />
      <span className="invisible">
        &nbsp;
      </span>
    </div>
  )
}

export function InputSlug({register, error}) {
  return (
    <div>
      <label htmlFor="postName">Post slug e.g. `/posts/[slug-post-name]`</label>
      <input
        id="postName"
        type="text"
        {...register("name", {pattern: /^[a-z][a-z-_][a-z]+$/})}
        aria-invalid={error ? 'true' : 'false'}
        className={error ? 'border-red-600' : ''}
      />
      <span className={!error ? 'invisible' : ''} role="alert">
        You need a valid URL slug
      </span>
    </div>
  )
}

export function InputContent({register}) {
  return (
    <div>
      <label htmlFor="content">Post Content</label>
      <textarea
        id="content"
        rows="10"
        {...register("content")}
      />
      <span className="invisible">
        &nbsp;
      </span>
    </div>
  )
}
