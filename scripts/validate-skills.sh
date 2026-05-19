#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="${ROOT_DIR}/skills"
NAME_REGEX='^[a-z0-9]+(-[a-z0-9]+)*$'
ERRORS=0

log_error() {
  echo "ERROR: $*" >&2
  ERRORS=$((ERRORS + 1))
}

log_ok() {
  echo "OK: $*"
}

if [[ ! -d "${SKILLS_DIR}" ]]; then
  log_error "Missing skills directory at ${SKILLS_DIR}"
  exit 1
fi

shopt -s nullglob
skill_dirs=("${SKILLS_DIR}"/*/)
shopt -u nullglob

if [[ ${#skill_dirs[@]} -eq 0 ]]; then
  log_error "No skills found under ${SKILLS_DIR}"
  exit 1
fi

for skill_dir in "${skill_dirs[@]}"; do
  skill_name="$(basename "${skill_dir}")"
  skill_file="${skill_dir}/SKILL.md"

  if [[ ! -f "${skill_file}" ]]; then
    log_error "${skill_name}: missing SKILL.md"
    continue
  fi

  if [[ ! "${skill_name}" =~ ${NAME_REGEX} ]]; then
    log_error "${skill_name}: directory name must match ${NAME_REGEX}"
  fi

  frontmatter="$(awk 'BEGIN{f=0} /^---$/{f++; next} f==1{print; if(/^---$/){exit}}' "${skill_file}")"

  name_value="$(echo "${frontmatter}" | awk -F': ' '/^name:/{print $2; exit}' | tr -d '\r')"
  desc_value="$(echo "${frontmatter}" | awk 'BEGIN{desc=""} /^description:/{sub(/^description: /,""); desc=$0} END{print desc}' "${skill_file}" | sed 's/^description: //')"

  if [[ -z "${name_value}" ]]; then
    log_error "${skill_name}: frontmatter missing 'name'"
  elif [[ "${name_value}" != "${skill_name}" ]]; then
    log_error "${skill_name}: frontmatter name '${name_value}' must match directory"
  elif [[ ! "${name_value}" =~ ${NAME_REGEX} ]]; then
    log_error "${skill_name}: invalid name '${name_value}'"
  fi

  if [[ -z "${desc_value}" ]]; then
    log_error "${skill_name}: frontmatter missing 'description'"
  elif [[ ${#desc_value} -gt 1024 ]]; then
    log_error "${skill_name}: description exceeds 1024 characters"
  fi

  if [[ -d "${skill_dir}/references" ]]; then
    while IFS= read -r ref; do
      [[ -z "${ref}" ]] && continue
      ref_path="${skill_dir}/${ref}"
      if [[ ! -f "${ref_path}" ]]; then
        log_error "${skill_name}: broken reference '${ref}'"
      fi
    done < <(grep -oE 'references/[a-z0-9]+(-[a-z0-9]+)*\.md' "${skill_file}" 2>/dev/null | sort -u || true)
  fi

  log_ok "${skill_name}"
done

if [[ ${ERRORS} -gt 0 ]]; then
  echo "${ERRORS} validation error(s)" >&2
  exit 1
fi

echo "All skills valid."
