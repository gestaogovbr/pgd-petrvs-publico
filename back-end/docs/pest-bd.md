# Testes de Banco de Dados com Pest (Integração)

Este documento define os padrões e práticas para a nova camada de testes de integração que envolvem interação com o Banco de Dados.

## Objetivo
Testar Models, Repositories e interações diretas com o banco de dados (MySQL/MariaDB) e o comportamento do sistema em cenários multi-tenant.

## Estrutura
- **Diretório**: `back-end/tests/Integration`
- **Classe Base**: `Tests\DatabaseTestCase`
- **Suite**: `Integration`

## Configuração

### 1. Classe Base (`DatabaseTestCase`)
Todos os testes nesta camada devem usar a classe base `Tests\DatabaseTestCase` (configurado automaticamente no `Pest.php` para arquivos na pasta `Integration`).

Esta classe utiliza a trait `RefreshDatabase`, garantindo que:
- O banco de dados seja migrado antes dos testes.
- Cada teste rode dentro de uma transação (ou limpe os dados), garantindo isolamento.

### 2. Tenancy (Multi-inquilino)
O sistema utiliza `stancl/tenancy`. Para testes que dependem de um tenant ativo (maioria dos casos de negócio), utilize o método helper `setupTenant()`:

```php
test('exemplo com tenant', function () {
    // Cria um tenant, inicializa a tenância e troca a conexão do DB
    $tenant = $this->setupTenant(); 
    
    // A partir daqui, operações no DB ocorrem no contexto do tenant
    $user = User::factory()->create();
    
    expect($user->exists)->toBeTrue();
});
```

### 3. Executando os Testes

Para rodar apenas a suite de integração:

```bash
./vendor/bin/pest --testsuite=Integration
```

Para rodar um arquivo específico:

```bash
./vendor/bin/pest tests/Integration/ExampleDatabaseTest.php
```

## CI/CD (GitHub Actions)

No ambiente de CI (GitHub Actions), os testes rodam contra um container **MySQL 8.0**.
- O workflow garante que um serviço MySQL esteja disponível.
- As variáveis de ambiente `DB_CONNECTION`, `DB_HOST`, etc., são injetadas automaticamente.
- **Snapshot**: O Laravel utiliza o esquema atual para recriar o banco rapidamente. Mantenha o arquivo de schema atualizado (`php artisan schema:dump`) se houver muitas migrations antigas.

## Melhores Práticas

1.  **Não use em Testes Unitários**: Testes em `tests/Unit` **NÃO** devem tocar no banco. Use Mocks.
2.  **Isolamento**: Confie no `RefreshDatabase` para limpar o estado. Não dependa de dados criados em outros testes.
3.  **Factories**: Utilize Model Factories (`User::factory()`) sempre que possível para criar dados de teste.
4.  **Tenancy**: Se o teste for sobre criar um Tenant (fluxo administrativo), não use `setupTenant()`. Se for sobre funcionalidade interna do sistema (fluxo do usuário), use `setupTenant()`.

## Exemplo Completo

```php
<?php

namespace Tests\Integration;

use Tests\DatabaseTestCase;
use App\Models\User;

// A classe base é injetada automaticamente pelo Pest.php
// uses(DatabaseTestCase::class); 

test('pode criar usuário no tenant', function () {
    $tenant = $this->setupTenant();
    
    $user = User::create([
        'email' => 'teste@exemplo.com',
        'nome' => 'Teste',
        'password' => 'password',
        'cpf' => '00000000000'
    ]);
    
    $this->assertDatabaseHas('users', [
        'email' => 'teste@exemplo.com'
    ]);
});
```
