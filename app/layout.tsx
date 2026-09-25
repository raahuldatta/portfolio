import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { profile } from "@/lib/data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raahuldatta.vercel.app"),
  title: `${profile.shortName} — ${profile.role}`,
  description: profile.summary,
  keywords: [
    "Raahul Datta",
    "Backend Engineer",
    "Cloud Engineer",
    "GenAI Engineer",
    "FastAPI",
    "RAG",
    "Software Engineer",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    title: `${profile.shortName} — ${profile.role}`,
    description: profile.summary,
    type: "website",
    url: "https://raahuldatta.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — ${profile.role}`,
    description: profile.summary,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: profile.role,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  url: "https://raahuldatta.vercel.app",
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.school,
  },
  sameAs: [profile.github, profile.linkedin, profile.leetcode, profile.codechef],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>{`.gsap-reveal { opacity: 1 !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="bg-blobs" aria-hidden="true">
          <span className="blob-a" />
          <span className="blob-b" />
          <span className="blob-c" />
        </div>
        <div className="grain" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-bg-raised focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-text focus-visible:shadow-lg"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
