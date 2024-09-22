import supabase from '@/app/supabase-client'

export async function fetchPostList() {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('published', true)
		.order('published_at', { ascending: false })

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
		.order('updated_at', { ascending: false, nullsFirst: false })

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
		.maybeSingle()

	if (error) throw error
	return typeof data?.content === 'string' ?
			{
				...data,
				content: data.content.replace('&gt;', '>').replace('&lt;', '<'),
			}
		:	data
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

export async function updateOnePost(postData) {
	const { data, error } = await supabase
		.from('posts')
		.upsert([postData], { returning: 'minimal' })

	if (error) {
		console.log(error)
		throw error.message
	}

	return data
}
