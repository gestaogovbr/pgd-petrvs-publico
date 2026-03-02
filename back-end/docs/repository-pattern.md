# Padrão de Repositório no Petrvs-PGD (Camada Eloquent)

## Objetivos

- Isolar o Eloquent da camada de domínio e serviços.
- Padronizar acesso a dados de leitura e escrita (CQRS light).
- Facilitar testes de unidade e integração com Pest.
- Viabilizar otimizações de banco (eager loading, filtros complexos) sem espalhar queries pela aplicação.

## Estrutura Geral

- Repositórios de leitura: responsáveis apenas por consultas.
  - Base: `App\Repository\Eloquent\AbstractEloquentReadRepository`
- Repositórios de escrita: responsáveis por comandos (criar, atualizar, deletar).
  - Base: `App\Repository\Eloquent\AbstractEloquentWriteRepository`
- Repositórios de domínio: implementam regras específicas de agregados.
- Contratos (interfaces): expõem apenas o que o domínio/serviços precisam.
- DTOs: encapsulam retornos estruturados que antes eram arrays associativos.

### Abstrações de Leitura

- Local: `App\Repository\Eloquent\AbstractEloquentReadRepository`
- Responsabilidades:
  - Fornecer operações genéricas de consulta para qualquer `Model` Eloquent.
  - Evitar duplicação de lógica de `where`, `find`, `paginate` etc.
  - Padronizar paginação e critérios de busca.
- Principais métodos:
  - `find(string|int $id): ?Model`
  - `findOneBy(array $criteria): ?Model`
  - `findWhere(array $criteria): Collection`
  - `paginate(int $perPage = DEFAULT_PER_PAGE): LengthAwarePaginator`
- Características:
  - Usa `protected Model $model` injetado pelo repositório concreto.
  - Usa constante `DEFAULT_PER_PAGE` para evitar números mágicos.
  - Exponibiliza um `query()` protegido para extensões específicas.

### Abstrações de Escrita

- Local: `App\Repository\Eloquent\AbstractEloquentWriteRepository`
- Responsabilidades:
  - Fornecer operações genéricas de criação, atualização e remoção.
  - Centralizar a semântica de `create`, `update` por chave primária e `delete`.
- Principais métodos:
  - `create(array $attributes): Model`
  - `update(string|int $id, array $attributes): ?Model`
  - `delete(string|int $id): bool`
- Características:
  - Usa `protected Model $model` injetado pelo repositório concreto.
  - Usa constante `MINIMUM_DELETED_ROWS` para evitar números mágicos em deleção.
  - Não conhece regras de domínio; apenas persiste dados.

### Repositórios Específicos de Domínio

- Seguem o padrão:
  - Implementam um contrato `Contracts\*RepositoryContract`.
  - Dependem das abstrações de leitura/escrita quando faz sentido.
  - Podem expor métodos adicionais que não são genéricos (por exemplo, consultas complexas).
  - Não são injetados diretamente em controllers; consumer principal são serviços.

#### Exemplo: IntegracaoServidor

- Contratos:
  - `App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract`
  - `App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract`
- Implementações Eloquent:
  - `App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository`
  - `App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository`
- Repositório de domínio (fachada):
  - `App\Repository\IntegracaoServidorRepository`
  - Exemplo completo:

    ```php
    <?php

    declare(strict_types=1);

    namespace App\Repository;

    use App\Models\IntegracaoServidor;
    use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
    use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;

    class IntegracaoServidorRepository
    {
        public function __construct(
            private readonly IntegracaoServidorReadRepositoryContract $readRepository,
            private readonly IntegracaoServidorWriteRepositoryContract $writeRepository,
        ) {
        }

        public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor
        {
            return $this->readRepository->getServidor($cpf, $matricula);
        }

        public function save(IntegracaoServidor $entidade): bool
        {
            return $this->writeRepository->save($entidade);
        }

        /**
         * @param array<string, mixed> $data
         */
        public function update(string $cpf, string $matricula, array $data): bool
        {
            return $this->writeRepository->updateByCpfAndMatricula($cpf, $matricula, $data);
        }
    }
    ```

