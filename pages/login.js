import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

// import { useContext } from 'react'
// const user = useContext(UserContext)

export default function Login() {
  return (
    <Layout>
      <section className="container">
        <LoginForm />
      </section>
    </Layout>
  )
}
