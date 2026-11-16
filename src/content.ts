// Everything personal on the site lives in this file.
// Edit it, push to main, and the site redeploys.

export const profile = {
  name: 'Saket Gulhane',
  githubUser: 'saket-gulhane',
  tagline:
    'Full-stack engineer in Bengaluru. My career so far, written the way I write everything else: one commit at a time.',
  summary:
    'Java and Python services, React front ends, and the Kubernetes platform underneath.',
  links: {
    github: 'https://github.com/saket-gulhane',
    linkedin: 'https://www.linkedin.com/in/saket-gulhane',
  },
  // Put resume.pdf in /public and set this to '/resume.pdf' to show the resume buttons.
  resumeUrl: null as string | null,
}

/**
 * Where a commit sits in the graph.
 * - main:  on the main line (the default)
 * - merge: on the main line, where the side branch joins it
 * - side:  on the side branch
 * - fork:  on the main line, where the side branch starts (the oldest commit)
 */
export type Branch = 'main' | 'merge' | 'side' | 'fork'

export interface Commit {
  hash: string
  message: string
  /** Client the work was for. Shown as a tag. */
  client?: string
  /** Free text: "Aug 2025", "2020", "1 year". Leave out if unknown. */
  date?: string
  detail: string
  bullets?: string[]
  stack?: string[]
  /** Joining a company or finishing a degree. Shown in the milestone colour. */
  milestone?: boolean
  branch?: Branch
}

// Newest first.
// TODO: add a date to each project commit, and reorder if needed.
// TODO: replace the last commit with the degree: "init: <degree>, <college>".
export const commits: Commit[] = [
  {
    hash: 'e91c4a7',
    message: 'feat: build a support ticketing platform from scratch',
    client: 'Goldman Sachs',
    date: 'ongoing',
    detail:
      'One portal for Internal Audit staff to raise, assign and close support requests. It replaced separate per-team portals, Teams forms and email threads.',
    bullets: [
      'Took it from requirements to production: repositories, OAuth, access policies, database and Kubernetes environments.',
      'Gave every merge request its own preview deployment.',
      'Designed and built the statistics page end to end with no written spec; approved on first review.',
      "Split a 2,100-line React component into about 800 lines, and wrote the coding guide the team's AI assistants follow.",
      'Now building on-demand training reports, replacing a manual job that took one to two weeks per team.',
      'Chose rule-based report generation over LLM output, because an audit report has to come out the same every time.',
    ],
    stack: ['FastAPI', 'React', 'MongoDB', 'Kubernetes', 'Argo CD', 'GitLab CI', 'Permit'],
  },
  {
    hash: 'b3d07f2',
    message: "feat: move the division's data pipelines to Apache Airflow",
    client: 'Goldman Sachs',
    detail:
      "A shared scheduler for the Data Analytics team's pipelines, used across Internal Audit.",
    bullets: [
      'Built the proof of concept, then the production setup on Kubernetes.',
      'Runs 500+ scheduled jobs.',
      'Onboarded 100+ developers, including their credentials and permissions.',
    ],
    stack: ['Apache Airflow', 'Python', 'Kubernetes'],
  },
  {
    hash: '7a52e1c',
    message: 'feat: extend the audit lifecycle platform',
    client: 'Goldman Sachs',
    detail:
      'The platform that runs every audit project from start to finish: 2,000+ users and 10,000+ audit projects.',
    bullets: [
      'Replaced manual update scripts with a RabbitMQ consumer that syncs project data from the upstream system, cutting user-raised support tickets by 60–70%.',
      'Added auto-archiving for inactive projects and new rules for project creation.',
      'Moved project files from network storage to SharePoint.',
    ],
    stack: ['React', 'Java', 'Spring Boot', 'DB2', 'RabbitMQ'],
  },
  {
    hash: '4c8b9d0',
    message: "feat: double the audit search tool's result limit",
    client: 'Goldman Sachs',
    detail: 'A search application auditors use to research past projects, events and records.',
    bullets: [
      'Raised the limit from 5,000 to 10,000 results: feasibility study, build, release, and the export to match.',
      'Now building saved searches, so auditors can reuse a query.',
    ],
    stack: ['Elasticsearch'],
  },
  {
    hash: '6d2a8f1',
    message: 'chore: keep the Python analytics server current',
    client: 'Goldman Sachs',
    detail: 'The JupyterHub environment where the Data Analytics team runs its scripts.',
    bullets: ['Library and version upgrades, security patches and bug fixes.'],
    stack: ['JupyterHub', 'Python'],
  },
  {
    hash: '2f6a3e8',
    message: 'chore: join EY as Senior Consultant',
    date: 'Aug 2025',
    milestone: true,
    detail:
      "Bengaluru. Placed with Goldman Sachs's Internal Audit engineering team from Sep 2025.",
  },
  {
    hash: '9d1e5b4',
    message: 'feat: build multi-region supplier billing and tax',
    client: 'Apple',
    detail: 'Billing and tax for suppliers and contractors across 4 regions and 20+ countries.',
    bullets: [
      'Used by 1,000–5,000 external suppliers and contractors, and 100+ internal auditors.',
      'Kept every amount correct to the decimal, a hard requirement for financial data.',
      'Coordinated multi-step transactions with Kafka and the Saga pattern, plus scheduled jobs.',
      'Automated invoice processing.',
    ],
    stack: ['Kafka', 'Saga pattern'],
  },
  {
    hash: 'f4a61c8',
    message: 'feat: migrate the front end to Next.js microfrontends',
    client: 'Apple',
    detail: 'The first application on its platform opened to people outside Apple.',
    bullets: [
      'Moved the front end from React to Next.js microfrontends, with routing, proxy management and a front-end registry.',
      'Built custom token management so external users could sign in safely.',
    ],
    stack: ['Next.js', 'React', 'Microfrontends'],
  },
  {
    hash: '8c3b6e2',
    message: 'feat: build complex data-grid interfaces',
    client: 'Syngenta',
    date: '1 year',
    detail: 'A year of front-end work on a complex, grid-heavy interface.',
    bullets: [
      'Built complex screens with AG Grid and redux-saga.',
      'Implemented the authentication, authorization and routing flows.',
      'Covered the work with unit tests.',
    ],
    stack: ['React', 'AG Grid', 'redux-saga'],
  },
  {
    hash: '3e7f1a9',
    message: 'feat: own dashboard features end to end',
    client: 'Applied Materials',
    date: '1.5 years',
    detail: 'A year and a half across the front end and the APIs behind it.',
    bullets: [
      'Owned features from build through deployment.',
      'Wrote the dashboard APIs in Node.',
      'Built the interface with React, Redux Toolkit and AG Grid.',
    ],
    stack: ['React', 'Node.js', 'Redux Toolkit', 'AG Grid'],
  },
  {
    hash: '0b9c4d7',
    message: 'chore: join Infosys',
    milestone: true,
    detail: 'Client engagements for Apple, Syngenta and Applied Materials.',
  },
  {
    hash: '5e0c7a3',
    message: 'merge: competitive-programming into main',
    branch: 'merge',
    detail: 'Problem-solving habits that stuck.',
  },
  {
    hash: 'c47f2b9',
    message: 'achievement: ICPC',
    branch: 'side',
    detail: 'The International Collegiate Programming Contest.',
  },
  {
    hash: 'a08d6e1',
    message: 'achievement: HackWithInfy',
    branch: 'side',
    date: '2020',
    detail: "Finished in the top 500 of Infosys's national coding contest.",
  },
  {
    hash: '1b3f9c5',
    message: 'init: start pushing code to GitHub',
    branch: 'fork',
    date: '2019',
    milestone: true,
    detail: 'The oldest repositories on this profile date from 2019.',
  },
]

