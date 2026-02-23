# PHPStan no back-end (Laravel)

Este documento descreve as boas práticas, configuração e execução do PHPStan para o back-end Laravel do projeto, sempre dentro do container `petrvs_php`.

## Objetivo

- Detectar problemas estáticos de código com entendimento do ecossistema Laravel.
- Integrar análise ao fluxo local (container) e ao CI.

## Boas práticas recomendadas

- Usar o [Larastan](https://github.com/nunomaduro/larastan), extensão oficial do PHPStan para Laravel.
- Carregar o autoloader do Composer durante a análise (`bootstrapFiles: vendor/autoload.php`).
- Centralizar a configuração em `back-end/phpstan.neon.dist`.
- Manter o nível pragmático (iniciar em `level: 3` e evoluir gradualmente).
- Excluir caminhos gerados ou de terceiros quando necessário (`excludePaths`).
- Rodar com memória apropriada (`--memory-limit=1G`) para evitar interrupções.

## Configuração utilizada

Arquivo: `back-end/phpstan.neon.dist`

```neon
includes:
    - vendor/nunomaduro/larastan/extension.neon

parameters:
    paths:
        - app
    tmpDir: storage/framework/phpstan
    level: 3
    treatPhpDocTypesAsCertain: false
    bootstrapFiles:
        - vendor/autoload.php
```

## Execução dentro do container

Todas as execuções devem ocorrer dentro do container `petrvs_php`.

### Opção A: Via Composer (recomendado)

Instale as dependências de desenvolvimento (uma única vez):

```bash
docker exec petrvs_php sh -lc "composer install --no-interaction"
docker exec petrvs_php sh -lc "composer require --dev nunomaduro/larastan:^2.9 phpstan/phpstan:^1.11"
```

Rode a análise:

```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G"
```

Se ocorrerem erros de timeout ou processos mortos (exit code 137), tente:

```bash
# Reduzir paralelismo e aumentar timeout (já configurado em phpstan.neon.dist):
# parameters.parallel.maximumNumberOfProcesses: 2
# parameters.parallel.processTimeout: 1800

# Ajustar memória de execução
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=512M --no-progress"

Observação: `parameters.parallel.processTimeout` deve ser float no `phpstan.neon.dist` (ex.: `1800.0`) para evitar erro de tipo.
```

### Opção B: Via PHAR (alternativa quando não se deseja alterar o Composer)

```bash
docker exec petrvs_php sh -lc "curl -L https://github.com/phpstan/phpstan/releases/latest/download/phpstan.phar -o phpstan.phar"
docker exec petrvs_php sh -lc "php phpstan.phar analyse app --configuration=phpstan.neon.dist --memory-limit=1G"
```

## Evolução do nível

- Comece em `level: 3` para detectar problemas relevantes sem excesso de falsos positivos.
- Após estabilizar a base, aumente gradualmente para `level: 4/5/6`.
- Ao elevar o nível, trate findings estruturais (tipos, nullability, contratos) e adicione exceções pontuais apenas quando indispensável.

## Integração com CI

- Preferencialmente rodar `vendor/bin/phpstan` com Larastan no CI.
- Evite baixar o PHAR via `curl` em cada execução; use dependências do Composer com cache.
- Mantenha o workflow separado para análise (ex.: `.github/workflows/phpstan.yml`), com triggers alinhados às branches de desenvolvimento/homologação.

## Comandos úteis

```bash
# Executar análise completa
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G"

# Executar análise em arquivo/pasta específica
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Models --configuration=phpstan.neon.dist --memory-limit=1G"

# Verificar versão
docker exec petrvs_php sh -lc "vendor/bin/phpstan --version"
```
