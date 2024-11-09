import Client from './client'
import { fetchOnePost } from '@/lib/posts'

export default async function Page({ params: { slug } }) {
	const post = await fetchOnePost(slug.toString())

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 lg:px-4">
			<Client initialData={post} slug={slug} />
		</div>
	)
}
