# Testes de Banco de Dados com Pest (Integração)

Este documento define os padrões e práticas para a nova camada de testes de integração que envolvem interação com o Banco de Dados.

## Objetivo
Testar Models, Repositories e interações diretas com o banco de dados (MySQL/MariaDB) e o comportamento do sistema em cenários multi-tenant.

## Estrutura de Diretórios

O sistema possui duas suites de testes de integração distintas, dependendo do contexto do banco de dados:

### 1. Testes de Integração Central (Root)
*   **Diretório**: `back-end/tests/Integration`
*   **Classe Base**: `Tests\DatabaseTestCase`
*   **Suite**: `Integration`
*   **Objetivo**: Testar funcionalidades que operam no banco de dados central (ex: criação de tenants, gestão administrativa global).
*   **Contexto**: O teste inicia no contexto central. Se precisar de um tenant, ele deve ser criado manualmente, mas o foco é o banco principal.

### 2. Testes de Integração do Tenant
*   **Diretório**: `back-end/tests/IntegrationTenant`
*   **Classe Base**: `Tests\DatabaseTenantTestCase`
*   **Suite**: `IntegrationTenant`
*   **Objetivo**: Testar funcionalidades específicas de um tenant (regras de negócio da aplicação).
*   **Contexto**: O teste **já inicia automaticamente dentro de um tenant**. O `DatabaseTenantTestCase` cria um tenant temporário, inicializa a tenância e carrega o schema do tenant.

## Configuração e Uso

### Configuração de Ambiente de Banco de Dados

A configuração de conexão com o banco de dados para os testes define explicitamente o banco de dados como `petrvs_test` no arquivo `phpunit.xml` para garantir que a base de dados principal (`petrvs`) nunca seja apagada acidentalmente. As credenciais de acesso (host, usuário, senha) devem ser fornecidas através de variáveis de ambiente ou arquivo `.env`.

*   **Ambiente Local (Docker)**: O arquivo `.env` deve conter as credenciais corretas. O `phpunit.xml` força o uso de `petrvs_test`.
*   **Ambiente CI (GitHub Actions)**: As variáveis são definidas no workflow (ex: `DB_HOST: 127.0.0.1`), garantindo conexão com o serviço MariaDB do runner.

**Solução de Problemas:**
Se encontrar erros como `php_network_getaddresses: getaddrinfo for petrvs_db failed` (especialmente em CI), verifique se o `phpunit.xml` não está forçando um `DB_HOST` incorreto para o ambiente. A configuração deve vir do ambiente (`.env` ou variáveis de sistema).

### Testes de Tenant (`IntegrationTenant`)

Todos os arquivos criados dentro de `tests/IntegrationTenant` usarão automaticamente a classe base `Tests\DatabaseTenantTestCase` (configurado no `Pest.php`).

**Características:**
*   **Inicialização Automática**: Não é necessário chamar `$this->setupTenant()`. O `setUp` da classe base já cria o tenant e muda o contexto.
*   **Schema Otimizado**: O schema do banco do tenant é carregado a partir de `database/schema/tenant-schema.sql` (gerado via `mysqldump`), o que é muito mais rápido do que rodar todas as migrations.
*   **Isolamento**: Cada teste roda em uma transação no banco do tenant.

**Exemplo:**

```php
// tests/IntegrationTenant/Models/UsuarioTest.php

use App\Models\Usuario;

test('pode criar usuário no contexto do tenant', function () {
    // NÃO precisa chamar setupTenant(), já estamos no tenant.
    
    $usuario = Usuario::create([
        'email' => 'teste@exemplo.com',
        'nome' => 'Teste',
        'cpf' => '00000000000'
    ]);
    
    expect($usuario->exists)->toBeTrue();
    // Verifica no banco do tenant atual
    $this->assertDatabaseHas('usuarios', ['email' => 'teste@exemplo.com']); 
});
```

### Testes Centrais (`Integration`)

Use para testar lógica que não depende de um tenant específico ou que gerencia tenants.

**Exemplo:**

```php
// tests/Integration/TenantCreationTest.php

test('pode criar um novo tenant', function () {
    // Estamos no banco central
    $tenant = App\Models\Tenant::create(['id' => 'novo_tenant']);
    
    $this->assertDatabaseHas('tenants', ['id' => 'novo_tenant']);
});
```

## Executando os Testes

Para rodar os testes de tenant:

```bash
./vendor/bin/pest --testsuite=IntegrationTenant
# ou
docker exec petrvs_php php artisan test tests/IntegrationTenant
```

Para rodar os testes centrais:

```bash
./vendor/bin/pest --testsuite=Integration
```

## Manutenção do Schema do Tenant

Como os testes de tenant usam um arquivo SQL estático (`database/schema/tenant-schema.sql`) para velocidade, **sempre que você criar uma nova migration que altere tabelas do tenant**, você deve regenerar esse arquivo.

**Como regenerar o dump do schema do tenant:**

1.  Garanta que suas migrations estão atualizadas.
2.  Gere um banco temporário e exporte o schema (pode ser feito manualmente ou via script auxiliar se disponível).
3.  O objetivo é ter um dump `no-data` das tabelas do tenant salvo em `back-end/database/schema/tenant-schema.sql`.

*Nota: Atualmente, este processo pode exigir um fluxo manual de criar um tenant, rodar migrations e fazer o dump.*

## Melhores Práticas

1.  **Escolha o Diretório Certo**: 
    *   Regra de negócio do sistema (Usuários, Unidades, Atividades)? -> `tests/IntegrationTenant`.
    *   Infraestrutura do SaaS (Tenants, Domínios)? -> `tests/Integration`.
2.  **Performance**: O `IntegrationTenant` é otimizado. Evite usar `RefreshDatabase` com `migrate:fresh` em cada teste; confie no carregamento do schema e nas transações.
3.  **Factories**: Utilize Model Factories normalmente. Elas respeitarão a conexão atual (tenant ou central).
