import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';

export default function PrintMarkdown({ markdown }) {
  const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(markdown).result;

  return (
    <>
      {content}
    </>
  );
}