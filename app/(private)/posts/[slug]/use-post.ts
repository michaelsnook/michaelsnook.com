import useSWR from 'swr'
import { fetchOnePost } from '@/lib/posts'
import type { Tables } from '@/types/supabase'

export default function usePost(
	slug: string,
	reset: (post: Tables<'posts'>) => void,
) {
	const { data, error, isLoading } = useSWR(slug, fetchOnePost, {
		onSuccess: (post: Tables<'posts'>) => reset(post),
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshWhenOffline: false,
		refreshWhenHidden: false,
		refreshInterval: 0,
	})

	return {
		post: data,
		loadError: error,
		isLoading,
	}
}
