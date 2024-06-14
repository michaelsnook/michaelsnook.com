export function Wrapper({ children }) {
  return (
    <div className="bg-gray-300 md:p-10 font-display">
      <div className="grid grid-cols-1 md:grid-cols-4 md:shadow-[rgba(0,_0,_0,_0.3)_0px_0px_15px_5px] md:rounded bg-white p-2 mx-auto max-w-[1050px] min-h-[1485px]">
        {children}
      </div>
    </div>
  )
}

export function LeftContainer({ children }) {
  return (
    <div className="md:col-span-1 md:w-[260px] bg-lilac-soft h-full pt-10 md:pt-16 pb-4 md:pb-10 px-6 flex flex-col gap-4 md:gap-10">
      {children}
    </div>
  )
}

export function RightContainer({ children }) {
  return (
    <div className="md:col-span-3 space-y-4 pb-4 md:pb-10 pt-10 md:pr-16 md:pl-8">
      {children}
    </div>
  )
}
