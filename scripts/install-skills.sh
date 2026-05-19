#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_SRC="${ROOT_DIR}/skills"

TARGET_CURSOR=false
TARGET_OPENCODE=false
TARGET_GLOBAL=false
TARGET_PROJECT=""
USE_COPY=false
DRY_RUN=false

usage() {
  cat <<'EOF'
Install LQ agent skills for Cursor and/or OpenCode.

Usage:
  ./scripts/install-skills.sh [--cursor] [--opencode] [--all]
    [--global | --project <dir>] [--copy] [--dry-run]

Examples:
  ./scripts/install-skills.sh --cursor --project .
  ./scripts/install-skills.sh --opencode --global
  ./scripts/install-skills.sh --all --project /path/to/nest-app
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cursor) TARGET_CURSOR=true ;;
    --opencode) TARGET_OPENCODE=true ;;
    --all)
      TARGET_CURSOR=true
      TARGET_OPENCODE=true
      ;;
    --global) TARGET_GLOBAL=true ;;
    --project)
      shift
      TARGET_PROJECT="${1:-}"
      if [[ -z "${TARGET_PROJECT}" ]]; then
        echo "ERROR: --project requires a directory" >&2
        exit 1
      fi
      ;;
    --copy) USE_COPY=true ;;
    --dry-run) DRY_RUN=true ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "ERROR: unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
  shift
done

if [[ "${TARGET_CURSOR}" == false && "${TARGET_OPENCODE}" == false ]]; then
  echo "ERROR: specify --cursor, --opencode, or --all" >&2
  usage
  exit 1
fi

if [[ "${TARGET_GLOBAL}" == true && -n "${TARGET_PROJECT}" ]]; then
  echo "ERROR: use either --global or --project, not both" >&2
  exit 1
fi

if [[ "${TARGET_GLOBAL}" == false && -z "${TARGET_PROJECT}" ]]; then
  echo "ERROR: specify --global or --project <dir>" >&2
  usage
  exit 1
fi

"${ROOT_DIR}/scripts/validate-skills.sh"

install_skill_dir() {
  local src_skill="$1"
  local dest_root="$2"
  local skill_name
  skill_name="$(basename "${src_skill}")"
  local dest="${dest_root}/${skill_name}"

  if [[ "${DRY_RUN}" == true ]]; then
    echo "[dry-run] would install ${skill_name} -> ${dest}"
    return
  fi

  mkdir -p "${dest_root}"

  if [[ -e "${dest}" ]]; then
    rm -rf "${dest}"
  fi

  if [[ "${USE_COPY}" == true ]]; then
    cp -R "${src_skill}" "${dest}"
  else
    ln -sfn "${src_skill}" "${dest}"
  fi

  echo "Installed ${skill_name} -> ${dest}"
}

resolve_targets() {
  TARGETS=()
  if [[ "${TARGET_GLOBAL}" == true ]]; then
    if [[ "${TARGET_CURSOR}" == true ]]; then
      TARGETS+=("${HOME}/.cursor/skills")
      TARGETS+=("${HOME}/.agents/skills")
    fi
    if [[ "${TARGET_OPENCODE}" == true ]]; then
      TARGETS+=("${HOME}/.config/opencode/skills")
    fi
  else
    local project_dir
    project_dir="$(cd "${TARGET_PROJECT}" && pwd)"
    if [[ "${TARGET_CURSOR}" == true ]]; then
      TARGETS+=("${project_dir}/.cursor/skills")
      TARGETS+=("${project_dir}/.agents/skills")
    fi
    if [[ "${TARGET_OPENCODE}" == true ]]; then
      TARGETS+=("${project_dir}/.opencode/skills")
    fi
  fi
}

resolve_targets

shopt -s nullglob
skill_dirs=("${SKILLS_SRC}"/*/)
shopt -u nullglob

for dest_root in "${TARGETS[@]}"; do
  echo "Target: ${dest_root}"
  for skill_dir in "${skill_dirs[@]}"; do
    install_skill_dir "${skill_dir}" "${dest_root}"
  done
done

echo "Done."
