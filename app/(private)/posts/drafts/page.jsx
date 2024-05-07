'use client'

import Link from 'next/link'
import useSWR from 'swr'
import PostList from '@/components/PostList'
import Banner from '@/components/Banner'
import { ErrorList } from '@/components/lib'
import { fetchDraftPosts } from '@/lib/posts'

export default function Page() {
  const { data, error } = useSWR(`posts/drafts`, fetchDraftPosts)

  return (
    <>
      <Banner
        title="Your draft posts"
        description="Consider finishing one or two, maybe 🤷"
        small
      />
      <main className="container py-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="h2">Draft posts</h2>
          <Link href="/posts/new" className="button outlines">
            New post
          </Link>
        </div>
        <ErrorList summary="Can't load drafts" error={error} />
        <PostList posts={data} />
      </main>
    </>
  )
}
