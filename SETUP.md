# Portfolio setup

## Repo layout
```
index.html            page structure (rarely needs editing)
style.css             design — colours live at the top (section 1)
script.js             ✏️ ALL your content: CONFIG, I18N, NEWS, PUBLICATIONS, …
assets/profile.jpg    your photo (square)
certificates/*.enc    ENCRYPTED certificate files (safe to commit)
tools/encrypt-cert.mjs  encrypts certificates (run locally, Node 18+)
private/              originals — git-ignored, NEVER commit
```

## Where to edit (all in `script.js`)
| What | Where |
|---|---|
| Links (Scholar, GitHub, ORCID, LinkedIn, email), CV path | `CONFIG` |
| Hero, bio, headings, button text (EN + 繁中) | `I18N.en` / `I18N.zh` |
| News timeline | `NEWS` |
| Education | `EDUCATION` |
| Research cards | `RESEARCH` |
| Papers | `PUBLICATIONS` (BibTeX is generated automatically unless you paste your own `bibtex`) |
| Topic filter labels | `TOPICS` |
| Projects / Skills | `PROJECTS` / `SKILLS` |
| Certifications | `CERTIFICATIONS` |

Also update your initials in `index.html` (`brand-mark`, `data-initials`) and the `<title>`.

## Private certificate vault
GitHub Pages is a **public static host**: every file in the repo can be downloaded by anyone
who guesses its URL, and a "hidden" button or password check in JavaScript is not protection.
So the vault **encrypts** the files instead:

**Easiest way (no installation):**
1. Double-click `tools/vault-tool.html` on your computer (opens in Chrome/Edge).
2. Type a passphrase twice → **Create verifier** → paste the result into `script.js` → `CONFIG.vault.verifier`.
3. Choose your original certificate files → **Encrypt & download**.
4. Move the downloaded `.enc` files into the `certificates/` folder. The names already match `script.js`.
5. Upload `script.js` and `certificates/*.enc` to GitHub. Never upload the originals.
6. On the live site press **Ctrl + Shift + L** (or click the faint lock in the footer) and type your passphrase.

(Advanced alternative: `node tools/encrypt-cert.mjs --verifier` and `node tools/encrypt-cert.mjs <files>`.)

Security notes
- Use a long passphrase (4–5 random words). A short PIN can be brute-forced offline from the `.enc` files.
- If an original was **ever** committed, it stays in git history. Rewrite history (e.g. `git filter-repo`) or make a new repo.
- Certificate *names, issuers and dates* are public by design. Only the files are private.
- `script.js` now holds the verifier for your own passphrase. All files in `certificates/` are encrypted with that same passphrase.
- An entry's `file` can also be a list (`[{ file, label }]`). Each file then gets its own button in admin mode.

## Testing locally
Open with a local server (the vault needs `fetch`): `python3 -m http.server`, then visit http://localhost:8000.
