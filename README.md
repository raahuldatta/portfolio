# 🧑‍💻 Raahul Datta — Portfolio

*I build systems that don't just answer — they justify.*

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A personal portfolio and engineering showcase — built to present eight shipped projects, a backend/cloud/GenAI skill set, and a work-in-progress lab of what's coming next.**

Built with Next.js and Tailwind CSS, deployed on Vercel, and structured around one idea: systems (and portfolios) should show their evidence, not just their conclusions.

---

## 🔥 Overview

Most portfolios are a list of links. This one is meant to read like a technical case file: what's been shipped, what's actively being built, and what's next — grouped by engineering domain (AI systems, applied ML, full-stack) rather than dumped in one undifferentiated grid.

It covers:

- **Eight shipped projects** across AI systems, applied ML, and full-stack software engineering — each linking out to its own source repo.
- **A "Building now" section** for in-progress, not-yet-public work (Vaultmind, Verdikt, Quardian) — labeled explicitly as work-in-progress, not finished claims.
- **A stack breakdown** across languages, frontend, backend/data, and cloud/tooling.
- **Experience and achievements** — internships, certifications, and hackathon/challenge work.
- **Direct contact and resume access** — no gatekeeping, no contact form.

---

## ✨ Features

**🖥️ Terminal-style hero**
A simulated `zsh` terminal on the landing section that types out the site's core pitch and current focus areas — retrieval-augmented generation, LLM orchestration, agentic tool-calling, multi-model arbitration, AI guardrails.

**📂 Work, grouped by domain**
Shipped projects are tagged by category (AI Systems, Applied ML, Full-Stack / Software Engineering) instead of shown as a flat grid, so a visitor can filter by what they actually care about.

**🚧 "Building now" section**
Surfaces active, unreleased work — with an explicit disclaimer that these are in-progress builds, not shipped products, since they don't have public source links yet.

**🧰 Stack section**
A categorized breakdown (Languages / Frontend / Backend & Data / Cloud & Tooling) rather than a single undifferentiated badge wall.

**💼 Experience timeline**
Internship history with role, company, dates, and a short scope description for each — including an upcoming role that's marked as "starting soon."

**🏆 Achievements**
Hackathon/challenge participation and certifications, surfaced as their own section rather than buried in the experience timeline.

**📬 Direct contact**
Email, LinkedIn, GitHub, LeetCode, CodeChef, and a downloadable resume — all one click away, no intermediary form.

---

## 🧱 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (React) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Fonts / Assets | Next.js `opengraph-image` / `twitter-image` routes for social previews |

---

## 📁 Project Structure

```
portfolio/
├── app/                     # Next.js app router — pages, layout, metadata
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Main single-page layout (hero, about, stack, work, experience, contact)
│   ├── opengraph-image.tsx  # Dynamic OG image generation
│   └── twitter-image.tsx    # Dynamic Twitter card image generation
│
├── components/              # Section components (Hero, About, Stack, Work, Experience, Contact)
├── data/                    # Project list, experience entries, achievements (content as data)
├── public/
│   └── resume.pdf           # Downloadable resume
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

> Adjust this tree to match the actual repo layout — this reflects the site's structure as observed, not a guaranteed file-for-file match.

---

## 🚀 Getting Started

**1. Prerequisites** — Node.js 18+ and npm (or yarn/pnpm/bun).

**2. Installation**

```bash
git clone https://github.com/raahuldatta/<repo-name>.git
cd <repo-name>
npm install
```

**3. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

**4. Build for production**

```bash
npm run build
npm start
```

---

## 🌐 Deployment

The live site is deployed on **Vercel** at [[https://portfolio-two-chi-5nw8dkh1q8.vercel.app/](https://portfolio-two-chi-5nw8dkh1q8.vercel.app/)]. Pushing to `main` triggers an automatic build and deploy via Vercel's Git integration — no manual deploy step required.

---

## 📬 Contact

- **Email:** [raahuldatta@gmail.com](mailto:raahuldatta@gmail.com)
- **LinkedIn:** [linkedin.com/in/raahuldatta](https://linkedin.com/in/raahuldatta)
- **GitHub:** [github.com/raahuldatta](https://github.com/raahuldatta)
- **LeetCode:** [leetcode.com/raahuldatta](https://leetcode.com/raahuldatta)
- **CodeChef:** [codechef.com/users/raahuldatta](https://www.codechef.com/users/raahuldatta)

---

## 📄 License

No license file is currently included in this repository. Add a `LICENSE` file (e.g. MIT) if you intend for this project to be reused by others.
