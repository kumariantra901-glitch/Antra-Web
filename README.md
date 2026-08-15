# Antra-Web — Website

A complete, multi-page website for the Antra-Web brand. Pure HTML/CSS/JS —
no build step, no framework, no dependencies to install. You can open
`index.html` directly in a browser, or publish it straight to GitHub Pages.

## What's inside

```
antra-web/
├── index.html        Home
├── about.html         About Me
├── services.html      Services
├── packages.html       Packages & pricing
├── portfolio.html      Portfolio grid, filters, project modal
├── process.html        Process timeline
├── faq.html            FAQ accordion
├── contact.html        Inquiry form + direct contact
├── css/style.css       Full design system (colors, type, components, animations)
├── js/config.js        ⭐ ALL editable content lives here (see below)
├── js/script.js        Shared behaviour: nav, forms, filters, animations
└── assets/             favicon + social share image (SVG, no external files needed)
```

## 1. Publish to GitHub Pages (5 minutes)

1. Create a new **public** repository on GitHub (e.g. `antra-web`).
2. Upload every file in this folder to the repo, keeping the folder
   structure (`css/`, `js/`, `assets/` must stay as subfolders).
   - Easiest way: on the repo page, click **Add file → Upload files**,
     drag the whole `antra-web` folder contents in, and commit.
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`. Save.
6. Wait 1–2 minutes — GitHub will give you a live URL like
   `https://yourusername.github.io/antra-web/`.

That's it — the whole site is static, so there's nothing else to configure
to get it *online*. The two things below (form + WhatsApp number) are about
making the site *fully functional*.

## 2. Before you launch — 2 things to check in `js/config.js`

Open `js/config.js`. Every editable value on the entire site lives in this
one file (brand name, email, WhatsApp number, socials, package prices,
portfolio projects). Nothing else in the codebase should need editing for
normal content updates.

**a) The inquiry form needs a backend.**
Right now `ANTRA_CONFIG.form.endpoint` is empty on purpose — a form that
silently pretends to send an email it never sends is worse than one that's
honest about not being connected yet. Until you set this, the Contact page
shows a clear notice instead of a fake success message.

Pick one (all have free tiers):
- **Formspree** — https://formspree.io — create a form, copy the endpoint
  (`https://formspree.io/f/xxxxxxx`), paste it into `form.endpoint`.
- **Web3Forms** — https://web3forms.com — get an access key, paste it into
  `form.web3formsAccessKey`, and set `form.endpoint` to
  `https://api.web3forms.com/submit`.

No code changes needed beyond pasting these two values.

**b) Confirm the WhatsApp number.**
`contact.whatsappNumber` is set to `916204693928` (assuming a `+91` India
country code in front of the number from the brief). Double-check the
country code is correct — WhatsApp click-to-chat links only work with the
full international number, digits only, no `+` or spaces.

## 3. Everything else you can customize

- **Portfolio screenshots** — drop real screenshots into `assets/portfolio/`
  named to match each project's `image` path in `config.js` (e.g.
  `restaurant.webp`). Until a file exists, that card automatically falls
  back to a clean, category-styled preview — see `assets/portfolio/README.txt`.
- **Portfolio projects & live URLs** — edit the `portfolio` array in
  `config.js`. Six projects marked `featured:true` appear on the Home page;
  all of them appear on the Portfolio page.
- **Package prices & features** — edit the `packages` array.
- **Social links** — `contact.instagramUrl` / `contact.facebookUrl`.
- **Your photo** — the About page has a labeled placeholder frame
  (`.photo-placeholder` in `about.html`) ready to swap for an `<img>` tag
  once you have a photo.
- **Colors / fonts** — all design tokens are declared at the top of
  `css/style.css` under `:root`.

## 4. Notes on what was intentionally left out

- No stock photography — every visual is CSS/SVG (browser-frame mockups,
  gradients), so there's nothing to license, replace, or that could look
  like a fake client photo.
- No fake stats, client counts, or testimonials, per the original brief.
- The "Luxury Salon" portfolio URL was supplied with `...` in it — it's kept
  exactly as given in `config.js`. If it 404s, replace it with the correct
  URL.
- Respects `prefers-reduced-motion` — animations are disabled automatically
  for visitors who have that OS setting on.

## 5. Local preview

No install needed. From this folder, run any static server, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.
