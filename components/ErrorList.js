export default function ErrorList({ summary, error, errors }) {
  return !error && !errors?.length ? null : (
    <div>
      {summary ? <p className="font-bold text-red-600">{summary}</p> : null}
      <ul className="pl-5 text-red-600 list-disc">
        {error ? <li key={m}>{m}</li> : null}
        {errors ? errors.map(m => <li key={m}>{m}</li>) : null}
      </ul>
    </div>
  )
}
