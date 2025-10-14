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

## Usando Mockery
Exemplo básico (já incluso):

```php
interface BasicoMockInterface {
    public function metodo(string $x): string;
}

it('usa Mockery para mock simples', function () {
    $mock = Mockery::mock(BasicoMockInterface::class);
    $mock->shouldReceive('metodo')->with('x')->andReturn('ok');
    expect($mock->metodo('x'))->toBe('ok');
});

afterEach(function () {
    Mockery::close();
});
```

## Dicas
- Mantenha `Mockery::close()` no `afterEach` para limpar mocks.
- Use `expect()->...` para assertions fluídas do Pest.

## Cobertura de código (HTML)
- Requer Xdebug com modo `coverage` ativado.
- Executar sempre dentro do container `petrvs_php`.

Gerar cobertura em `app/coverage`:

```
docker exec petrvs_php bash -lc "cd /var/www && XDEBUG_MODE=coverage ./vendor/bin/pest --ci --coverage-html app/coverage"
```

- Após rodar, abra `back-end/app/coverage/index.html` (ou `dashboard.html`) no navegador.
- Se aparecer o aviso para ativar cobertura, garanta que a variável `XDEBUG_MODE=coverage` está presente no comando acima.

## CI: Execução automática em Pull Requests
- O workflow `.github/workflows/pest.yml` executa testes em PRs para `dataprev_dsv` e `dataprev_hmg`.
- Em caso de falha, o PR ficará vermelho e não deve ser mesclado até a correção dos testes.