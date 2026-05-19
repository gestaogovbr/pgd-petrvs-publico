# Relatório de Análise Estática (PHPStan) — app/Services

Este documento consolida os problemas identificados pelo PHPStan ao analisar `app/Services`, com categorização por severidade e tipo, propostas de correção e plano de execução por etapas. Todas as execuções foram feitas dentro do container `petrvs_php`.

## Comando executado

```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

Para extração estruturada dos achados, também foi usado:

```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services --configuration=phpstan.neon.dist --memory-limit=1G --no-progress --error-format=json"
```

---

## Sumário dos problemas por tipo e severidade (estado atual)

- Alto
  - Relação Eloquent não encontrada (larastan.relationExistence)  
    Impacto potencial: falhas em runtime ao acessar relações não definidas ou nomeadas incorretamente.
- Observação
  - Problemas anteriores em `UsuarioService`, `UtilService` e validadores (`property.notFound`, `variable.undefined`, `array.duplicateKey`, `phpDoc.parseError`, `closure.unusedUse`) foram corrigidos e não aparecem mais na última execução.

---

## Lista detalhada de problemas (por arquivo)

### 1) UsuarioService.php (estado atual)
- Localização
  - [UsuarioService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php)  
    Tipo: larastan.relationExistence  
    Descrição: a última execução do PHPStan/Larastan ainda aponta problemas de existência de relações Eloquent usadas neste service, principalmente:
    - Relação `progressos` em `App\Models\PlanoEntregaEntrega`.
    - Relações `latestStatus` e `unidade` em `App\Models\PlanoEntrega`.
    Essas relações existem nos models, mas continuam sendo apontadas pelo Larastan, possivelmente por limitações de análise em cadeias mais complexas (uso combinado de `with`, `has`, `whereHas`, etc.).
    Solução proposta:
    - Validar manualmente as relações utilizadas nas consultas (já existem em [PlanoEntrega.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Models/PlanoEntrega.php) e [PlanoEntregaEntrega.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Models/PlanoEntregaEntrega.php)).
    - Caso necessário, adicionar PHPDocs nas relações para auxiliar o Larastan ou simplificar algumas expressões de query para facilitar a análise estática.
    Prioridade: Alto (impacto em consultas complexas, embora os métodos já existam nos models).

### 2) UtilService.php
- Situação
  - Problemas anteriores de variáveis não definidas (`$fisrt`) e PHPDocs inválidos foram corrigidos.
  - A última execução em `app/Services` não retorna erros para este arquivo.
  - Prioridade atual: Nenhuma ação pendente.

### 3) Validador/CatalogoValidador.php
- Situação
  - A chave duplicada `'data_inicio'` no array de regras foi removida em [CatalogoValidador.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Validador/CatalogoValidador.php).
  - Não há erros atuais reportados pelo PHPStan neste validador.

### 4) Validador/ProdutoClienteValidador.php
- Situação
  - A variável `$validator` passou a ser criada dentro do loop e o método agora acumula os resultados em um array `$validated`, retornando apenas dados validados.
  - Os avisos de `variable.undefined` foram eliminados.
  - Não há erros atuais reportados pelo PHPStan neste arquivo.

### 5) Validador/ProdutoInsumoValidation.php
- Situação
  - O uso da variável `$id` nas closures foi ajustado e o retorno passou a ser um array `$validated` com os dados validados de cada insumo.
  - Os avisos de `closure.unusedUse` e `variable.undefined` foram eliminados.
  - Não há erros atuais reportados pelo PHPStan neste arquivo.

### 6) Validador/ProdutoProcessoCadeiaValorValidation.php
- Situação
  - O fluxo de validação foi ajustado para acumular os resultados em `$validated`, garantindo que `$validator` exista apenas dentro do escopo da iteração.
  - Os avisos de `variable.undefined` foram eliminados.
  - Não há erros atuais reportados pelo PHPStan neste arquivo.

### 7) Validador/ProdutoSolucaoValidador.php
- Situação
  - A validação foi ajustada para acumular as soluções validadas em `$validated`, evitando uso de `$validator` fora do escopo.
  - Os avisos de `variable.undefined` foram eliminados.
  - Não há erros atuais reportados pelo PHPStan neste arquivo.

### 8) Relações Eloquent em Models (impactando app/Services)

Embora o foco deste relatório seja `app/Services`, a última execução em JSON ainda aponta avisos de `larastan.relationExistence` envolvendo models consumidos pelos services:

- `App\Models\Unidade`
  - Relações usadas: `gestores`, `gestoresDelegados`, `gestoresSubstitutos`.
  - Essas relações são indiretas, utilizando `has('gestor')`, `has('gestorSubstituto')`, etc., sobre `UnidadeIntegrante`, o que pode dificultar a análise do Larastan.
- `App\Models\PlanoTrabalhoConsolidacao`
  - Relações usadas: `latestStatus`, `planoTrabalho`.
- `App\Models\PlanoTrabalho`
  - Relações usadas: `unidade`, `usuario`.
- `App\Models\PlanoEntregaEntrega`
  - Relações usadas: `planoEntrega`, `progressos`.
- `App\Models\PlanoEntrega`
  - Relações usadas: `latestStatus`, `unidade`.

Em todos esses casos, os métodos de relação existem nos models, mas ainda assim são reportados.

Solução proposta:
- Revisar, em uma etapa específica focada em models, se há:
  - Inconsistências de namespace ou nomes de classes nas relações.
  - Cadeias de chamadas muito complexas que confundem o Larastan.
- Se necessário, adicionar PHPDocs nas relações com tipos explícitos de retorno para melhorar a inferência de tipos.

---

## Plano de execução por etapas

- Fase 1 — Críticos (falhas de runtime)
  - Declarar e injetar `integracaoService` em `UsuarioService`.  
    Comando de verificação:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/UsuarioService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```
