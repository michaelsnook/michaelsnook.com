import Image from 'next/image'

export default function Banner({title, description}) {
  return (
    <header
      className="bg-gray-500 w-full min-h-50vh grid relative"
      style={{ textShadow: '2px 2px 6px black' }}
    >
      <Image
        src="/images/como.jpg"
        alt="A background image for the top section, a photo of mountains next
          to a lake, with clouds overhead"
        className="z-0"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="z-10 container p-10 align-middle place-self-center text-white
          flex justify-between rounded-md">
        <div>
          <h1 className="h1">{title}</h1>
          <p className="h1-sub">{description}</p>
        </div>
        <div className="relative">
          <Image
            src="/images/my-face-circle.png"
            alt="A cartoon face of the author, Michael"
            className="w-36"
            width="144" height="144"
          />
        </div>
      </div>
    </header>
  )
}
