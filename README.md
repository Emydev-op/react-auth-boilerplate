# create-react-boilerplate

A CLI tool to quickly scaffold React projects with various opinionated boilerplates.

## Installation

To use this CLI, you can run it directly with `npm create` or `yarn create`:

\`\`\`bash
npm create react-boilerplate my-app

# or

yarn create react-boilerplate my-app

# or

pnpm create react-boilerplate my-app
\`\`\`

This will prompt you to choose a project name and a template.

## Available Templates

Currently, the following templates are available:

- `react-redux-auth`: A React project configured with Redux for state management and basic authentication setup.
- `react-swr`: (Coming soon) A React project demonstrating data fetching with SWR.
- `next-redux`: (Coming soon) A Next.js project with Redux integration.

## Usage

Once you run the command, you'll be guided through a few questions:

1.  **Project name:** Enter the name for your new project directory.
2.  **Pick a template:** Select one of the available templates.

After the project is created and dependencies are installed, you'll see instructions on how to run your new application.

## Contributing

We welcome contributions! If you'd like to add a new template or improve existing ones, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/add-new-template`).
3.  Add your new template under the `templates/` directory. Ensure it's a complete, runnable project with its own `package.json`.
4.  Commit your changes (`git commit -am 'feat: Add new template X'`).
5.  Push to the branch (`git push origin feature/add-new-template`).
6.  Create a new Pull Request.

## License

This project is licensed under the MIT License.
\`\`\`

### 6. Local Testing

Before publishing, test your CLI locally:

1.  **Navigate to your CLI tool's root directory** (where `package.json` and `bin/` are).
2.  Run `npm link`. This creates a global symlink to your `bin/index.js` file, making your CLI command available system-wide.
3.  **Go to any other directory** on your machine (e.g., `cd ~/Desktop`).
4.  Run your command: `create-react-boilerplate my-test-app`.
5.  Follow the prompts and verify that the project is created correctly and dependencies are installed.
6.  To unlink: `npm unlink` from your CLI tool's root directory.

### 7. Publishing to npm

Once you're confident your CLI works, you can publish it:

1.  **Ensure you have an npm account.** If not, sign up at [npmjs.com](https://www.npmjs.com/).
2.  **Log in to npm from your terminal:**
    \`\`\`bash
    npm login
    \`\`\`
    Follow the prompts to enter your username, password, and email.
3.  **Navigate to your CLI tool's root directory.**
4.  **Publish your package:**
    \`\`\`bash
    npm publish
    \`\`\`
    If your package name is scoped (e.g., `@emydev/create-react-boilerplate`), you might need to publish it as public:
    \`\`\`bash
    npm publish --access public
    \`\`\`
5.  **Verify:** After successful publication, you can try installing it globally or using `npm create` from a new directory:
    \`\`\`bash
    npm create react-boilerplate my-new-project
    \`\`\`

### 8. Updating Your Package

When you make changes (e.g., add a new template, fix a bug in `bin/index.js`):

1.  **Increment the version in your root `package.json`**. You can use `npm version` commands:
    - `npm version patch` (for bug fixes)
    - `npm version minor` (for new features, like adding a new template)
    - `npm version major` (for breaking changes)
      This command will also create a Git tag.
2.  **Publish the new version:**
    \`\`\`bash
    npm publish
    \`\`\`

By following these steps, you'll have a robust and extensible CLI tool for your React boilerplates!
