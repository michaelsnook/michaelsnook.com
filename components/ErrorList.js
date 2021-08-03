export default function ErrorList({summary, errors}) {
  return typeof errors !== 'object' || errors.length === 0
    ? <></>
    : (
      <div>
        {summary &&
          <p className="font-bold text-red-600">{summary}</p>
        }
        <ul className="pl-5 text-red-600 list-disc">
          {errors.map(m => <li key={m}>{m}</li>)}
        </ul>
      </div>
    )
}
