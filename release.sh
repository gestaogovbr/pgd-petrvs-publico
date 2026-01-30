#!/bin/bash

# Script para gerar nova versão do PETRVS-PGD
# Uso: ./release.sh <nova_versao>

set -e

if [ -z "$1" ]; then
    echo "Uso: $0 <nova_versao>"
    exit 1
fi

NEW_VERSION=$1
PROJECT_ROOT=$(pwd)
APP_JSON="front-end/src/app.json"
WORKFLOW=".github/workflows/main.yml"
CHANGELOG="CHANGELOG.md"

# 1. Ler versão atual do app.json
if [ ! -f "$APP_JSON" ]; then
    echo "Erro: Arquivo $APP_JSON não encontrado."
    exit 1
fi

CURRENT_VERSION=$(grep '"version":' "$APP_JSON" | sed -n 's/.*"version": "\([^"]*\)".*/\1/p')

if [ -z "$CURRENT_VERSION" ]; then
    echo "Erro: Não foi possível ler a versão atual de $APP_JSON"
    exit 1
fi

echo "Versão Atual: $CURRENT_VERSION"
echo "Nova Versão: $NEW_VERSION"

if [ "$CURRENT_VERSION" == "$NEW_VERSION" ]; then
    echo "A versão já é $NEW_VERSION. Abortando."
    exit 1
fi

# 2. Criar Migration
echo "Criando migração..."
# Formato: YYYY_MM_DD_000000_versionX_Y_Z.php
TIMESTAMP_PREFIX=$(date +"%Y_%m_%d_000000")
SAFE_VERSION=${NEW_VERSION//./_}
MIGRATION_FILENAME="${TIMESTAMP_PREFIX}_version${SAFE_VERSION}.php"
MIGRATION_PATH="back-end/database/migrations/tenant/$MIGRATION_FILENAME"

cat <<EOF > "$MIGRATION_PATH"
<?php

use App\Traits\Version;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Version;

    public function up(): void
    {
        \$this->version("$NEW_VERSION");
    }

    public function down(): void
    {
        \$this->version("$CURRENT_VERSION");
    }
};
EOF

echo "Migração criada: $MIGRATION_PATH"

# 3. Atualizar app.json
echo "Atualizando $APP_JSON..."
sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" "$APP_JSON"

# 4. Atualizar main.yml
echo "Atualizando $WORKFLOW..."
# Atualiza TAG_OLD para ser a versão atual
sed -i "s/DOCKER_HUB_TAG_OLD: .*/DOCKER_HUB_TAG_OLD: $CURRENT_VERSION/" "$WORKFLOW"
# Atualiza TAG_NEW para ser a nova versão
# Nota: O valor anterior de TAG_NEW era $CURRENT_VERSION, então substituímos ele
sed -i "s/DOCKER_HUB_TAG_NEW: $CURRENT_VERSION/DOCKER_HUB_TAG_NEW: $NEW_VERSION/" "$WORKFLOW"


# 5. Gerar Changelog com Codex
echo "Gerando Changelog..."

# Tenta pegar os logs desde a tag da versão atual
if git rev-parse "$CURRENT_VERSION" >/dev/null 2>&1; then
    echo "Usando commits desde a tag $CURRENT_VERSION..."
    COMMITS=$(git log "$CURRENT_VERSION"..HEAD --pretty=format:"- %s")
else
    echo "Tag $CURRENT_VERSION não encontrada. Usando últimos 20 commits..."
    COMMITS=$(git log -n 20 --pretty=format:"- %s")
fi

if [ -z "$COMMITS" ]; then
    echo "Nenhum commit encontrado para gerar o changelog."
    CHANGELOG_CONTENT="## $NEW_VERSION $(date +'%d/%m/%Y')\n\n- Atualização de versão."
else
    PROMPT="Gere as notas de versão (changelog) para a versão $NEW_VERSION data $(date +'%d/%m/%Y') com base nos commits abaixo.
    Siga estritamente este formato:
    ## <VERSAO> <DATA>
    ### <Categoria (Adicionado, Modificado, Corrigido, etc)>
    - <Descrição simplificada para usuário final>

    Commits:
    $COMMITS

    Regras:
    - Não inclua commits técnicos de merge, ci/cd ou irrelevantes para o usuário final.
    - Agrupe por categorias.
    - Use português do Brasil.
    - Não use blocos de código markdown (\`\`\`) na resposta, apenas o texto formatado."

    echo "Consultando Codex..."
    CHANGELOG_CONTENT=$(codex exec "$PROMPT")
fi

# Adiciona o conteúdo no início do arquivo CHANGELOG.md
echo "Atualizando $CHANGELOG..."
echo -e "$CHANGELOG_CONTENT\n" | cat - "$CHANGELOG" > temp_changelog && mv temp_changelog "$CHANGELOG"

echo "---------------------------------------------------"
echo "Versão $NEW_VERSION gerada com sucesso!"
echo "Verifique os arquivos alterados:"
echo "- $MIGRATION_PATH"
echo "- $APP_JSON"
echo "- $WORKFLOW"
echo "- $CHANGELOG"
