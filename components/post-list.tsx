import { Tables } from '@/types/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'timeago.js'

const PostCard = ({
	slug,
	image,
	title,
	excerpt,
	published,
	published_at,
}: Tables<'posts'>) => (
	<Link
		href={`/posts/${slug}${published ? '' : '/edit'}`}
		role="listitem"
		className="border rounded-sm flex flex-col items-stretch"
	>
		{image ? (
			<div className="relative min-h-[16rem] sm:min-h-[10rem]">
				<Image
					className="rounded-t"
					src={image}
					alt=""
					fill
					sizes="582px, (min-width: 640px) 290px, (min-width: 768px) 316px"
					style={{ objectFit: 'cover' }}
				/>
			</div>
		) : (
			<p className="py-2" />
		)}
		<div className="flex flex-col justify-between h-full">
			<p className="text-2xl font-display p-4 text-cyan-content hover:underline">
				{title}
			</p>
			{!image && excerpt ? <p className="p-4">{excerpt}</p> : null}
			<p className="px-4 py-2 text-gray-600">{format(published_at)}</p>
		</div>
	</Link>
)

interface PostListProps {
	posts: Array<Tables<'posts'>>
}

export default function PostList({ posts }: PostListProps) {
	return !posts ? (
		<p className="py-6">loading posts...</p>
	) : (
		<div
			role="list"
			className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-stretch"
		>
			{posts.map((post) => (
				<PostCard key={`${post.id}-${post.slug}`} {...post} />
			))}
		</div>
	)
}
