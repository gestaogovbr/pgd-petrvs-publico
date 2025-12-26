#!/bin/bash

# Script para gerar HOTFIX do PETRVS-PGD
# Uso: ./hotfix.sh <nova_versao>
# Exemplo: ./hotfix.sh 2.5.1

set -e

# Configuração de Log
LOG_FILE="hotfix_$(date +'%Y_%m_%d_%H%M%S').log"
exec > >(tee -a "$LOG_FILE") 2>&1

if [ -z "$1" ]; then
    echo "Uso: $0 <nova_versao>"
    exit 1
fi

NEW_VERSION=$1
PROJECT_ROOT=$(pwd)
APP_JSON="back-end/public/app.json"
WORKFLOW=".github/workflows/main.yml"
CHANGELOG="CHANGELOG.md"

# Mecanismo de Rollback
echo "Iniciando backups para rollback..."
cp "$APP_JSON" "${APP_JSON}.bak" 2>/dev/null || true
cp "$WORKFLOW" "${WORKFLOW}.bak" 2>/dev/null || true
cp "$CHANGELOG" "${CHANGELOG}.bak" 2>/dev/null || true

rollback() {
    echo "!!! ERRO DETECTADO. INICIANDO ROLLBACK !!!"
    if [ -f "${APP_JSON}.bak" ]; then mv "${APP_JSON}.bak" "$APP_JSON"; fi
    if [ -f "${WORKFLOW}.bak" ]; then mv "${WORKFLOW}.bak" "$WORKFLOW"; fi
    if [ -f "${CHANGELOG}.bak" ]; then mv "${CHANGELOG}.bak" "$CHANGELOG"; fi
    # Remover migração se tiver sido criada (variável global)
    if [ -n "$MIGRATION_PATH" ] && [ -f "$MIGRATION_PATH" ]; then
        rm "$MIGRATION_PATH"
    fi
    echo "Rollback concluído. Verifique o log: $LOG_FILE"
}

trap 'rollback' ERR

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
echo "Versão Hotfix: $NEW_VERSION"

if [ "$CURRENT_VERSION" == "$NEW_VERSION" ]; then
    echo "A versão já é $NEW_VERSION. Abortando."
    exit 1
fi

# 2. Criar Migration
echo "Criando migração de hotfix..."
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
sed -i "s/DOCKER_HUB_TAG_NEW: $CURRENT_VERSION/DOCKER_HUB_TAG_NEW: $NEW_VERSION/" "$WORKFLOW"


# 5. Gerar Changelog com Codex
echo "Gerando Changelog de Hotfix..."

# Identifica commits críticos (hotfix, fix, critical, bug)
if git rev-parse "$CURRENT_VERSION" >/dev/null 2>&1; then
    echo "Analisando commits desde a tag $CURRENT_VERSION..."
    # Filtra commits que parecem ser correções
    COMMITS=$(git log "$CURRENT_VERSION"..HEAD --grep="fix" --grep="hotfix" --grep="bug" --grep="critical" -i --pretty=format:"- %s")
    
    # Se não achar nada específico, pega tudo (pode ser um hotfix sem prefixo)
    if [ -z "$COMMITS" ]; then
        echo "Nenhum commit com tag de fix encontrado, usando todos os commits desde $CURRENT_VERSION..."
        COMMITS=$(git log "$CURRENT_VERSION"..HEAD --pretty=format:"- %s")
    fi
else
    echo "Tag $CURRENT_VERSION não encontrada. Usando últimos 10 commits..."
    COMMITS=$(git log -n 10 --pretty=format:"- %s")
fi

if [ -z "$COMMITS" ]; then
    echo "Nenhum commit encontrado para gerar o changelog."
    CHANGELOG_CONTENT="## $NEW_VERSION $(date +'%d/%m/%Y')\n\n- Correções de segurança e bugs críticos."
else
    PROMPT="Gere as notas de versão (changelog) para o HOTFIX versão $NEW_VERSION data $(date +'%d/%m/%Y') com base nos commits abaixo.
    Siga estritamente este formato:
    ## <VERSAO> <DATA>
    ### Correções Críticas
    - <Descrição simplificada para usuário final>

    Commits:
    $COMMITS

    Regras:
    - Foque apenas nas correções e impactos críticos.
    - Ignore commits de CI/CD ou formatação.
    - Use português do Brasil.
    - Não use blocos de código markdown (\`\`\`) na resposta."

    echo "Consultando Codex..."
    CHANGELOG_CONTENT=$(codex exec "$PROMPT")
fi

# Adiciona o conteúdo no início do arquivo CHANGELOG.md
echo "Atualizando $CHANGELOG..."
echo -e "$CHANGELOG_CONTENT\n" | cat - "$CHANGELOG" > temp_changelog && mv temp_changelog "$CHANGELOG"

# 6. Validação e Empacotamento (Específico de Hotfix)
echo "Identificando arquivos alterados para pacote..."

# Tenta definir a base de comparação
if git rev-parse "$CURRENT_VERSION" >/dev/null 2>&1; then
    BASE_REF="$CURRENT_VERSION"
else
    echo "Aviso: Tag $CURRENT_VERSION não encontrada."
    # Tenta encontrar a última tag disponível
    LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    if [ -n "$LAST_TAG" ]; then
        echo "Usando última tag disponível ($LAST_TAG) como base de comparação..."
        BASE_REF="$LAST_TAG"
    else
        echo "Nenhuma tag encontrada. Usando o último commit como base..."
        BASE_REF="HEAD~1"
    fi
fi

CHANGED_FILES=$(git diff --name-only "$BASE_REF" HEAD)

if [ -z "$CHANGED_FILES" ]; then
    echo "Aviso: Nenhuma alteração de arquivo detectada git diff."
else
    echo "Validando arquivos críticos..."
    for file in $CHANGED_FILES; do
        if [[ $file == *.php ]]; then
            if [ -f "$file" ]; then
                # Validação de sintaxe PHP
                php -l "$file" > /dev/null || { echo "Erro de sintaxe em $file"; exit 1; }
            fi
        fi
    done

    PACKAGE_NAME="hotfix-${NEW_VERSION}.tar.gz"
    echo "Gerando pacote $PACKAGE_NAME com alterações..."
    # Cria o tar apenas com os arquivos alterados
    tar -czf "$PACKAGE_NAME" $CHANGED_FILES
    echo "Pacote gerado: $PACKAGE_NAME"
fi

# Limpeza de backups (Sucesso)
rm "${APP_JSON}.bak" "${WORKFLOW}.bak" "${CHANGELOG}.bak" 2>/dev/null || true
trap - ERR

echo "---------------------------------------------------"
echo "HOTFIX $NEW_VERSION gerado com sucesso!"
echo "Log da operação: $LOG_FILE"
echo "Verifique os arquivos alterados:"
echo "- $MIGRATION_PATH"
echo "- $APP_JSON"
echo "- $WORKFLOW"
echo "- $CHANGELOG"
if [ -n "$PACKAGE_NAME" ]; then
    echo "- $PACKAGE_NAME (Pacote de atualização)"
fi
