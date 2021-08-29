import Link from 'next/link'
import { useState } from 'react'
import { useUser } from './LoginForm'

export default function Menu() {
  const [isOpen, setIsOpen] = useState()
  const { user, isLoggedIn } = useUser()
  const loggedInLinks = isLoggedIn
    ? [
        ['Drafts', '/posts/drafts'],
        ['Compose', '/posts/new'],
      ]
    : []

  const menuItems = [
    ['Home', '/'],
    isLoggedIn ? ['Logout', '/logout'] : ['Login', '/login'],
    ...loggedInLinks,
  ]
  return (
    <>
      <div
        className={
          isOpen
            ? 'z-20 bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0'
            : ''
        }
        onClick={event => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}
      />
      <div className="fixed bottom-4 right-3 z-30 flex flex-col gap-4">
        <nav className={`${isOpen ? '' : 'hidden'} bg-white rounded`}>
          <ul className="">
            <li className="py-3 px-4">
              {user?.username ? `Hi, ${user.username}` : 'Hello 👋🏼'}
            </li>
            {menuItems.map(([label, path], i) => (
              <li key={path} className="border-t py-1">
                <Link href={path}>
                  <a className="list-item py-2 text-cyan-700 hover:underline px-4">
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-end">
          <a
            className={`border rounded-full inline-block ${
              isOpen
                ? 'bg-cyan-600 hover:border-white border-cyan-600 text-white'
                : 'bg-white text-cyan-700 hover:border-cyan-700'
            } p-2 z-50`}
            role="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
