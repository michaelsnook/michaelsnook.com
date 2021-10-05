import supabase from './supabase-client'

export async function fetchPostList() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
    throw error.message
  }
  return data
}

export async function fetchDraftPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .neq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
    throw error.message
  }
  return data
}

export async function fetchOnePost(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error.message
  return 'content' in data && data.content.length > 0
    ? {
        ...data,
        content: data.content.replace('&gt;', '>').replace('&lt;', '<'),
      }
    : data
}

export async function createOnePost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData], { returning: 'minimal' })

  if (error) {
    console.log(error)
    throw error.message
  }
  return data
}

export async function updateOnePost(slug, postData) {
  const { data, error } = await supabase
    .from('posts')
    .update(postData, { returning: 'minimal' })
    .eq('slug', slug)

  if (error) {
    console.log(error)
    throw error.message
  }

  return data
}
