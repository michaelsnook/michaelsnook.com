import { JobHeader } from './job-header'
import PictureSection from './picture-section'
import { Wrapper, LeftContainer, RightContainer } from './containers'
import { SkillsDeveloper, SkillsProductManager } from './content-sections'

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
            Product Engineer, Product Manager, Full-stack Developer
            <br />
            <span className="text-lg font-bold text-gray-600">
              Seeking full time employment or partnership
            </span>
          </h2>

          <p>
            Hello, thanks for taking a look at my resumeㅤ👋ㅤI&rsquo;m Em, an
            organiser turned data manager turned facilitator turned product
            manager turned data engineer and software developer.
          </p>
          <p>
            I&rsquo;m looking for full-time employment or partnership with an
            agency that shares my values and my general desire to do good work
            with good people, to build the right things well, to learn a lot and
            be excellent to the people I work with.
          </p>
          <p>
            I enjoy working with users to figure out what they really need to do
            the most important parts of their work, and then to work with devs
            to build a solid foundation we can ship quickly and iterate on from
            there.
          </p>
          <p>
            In the last few years I am increasingly jumping into the lead dev
            role and building apps myself. I&apos;ve done a few projects
            recently with React/NextJS, TailwindCSS, and Supabase (or 2 of these
            three, with one difference on some projects), which is a stack I
            like for how it allows us to shrink down the &ldquo;back end&rdquo;
            and focus on the database and the interface, using serverless API
            routes or the supabase-js client as a very thin and low-maintenance
            layer for fetching data.
          </p>
          <p>
            Though most of my experience is with smaller teams, I do have
            experience with larger-scale custom software and data engineering at
            scale, like at VoteAmerica where I was the PM and also built their
            data pipeline, and at OPEN where I managed a software collaboration
            between a dozen organisations all contributing resources/staff to a
            team we managed that built and maintained their orgs&rsquo; core
            infrastructure. Read on below for some quick examples.
          </p>
          <h2 className="text-xl font-bold font-display">Projects</h2>
          <p>Sunlo.app</p>
          <p>Mapplication Rebuild</p>
          <p>VoteAmerica Data Pipeline</p>
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
