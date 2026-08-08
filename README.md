# AgentSupport

Multi-tenant AI customer support platform with a web operator dashboard, embeddable chat widget, and voice-ready support workflows.

---

## Overview

AgentSupport is a monorepo application that helps organizations provide AI-assisted customer support across chat and voice channels.

It exists to solve three recurring support problems:

- Slow first-response times
- Repetitive operator workload
- Fragmented customer context across channels

The platform is built for teams that need:

- An embeddable widget for website visitors
- A dashboard for operators to manage conversations
- Retrieval-augmented AI responses based on uploaded knowledge files
- Optional voice support through Vapi integration

Core capabilities include:

- Organization-scoped chat sessions for visitors
- AI-assisted conversation handling with escalation/resolution tools
- File upload + text extraction + RAG indexing
- Operator inbox, threaded conversation view, and status workflow
- Billing/subscription-aware feature gating

---

## Features

### Core Features

- Multi-tenant organization model (scoped by Clerk organization ID)
- Embedded website widget with floating launcher and iframe container
- Conversation lifecycle states: unresolved, escalated, resolved
- Operator dashboard with conversation list, detail view, and contact context
- Real-time/reactive thread updates through Convex Agent APIs

### Authentication

- Clerk authentication for web dashboard users
- Clerk organization selection requirement before dashboard access
- Convex JWT auth provider configured for Clerk issuer
- Visitor session bootstrap in widget (name/email + metadata capture)
- Session validation and expiration checks on widget/public APIs

### AI Features

- Support agent orchestration using Convex Agent component
- Agent model configured to Groq qwen/qwen3.6-27b
- RAG search tool that queries organization-scoped knowledge entries
- Search-result interpretation with Gemini model prompt flow
- Operator reply enhancement flow with model identifier gpt-4o-mini
- File content extraction from PDF/image/text using Gemini models

### Dashboard

- Conversation inbox with status filters and infinite pagination
- Conversation detail pane with operator reply composer
- Manual status toggle cycle (unresolved -> escalated -> resolved)
- Contact panel with device, location, browser, and session metadata
- Billing page with Clerk pricing table

### Integrations

- Vapi plugin connect/disconnect with credential storage workflow
- Vapi assistant and phone-number listing in dashboard
- Website embed code generator for HTML/React/Next.js/JavaScript

### Performance

- Paginated data access patterns for conversations/messages/files
- Infinite-scroll utilities in shared UI package
- Turborepo task graph for parallel workspace builds/checks

### Security

- Org-scoped authorization checks in private Convex functions
- Widget/public APIs validate contact session ownership and expiry
- Webhook signature verification via Svix for Clerk webhook handling
- Secret storage flow integrated with AWS Secrets Manager

---

## Tech Stack

### Frontend

- Next.js 16 (apps/web, apps/widget)
- React 19
- TypeScript
- Vite (apps/embed)

### Backend

- Convex (queries, mutations, actions, HTTP routes)
- @convex-dev/agent
- @convex-dev/rag

### Database

- Convex database (document model + indexes)
- Convex storage for uploaded files

### AI

- Groq (qwen/qwen3.6-27b for support agent)
- Google Gemini models (text extraction, interpretation, embeddings)
- Convex Agent + Convex RAG components

### Authentication

- Clerk (Next.js + backend client + webhooks)

### Styling

- Tailwind CSS v4
- Shared internal UI package (@workspace/ui)
- base-ui and shadcn-style component patterns

### Deployment

- Vercel-hosted widget endpoint referenced in integration snippets
- Convex deployment for backend runtime

### Tooling

- pnpm workspaces
- Turborepo
- ESLint 9
- Prettier

---

## Architecture

### Overall Architecture

The repository is organized as a monorepo with:

- apps/web: operator/admin dashboard
- apps/widget: embeddable customer chat/voice interface
- apps/embed: script bundle that injects widget iframe into third-party sites
- packages/backend: Convex backend + AI + RAG + integrations
- packages/ui: shared design system/components

### Request Flow

