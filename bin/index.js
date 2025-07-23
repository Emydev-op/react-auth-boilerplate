#!/usr/bin/env node
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically discover available templates
const templatesDir = path.join(__dirname, "../templates");
const templates = fs.readdirSync(templatesDir).filter((name) => {
  const fullPath = path.join(templatesDir, name);
  return fs.statSync(fullPath).isDirectory();
});

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

  if (!projectName || !template) {
    console.log(
      chalk.red("❌ Project name and template are required. Aborting.")
    );
    return;
  }

  const dest = path.join(process.cwd(), projectName);
  const templateDir = path.join(__dirname, `../templates/${template}`);

  if (!fs.existsSync(templateDir)) {
    console.log(
      chalk.red(
        `❌ Template "${template}" not found. Available templates: ${templates.join(
          ", "
        )}`
      )
    );
    return;
  }

  console.log(
    chalk.cyan(`\n✨ Creating ${projectName} with ${template} template...\n`)
  );

  try {
    await fs.copy(templateDir, dest);
    console.log(chalk.green("✅ Template copied!"));

    // Handle .gitignore specifically
    const gitignorePath = path.join(dest, "_gitignore");
    if (fs.existsSync(gitignorePath)) {
      await fs.rename(gitignorePath, path.join(dest, ".gitignore"));
      console.log(chalk.green("✅ Renamed _gitignore to .gitignore"));
    }

    console.log(chalk.blue("📦 Installing dependencies...\n"));
    execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
    console.log(chalk.green("\n🎉 Setup complete!"));
    console.log(`\nNext steps:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm run dev`);
    console.log(`\nHappy coding!`);
  } catch (error) {
    console.error(chalk.red(`\n❌ An error occurred during setup:`));
    console.error(chalk.red(error.message));
    // Clean up partially created directory if an error occurs
    if (fs.existsSync(dest)) {
      fs.removeSync(dest);
      console.log(chalk.yellow(`Cleaned up directory: ${dest}`));
    }
  }
};

run();
