# saket-gulhane.github.io

My profile site: a career written as a commit history. Live at https://saket-gulhane.github.io.

Built with Vite, React and TypeScript, and deployed to GitHub Pages by GitHub Actions.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build into dist/
npm run preview  # serve the built site
```

## Change the content

Everything personal is in [`src/content.ts`](src/content.ts):

| What | Where |
|---|---|
| Name, tagline, links, resume | `profile` |
| The commit history | `commits` (newest first) |
| Achievement cards | `achievements` |
| Skills | `skills` |
| Featured projects and their order | `featured` |

A history item looks like this:

```ts
{
  hash: 'e91c4a7',                 // any 7 characters, must be unique
  message: 'feat: build …',
  client: 'Goldman Sachs',         // optional tag
  date: 'Aug 2025',                // optional
  detail: 'One or two sentences.',
  bullets: ['What I did', '…'],    // optional
  stack: ['React', 'FastAPI'],     // optional
  milestone: true,                 // optional: joining a company, finishing a degree
  branch: 'side',                  // optional: 'merge' | 'side' | 'fork' for the side branch
}
```

The resume is `public/resume.pdf`. To update it, replace that file and push. The download buttons save it as `profile.resumeFileName`; set `profile.resumeUrl` to `null` to hide them.

## GitHub data

The Projects and GitHub activity sections read GitHub's public API from the visitor's browser,
with no token. Results are cached for an hour. If the API can't be reached, the site uses
`public/github-snapshot.json`, which the deploy workflow refreshes on every build
(`scripts/snapshot.mjs`).

The contribution calendar comes from the public
[github-contributions-api](https://github.com/grubersjoe/github-contributions-api).

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages. It also runs weekly to refresh the snapshot.

One-time setup: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

No personal access token or repository secret is needed.
