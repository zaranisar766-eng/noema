# Deploying NOEMA

Two paths. Pick based on what you actually want live.

---

## Path A — the instant link (30 seconds, no account needed to start)

Best for showing someone the design right now. Uses the single-file preview build.

1. Go to **https://app.netlify.com/drop**
2. Drag `noema-preview.html` onto the page.
3. You get a live URL immediately, e.g. `https://spontaneous-crumble-a1b2c3.netlify.app`

**One thing to fix after:** Netlify Drop serves the file at `/noema-preview.html`,
not at `/`. To get a clean root URL, put the file in a folder first and rename it:

```bash
mkdir noema-site
cp noema-preview.html noema-site/index.html
```

Then drag the **`noema-site` folder** (not the file) onto Netlify Drop.
Now it lives at the root.

To keep the URL, create a free account when prompted and claim the site. Rename it
under **Site settings → Change site name** to get something like
`https://noema.netlify.app`.

**Cloudflare Pages alternative:** https://pages.dev — same drag-and-drop flow, and
its free tier has no bandwidth cap.

---

## Path B — the real deployment (5 minutes, this is the one to keep)

Deploys the full Next.js app. Do this one if the site is going to live anywhere.

```bash
cd noema-nextjs
npm install
npm run build          # confirm it builds clean before you push

git init
git add -A
git commit -m "NOEMA — initial"
```

Create an empty repo on GitHub, then:

```bash
git remote add origin git@github.com:YOUR_USERNAME/noema.git
git branch -M main
git push -u origin main
```

Then at **https://vercel.com/new** — import the repo, accept every default
(Vercel detects Next.js), and click Deploy. You'll get
`https://noema-YOUR_USERNAME.vercel.app` in about 90 seconds.

Or skip GitHub entirely:

```bash
npm i -g vercel
vercel          # preview URL
vercel --prod   # production URL
```

---

## Custom domain

Buy the domain (Namecheap, Cloudflare Registrar — the latter sells at cost).
Then in Vercel: **Project → Settings → Domains → Add**, and follow the two DNS
records it shows you. HTTPS is automatic and takes a few minutes to propagate.

Then update `brand.url` in `lib/content.js` — it feeds `metadataBase`, the
canonical tag, the sitemap and the JSON-LD. Leaving it as `noema.systems` will
point every canonical URL at a domain you don't own.

---

## Before you call it live

- [ ] Add `public/og.jpg` at 1200×630 — social shares are blank without it.
- [ ] Add `public/favicon.ico` and `public/apple-touch-icon.png`.
- [ ] Set `brand.url` in `lib/content.js` to your real domain.
- [ ] Wire the reservation form — `components/sections/Contact.jsx` has a marked
      `await new Promise(...)` placeholder. It currently succeeds without sending
      anything, which will silently lose real signups.
- [ ] Run Lighthouse. Expect ~95+ on desktop; mobile performance drops a few
      points from the hero canvas, which is the intended trade.
