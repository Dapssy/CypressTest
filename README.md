# QA Automation Test Task — Cypress

End-to-end and API tests for [SauceDemo](https://www.saucedemo.com) and [Reqres](https://reqres.in), written in Cypress and run in GitLab CI.

## Tech Stack

- **Cypress** — UI + API testing
- **Mocha JUnit Reporter** — CI-friendly XML reports
- **AJV** — JSON schema validation
- **GitLab CI** — pipeline + artifacts
- **dotenv** — local env management

## Project Structure

```
.
├── cypress/
│   ├── e2e/
│   │   ├── login-cart.cy.js        # UI: login + add to cart
│   │   ├── users-schema.cy.js      # API: GET /users + schema validation
│   │   └── api-ui-boundary.cy.js   # Combined: POST /users → confirm not in UI
│   ├── fixtures/
│   │   └── schemas/users.json      # JSON schema for Reqres users
│   ├── support/
│   │   ├── pages/                  # Page Objects (LoginPage, InventoryPage, CartPage)
│   │   ├── commands.js             # Custom commands (login, apiRequest)
│   │   └── e2e.js
├── reports/                        # JUnit XML output (CI artifact)
├── .env.example                    # Template for local env vars
├── .gitignore
├── .gitlab-ci.yml
├── cypress.config.js
└── package.json
```

## Prerequisites

- Node.js 20+
- npm

## Setup (Local)

```bash
git clone <repo-url> && cd <repo>
npm ci
cp .env.example .env
# Then fill .env with real values:
#   CYPRESS_API_KEY=<your reqres api key>
#   CYPRESS_USERNAME=standard_user
#   CYPRESS_PASSWORD=secret_sauce
```

> `.env` is gitignored. Never commit real secrets. In CI, values come from **GitLab → Settings → CI/CD → Variables**.

## Running Tests

```bash
npx cypress run                                          # headless, all specs
npx cypress open                                         # interactive UI
npx cypress run --spec "cypress/e2e/login-cart.cy.js"    # single spec
```

JUnit reports → `reports/results-*.xml`. Videos and failure screenshots → `cypress/videos/` and `cypress/screenshots/`.

## Test Design

| # | Spec | Type | What it proves |
|---|------|------|----------------|
| 1 | `login-cart.cy.js` | UI E2E | Valid user can log in, add an item, and the cart reflects it |
| 2 | `users-schema.cy.js` | API | `GET /api/users` response matches the expected JSON schema (structure + types) |
| 3 | `api-ui-boundary.cy.js` | Combined | A user created via `POST /api/users` does **not** exist in the SauceDemo UI — proving Reqres and SauceDemo are separate systems |

**Patterns used**
- **Page Objects** under `cypress/support/pages/` keep selectors out of specs
- **Custom commands** (`cy.login`, `cy.apiRequest`) for reuse
- **Schema validation** via AJV against `fixtures/schemas/users.json`
- **No hard waits** — only Cypress retry-able assertions

## Environment Variables

| Variable | Used for | Where to set |
|---|---|---|
| `CYPRESS_BASE_URL` | SauceDemo URL | `.env` / GitLab CI |
| `CYPRESS_API_URL` | Reqres base API URL | `.env` / GitLab CI |
| `CYPRESS_API_KEY` | Reqres API key | `.env` / GitLab CI (masked) |
| `CYPRESS_USERNAME` | SauceDemo login | `.env` / GitLab CI (masked) |
| `CYPRESS_PASSWORD` | SauceDemo password | `.env` / GitLab CI (masked) |

Cypress automatically reads `CYPRESS_*` env vars and exposes them via `Cypress.env('apiKey')`, etc.

## CI/CD (GitLab)

Pipeline: `.gitlab-ci.yml`

- Runs on every push using `cypress/browsers:node20.11.0-chrome120`
- Caches `node_modules` and the Cypress binary
- Executes `npx cypress run` headlessly in Chrome
- Publishes a **JUnit report** and uploads **videos + screenshots** as artifacts

**Setting CI secrets:** GitLab → **Settings → CI/CD → Variables** → add each `CYPRESS_*` variable (mark secrets *Masked* and *Protected*).

Artifacts are downloadable from each pipeline job; the JUnit report renders inline in the merge request view.

## Troubleshooting

- **`Cypress.env('apiKey') is undefined`** → variable not set in `.env` (local) or GitLab CI/CD Variables (pipeline)
- **CI fails on first run** → confirm the masked variables exist and the job uses the `cypress/browsers` image
- **Schema test fails after Reqres update** → regenerate `fixtures/schemas/users.json`

## License

MIT
