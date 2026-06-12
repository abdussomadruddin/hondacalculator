# Honda Loan Calculator

A responsive, front-end-only Malaysian Honda hire purchase calculator built
with plain HTML, CSS, and JavaScript.

## Requirements

- Node.js 18 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173`.

## Production build

```bash
npm run build
npm start
```

The build command creates the deployable site in `dist/`. The start command
serves that production build at `http://127.0.0.1:4173`.

## Deploy to Vercel

### Vercel dashboard

1. Push this project to GitHub, GitLab, or Bitbucket.
2. In Vercel, select **Add New > Project**.
3. Import the repository.
4. Keep the framework preset as **Other**.
5. Vercel reads the included `vercel.json` and runs `npm run build`.
6. Select **Deploy**.

The configured output directory is `dist`.

### Vercel CLI

```bash
npm install --global vercel
vercel
```

Follow the prompts for the first deployment. For a production deployment:

```bash
vercel --prod
```

## Project structure

```text
assets/             Images used by the site
scripts/build.mjs   Creates the production dist folder
scripts/serve.mjs   Local development and production server
index.html          Application markup
styles.css          Responsive application styles
script.js           Calculator data, calculations, and interactions
vercel.json         Vercel build configuration
```

No backend, database, environment variables, or external JavaScript packages
are required.
