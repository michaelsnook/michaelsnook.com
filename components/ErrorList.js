export default function ErrorList({errors}) {
  return errors.length === 0 ? <></> : (
    <ul className="text-red-600 list-disc">
      {errors.map(m => <li key={m}>{m}</li>)}
    </ul>
  ) 
}
