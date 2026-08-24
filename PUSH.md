# Pushing this to your GitHub

This folder is already a git repository with the first commit made.
You do not need to run `git init` or `git add`.

---

## 1. Create an empty repo on GitHub

Go to **https://github.com/new**

- **Repository name:** `noema` (or whatever you prefer)
- **Public** or **Private** — either works
- **Do NOT tick** "Add a README", "Add .gitignore", or "Choose a license"

That last point matters. Ticking any of those creates a commit on GitHub's side,
and your push will be rejected with `Updates were rejected because the remote
contains work that you do not have locally`. Leave the repo completely empty.

---

## 2. Push

Copy the two lines below, replacing `YOUR_USERNAME` and the repo name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/noema.git
git push -u origin main
```

That's it. Refresh the GitHub page and everything will be there.

---

## Authentication

**HTTPS (easiest):** when git asks for a password, GitHub will not accept your
account password. Use a **personal access token** instead:

1. https://github.com/settings/tokens → *Generate new token (classic)*
2. Tick the **`repo`** scope
3. Copy the token and paste it as the password

To avoid retyping it: `git config --global credential.helper store`

**SSH (better if you'll push often):** use the SSH URL instead —

```bash
git remote add origin git@github.com:YOUR_USERNAME/noema.git
git push -u origin main
```

Requires an SSH key added at https://github.com/settings/keys.
Setup guide: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**GitHub CLI (fastest, if installed):** this creates the repo *and* pushes in one
step, so you can skip step 1 entirely —

```bash
gh auth login
gh repo create noema --public --source=. --push
```

---

## Set your identity on the commit

The existing commit is authored as `NOEMA Build <build@noema.systems>`, which is
a placeholder. To claim it as yours before pushing:

```bash
git config user.name  "Your Name"
git config user.email "your@email.com"
git commit --amend --reset-author --no-edit
```

Use the email that's on your GitHub account, or the commit won't link to your
profile and won't show on your contribution graph.

---

## After it's up

Connect it to Vercel at **https://vercel.com/new** — import the repo, accept the
defaults, deploy. Every future `git push` then redeploys automatically.

The included GitHub Action (`.github/workflows/ci.yml`) runs `npm run build` on
every push and pull request, so a broken build gets caught before it ships.
