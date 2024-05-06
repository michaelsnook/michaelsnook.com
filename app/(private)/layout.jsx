const singleCol = false

export default function Layout({ children }) {
  return (
    <div
      className={`'min-h-80vh flex flex-col place-content-center' ${
        singleCol ? 'max-w-prose mx-auto px-2' : ''
      }`}
    >
      {children}
    </div>
  )
}
