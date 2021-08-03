import { useState, useEffect } from 'react'
import Banner from '../../components/Banner'
import PostList from '../../components/PostList'
import Layout from '../../components/Layout'
import ErrorList from '../../components/ErrorList'
import { getAPI } from '../../lib/api'

export default function Drafts() {
  const [postsData, setPosts] = useState({ posts: [], errors: [] })
  useEffect(() => {
    getAPI(`posts/drafts`)
      .then(data => {
        setPosts({
          posts: data,
          errors: [],
        })
      })
      .catch(errors => {
        setPosts({
          posts: [],
          errors: [errors || 'no posts found'],
        })
      })
  }, [])


  return (
    <Layout banner>
      <main className="container py-5">
        <h2 className="h2">Draft posts</h2>
        <ErrorList summary="Can't load drafts" errors={postsData.errors} />
        <PostList posts={postsData.posts} />
      </main>
    </Layout>
  )
}
