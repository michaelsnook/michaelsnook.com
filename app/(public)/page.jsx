import Link from 'next/link'
import Banner from '@/components/Banner'
import PostList from '@/components/PostList'
import IffLoggedIn from '../iff-logged-in'
import { fetchPostList } from '@/lib/posts'

export const metadata = {
	title: 'Michael Snook web site',
	description: 'My personal space to jot things down',
	image: '/images/my-face-circle.png',
	author: 'Michael Snook',
}

export default async function Page() {
	const data = await fetchPostList()
	return (
		<>
			<Banner title={metadata.title} description={metadata.description} />
			<main className="container py-5">
				<div className="flex flex-row justify-between items-center">
					<h2 className="h2">All Posts</h2>
					<IffLoggedIn>
						<Link href="/posts/drafts" className="button outlines">
							See drafts
						</Link>
					</IffLoggedIn>
				</div>
				<PostList posts={data} />
			</main>
		</>
	)
}
