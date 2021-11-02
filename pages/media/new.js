import { useState } from 'react'
import Layout from '../../components/Layout'
import { LoginChallenge } from '../../components/LoginForm'
import ImageForm from '../../components/ImageForm'
import { CopyInput } from '../../components/lib'

export default function New() {
  const [imageURL, setImageURL] = useState()
  return (
    <Layout noFooter singleCol>
      <main>
        <LoginChallenge />
        <h1 className="h1">Upload something</h1>
        <ImageForm
          confirmedURL={imageURL}
          onConfirm={d => {
            setImageURL(d)
            console.log(d)
          }}
        />
        <h2 className="h4">Confirmed image (if any)</h2>
        {imageURL ? <CopyInput val={imageURL} /> : null}
        <img src={imageURL} className="w-full mt-2" alt="" />
      </main>
    </Layout>
  )
}
