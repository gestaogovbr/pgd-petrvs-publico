# Tarefas de Refatoração de Testes

Este documento lista os arquivos de teste que precisam ser refatorados para atender ao padrão de testes unitários do projeto (Pest + Mockery + Zero DB Interaction).

## Padrão a Seguir
Consulte [pest.md](pest.md) para detalhes sobre o padrão de implementação.

## Status de Padronização (Refactoring)

### Prioridade Alta (Violação de Isolamento de Banco de Dados)
- `tests/Unit/Services/UsuarioServiceTest.php` (Usa `Schema::create` e PHPUnit)
- `tests/Unit/Services/IntegracaoServiceEmailTest.php` (Usa `Schema::create` e PHPUnit)
- `tests/Unit/Services/Siape/SiapeSiapeServidorFaultProcessorTest.php` (Usa `Schema::create` e Models reais)
- `tests/Unit/Services/UsuarioServiceIsGestorTest.php` (Antigo `UsuarioSevice.php`, usa DB)

### Prioridade Média (Estilo PHPUnit Legacy)
- `tests/Unit/Services/SystemLogsServiceTest.php` (Usa `extends TestCase`)


### Feature Tests (Avaliar migração para Unit se possível)
- `tests/Feature/SiapeIndividualServidorServiceTest.php` (Usa `Schema::create`)
