<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project requirements

Read `docs/requirements.md` before implementation. It defines the site's tech stack, URL structure, CSS rules, naming conventions, and phased delivery plan.

# Commit rules

- Do not add Co-Authored-By or any signature to commit messages
- Write commit messages as a single concise sentence in English

# Environment files

- Never read, write, or reference `.env*` files directly
- When environment variable changes are needed, output the instructions for the user to apply manually