1. A website loads the embed script.
2. The script injects a launcher button and iframe pointing to the widget app.
3. The widget initializes by validating organization, checking session, loading settings, and loading optional Vapi public key.
4. Widget messages call Convex public functions/actions.
5. Dashboard users use Convex private functions/actions authenticated through Clerk.

### Data Flow

- Public widget path:
	- Visitor -> contact session -> conversation -> thread messages
- Operator path:
	- Authenticated org member -> conversation list/detail -> status updates + operator replies
- Knowledge path:
	- File upload -> storage + extraction -> RAG namespace index -> agent search tool

### Authentication Flow

- Web app uses Clerk middleware and ClerkProvider.
- Convex private endpoints use ctx.auth.getUserIdentity() and orgId checks.
- Widget uses public endpoints and contactSessionId-based access validation.

### AI Flow

1. Public message action validates contact session and conversation status.
2. If conversation is unresolved and subscription is active, support agent is invoked with tools:
	 - searchTool
	 - escalateConversationTool
	 - resolveConversationTool
3. searchTool performs RAG lookup and response interpretation.
4. If agent is not triggered, message is still stored in thread.

### Background Processing

- Secret upsert is scheduled asynchronously using Convex scheduler (runAfter).
- File ingestion path performs extraction and RAG indexing inside backend actions.

### Database Interactions

- Convex tables:
	- widgetSettings
	- plugins
	- contactSessions
	- conversations
	- subscriptions
- Indexed lookups are used for org/session/thread/status query patterns.

---

## Folder Structure

```text
.
|- apps
|  |- web                    # Operator dashboard (Next.js)
|  |- widget                 # Embedded customer widget UI (Next.js)
|  |- embed                  # Embedding script bundle (Vite)
|- packages
|  |- backend                # Convex backend + AI + RAG + integrations
|  |- ui                     # Shared component system
|  |- eslint-config          # Shared lint config
|  |- typescript-config      # Shared TS config presets
|  |- math                   # Small workspace utility package
|- turbo.json                # Task graph and cache settings
|- pnpm-workspace.yaml       # Workspace package boundaries
|- package.json              # Root scripts and toolchain
```

Important folders:

- apps/web/components/dashboard: conversation operations UI
- apps/web/components/files: knowledge base upload/list/delete UI
- apps/web/components/plugins: Vapi plugin management UI
- apps/widget/components/widget: widget screens (loading/auth/chat/inbox/voice)
- packages/backend/convex/public: widget-facing Convex APIs
- packages/backend/convex/private: dashboard-facing Convex APIs
- packages/backend/convex/system/ai: agent prompt/tool orchestration

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10+
- Clerk account (auth + orgs + pricing + webhook)
- Convex project/deployment
- AWS account (Secrets Manager) for plugin credentials

### Clone

```bash
git clone <your-repository-url>
cd AgentSupport
```

### Install Dependencies

```bash
pnpm install
```

### Environment Setup

Create environment files for relevant apps/services and set variables listed in the Environment Variables section.

### Run Development

Run all workspace dev tasks:

```bash
pnpm dev
```

Run individual apps/packages:

```bash
pnpm --filter web dev
pnpm --filter widget dev
pnpm --filter embed dev
pnpm --filter @workspace/backend dev
```

### Build

```bash
pnpm build
```

### Production

1. Deploy Convex backend.
2. Configure Clerk keys, webhook, and JWT issuer domain.
3. Configure AWS Secrets Manager credentials for backend runtime.
4. Build/deploy web and widget apps.
5. Ensure embed snippet points to deployed widget.js/widget URL.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| NEXT_PUBLIC_CONVEX_URL | Yes | Convex deployment URL used by Next.js clients (web and widget). |
| VITE_WIDGET_URL | No | Embed app widget target URL; defaults to http://localhost:3001. |
| CLERK_JWT_ISSUER_DOMAIN | Yes | Clerk JWT issuer domain for Convex auth provider. |
| CLERK_SECRET_KEY | Yes | Clerk backend secret key used by Convex actions/webhook handling. |
| CLERK_WEBHOOK_SECRET | Yes | Svix secret for verifying Clerk webhook signatures. |
| AWS_REGION | Yes | AWS region for Secrets Manager client. |
| AWS_ACCESS_KEY_ID | Yes | AWS access key ID for Secrets Manager operations. |
| AWS_SECRET_ACCESS_KEY | Yes | AWS secret access key for Secrets Manager operations. |

