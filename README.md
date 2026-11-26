# Creonixs website (React + Vite)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # dist/ folder -> Netlify / Vercel la upload

## Maatha vendiyadhu
- `src/data.js` : company details, menu links, socials, services, projects, FAQs
- Project images : `src/images/` la file pottu, `src/data.js` mela import panni `image:` la kudunga
- Colours : `src/styles.css` mela irukka `:root`
- Browser tab title : `index.html`

## Contact form
- Message: EmailJS. Files: Cloudinary. Keys ellam `src/data.js` la irukku.
- Code: `src/sections/ContactForm.jsx`, `src/lib/sendMail.js`, `src/lib/useUploads.js`
- EmailJS template la `{{to_email}} {{subject}} {{name}} {{email}} {{phone}} {{topic}} {{message}}` use pannalam.
- Keys browser la theriyum: EmailJS Security la unga domain mattum allow pannunga,
  Cloudinary preset la allowed formats and size limit set pannunga.

## Files
- `src/Header.jsx` : top logo, left menu drawer, Contact and Need help buttons
- `src/styles.css` mela `:root` : light theme colours
- `src/sections/` : ovvoru section um thani file
- `src/assets/logo.png`, `public/favicon.png` : logo

## Pages
- Home: `/`
- Portfolio: `/#/portfolio` (`src/pages/Portfolio.jsx`)
- Home work cards: `workCards` in `src/data.js`
