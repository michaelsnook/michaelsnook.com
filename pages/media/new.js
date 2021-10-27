import { useState } from 'react'
import Layout from '../../components/Layout'
import { LoginChallenge } from '../../components/LoginForm'
import ImageForm from '../../components/ImageForm'

export default function New() {
  const [image, setImage] = useState()
  return (
    <Layout noFooter singleCol>
      <main>
        <LoginChallenge />
        <h1 className="h1">Upload something</h1>
        <div className="border rounded p-4 my-6">
          <ImageForm publicURL={image} onUpload={setImage} />
        </div>
        <h2 className="h4">Uploaded image (if any)</h2>
        <img src={image} alt="" />
      </main>
    </Layout>
  )
}