- Fase 2 — Tipagem que afeta integridade de dados
  - Corrigir relações ausentes em `PlanoEntrega` e `PlanoEntregaEntrega` (métodos `latestStatus`, `unidade`, `progressos`).  
    Comando:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/UsuarioService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```
  - Remover chaves duplicadas em `CatalogoValidador`.  
    Comando:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/Validador/CatalogoValidador.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```
- Fase 3 — Melhorias de tipagem e robustez
  - Inicializar `$validator` em todos validadores onde é usado.  
    Comando:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/Validador --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```
  - Corrigir variáveis não definidas (`$fisrt` → `$first`) e ajustes em `UtilService`.  
    Comando:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/UtilService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```
- Fase 4 — Otimizações e ajustes finos
  - Corrigir PHPDocs inválidos (tipos corretos em `@param` e `@return`), remover `use` não utilizado em closures.  
    Comando:
    ```bash
    docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
    ```

Após cada fase, reexecutar o escopo completo de `app/Services` para confirmar redução dos erros:

```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

---

## Boas práticas para prevenir futuros problemas

- Tipagem e contratos
  - Usar tipos nativos (return types e param types) sempre que possível.
  - Em relações Eloquent, declarar métodos de relação corretamente (`hasOne`, `hasMany`, `belongsTo`, etc.) com nomes consistentes ao uso nos services.
  - Evitar variáveis não inicializadas; sempre atribuir valor padrão (`$var = null`) antes do uso.
- PHPDoc
  - `@param` e `@return` devem conter tipos válidos (`string`, `int`, `float`, `\DateTimeInterface`, `Carbon\Carbon`, etc.), não descrições com `:`.
  - Mover descrição para o corpo do DocBlock, mantendo tags com tipos puros.
- Validação
  - Em validadores, garantir inicialização de `$validator` (`Validator::make(...)`) e uso consistente.
  - Evitar chaves duplicadas em arrays de regras ou mensagens.
- Organização
  - Preferir injeção de dependência via construtor em services, evitando propriedades não declaradas.
  - Manter nomes de relações e métodos coerentes e revisados (checklist em code review).
- Execução
  - Rodar `composer dump-autoload -o` antes de análises para reduzir consumo de memória.
  - Manter `phpstan.neon.dist` com `bootstrapFiles: vendor/autoload.php` e Larastan incluído.
  - Ajustar paralelismo e timeout em `parameters.parallel` conforme limite do container.

---

## Comandos de verificação globais

- Reexecutar análise de `app/Services`:
```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```
- Verificar um arquivo específico após correção:
```bash
docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app/Services/UtilService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```