---

## Scripts

| Package | Script | Command | Purpose |
|---------|--------|---------|---------|
| root | build | turbo build | Build all workspace packages/apps through Turborepo graph. |
| root | dev | turbo dev | Run workspace dev tasks in parallel. |
| root | lint | turbo lint | Run lint tasks across workspace. |
| root | format | turbo format | Run format tasks across workspace. |
| root | typecheck | turbo typecheck | Run type checks across workspace. |
| apps/web | dev | next dev --port 3000 | Start web dashboard in development. |
| apps/web | build | next build | Build web dashboard. |
| apps/web | start | next start | Run built web dashboard. |
| apps/web | lint | eslint | Lint web app. |
| apps/web | format | prettier --write "**/*.{ts,tsx}" | Format web source files. |
| apps/web | typecheck | tsc --noEmit | Type-check web app. |
| apps/widget | dev | next dev --port 3001 | Start widget app in development. |
| apps/widget | build | next build | Build widget app. |
| apps/widget | start | next start | Run built widget app. |
| apps/widget | lint | eslint | Lint widget app. |
| apps/widget | format | prettier --write "**/*.{ts,tsx}" | Format widget source files. |
| apps/widget | typecheck | tsc --noEmit | Type-check widget app. |
| apps/embed | dev | vite --port 3002 | Run embed script dev server/demo. |
| apps/embed | build | vite build | Build embed IIFE bundle. |
| packages/backend | dev | convex dev | Run Convex development backend. |
| packages/backend | setup | convex dev --until-success | Initialize/start Convex until successful. |
| packages/ui | lint | eslint | Lint shared UI package. |
| packages/ui | format | prettier --write "**/*.{ts,tsx}" | Format shared UI package. |
| packages/ui | typecheck | tsc --noEmit | Type-check shared UI package. |
| packages/math | dev | tsc --watch | Watch/compile math package. |
| packages/math | build | tsc | Build math package. |

---

## Database

- Database: Convex document database
- ORM: None (Convex functions + validators directly)
- Schema location: packages/backend/convex/schema.ts
- Storage: Convex storage for uploaded files
- Vector/semantic layer: @convex-dev/rag component with org namespace separation

Tables in schema:

- widgetSettings
- plugins
- contactSessions
- conversations
- subscriptions

Migrations:

- No separate migration framework detected; schema and indexes are defined declaratively in Convex.

Seed data:

- No seed script found.

---

## API

The application primarily uses Convex function modules rather than REST controllers.

### HTTP Route

- POST /clerk-webhook
	- Verifies Svix signature
	- Handles subscription.updated
	- Updates Clerk org max memberships
	- Upserts subscription status in Convex

### Public Convex Module (Widget-facing)

- public.organizations.validate
- public.contactSessions.create
- public.contactSessions.validate
- public.widgetSettings.getByOrganizationId
- public.conversations.create
- public.conversations.getMany
- public.conversations.getOne
- public.messages.getMany
- public.messagesAction.create
- public.secrets.getVapiSecrets

### Private Convex Module (Dashboard-facing)

- private.conversations.getMany/getOne/updateStatus
- private.messages.getMany/create
- private.messagesAction.enhanceResponse
- private.contactSessions.getOneByConversationId
- private.widgetSettings.getOne/upsert
- private.files.addFile/deleteFile/list
- private.plugins.getOne/remove
- private.secrets.upsert
- private.vapi.getAssistants/getPhoneNumbers

---

## Authentication

- Web dashboard auth is handled by Clerk in Next.js and middleware route guards.
- Organization context is mandatory for protected dashboard routes.
- Convex private functions enforce auth and org ownership using identity checks.
- Widget visitor access is anonymous to Clerk but bound to contactSession records with TTL validation.
- Convex auth provider is configured with Clerk issuer domain via auth.config.

---

## AI Components

### Models Used