export interface Achievement {
  tag: string
  title: string
  detail: string
}

export const achievements: Achievement[] = [
  {
    tag: 'hackwithinfy-2020',
    title: 'HackWithInfy',
    detail: "Top 500 in Infosys's national coding contest",
  },
  {
    tag: 'icpc',
    title: 'ICPC',
    detail: 'International Collegiate Programming Contest',
  },
  {
    tag: 'arctic-vault-2020',
    title: 'Arctic Code Vault Contributor',
    detail: 'GitHub Archive Program',
  },
]

export const skills: { area: string; items: string }[] = [
  { area: 'Languages', items: 'Java, Python, TypeScript, JavaScript' },
  { area: 'Front end', items: 'React, Next.js, microfrontends, Redux Toolkit, redux-saga, AG Grid' },
  { area: 'Back end', items: 'Spring Boot, FastAPI, Node.js, Kafka, RabbitMQ' },
  { area: 'Platform', items: 'Kubernetes, Argo CD, GitLab CI, Docker, Apache Airflow' },
  { area: 'Data', items: 'MongoDB, DB2, Elasticsearch' },
  { area: 'Testing', items: 'Playwright, unit testing' },
]

export interface FeaturedProject {
  /** owner/name on GitHub */
  repo: string
  title: string
  /** Overrides the repo's GitHub description when set. */
  blurb?: string
}

// Shown first in Projects, in this order. Language and stars come from GitHub.
export const featured: FeaturedProject[] = [
  {
    repo: 'Devs-Not-Wizards/Freehand.io',
    title: 'Freehand.io',
    blurb: 'Generates front-end code from simple hand drawings.',
  },
  {
    repo: 'saket-gulhane/The-wild-oasis-manager',
    title: 'The Wild Oasis Manager',
    blurb: 'Internal hotel management application.',
  },
  {
    repo: 'saket-gulhane/Ball_EatUp',
    title: 'Ball EatUp',
    blurb: 'Survival game built with p5.js.',
  },
  {
    repo: 'saket-gulhane/Iterative_DFS_simulation_pygame',
    title: 'Iterative DFS simulation',
    blurb: 'Pygame app that animates iterative depth-first search.',
  },
  { repo: 'saket-gulhane/CCTVinator', title: 'CCTVinator' },
  { repo: 'saket-gulhane/SpielScribe-DigitalVoicePrescription', title: 'SpielScribe' },
]

// Repos outside your own account that the site should also load (featured ones).
export const extraRepos = ['Devs-Not-Wizards/Freehand.io']