- Padrões aplicados:
  - Implementações de leitura estendem `AbstractEloquentReadRepository`.
  - Implementações de escrita estendem `AbstractEloquentWriteRepository`.
  - O repositório de domínio injeta contratos de leitura/escrita no construtor (DIP).
  - Métodos de domínio específicos são nomeados de forma expressiva:
    - `updateByCpfAndMatricula(string $cpf, string $matricula, array $data): bool`
  - Contratos são registrados no `RepositoryServiceProvider` para permitir injeção por interface.

#### Exemplo: PlanoTrabalhoConsolidacao (repository legado refatorado)

- Repositório:
  - Local: `App\Repository\PlanoTrabalhoConsolidacaoRepository`
  - Foco: consultas específicas de consolidação (sem CRUD genérico).
  - Padrão aplicado:
    - Extração de DTO para retorno estruturado.
    - Assinaturas tipadas para evitar uso de arrays soltos.
- DTO principal:
  - `App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO`
    - Campos:
      - `planoTrabalho`: `PlanoTrabalho|null`
      - `programa`: mixed (modelo de programa)
      - `planosEntregas`: `Collection`
      - `atividades`: `Collection`
      - `afastamentos`: `Collection`
      - `ocorrencias`: `Collection`
      - `comparecimentos`: `Collection`
      - `status`: `string`
      - `justificativaConclusao`: `?string`
      - `consolidacao`: `PlanoTrabalhoConsolidacao`
- Métodos:
  - `getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO`
    - Antes: retornava `array` com múltiplas chaves.
    - Agora: retorna um DTO fortemente tipado.
    - Implementa:
      - Cálculo de `concluido` com base em `StatusEnum::CONCLUIDO` e `StatusEnum::AVALIADO`.
      - Busca de `planosEntregas` através dos IDs da relação.
      - Carregamento de coleções de `atividades`, `afastamentos`, `ocorrencias`, `comparecimentos`.
  - `findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao`
    - Retorna a consolidação com todas as relações necessárias para o caso de uso.
  - Métodos privados especializados:
    - `getAtividades(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection`
    - `getAfastamentos(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection`
    - `getOcorrencias(PlanoTrabalhoConsolidacao $consolidacao, bool $concluido): Collection`

## Uso de DTOs em vez de Arrays

- Motivação:
  - Evitar "string keys" frágeis (`$dados['atividades']`, `$dados['status']`).
  - Facilitar refactors, autocomplete e navegação de código.
  - Garantir contratos estáveis entre repositórios e serviços.

- Padrão:
  - Sempre que um repositório retornar uma estrutura composta (vários campos, múltiplas coleções), encapsular em um DTO.
  - DTOs ficam em `App\DTOs\*` ou subpastas específicas (`App\DTOs\PlanoTrabalho`).
  - DTOs podem ser:
    - Objetos simples com propriedades públicas.
    - Objetos imutáveis com `public readonly` no construtor.

- Exemplo concreto:
  - Antes: `PlanoTrabalhoConsolidacaoRepository::getConsolidacaoData($id): array`
  - Depois: `PlanoTrabalhoConsolidacaoRepository::getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO`

## Integração com Serviços

- Serviços de domínio consomem repositórios e DTOs.
- Exemplo: `PlanoTrabalhoConsolidacaoService::consolidacaoDados`:
  - Obtém `PlanoTrabalhoConsolidacaoDataDTO` via repositório.
  - Usa `PlanoTrabalhoConsolidacaoRebuildService` para reconstruir snapshots de coleções.
  - Monta o array de saída para o controller a partir do DTO.
- Comportamento em caso de ausência de dados:
  - Se o repositório retorna `null`, o serviço lança exceção de domínio apropriada (por exemplo `RuntimeException` ou `ServerException`), que é tratada no controller.

