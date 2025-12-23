# NEBS Dashboard 🚀

A modern admin dashboard built with Next.js, TypeScript, and Tailwind CSS. It provides authentication, project/team switching, notice management, file uploads, and a responsive UI using Radix + custom components.

---

## Demo & Docs

- **Live demo:** https://nebs-dashboard-sigma.vercel.app 
- **Docs / Additional docs:** https://docs.google.com/document/d/1wR0wTP0IMmz-7Dz-jkkNvfz_wTQ8CNqyv99M1EvTfoc/edit?usp=sharing
---

## Tech Stack 🔧

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS, Radix UI primitives, Lucide icons
- **Data fetching:** SWR, Axios
- **Forms & validation:** react-hook-form, Zod
- **Auth:** Cookie-based tokens (server cookies)
- **Deployment:** Vercel (recommended)

---

## Key Features ✅

- Authentication: Login and Sign-up flows
- Dashboard with project/team switching
- Notice management (create/edit/delete notices)
- File upload support (via `FileUpload` component)
- User profile pages and settings
- Reusable UI primitives and components in `components/ui` (Avatar, Dialog, Popover, Table, etc.)
- Responsive layout and accessible components
- Client/server interactions via `lib/auth` and `axios-instance`

---

## Getting started

1. Install dependencies

```bash
npm install
# or
pnpm install
```

2. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

3. Build for production

```bash
npm run build
npm start
```

---

## Environment variables (.env.example) 🔐

Create a `.env.local` file in the project root and copy the variables below. Update values for your environment.

```env
# Base URL for the backend API used by axios (update if you use a different endpoint)
NEXT_PUBLIC_API_URL=https://nebs-backend.vercel.app/v1/api

# Base URL for the frontend (used for absolute links)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: replace with your analytics / feature flags / other keys
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=

# If you deploy to Vercel you may use VERCEL_* env vars and set secrets there
```

> Note: The code currently uses a hard-coded API base URL in `lib/auth/axios-instance.ts`. If you prefer, replace the `baseURL` with `process.env.NEXT_PUBLIC_API_URL` and restart the dev server.

---

## Contributing 🤝

Contributions are welcome! Open issues for bugs or feature requests and submit pull requests for fixes.

---

## License

MIT — feel free to change to your preferred license.

---

If you'd like, I can add a `docs/` folder with usage guides for components and API examples, or update the README with your real live URL and docs link — tell me what links to use and I'll update it.