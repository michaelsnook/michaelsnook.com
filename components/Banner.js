const Banner = (props) => {  
  const { bgImage, title, description, smallImage, smallAlt = '' } = props
  return (
    <header
      className="bg-gray-500 w-full h-96 bg-cover bg-bottom grid"
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <div className="container py-10 align-middle place-self-center text-white flex justify-between">
        <div>
          <h1 className="h1">{title}</h1>
          <p className="text-2xl">{description}</p>
        </div>
        {smallImage &&
          <div>
            <img className="w-36" src={smallImage} alt={smallAlt} />
          </div>
        }
      </div>
    </header>
  )
}

export default Banner
