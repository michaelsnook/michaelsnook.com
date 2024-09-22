import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

const PrintMarkdown = ({ markdown }) =>
	unified().use(parse).use(remark2react).processSync(markdown).result

export default PrintMarkdown
