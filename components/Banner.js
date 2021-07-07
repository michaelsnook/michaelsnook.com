const Banner = (props) => {  
  const { title, description } = props

  return (
    <header
      className="bg-gray-500 w-full h-96 bg-cover bg-bottom grid"
      style={{
        backgroundImage: 'url(/images/como.jpg)',
        textShadow: '2px 2px 6px black',
      }}
    >
      <div className="container p-10 align-middle place-self-center text-white
          flex justify-between rounded-md">
        <div>
          <h1 className="h1">{title}</h1>
          <p className="h1-sub">{description}</p>
        </div>
        <div>
          <img className="w-36" src="/images/my-face-circle.png"
            alt="A cartoon face of the author, Michael" />
        </div>
      </div>
    </header>
  )
}

export default Banner
