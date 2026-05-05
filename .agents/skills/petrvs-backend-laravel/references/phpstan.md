# Referência PHPStan Petrvs

Doc principal: `back-end/docs/phpstan.md`.

## Configuração Atual

- Arquivo de configuração: `back-end/phpstan.neon.dist`.
- Extensão: `vendor/larastan/larastan/extension.neon`.
- Paths padrão: `app`.
- Nível: `3`.
- Diretório temporário: `storage/framework/phpstan`.
- `treatPhpDocTypesAsCertain: false`.
- Paralelismo é intencionalmente conservador.

## Comandos

```bash
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/ExampleService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Repository --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

## Diretrizes De Correção

- Prefira correções reais de tipo em vez de suppressions.
- Adicione tipos nativos de parâmetro e retorno quando compatível.
- Use sintaxe PHPDoc válida, com tipos nas tags e descrições em texto.
- Inicialize variáveis antes de uso condicional.
- Remova imports não usados e captures não usados em closures.
- Evite chaves duplicadas em arrays de regras de validação.
- Para avisos de existência de relation Eloquent, confirme primeiro que a relation existe no model. Depois considere tipos/PHPDocs de retorno da relation ou simplificação das expressões de query.
- Não mude comportamento apenas para satisfazer PHPStan, salvo quando o achado for bug real.

## Verificação

- Rode PHPStan no path alterado.
- Se mudar tipo compartilhado, relation de model, repository base ou provider, rode um escopo relacionado mais amplo.
- Para trabalho em Services, use `app/Services` ou o arquivo de service específico conforme o risco.