## Integração com Pest e Testes de Banco (pest-bd)

- Repositórios que acessam banco devem ser testados como:
  - Testes de unidade que isolam lógica de composição de DTOs (opcional).
  - Testes de integração (IntegrationTenant / Integration) conforme `docs/pest-bd.md`.

- Padrões aplicados:
  - `tests/Unit/Repository/PlanoTrabalhoConsolidacaoRepositoryTest.php`
    - Testa:
      - `findConsolidacaoById` retorna modelo correto ou `null`.
      - `getConsolidacaoData` retorna `PlanoTrabalhoConsolidacaoDataDTO`.
      - Filtros de atividades, afastamentos e ocorrências por período.
      - Comportamento quando consolidação não existe.
  - `tests/Feature/Service/PlanoTrabalhoConsolicaoServiceTest.php`
    - Testa:
      - `consolidacaoDados` retorna estrutura completa esperada.
      - `consolidacaoDados` lança exceção quando não encontra consolidação.

- Relação com `docs/pest-bd.md`:
  - Testes que envolvem multi-tenant ou regras de negócio usam `IntegrationTenant`.
  - Testes de repositório podem ser `Unit` com acesso direto ao DB usando a infraestrutura de teste já configurada.
  - Asserts seguem padrão Pest:
    - `expect($resultado)->toBeInstanceOf(...)`
    - `expect($resultado->atividades)->toHaveCount(1)`
    - `expect($resultado->status)->toBe(StatusEnum::CONCLUIDO->value)`

## SOLID e Boas Práticas

- SRP (Responsabilidade Única):
  - Abstrações de leitura/escrita não conhecem regras de negócio.
  - Repositórios de domínio focam na composição de consultas para um agregado.
  - Serviços orquestram uso de repositórios, DTOs e regras adicionais.

- OCP (Aberto/Fechado):
  - Novas consultas específicas podem ser adicionadas em repositórios concretos sem alterar as abstrações base.
  - DTOs podem ser estendidos (novos campos) sem quebrar quem depende de propriedades existentes.

- LSP (Substituição de Liskov):
  - Implementações concretas honram os contratos de repositório.
  - Métodos genéricos (`create`, `update`, `delete`) mantêm assinaturas consistentes.

- ISP (Segregação de Interfaces):
  - Contratos de repositório expõem apenas os métodos necessários.
  - Não há obrigatoriedade de implementar métodos que não fazem sentido para certo agregado.

- DIP (Inversão de Dependência):
  - Serviços dependem de interfaces (`*RepositoryContract`) e não de implementações específicas.
  - Implementações são registradas via Service Provider.

## Diretrizes para Novos Repositórios

- Criar contrato em `App\Repository\<Modulo>\Contracts\*RepositoryContract`.
- Implementar repositório Eloquent em `App\Repository\<Modulo>\Eloquent\*Repository`.
- Quando for leitura genérica:
  - Estender `AbstractEloquentReadRepository`.
- Quando for escrita genérica:
  - Estender `AbstractEloquentWriteRepository`.
- Para retornos complexos:
  - Criar DTO em `App\DTOs\<Modulo>\*DTO`.
  - Evitar retornar arrays associativos com múltiplas chaves sem tipagem.
- Criar repositório de domínio (fachada) em `App\Repository\<Modulo>Repository` quando fizer sentido:
  - Injetar os contratos de leitura/escrita no construtor.
  - Expor apenas métodos de domínio (por exemplo: `getServidor`, `updateByCpfAndMatricula`).
- Incluir testes (ver `docs/pest-bd.md`):
  - Unitário em `tests/Unit/Repository` para validar a lógica específica do repositório.
  - Integração em `tests/IntegrationTenant/Repository` quando envolver regras de negócio no contexto do tenant.
  - Utilizar as suites e classes base descritas em `docs/pest-bd.md` (`Integration` e `IntegrationTenant`) para configurar corretamente o contexto de banco.
