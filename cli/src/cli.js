#!/usr/bin/env node
import { intro, outro, select, isCancel, cancel } from "@clack/prompts";
import pc from "picocolors";
import figlet from "figlet";
import gradient from "gradient-string";
import {
  profile,
  projects,
  domainOrder,
  buildingNow,
  stack,
  focusAreas,
  experience,
  achievements,
} from "./data.js";

const brand = gradient(["#818cf8", "#f472b6"]);

function rule() {
  console.log(pc.dim("─".repeat(Math.min(process.stdout.columns || 60, 60))));
}

export function printHeader() {
  const banner = figlet.textSync("RAAHUL", { font: "Standard" });
  console.log(brand.multiline(banner));
  console.log(pc.dim(`${profile.role} · ${profile.location}`));
  console.log();
  console.log(pc.italic(profile.headline));
}

export function printAbout() {
  console.log(pc.bold("About"));
  console.log();
  console.log(profile.summary);
  console.log();
  console.log(`${pc.dim("School      ")} ${profile.school}`);
  console.log(`${pc.dim("CGPA        ")} ${profile.gpa}`);
  console.log(`${pc.dim("Location    ")} ${profile.location}`);
  console.log(`${pc.dim("Graduating  ")} ${profile.gradYear}`);
  console.log();
  console.log(pc.bold("Currently focused on"));
  focusAreas.forEach((area) => console.log(`  ${pc.magenta("›")} ${area}`));
}

export function printWork() {
  console.log(pc.bold("Work"));
  console.log(pc.dim("Eight shipped projects, grouped by domain. Every repo link is public."));
  console.log();

  domainOrder.forEach((domain) => {
    const items = projects.filter((p) => p.domain === domain);
    if (items.length === 0) return;

    console.log(pc.bold(pc.magenta(domain)));
    items.forEach((p) => {
      console.log();
      console.log(`  ${pc.bold(p.name)}  ${pc.dim(p.tagline)}`);
      console.log(`  ${pc.dim("Problem   ")} ${p.problem}`);
      console.log(`  ${pc.dim("Approach  ")} ${p.approach}`);
      console.log(`  ${pc.dim("Outcome   ")} ${p.outcome}`);
      console.log(`  ${pc.dim("Stack     ")} ${p.stack.join(", ")}`);
      console.log(`  ${pc.cyan(p.repo)}`);
    });
    console.log();
  });
}

export function printStack() {
  console.log(pc.bold("Stack"));
  console.log();
  stack.forEach((group) => {
    console.log(pc.bold(pc.magenta(group.label)));
    console.log(`  ${group.items.join(", ")}`);
    console.log();
  });
}

export function printExperience() {
  console.log(pc.bold("Experience"));
  console.log();
  experience.forEach((item) => {
    const badge = item.upcoming ? pc.magenta(" [upcoming]") : "";
    console.log(`${pc.bold(`${item.role} · ${item.org}`)}${badge}`);
    console.log(pc.dim(item.location ? `${item.period} — ${item.location}` : item.period));
    item.points.forEach((point) => console.log(`  ${pc.dim("›")} ${point}`));
    console.log(pc.dim(`  ${item.tags.join(", ")}`));
    console.log();
  });

  console.log(pc.bold("Achievements"));
  console.log();
  achievements.forEach((a) => {
    console.log(`  ${pc.bold(a.label)}`);
    console.log(`  ${pc.dim(a.detail)}`);
    console.log();
  });
}

export function printBuilding() {
  console.log(pc.bold("Building now"));
  console.log(pc.dim("Not public yet — work in progress, not finished claims."));
  console.log();
  buildingNow.forEach((item) => {
    console.log(pc.bold(item.name));
    console.log(`  ${item.description}`);
    if (item.note) console.log(`  ${pc.dim(item.note)}`);
    console.log();
  });
}

export function printContact() {
  console.log(pc.bold("Let's get in touch"));
  console.log(pc.dim(`Open to full-time roles for ${profile.gradYear}. Fastest way to reach me is email.`));
  console.log();
  console.log(`${pc.dim("Email     ")} ${pc.cyan(profile.email)}`);
  console.log(`${pc.dim("Website   ")} ${pc.cyan(profile.website)}`);
  console.log(`${pc.dim("GitHub    ")} ${pc.cyan(profile.github)}`);
  console.log(`${pc.dim("LinkedIn  ")} ${pc.cyan(profile.linkedin)}`);
  console.log(`${pc.dim("LeetCode  ")} ${pc.cyan(profile.leetcode)}`);
  console.log(`${pc.dim("CodeChef  ")} ${pc.cyan(profile.codechef)}`);
}

const sections = {
  about: printAbout,
  work: printWork,
  stack: printStack,
  experience: printExperience,
  building: printBuilding,
  contact: printContact,
};

async function main() {
  console.clear();
  printHeader();
  console.log();
  intro(pc.dim("Welcome — let's explore."));

  for (;;) {
    const choice = await select({
      message: "What do you want to see?",
      options: [
        { value: "about", label: "About", hint: "who I am" },
        { value: "work", label: "Work", hint: "8 shipped projects" },
        { value: "stack", label: "Stack", hint: "languages & tools" },
        { value: "experience", label: "Experience", hint: "internships & achievements" },
        { value: "building", label: "Building now", hint: "in-progress work" },
        { value: "contact", label: "Contact", hint: "reach out" },
        { value: "exit", label: "Exit" },
      ],
    });

    if (isCancel(choice)) {
      cancel("See you around.");
      process.exit(0);
    }

    if (choice === "exit") break;

    console.log();
    rule();
    console.log();
    sections[choice]();
    rule();
    console.log();
  }

  outro(`Thanks for stopping by — ${pc.cyan(profile.website)}`);
}

export { main };
