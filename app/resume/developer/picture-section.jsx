import Link from 'next/link'
import Image from 'next/image'
import faceImage from '@/public/images/my-face-288.png'

export default function PictureSection() {
  return (
    <div className="text-center flex flex-col gap-1">
      <h1 className="text-2xl font-bold">Em Snook</h1>
      <p className="text-base/5 mb-4">Bangalore, KA</p>
      <Image
        src={faceImage}
        alt="A cartoon face of the author, Michael"
        className="w-36 rounded-full mx-auto mb-2"
        width="144"
        height="144"
      />
      <Link className="hover:link" href="mailto:me@michaelsnook.com">
        me@michaelsnook.com
      </Link>
      <Link className="hover:link" href="https://github.com/michaelsnook">
        github.com/michaelsnook
      </Link>
      <Link className="hover:link" href="https://wa.me/14348824164">
        +1 434 8824164
      </Link>
      <Link className="hover:link" href="tel:+919880742084">
        +91 98807 42084
      </Link>
    </div>
  )
}
