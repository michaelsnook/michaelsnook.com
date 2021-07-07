import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'

function getPost() {
  return { // some API call
    "id": 32,
    "name": "blue-dawn-website",
    "title": "Volunteer Project: The Blue Dawn Website",
    "excerpt": "The Blue Dawn is a volunteer collective that connects Bahujan people with cast-aware mental health therapists.",
    "content": "\n[![](//snook.pub/static/images/thebluedawn-banner.png)](https://thebluedawn.org)\n\nThe Blue Dawn is a volunteer collective that connects Bahujan people with\ncast-aware mental health therapists, and sometimes with supporters who will\nsponsor sessions directly. I recently built them a WordPress site using\nRoots's Bedrock and Timber/Twig templating.\n\nThis project started because a friend reached out asking if I'd speak with\na friend of a friend who was working on a new nonprofit and needed\na website. I connected with TBD's founder, Divya Kandukuri, and spoke about\ntheir needs. They didn't need much -- just a site with a CMS and some forms.\nI got the sense that Divya was supremely competent and had picked a really\ngood intervention point: directly connecting people with resources that can\nhelp them in their time of greatest need, raising awareness about one of \nthe most vicious forms of oppression, and helping those affected build \ncommunity resilience among those affected by it. \n\nHow could I not get involved with such a great project! Besides, I was taking\nsome extra time off work anyway, and I am trying to find more ways to be _directly\nuseful_ to _smaller organisations_ rather than always (as I do at my day job) \nworking with larger scale tech systems for more professionalised organisations.\n\n_[Check out the repository here](https://github.com/michaelsnook/thebluedawn-wp-bedrock)_\n\nWe have been using Bedrock at work so I started there. The other WordPress \nsite I maintain uses Sage, so I used that to deploy the first\ndraft of the site at [thebluedawn.org](https://thebluedawn.org). But the\ndesign I wanted wasn't easy to execute even with Sage's relatively simple\n(but still very WordPress-y), so I added the Timber plugin and started \nporting the theme into [Twig templates like this one](https://github.com/michaelsnook/thebluedawn-wp-bedrock/blob/master/web/app/themes/thebluedawn/resources/views/home.twig). \n\n![](//snook.pub/static/images/thebluedawn-jumbotron.png)\n![](//snook.pub/static/images/thebluedawn-counselors.png)\n![](//snook.pub/static/images/thebluedawn-whatwedo.png)\n\nThe styles are BootStrap 4 with very little customisation. The WordPress\nserver is my own Digital Ocean box where I host another WP site. And Cloudflare\nmanages the DNS and provides its free Universal SSL. Since I already had the\nserver, the site is basically free to run for the foreseeable future (which\nis important for a volunteer collective that doesn't have funding). \n\nLeft to do:\n\n* Replace the remaining Blade templates with Twig templates\n* Different index pages for different post types, like Media/Press\n* WP Admin control over the content on the Home page or in the Banner. Right now it's just an index of recent posts, with a lot of hard-coded content before it, which means it's only a good solution as long as I remain actively involved and available to make updates.\n* Figure out how to better control plugins and mu-plugins.\n* Establish some proper seed data to make the site easier for others to develop on.\n",
    "image": "//snook.pub/static/images/thebluedawn-banner.png",
    "created_at": "2019-06-08T00:00:00.000Z",
    "updated_at": "2021-06-14T12:53:58.670Z",
  }
}

const PostSidebar = ({id, created_at}) => (
  <div className="col-span-1 flex flex-col gap-4 md:pt-10 lg:pt-14 text-center">
    <img className="w-36 mx-auto rounded-full" src="/images/my-photo.jpg"
      alt="A cartoon face of the author, Michael" />
    <p className="mx-auto">By Michael Snook</p>
    <p className="mx-auto">Published {created_at}</p>
    <Link
      href={`/posts/${id}/edit`}
    >
      <a className="text-blue-600 border rounded-md
        hover:border-blue-600 hover:underline
        py-3 px-6 mx-auto inline-block">
        edit post
      </a>
    </Link>
  </div>
)

const PostArticle = ({ title, image, content}) => (
  <article className="md:col-span-3 lg:col-span-4 flex flex-col gap-4 max-w-prose">
    <h1 className="h1">{title}</h1>
    <img src={image} alt="" />
    <div dangerouslySetInnerHTML={{__html: content}} />
  </article>
)

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  let post = {}
  post = getPost()

  return post.error ? (<p>Error loading post {pid}.</p>) 
    : post === {} ? (<p>Post {pid} will load when it feels like loading.</p>)
    : (
      <Layout
        title={post.title}
        description={post.excerpt}
        image={post.image}
      >
        <div className="container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-10">
          <PostSidebar {...post} />
          <PostArticle {...post} />
        </div>
      </Layout>
    )
}

export default Post
