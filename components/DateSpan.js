export default function DateSpan({ dateText }) {
  const date = new Date(dateText)
  const output = date.toLocaleString(
    'en-IN',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  )

  return <time dateTime={dateText}>{output}</time>
}
