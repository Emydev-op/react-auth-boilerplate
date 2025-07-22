#!/usr/bin/env node

import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";

const { fileURLToPath } = import.meta;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available templates
const templates = ["react-redux-auth"];

const run = async () => {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Project name:",
      initial: "my-vite-app",
    },
    {
      type: "select",
      name: "template",
      message: "Pick a template",
      choices: templates.map((template) => ({
        title: template,
        value: template,
      })),
    },
  ]);

  const { projectName, template } = response;
  const dest = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, `../templates/${template}`);

  console.log(
    chalk.cyan(`\n✨ Creating ${projectName} with ${template} template...\n`)
  );

  await fs.copy(templateDir, dest);
  console.log(chalk.green("✅ Template copied!"));

  console.log(chalk.blue("📦 Installing dependencies...\n"));
  execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

  console.log(chalk.green("\n🎉 Setup complete!"));
  console.log(`\nNext steps:
  cd ${projectName}
  npm run dev
  `);
};

run();
