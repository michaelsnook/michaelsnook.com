const PostList = () => {  
  const posts = [
      {
        "id": 32,
        "title": "Volunteer Project: The Blue Dawn Website",
        "excerpt": "The Blue Dawn is a volunteer collective that connects Bahujan people with cast-aware mental health therapists.",
        "image": "//snook.pub/static/images/thebluedawn-banner.png",
      },
      {
        "id": 31,
        "title": "Radiyr: If an RSS Reader Had a Baby with the Radio",
        "excerpt": "",
        "image": "https://base.imgix.net/files/base/ebm/electronicdesign/image/2016/02/electronicdesign_com_sites_electronicdesign.com_files_uploads_2016_02_Radio.png",
      },
      {
        "id": 30,
        "title": "Coming Out Again: Bisexual Edition",
        "excerpt": "It was National Coming Out Day yesterday, so I'm coming out... again. And here's why.",
        "image": "//snook.pub/static/images/bisexual-flag.png",
      },
      {
        "id": 29,
        "title": "My mixed feelings about Star Wars: The Last Jedi",
        "excerpt": "I loved how the new Star Wars defied old tropes, weaved new themes about the Jedi and the Force, and had important, atypical character arcs, but I had some reservations...",
        "image": "https://specials-images.forbesimg.com/imageserve/5e00ea474e2917000783c40e/960x0.jpg",
      },
  ]

  // catch an error and return
  // <p>error loading posts: {JSON.stringify(error)}.</p>

  return (
    <>
      <h2 className="h2">All Posts</h2>
      {posts.length === 0 ? (
        <p>loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-stretch">
          {posts.map(post => (
            <a key={`post-${post.id}`} className="border rounded" href={`/posts/${post.id}`}>
              {post.image &&
                <img className="rounded-t" src={post.image} alt='' />
              }
              <p className="text-2xl font-display p-4 text-cyan-700 hover:underline">
                {post.title}
              </p>
              {!post.image &&
                <p className="p-4">
                  {post.excerpt}
                </p>
              }
            </a>
          ))}
        </div>
      )}
    </>    
  )
}

export default PostList
