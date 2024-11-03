import { JobHeader } from './job-header'
import PictureSection from './picture-section'
import { Wrapper, LeftContainer, RightContainer } from './containers'
import { SkillsDeveloper, SkillsProductManager } from './content-sections'
import { PrintMarkdown } from '@/components/lib'

// 1050 by 1485. p1 is currently some 806 words, needs to be ~640

const intro = `Hello, thanks for checking out out my resume 👋 I&rsquo;m Em, a former
organiser, data manager (2009), tech facilitator (2014), turned product manager (2017) turned data engineer (2020)
turned full stack developer (2021). 

A few years ago I decided to get out of management and focus on my own work
as an individual contributor, honing my craft at Product Management, Data Engineering, and Full-stack Development.
I've been freelancing for a few years now, and working on my personal app, and I find I miss being part of a team &ndash;
feeding off each other's energy, lifting each other up, shipping and catching mistakes and learning together. 
So I'm looking for full-time employment, membership in a coop, or partnership in an agency to keep learning, keep shipping, keep going.

My favourite way to build is with some modern front-end framework &ndash; I've built with NextJS, Tanstack Router, SvelteKit, SolidJS &ndash;
a thin API layer, and putting a lot of trust in the database to do data logic like collating metadata with views and exposing them to the API.

But I'm pretty flexible and practical when it comes to this. Mostly I care about working on a team that fosters productivity,
growth and accountability. I want to learn new things, be excellent to my colleagues, ship quality product every cycle &ndash;
and then close the computer and enjoy my weekend. If this sounds like
your kind of workplace, I hope to hear from you!

-M`

const projects = [
  {
    title: 'Sunlo.app',
    time: '2020-2024',
    content: `[Sunlo](https://sunlo.app) is a labour of love, an app I started sketching in 2015 when I first came to India and wanted to learn
  Hindi and Tamil, but and found myself unable to really get into apps like Duolingo. Sunlo is a _social_ language learning app,
  that lets you build a deck of flash cards with help from your friends and family who already speak the language and enjoy helping you learn.
    
  The app is currently un-released, as I've mostly been using it as a playground to learn and 
  experiment, at least until a few months ago when I decided to really [dive in and rewrite it](https://sunlo-tanstack.vercel.app) using React, Tanstack Router & Query, TailwindCSS,
  ShadCN UI and Radix primitives. It also uses Tauri to compile to native iOS and Android apps. This fully client-side stack uses Supabase for the database
  and back-end API server, complete with row level security, RPC, auth, storage and transactional email.`,
  },
  {
    title: 'Mapplication Rebuild',
    time: '2023',
    content: `Rebuilt [map.350.org](https://map.350.org/), using React, Mapbox, react-map-gl, NextJS, a Google DataForm pipeline,
    BigQuery, and TailwindCSS. The old version was a custom ETL app written in DRF which then fed data to a single React embed
    with years and years worth of options, most of which were no longer used. The org had recently started using BigQuery for
    other things, so I used DataForm to rebuild the ETL pipeline, collating data from Salesforce, ActionKit and Action Network, and then the back-end
    was just a couple of BigQuery views that expose the required data to the public API.
    
  The new version is a NextJS app where each "page" is its own embeddable mini-app, so campaigners can pick the one that's best for them, and they can request custom work 
    with themes or different affordances or data requirements, to suit their needs, without us having to worry about short-term needs leading to long-term tech debt.`,
  },
  ,
  {
    title: 'MutualAidIndia.com',
    time: '2021',

    content: `This volunteer project began as a Google Doc with a crowdsourced list of ways that people could contribute to mutual aid funds,
    during the first devastating wave of the COVID-19 pandemic in India. 
    Before long we had dozens of volunteers and
    loads of traffic, and we needed a site, a database, a CMS, and a vetting workflow for volunteers to vet and update listings, goals, etc.
    I built the MAI site with a Gatsby/Tailwind/Airtable starter kit, and built the contact- and content-management in Airtable.
    
    
  Here's [an article by Riddhi Dastidar](https://thebaffler.com/latest/how-it-feels-dastidar), who started the whole thing with just a Google Doc and a sense of desperation to help people struggling with the first big wave of the COVID pandemic in India.`,
  },
  ,
  {
    title: 'VoteAmerica Data Pipeline',
    time: '2020',
    content: `VoteAmerica was a ~30 person org with a well rounded 5-strong engineering team, and my first gig as a full-time, dedicated product manager.
    My unofficial motto for the product was to create the best Voter Experience (VX) allowed by law in every state in the country, and I think we came close.
    
  Toward the end of the election cycle we pivoted hard to supporting the outreach programs. So I took off my product hat
  and took on the challenge of integrating mutliple
    sources of contact and identity data into a constantly-updating pipeline that provided millions of leads every day to our texting team, which sent over
    100 Million text messages to help Americans register, and vote.`,
  },
]

