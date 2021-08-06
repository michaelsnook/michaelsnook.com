export default function PostList({ posts }) {
  return posts.length === 0 ? <p>loading posts...</p> : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-stretch">
      {posts.map(post => (
        <a key={`post-${post.id}`} className="border rounded" href={`/posts/${post.id}`}>
          {post.image &&
            <img className="rounded-t" src={post.image} alt="" />
          }
          <p className="text-2xl font-display p-4 text-cyan-700 hover:underline">
            {post.title}
          </p>
          {!post.image &&
            <p className="p-4">
              {post.excerpt}
            </p>
          }
        </a>
      ))}
    </div>
  )
}
