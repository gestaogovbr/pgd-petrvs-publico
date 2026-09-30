<?php

declare(strict_types=1);

use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioAgenteAuthorization;

beforeEach(function () {
    $this->authorization = new RelatorioAgenteAuthorization();
});

test('assertPodeConsultar libera usuário com capacidade MOD_RELATORIO_USUARIO', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioAgenteAuthorization::CAPACIDADE)
        ->andReturn(true);

    $this->authorization->assertPodeConsultar($usuario);

    expect(true)->toBeTrue();
});

test('assertPodeConsultar lança quando o usuário não possui a capacidade', function () {
    $usuario = Mockery::mock(Usuario::class);
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with(RelatorioAgenteAuthorization::CAPACIDADE)
        ->andReturn(false);

    expect(fn () => $this->authorization->assertPodeConsultar($usuario))
        ->toThrow(ServerException::class, RelatorioAgenteAuthorization::MSG_ACESSO_NEGADO);
});

test('aplicarFiltroParticipante restringe perfil participante ao próprio usuário', function () {
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = 'user-9';
    $usuario->perfil = (object) ['nivel' => PerfilEnum::PARTICIPANTE->value];

    $dto = new RelatorioAgenteQueryDTO(
        filters: new RelatorioAgenteFiltersDTO(unidadeId: 'unidade-1', nome: 'Ana'),
    );

    $result = $this->authorization->aplicarFiltroParticipante($dto, $usuario);

    expect($result->filters->usuarioId)->toBe('user-9')
        ->and($result->filters->unidadeId)->toBeNull()
        ->and($result->filters->incluirUnidadesSubordinadas)->toBeFalse()
        ->and($result->filters->nome)->toBe('Ana');
});

test('aplicarFiltroParticipante não altera filtros de perfil acima de participante', function () {
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = 'user-1';
    $usuario->perfil = (object) ['nivel' => PerfilEnum::UNIDADE->value];

    $dto = new RelatorioAgenteQueryDTO(
        filters: new RelatorioAgenteFiltersDTO(unidadeId: 'unidade-1', nome: 'Ana'),
    );

    $result = $this->authorization->aplicarFiltroParticipante($dto, $usuario);

    expect($result)->toBe($dto)
        ->and($result->filters->unidadeId)->toBe('unidade-1')
        ->and($result->filters->nome)->toBe('Ana');
});
