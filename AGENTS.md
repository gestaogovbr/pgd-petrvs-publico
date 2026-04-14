# Repository Guidelines

## Project Structure & Module Organization
This repository is split into `back-end/` and `front-end/`. The back end is a Laravel 10 application: domain code lives in `back-end/app/`, routes in `back-end/routes/`, database files in `back-end/database/`, and tests in `back-end/tests/`. The front end is an Angular application: feature modules live under `front-end/src/app/modules/`, shared UI in `front-end/src/app/components/`, and static assets in `front-end/src/assets/`. CI and container assets are in `ci/scripts/`, `jenkins/`, and `resources/docker/`.

## Build, Test, and Development Commands
- `cd back-end && composer install`: install PHP dependencies.
- `cd back-end && composer test`: run the Pest test suite in CI mode.
- `cd back-end && ../ci/scripts/run-phpstan.sh`: run PHPStan checks used by CI.
- `cd front-end && npm install`: install Angular dependencies.
- `cd front-end && npm start`: serve the app locally on port `4200` with the `dev` configuration.
- `cd front-end && npm run build`: create a production build and publish it to `back-end/public/`.
- `cd front-end && npm test`: run unit tests with Karma/Jasmine.
- `cd front-end && npm run lint`: run ESLint on TypeScript and template files.

## Coding Style & Naming Conventions
Use spaces for indentation: 4 spaces are enforced in `back-end/.editorconfig`, with 2 spaces for YAML. Follow Laravel PSR-4 conventions in PHP: classes use `StudlyCase`, methods and properties use `camelCase`, and tests should sit in `tests/Unit`, `tests/Feature`, or `tests/Integration`. In Angular, keep component folders in kebab-case and preserve `*.component.ts|html|scss|spec.ts` naming. Prefer module boundaries over shared code.

## Testing Guidelines
Back-end tests use Pest with Laravel helpers; add unit tests near the behavior you change and integration tests when database or tenancy behavior is involved. Front-end tests use Jasmine/Karma for unit coverage and Protractor for `e2e/` scenarios. No explicit coverage gate is declared, but changes should include tests for new behavior and regressions.

## Commit & Pull Request Guidelines
Recent history mixes Conventional Commit prefixes such as `ci(jenkins): ...`, `build: ...`, and `chore(deps): ...` with concise Portuguese fix summaries. Prefer `type(scope): imperative summary`, for example `feat(relatorios): add export filter`. Pull requests should describe the problem, summarize the solution, link the issue or ticket, and include screenshots for UI changes. Note any migration or deployment impact explicitly.

## Security & Configuration Tips
Do not commit secrets, generated certificates, or `.env` values. Use the Docker and deployment files under `resources/` as the source of truth for environment setup, and review CI security scripts before changing dependency or pipeline behavior.
