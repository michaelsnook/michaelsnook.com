export default function ErrorList({summary, errors}) {
  return !(summary && summary.length > 0 && errors && errors.length > 0) ? <></> : (
    <ul className="text-red-600 list-disc">
      {summary ? <li className="bold">{summary}</li> : <></>}
      {errors.length ? errors.map(m => <li key={m}>{m}</li>) : <></>}
    </ul>
  ) 
}