- Groq: qwen/qwen3.6-27b (support agent language model)
- Google Gemini:
	- gemini-2.5-pro (search interpretation, PDF/text transformations)
	- gemini-2.5-flash (image-to-text extraction)
	- gemini-embedding-001 (RAG embeddings)
- gpt-4o-mini model identifier used for operator message enhancement

### Prompt Flow

- Support agent system prompt defines strict support behavior and tool strategy.
- Search interpreter prompt converts RAG output into user-ready responses.
- Operator enhancement prompt rewrites human-operator drafts for clarity.

### Embeddings

- Embeddings generated via Gemini embedding model with dimension 3072.

### Vector Database / RAG

- Uses @convex-dev/rag component.
- Entries are namespaced per organization.
- Uploaded files are indexed with metadata and content hash deduping.

### Agents

- Single primary support agent configured in backend system/ai/agents.
- Tool-enabled generation with escalate/resolve/search tools.

### Streaming / Realtime

- UI consumes thread messages reactively through Convex Agent React hooks.

### Queue/Async Processing

- Secret persistence pipeline uses scheduled async function execution.

---

## Integrations

- Clerk (authentication, organizations, pricing UI, webhooks)
- Convex (database, functions, storage)
- Groq (agent language model)
- Google Gemini via AI SDK (generation + embeddings)
- Vapi (voice assistants and phone numbers)
- AWS Secrets Manager (plugin credential storage)
- Svix (webhook signature verification)
- Flag CDN (country flag rendering in contact panel)

---

## Deployment

High-level deployment requirements:

1. Deploy Convex backend and configure schema/functions.
2. Configure Clerk:
	 - frontend/backend keys
	 - organization + pricing setup
	 - webhook endpoint to Convex HTTP route
	 - JWT issuer for Convex auth
3. Configure AWS credentials/region for backend secret management.
4. Deploy web and widget Next.js apps.
5. Deploy/serve embed script bundle and verify snippet URL.

Notes:

- Integration snippets currently reference a Vercel-hosted widget script URL.
- No infrastructure-as-code manifests (e.g., Terraform) were found in this repo.

---

## Development Workflow

- Use pnpm workspace commands from repository root.
- Use turbo tasks for build/lint/typecheck orchestration.
- Keep shared UI updates in packages/ui and consume from apps.
- Implement backend features in Convex modules under packages/backend/convex.
- Distinguish public (widget-facing) and private (operator-facing) Convex APIs.
- Use organization-scoped auth checks for all private backend mutations/queries.

Typical loop:

1. Run pnpm dev
2. Develop app/frontend + convex functions
3. Run pnpm lint and pnpm typecheck
4. Run pnpm build before release

---

## Troubleshooting

- Missing NEXT_PUBLIC_CONVEX_URL will throw at app startup in web/widget Convex providers.
- If dashboard private queries return unauthorized, verify Clerk org selection and Convex JWT issuer config.
- If widget initialization fails, ensure data-organization-id is passed in embed snippet.
- If Vapi plugin actions fail, verify AWS credentials/region and saved Vapi keys.
- If webhook sync is not working, confirm CLERK_WEBHOOK_SECRET and endpoint reachability.

---

## Future Improvements

- Add explicit environment example files for each app/package.
- Add automated tests (unit/integration/e2e) for widget and Convex modules.
- Add CI pipeline for lint/typecheck/build and deployment gates.
- Introduce stricter typed env validation at runtime.
- Add audit/event logs for operator and plugin actions.
- Add richer conversation analytics and SLA reporting.

---

## License

No root project license file was found.

Recommendation: add a LICENSE file and declare repository-wide licensing explicitly.

---

## Author

No explicit author metadata was found in root package metadata.

---

## Badges

Replace OWNER and REPO with your actual GitHub coordinates.

![License](https://img.shields.io/github/license/OWNER/REPO)
![Stars](https://img.shields.io/github/stars/OWNER/REPO)
![Issues](https://img.shields.io/github/issues/OWNER/REPO)
![Last Commit](https://img.shields.io/github/last-commit/OWNER/REPO)
![Top Language](https://img.shields.io/github/languages/top/OWNER/REPO)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)
