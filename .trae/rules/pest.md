Sempre que um arquivo for criado/modificado, deve ser fazer os testes unitários correspondentes, utilize o documento `back-end/docs/pest.md` e `back-end/docs/pest-bd.md` como referência.
Desconsidere para arquivos do tipo Controllers, pois são responsáveis por receber as requisições e retornar as respostas, não contêm lógica de negócio.
Valido para alterações na pasta `back-end/`	
Não modifique as regras do pest no sistema

### Padrões de teste
- Usar `test()` ao invés de `it()` nas descrições dos testes
- NÃO usar `Mockery::mock('overload:')` — causa poluição entre testes na mesma suite
- Para mockar Eloquent Models, usar `Mockery::mock(Model::class)->makePartial()` para permitir `setAttribute`
- Para classes que chamam Model::find() diretamente, extrair a chamada para um repository injectável
- Testes de validação: mockar repositories via construtor, não os models
- Testes E2E (IntegrationTenant): sem mocks, factories reais, `assertDatabaseHas` para POST, verificar retorno para GET
- Testes unitários de Service: mockar repository + validação + Auth, verificar orquestração