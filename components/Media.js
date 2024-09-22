import { CopyInput } from './lib'

const MediaLoading = () => <p>loading...</p>

export const MediaArticle = ({
	url,
	alt_text,
	created_at,
	updated_at,
	isLoading,
}) => (
	<article className="md:col-span-3 lg:col-span-4 flex flex-col gap-4 md:max-w-prose md:mx-auto">
		{isLoading ?
			<MediaLoading />
		:	<div className="flex flex-col gap-2">
				<CopyInput val={url} />
				<img src={url} className="w-full mt-2" alt="" />
				<p>{alt_text}</p>
			</div>
		}
	</article>
)

export default MediaArticle
