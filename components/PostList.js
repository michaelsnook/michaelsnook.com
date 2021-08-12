import Image from 'next/image'

const PostCard = ({ id, image, title, excerpt }) => (
  <a key={`post-${id}`} className="border rounded" href={`/posts/${id}`}>
    {image && (
      <div className="relative min-h-64 sm:min-h-40">
        <Image
          className="rounded-t"
          src={image}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    )}
    <p className="text-2xl font-display p-4 text-cyan-700 hover:underline">
      {title}
    </p>
    {!image && <p className="p-4">{excerpt}</p>}
  </a>
)

export default function PostList({ posts }) {
  return posts.length === 0 ? (
    <p>loading posts...</p>
  ) : (
    <div
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          gap-4 place-content-stretch"
    >
      {posts.map(post => (
        <PostCard key={`post=${post.id}`} {...post} />
      ))}
    </div>
  )
}
