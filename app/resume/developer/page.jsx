import {
  Envelope,
  LinkIcon,
  Phone,
  Calendar,
  IconGithub,
  IconTwitter,
} from '@/components/icons'
import PictureSection from './picture-section'
import { Wrapper, LeftContainer, RightContainer } from './containers'
import { SkillsDeveloper, SkillsProductManager } from './content-sections'

export default function Page() {
  return (
    <Wrapper>
      <LeftContainer>
        <PictureSection />
        <SkillsDeveloper />
        <SkillsProductManager />
      </LeftContainer>

      <RightContainer>
        <h2 className="text-2xl font-bold text-cyan-content">
          Seeking full time employment or partnership
        </h2>
        <h2 className="text-lg font-bold text-gray-600">
          Product Engineer, Product Manager, Full-stack Developer
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
          I enjoy Product Management and Software Development. I appreciate
          greenfield projects, long-term roadmapping, building features(!),
          large-scale refactoring or re-architecting with minimal disruption,
          figuring out where a piece of logic <em>feels</em> like it
          <em>wants</em> to live (IYKYK).
        </p>
        <p>
          I like to work with users to figure out what they really need to do
          the most important parts of their work, and then to work with devs to
          build and ship quickly and iterate from there. I love a good roadmap,
          a product outline, a messy google doc with dozens of comments.
        </p>
        <p>
          In the last few years I am increasingly jumping into the code and
          building apps myself, often using low-complexity solutions like NextJS
          + Supabase + Tailwind. Or more recently, I will keep the plan for the
          project, figure out the milestones, split the work into chunks for the
          team, review the PRs, and fill in gaps where they come up.
        </p>
        <p>
          Though most of my experience is with smaller teams, I do have
          experience with larger-scale custom software and data engineering at
          scale, like at VoteAmerica where I was the PM and also built their
          data pipeline, and at OPEN where I managed a software collaboration
          between a dozen organisations all contributing resources/staff to a
          team we managed that built and maintained their orgs&rsquo; core
          infrastructure.
        </p>
        <h2 className="text-xl font-bold">Projects</h2>
        <p>Sunlo.app</p>
        <p>Mapplication Rebuild</p>
        <p>VoteAmerica Data Pipeline</p>
        <h2 className="text-xl font-bold">Previous Employment</h2>
        <p>VoteAmerica.com</p>
        <p>The Online Progressive Engagement Network</p>
        <p>BoldProgressives.org</p>
      </RightContainer>
    </Wrapper>
  )
}
// lilac  #c6a7c7
// bluish #0087c1
