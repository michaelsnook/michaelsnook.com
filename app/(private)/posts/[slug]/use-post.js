import useSWR from 'swr'
import { fetchOnePost } from '@/lib/posts'

export default function usePost(slug, reset) {
	const { data, error, isLoading } = useSWR(slug, fetchOnePost, {
		onSuccess: (post) => reset(post),
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