export default function Page() {
  return (
    <>
      <Wrapper>
        <LeftContainer>
          <PictureSection />
          <SkillsDeveloper />
          <SkillsProductManager />
        </LeftContainer>

        <RightContainer>
          <h2 className="text-2xl mb-0 font-bold text-cyan-content font-display">
            Full-stack Developer, Product Manager
            <br />
            <span className="text-lg font-bold text-gray-600">
              Seeking full time employment or partnership
            </span>
          </h2>
          <div className="prose-sm">
            <PrintMarkdown markdown={intro} />
          </div>
          <h2 className="text-xl font-bold font-display">
            Recent Projects (Lead Developer)
          </h2>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <div key={i} className="prose w-100">
                <h3 className="text-lg text-lilac-content flex flex-row justify-between items-center">
                  <span>{project.title}</span>
                  <span className="text-sm">{project.time}</span>
                </h3>
                <div className="prose-sm prose-lilac">
                  <PrintMarkdown markdown={project.content} />
                </div>
              </div>
            ))}
          </div>
        </RightContainer>
      </Wrapper>
      <Wrapper>
        <div className="col-span-4 md:px-10 py-12">
          <h2 className="text-xl font-bold font-display my-2 mb-4">
            Previous Employment
          </h2>
          <div className="md:columns-2 space-y-8 gap-8">
            <div className="space-y-4">
              <JobHeader
                title="Product Manager & Data Engineer"
                subtitle="VoteAmerica.com"
                timeframe="July 2020 – November 2020"
              />
              <p>
                At Vote America I was called in to manage Product for the last 4
                months of the election cycle. We had a team of about 6 Engineers
                working on a national system to help voters look up their
                registration, request an absentee ballot, or get help with their
                voting journey.
              </p>
              <p>
                When Election Day got closer and we launched our campaign to
                send 10 crore text messages to voters across the country, the
                outreach team came to us for help with their data pipeline, and
                since election day was about 6 weeks away, most of the product
                was already managed, so I also built the SQL pipeline that
                updated our national voter file, selected the most likely/most
                accurate phone number for each household (or in many cases the
                most likely voter identity for a number) and built the priority
                lists for each state on a rolling/nightly basis.
              </p>
              <p>
                And I had the pleasure to manage an experiment in a truly new
                way of doing voter outreach: a system called The Voter Helpline
                which allows volunteers in a Slack team to claim and respond to
                incoming text messages from voters asking for help. In all my
                years doing organising through digital tools like this I&apos;ve
                never seen such incredible engagement rates as when we
                structured interactions this way, with volunteers in small
                &ldquo;pods&ldquo; that look out for each other&apos;s contacts,
                and a lot of claiming/assigning/notifying features built
                directly into the Slack workspace so volunteers never had to do
                data entry in another window.
              </p>
              <Alert>
                Our main tool set at VoteAmerica was React, Gatsby, Django Rest
                Framework, with Bulma for CSS and Redshift and the Civis
                Platform for data engineering.
              </Alert>
            </div>
            <div className="space-y-4">
              <JobHeader
                title="Director of Technology"
                subtitle="The Online Progressive Engagement Network"
                timeframe="Sep 2014 – Jun 2020"
              />
              <p>
                The OPEN is a networking body that works with around 20
                organisations from 20 different countries to help them share
                knowledge, engage in collaborations, and provide both material
                and moral support across countries aand borders and cultures.
              </p>
              <p>
                During my 6 years leading the tech team, we helped over a dozen
                organisations put their tech team and stack together to launch,
                and then scale and hire, refactor or pivot, and more. By the end
                of my time there we were managing multiple shared-source
                products that were used across the network for our members&apos;
                most critical business tasks, like managing member
                communications, donations, activity databases, and online
                interactions.
              </p>
              <p>
                And I got to facilitate some of the most incredible events of my
                career: the annual tech summit, where every organisation would
                send their tech director and maybe one or two other staff and
                we&apos;d get about 50 people together in a conference center
                for a week and talk and share and hack and ask for help and
                share our plans for the future and see where the overlaps
                cropped up. So the job was part tech management and, on some
                levels, part diplomacy. I loved the relational aspect of the
                job, but it was also highly political and so eventually I burned
                out and decided to take my career toward the &ldquo;individual
                contributor&rdquo; role as a product manager.
              </p>
              <Alert>
                Our main tools at OPEN were Rails, jQuery, Bootstrap, Heroku and
                Docker, WordPress – and the unstoppable power of collaboration!
              </Alert>
            </div>
            <div className="space-y-4">
              <JobHeader
                title="Chief Information Officer"
                subtitle="BoldProgressives.org"
                timeframe="Jan 2009 – Aug 2014"
              />
              <p>
                I started at BoldProgressives.org as the first employee, as a
                data manager and digital production manager, basically building
                and targeting emails and landing pages. When we decided to build
                out a web team to make more of our own organizing tools and take
                control of our most key workflows, I had the job of planning out
                that team and managing the hiring.
              </p>
              <p>
                It was a crash course in technical management as well as
                organisational management. As one of the trusted early staffers
                I was thrown into so many different situations like managing a
                TV ad shoot, or flying out to help a campaign set up a
                door-to-door volunteer operation and integrate the national
                voter database with their work, or taking donor meetings with
                foundations, or advising the founders on org structure as we
                scaled and adapted.
              </p>
              <p>
                And even after six years there and running a department, there
                were still times we&apos;d be on deadline and I&apos;d jump in
                to write SQL to target an email or double-check that a page had
                been built correctly (some things never change).
              </p>
              <Alert>
                We used a SAAS platform called ActionKit with custom Django
                templates, MySQL for targeting and Analytics, Bootstrap for
                styles, and a handful of Django apps and admins.
              </Alert>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Alert = ({ children }) => {
  return (
    <div className="text-cyan-content rounded outline outline-cyan/70 bg-cyan-soft/40 py-3 px-4 text-sm my-2">
      {children}
    </div>
  )
}
