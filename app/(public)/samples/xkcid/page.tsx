import Banner from '@/components/Banner'
import xkcid from './xkcid'

export const metadata = {
	title: 'Xkcid: A Friendly K-sortable Compact Identifier | michaelsnook.com',
	description:
		'An experiment in making a new kind of compact global identifier for more human-friendly identifiers to paste into groupchats and stash in databases',
	image: '/images/my-face-circle.png',
	author: 'Michael Snook',
}

const classes = {
	rows: 'odd:bg-gray-100',
	keys: 'font-bold opacity-70',
	values: 'font-[courier] font-right',
	heading: 'font-bold text-center',
}

export default async function Page() {
	const list = [xkcid(), xkcid('shortest')]
	return (
		<div>
			<Banner title={metadata.title} description={metadata.description} small />
			<main className="container py-5">
				{list.map((cid) => {
					const id = cid.make()
					return (
						<section key={cid.variant} className="">
							<h3 className="h3">Xkcid &ldquo;{cid.variant}&rdquo; variant</h3>
							<table>
								<tr>
									<td className={classes.heading} colSpan={2}>
										Properties of the factory
									</td>
								</tr>
								{Object.keys(cid).map((k) => (
									<tr key={k} className={classes.rows}>
										<td className={classes.keys}>{k}</td>
										<td align="right" className={classes.values}>
											{typeof cid[k] === 'function' ? 'function()' : cid[k]}
										</td>
									</tr>
								))}
								<tr>
									<td className={classes.heading} colSpan={2}>
										Value returned by xkcid.make()
									</td>
								</tr>
								{Object.keys(id).map((k) => (
									<tr key={k} className={classes.rows}>
										<td className={classes.keys}>{k}</td>
										<td align="right" className={classes.values}>
											{typeof id[k] === 'function' ? 'function' : id[k]}
										</td>
									</tr>
								))}
							</table>
						</section>
					)
				})}
			</main>
		</div>
	)
}
