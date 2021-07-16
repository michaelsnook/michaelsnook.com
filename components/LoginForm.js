import { useState } from 'react'
import { postLogin } from '../lib/login.js'
import { useForm } from "react-hook-form"


const ConfirmationMessage = ({user}) => (
  <div className="bg-green-200 border rounded border-green-600 text-green-800 p-10">
    <h1 className="my-4 h3">Success</h1>
    <p className="my-4">You're logged in as user <em>{user?.username}</em></p>
  </div>
)

export default function Login() {
  const [user, setLoggedIn] = useState(null)
  const { register, handleSubmit } = useForm()
  const [errorMsg, setError] = useState([])

  const onSubmit = async (data) => {
    postLogin(data)
      .then(user => setLoggedIn(user))
      .catch(errors => setError(errors))

  }

  return (
    <section className="container">
      <div className="mx-auto max-w-lg py-10">
        {user ? <ConfirmationMessage user={user} /> : (
          <>
            <h1 className="h3 text-gray-700">Please log in</h1>
            <form role="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 form">
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  {...register('username', {required: 'required'})}
                  tabIndex="1"
                  type="slug"
                  placeholder="username"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password" 
                  {...register('password', {required: 'required'})} 
                  tabIndex="2" 
                  type="password"
                  placeholder="****"
                />
              </div>
              <div>
                <button tabIndex="3" className="button solid" type="submit">
                  Log in
                </button>
              </div>
              {errorMsg.length > 0 &&
                <ul className="text-red-600 list-disc">
                  {errorMsg.map(m => <li key={m}>{m}</li>)}
                </ul>
              }
            </form>
          </>
        )}
      </div>
    </section>
  )
}