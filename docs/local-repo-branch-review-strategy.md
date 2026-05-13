# VlaInter Local Repository Branch And Review Strategy

Date: 2026-05-13

## Repository Model

Local migration work uses separate repositories from the original VlaInter repositories.

- Backend local repo: `https://github.com/rktclgh/vlainter_BE_local`
- Frontend local repo: `https://github.com/rktclgh/vlainter_FE_local`
- The original source repository for each app remains `origin` in local git.
- Local migration repo is attached as `migration` in local git.

The local repositories are not GitHub forks. They are copied public repositories used as an isolated deployment and CI/CD lane. After the local server migration is stable, changes can be proposed back to the original repositories through a controlled PR/cherry-pick flow.

## Long-Lived Branches

- `main`: deployment branch. A PR merge into `main` triggers CI/CD.
- `develop`: default working branch for integration before production-like deployment.

Normal work should start from `develop`, not directly from `main`.

## Working Branch Naming

Use module-sized branches under `develop`.

Recommended branch patterns:

- `feat/<feature-name>`
- `chore/<task-name>`
- `fix/<bug-or-issue-name>`
- `docs/<document-name>`
- `refactor/<scope-name>`
- `infra/<task-name>`

Examples:

- `feat/hermes-provider`
- `feat/provider-split`
- `chore/local-compose`
- `fix/minio-path-style`
- `infra/github-actions-local`
- `docs/migration-runbook`

Note: use `[feat]`, `[chore]`, `[fix]` in PR titles, not branch names. Git branch refs should avoid square brackets.

## Commit Strategy

Commits should be small and reviewable.

Each commit should represent one coherent decision or implementation step, for example:

- add local compose skeleton,
- add MinIO path-style S3 config,
- split generation and embedding provider config,
- add Hermes generation client,
- retarget FE dispatch workflow.

Commit messages should follow the repository's Lore Commit Protocol:

```text
<intent line: why the change was made, not what changed>

<optional body: context and rationale>

Constraint: <external constraint>
Rejected: <alternative> | <reason>
Confidence: <low|medium|high>
Scope-risk: <narrow|moderate|broad>
Tested: <verification>
Not-tested: <known gap>
```

## Review Flow

The review chain is intentionally stricter than a normal solo project because the work touches deployment, production data migration, auth, storage, AI provider routing, and CI/CD.

### 1. Worker To Lead

Sub-workers implement bounded tasks and send the result to the relevant lead.

Lead roles:

- Backend Lead
- Frontend Lead
- QA Lead
- Security Lead

Lead review style:

- Use critic-style review.
- Use `xhigh` reasoning effort.
- Check correctness, scope control, edge cases, tests, operational risk, and rollback safety.
- Reject work that silently expands scope or weakens production safety.

Only after the lead approves should the work be committed.

### 2. Lead-Approved Commit

After lead approval:

- commit the small unit of work,
- push the feature branch to the local repository,
- keep the PR focused on one module or one deployment concern.

### 3. PR Review

Before merging a branch PR:

- route the PR to a separate senior critic review,
- review from a `30년차 개발자` perspective,
- use `code-reviewer` behavior: bugs and risks first, summaries second,
- require security review for auth, redirects, cookies, secrets, file upload, storage, DB migration, or CI/CD changes,
- require QA review for deployment and user-facing flows.

Merge only when the senior PR reviewer approves.

## CI/CD Trigger Policy

CI/CD should run from `main` merge, not from ordinary feature branch pushes.

Backend local repo:

- PRs merge into `main`.
- `main` push triggers backend build, FE bundle injection, Docker image build/push, and local Ubuntu deployment.
- Build jobs run on GitHub-hosted runners.
- The deploy job runs on a self-hosted runner labeled `self-hosted`, `linux`, and `local-ubuntu` because the local server is not publicly reachable yet.
- The self-hosted runner should only pull the already-built Docker image and switch local containers. It should not build FE, build BE, or expose SSH for CI/CD.

Frontend local repo:

- PRs merge into `main`.
- `main` push dispatches the backend local repo deployment workflow.

`develop` and child branches are for implementation and review. They should not automatically deploy to the local Ubuntu server unless a workflow is manually dispatched.

## Local Deployment Path

The new Ubuntu server deployment path is:

```text
/home/song/Desktop/vlainter
```

This mirrors the current EC2 layout:

```text
/home/ubuntu/vlainter
```

The path should contain:

- `.env` outside git,
- `deploy/`,
- compose files,
- runtime state such as active blue/green color,
- local Docker volumes for PostgreSQL, Redis, and S3-compatible storage.

## Safety Rules

- Never commit secrets, `.env`, PEM files, database dumps, or downloaded S3 objects.
- Do not let local migration workflows deploy to the old EC2.
- Do not let FE local repo dispatch the original backend repo.
- Keep `origin` pointing at the original repository and `migration` pointing at the local copied repository.
- Keep Gemini embedding model/task/dimension pinned before relying on existing vector rows.
- Keep domain/TLS/Kakao redirect changes deferred until port forwarding and DNS are ready.

## First Migration Milestone

The first milestone is not public HTTPS.

The first milestone is:

- app runs through the local Ubuntu deployment path,
- local PostgreSQL + pgvector works,
- local Redis works,
- local S3-compatible storage works,
- Hermes handles generation,
- Gemini handles embeddings using the user's key,
- existing AWS production data export path is proven,
- LAN or SSH-tunneled smoke test passes.
