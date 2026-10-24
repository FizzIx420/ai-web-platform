# Savestate

## 2026-10-24: Rolling release ZIP publisher and recovery policy

- Added `.github/actions/publish-release-zip/action.yml` for ZIP publication, rebuild metadata, SHA-256 inventory, and rolling three-release retention.
- Added `.github/RELEASE_ZIP_POLICY.md` describing the required publication pattern.
- Existing workflows are not yet migrated in this commit. Verification of actual publication/retention is pending a successful build.

## 2026-10-24: Enforce release ZIP policy for future build workflows

- Added `.github/workflows/release-zip-policy-check.yml`, a read-only guard that checks future build workflows use the local release ZIP publisher and all temporary Actions artifact uploads set one-day retention.
- The guard does not publish or delete artifacts. It will run automatically on the next push/PR; runtime verification is pending.

## 2026-10-24: Fix final release publisher shell block

- Removed the redundant closing `fi` from the shared release publisher. Intermediate draft ZIPs and final published ZIPs now follow a syntactically balanced shell block.
- The policy guard continues to prohibit Actions artifact uploads and require release ZIP publishing for build outputs. Runtime verification pending.
