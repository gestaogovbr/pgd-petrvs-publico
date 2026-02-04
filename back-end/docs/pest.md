# Testes com Pest e Mockery

Este guia rápido mostra como configurar e executar testes unitários com Pest no container PHP, incluindo o uso de Mockery.

## Pré-requisitos
- Container `petrvs_php` rodando e com o projeto montado em `/var/www`.
- Dependências instaladas via Composer dentro do container.

## Instalar dependências (apenas se necessário)
Execute dentro do container:

```
docker exec petrvs_php bash -lc "cd /var/www && composer install --no-interaction --prefer-dist"
```

## Executar todos os testes Pest

```
docker exec petrvs_php bash -lc "cd /var/www && ./vendor/bin/pest --ci"
```

## Executar um arquivo de teste específico

```
docker exec petrvs_php bash -lc "cd /var/www && ./vendor/bin/pest tests/Unit/BasicoPestTest.php"
```

## Estrutura dos testes
- Arquivos Pest em `back-end/tests/Unit` e `back-end/tests/Feature`.
- Configuração global em `back-end/tests/Pest.php`.

## Regras de Mocking e Banco de Dados (IMPORTANTE)
1. **Zero Interação com Banco de Dados**: Testes unitários devem usar Mocks para todas as operações de banco.
2. **Não Modifique Migrations**: A estrutura do banco deve ser assumida ou simulada, nunca alterada pelos testes unitários.
3. **Padrão de Mocking**: Use `Mockery` para simular Models e Facades.

### Exemplo do Padrão Adotado (Service com Partial Mock e Models Mockados)

```php
use App\Services\ExemploService;
use App\Models\Usuario;
use Illuminate\Support\Facades\Log;

// Garante limpeza dos mocks após cada teste
afterEach(function () {
    Mockery::close();
});

it('executa lógica sem tocar no banco de dados', function () {
    // 1. Mock de Facades (Logs, etc)
    Log::shouldReceive('info')->withAnyArgs();

    // 2. Mock de Models (com suporte a métodos mágicos do Eloquent se necessário)
    $mockUsuario = Mockery::mock(Usuario::class);
    $mockUsuario->shouldReceive('getAttribute')->with('nome')->andReturn('Teste');
    
    // 3. Service com Partial Mock para interceptar criação de models (Dependency Injection via método)
    $service = Mockery::mock(ExemploService::class)->makePartial();
    $service->shouldAllowMockingProtectedMethods();
    
    // Intercepta o método que instancia o Model (ex: getModelInstance)
    $service->shouldReceive('getModelInstance')
        ->with(Usuario::class)
        ->andReturn($mockUsuario);

    // Execução do método testado
    $resultado = $service->metodoTestado();
    
    expect($resultado)->toBeTrue();
});
```

## Dicas
- Mantenha `Mockery::close()` no `afterEach` para limpar mocks.
- Use `expect()->...` para assertions fluídas do Pest.

## Cobertura de código (XML)
- Requer Xdebug com modo `coverage` ativado.
- Executar sempre dentro do container `petrvs_php`.

Gerar cobertura em formato Clover XML em `app/coverage/cov.xml`:

```
docker exec petrvs_php bash -lc "cd /var/www && XDEBUG_MODE=coverage ./vendor/bin/pest --ci --coverage-clover app/coverage/cov.xml"
```

- A saída será um arquivo `cov.xml` dentro de `back-end/app/coverage`.
- Caso queira limitar aos testes unitários para evitar falhas de testes de features bloquearem a geração do XML:

```
docker exec petrvs_php bash -lc "cd /var/www && XDEBUG_MODE=coverage ./vendor/bin/pest --ci --coverage-clover app/coverage/cov.xml tests/Unit"
```

- Se aparecer o aviso para ativar cobertura, garanta que a variável `XDEBUG_MODE=coverage` está presente no comando acima.

Observação: a pasta `app/coverage` não conterá HTML; o conteúdo agora é o `cov.xml` para integração com ferramentas de CI.

## CI: Execução automática em Pull Requests
- O workflow `.github/workflows/pest.yml` executa testes em PRs para `dataprev_dsv` e `dataprev_hmg`.
- Em caso de falha, o PR ficará vermelho e não deve ser mesclado até a correção dos testes.