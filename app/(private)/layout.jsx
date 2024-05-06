const singleCol = false

export default function Layout({ children }) {
  return (
    <div className="min-h-[80vh] flex flex-col place-content-center">
      {children}
    </div>
  )
}
