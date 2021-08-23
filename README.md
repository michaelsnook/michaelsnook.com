# Website Readme

This is my website! The react client, at least.
It's built with NextJS and hosted on Vercel so the "client" actually does
have some server-site action like pre-rendering most pages.

## Design patterns

The visual design of the site is meant to be very simple, not loud,
and without too many options. For instance, there are not 4 different
types of buttons, there are 2 (`.button.outline` and `.button.solid`).

The only theme colors so far are Tailwind's cyan, red, and coolGray. The
entire theme operates on these; red is used only for error text and
never as a background. Cyan is only used as a background for "critical path"
buttons like "Submit login" and "Save post".

The main separation between form factors is at the `md` breakpoint at 768px,
though other breakpoints are used for responsive typography and changes
to the grid size, when needed. `sm`, `md`, and `lg` are available.

The big visual banner is only used on index pages; post pages confine their
feature image to within the `<PostArticle>` component, whose width is capped at
`max-w-prose` (68ch), as are other elements like the login form.

This site mostly uses left-alignment within centered layout areas. When there
are two items to place next to one another, default to justify-between so items
are pushed to the edges of their respective containers.


## Code patterns

The site uses NextJS's built-ins wherever possible, including the `useSWR`
hook to manage data fetching. Forms are handled by `react-hook-forms`.

For pages requiring authentication, there is a single component
`<LoginChallenge>` which checks the `/logged_in` API and either presents the
login form as a modal, or dispatches the returned authenticated user object
for the rest of the app.

Similarly, there is an `<ErrorList>` component that goes at the bottom of each
form or each page that might require one. It accepts either a single message
or an array, and hides itself when empty. So for both LoginChallenge and
ErrorList, you can simply drop the component wherever you want it and not worry
about conditions, as long as you instantiate useState hooks for `user` and
`errors`, the components will figure out whether they're needed.

For the sake of easy navigation, Component and Lib files are allowed to contain
several functions or components, so e.g. we have `lib/login.js` with all the
functions related to user authentication, rather than something like
`lib/login/checkLogin.js` and so on for individual functions. Still, the
longest file is ~100 lines, and should probably stay that way.

There is currently no global management of variables and metadata like the
site's title and description or other metadata. Nor is there any global state
or context management. Metadata stays DRY because its defaults are managed in
the `<Layout>` component. User authentication happens on every page where it's
needed and useSWR seems to handle this nicely without much duplicating requests.

(That said, I may prefer to switch to global user management as I add more
components that may care about logged-in state, and/or as I try to optimize
requests and re-renders. There is an elegance to avoiding global state, but
it may not be leading to the simplest, most maintainable code base.)

## Details to cover

* There are no tests.
* Some of the error handling isn't quite right – 500s being treated as 401s,
etc. – and may be clunky and overly redundant.
* The modal needs to be cleaned up with arias, click-away and escape-key
bindings, etc.
* As mentioned above, it may be beneficial to switch to global user state.
* ESLint and Prettier are both in use; should add husky to automate.
* Posts are identified by a numeric ID like `21` and should switch to a slug.
* There are not buttons/links/navigation for things like login/logout,
view drafts, draft a new post.
* The Rails API server does not currently accept file/image uploads, so the
client app is also not handling these. Post images are just a text url.
* On mobiles, the post page's "About the author" section just shows up at the
top of the page, large, centered, feeling kind of out of place and inconsistent
with the rest of the layout of the site.
