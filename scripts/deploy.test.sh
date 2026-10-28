#!/usr/bin/env bash
# Tests build_and_swap from scripts/deploy.sh without running a deploy.
# Run by hand or in CI: bash scripts/deploy.test.sh
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

DEPLOY_SOURCE_ONLY=1 source "$repo/scripts/deploy.sh"

fail() { echo "FAIL: $*" >&2; exit 1; }

fresh() {
  rm -rf "$tmp/work"
  mkdir -p "$tmp/work/.next"
  touch "$tmp/work/.next/marker"
  cd "$tmp/work"
}

# A failing build leaves the running build untouched.
fresh
if (NEXT_BUILD_CMD=false build_and_swap) 2>/dev/null; then
  fail "build_and_swap succeeded although the build failed"
fi
[[ -f .next/marker ]] || fail "failed build removed the running .next"
[[ ! -e .next-build ]] || fail "failed build left .next-build behind"
[[ ! -e .next-previous ]] || fail "failed build created .next-previous"

# A failing build after partial output still leaves .next untouched.
fresh
if (NEXT_BUILD_CMD="mkdir -p .next-build && touch .next-build/partial && false" build_and_swap) 2>/dev/null; then
  fail "build_and_swap succeeded although the build failed midway"
fi
[[ -f .next/marker ]] || fail "partial failed build replaced .next"
[[ ! -e .next-build ]] || fail "partial failed build left .next-build behind"
[[ ! -e .next-previous ]] || fail "partial failed build created .next-previous"

# A successful build is swapped in and the old one is kept.
fresh
NEXT_BUILD_CMD="mkdir -p .next-build && touch .next-build/new" build_and_swap >/dev/null
[[ -f .next/new ]] || fail "new build is not in .next"
[[ -f .next-previous/marker ]] || fail "old build was not kept in .next-previous"
[[ ! -e .next-build ]] || fail ".next-build was left behind"

# The first deploy has no existing .next.
rm -rf "$tmp/work"; mkdir -p "$tmp/work"; cd "$tmp/work"
NEXT_BUILD_CMD="mkdir -p .next-build && touch .next-build/new" build_and_swap >/dev/null
[[ -f .next/new ]] || fail "first build is not in .next"
[[ ! -e .next-previous ]] || fail ".next-previous appeared on a first deploy"

# A failed swap names the restore command only when there is a previous build.
fresh
if (NEXT_BUILD_CMD=true build_and_swap) 2>"$tmp/err"; then
  fail "build_and_swap succeeded although the swap failed"
fi
grep -q "mv .next-previous .next" "$tmp/err" || fail "failed swap did not name the restore command"
rm -rf "$tmp/work"; mkdir -p "$tmp/work"; cd "$tmp/work"
if (NEXT_BUILD_CMD=true build_and_swap) 2>"$tmp/err"; then
  fail "build_and_swap succeeded although the first swap failed"
fi
grep -q "swap failed" "$tmp/err" || fail "failed first swap was not reported"
! grep -q "next-previous" "$tmp/err" || fail "failed first swap named a missing .next-previous"

# The build command sees NEXT_DIST_DIR.
fresh
NEXT_BUILD_CMD='mkdir -p "$NEXT_DIST_DIR" && echo "$NEXT_DIST_DIR" > "$NEXT_DIST_DIR/dir"' build_and_swap >/dev/null
[[ "$(cat .next/dir)" == ".next-build" ]] || fail "NEXT_DIST_DIR was not .next-build"

# Files Next rewrites during a build are restored, on success and on failure.
for outcome in true false; do
  rm -rf "$tmp/work"; mkdir -p "$tmp/work"; cd "$tmp/work"
  git init -q .
  echo original > tsconfig.json
  git add tsconfig.json
  git -c user.name=t -c user.email=t@example.com commit -q -m init
  NEXT_BUILD_CMD="echo dirty > tsconfig.json && mkdir -p .next-build && $outcome" build_and_swap >/dev/null 2>&1 || true
  [[ -z "$(git status --porcelain --untracked-files=no)" ]] || fail "tracked file left dirty after build ($outcome)"
done

echo "deploy.test.sh: all passed"
