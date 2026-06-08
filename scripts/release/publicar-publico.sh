#!/bin/bash

# Publica a branch main do repositório privado no repositório público.
# Uso: ./scripts/release/publicar-publico.sh [branch]

set -euo pipefail

BRANCH="${1:-main}"
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

PRIVATE_URL="git@github.com:gestaogovbr/petrvs-pgd.git"
PUBLIC_URL="git@github.com:gestaogovbr/petrvs-pgd-publico.git"
PUBLIC_REMOTE="publico"

restore_private_origin() {
    if git remote get-url origin >/dev/null 2>&1; then
        git remote set-url origin "$PRIVATE_URL" >/dev/null 2>&1 || true
        git remote set-url --push origin "$PRIVATE_URL" >/dev/null 2>&1 || true
    fi
}

ensure_remote() {
    local remote_name="$1"
    local remote_url="$2"

    if git remote get-url "$remote_name" >/dev/null 2>&1; then
        git remote set-url "$remote_name" "$remote_url"
    else
        git remote add "$remote_name" "$remote_url"
    fi

    git remote set-url --push "$remote_name" "$remote_url"
}

trap restore_private_origin EXIT

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Erro: execute este script dentro do repositório Git."
    exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"

if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo "Erro: branch atual é '$CURRENT_BRANCH'. Troque para '$BRANCH' antes de publicar."
    exit 1
fi

# if [ -n "$(git status --porcelain)" ]; then
#     echo "Erro: existem alterações locais não commitadas. Faça commit ou stash antes de publicar."
#     exit 1
# fi

echo "==> Configurando remotes"
ensure_remote origin "$PRIVATE_URL"
ensure_remote "$PUBLIC_REMOTE" "$PUBLIC_URL"

echo "==> Atualizando '$BRANCH' a partir do privado"
git pull --ff-only origin "$BRANCH"

echo "==> Integrando '$BRANCH' pública antes do push"
git pull --no-rebase --no-edit "$PUBLIC_REMOTE" "$BRANCH"

echo "==> Publicando '$BRANCH' no repositório público"
git push "$PUBLIC_REMOTE" "$BRANCH:$BRANCH"

echo "==> Publicação concluída"
echo "==> Origin restaurado para o repositório privado"
git remote -v
