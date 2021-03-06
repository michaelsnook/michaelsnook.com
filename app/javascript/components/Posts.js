import React from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'


function loginButton() {
  return (
    <div className="mb-3">
      <Link to="/posts/new" className="btn btn-secondary">
        Create New Post
      </Link>
      <span className="text-muted">
        &nbsp; (Please do not click this button unless you are authorized to do so (only Michael).)
      </span>
    </div>
  )
}

class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      user: null
    }
  }

  componentDidMount() {
    const url = '/api/v1/posts/index';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(response => this.setState({ posts: response }))
      .catch(() => this.props.history.push('/'))
  }

  render() {
    const { posts } = this.state

    const allPosts = posts.map((post, index) => (
      <div key={index} className="col-md-6 col-lg-4 pb-4">
        <div className="card h-100">
          {post.image && <img
            src={post.image}
            className="card-img-top"
            alt={`${post.title} image`}
          />}
          <div className="card-body d-flex align-items-start flex-column">
            <h4 className="card-title">{post.title}</h4>
            {!post.image && <p className="card-text">{post.excerpt}</p>}
            <Link to={`/posts/${post.id}`} className="mt-auto btn btn-sm btn-outline-secondary">
              View Post
            </Link>
          </div>
        </div>
      </div>
    ))

    const noPosts = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No posts yet. Why not <Link to="/posts/new">create one</Link>
        </h4>
      </div>
    )

    return (
      <>
        <Banner />
        <div className="py-5">
          <main className="container">
            { this.state.user && loginButton() }
            <div className="row align-content-stretch d-flex flex-wrap">

              {posts.length > 0 ? allPosts : noPosts}

            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    )
  }
}

export default Posts
