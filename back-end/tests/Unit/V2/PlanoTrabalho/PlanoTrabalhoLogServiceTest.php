<?php

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Atividade;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Services\ChangeService;
use App\V2\PlanoTrabalho\Log\DTOs\PlanoTrabalhoLogIndexDTO;
use App\V2\PlanoTrabalho\Log\PlanoTrabalhoLogService;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

function usuarioComPermissaoAuditLog(): Usuario
{
    /** @var Usuario&\Mockery\MockInterface $usuario */
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->shouldReceive('hasPermissionTo')->with('MOD_AUDIT_LOG')->andReturn(true);

    return $usuario;
}

beforeEach(function () {
    $this->changeService = Mockery::mock(ChangeService::class);
    $this->readRepository = Mockery::mock(PlanoTrabalhoReadRepositoryContract::class);
    $this->service = new PlanoTrabalhoLogService($this->changeService, $this->readRepository);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoLogService', function () {
    it('exige permissão MOD_AUDIT_LOG', function () {
        $usuario = Mockery::mock(Usuario::class);
        $usuario->shouldReceive('hasPermissionTo')->with('MOD_AUDIT_LOG')->andReturn(false);
        Auth::shouldReceive('user')->once()->andReturn($usuario);

        $dto = new PlanoTrabalhoLogIndexDTO(fake()->uuid(), 1, 20, null, null, null, null, null, null, null);

        expect(fn () => $this->service->index($dto))
            ->toThrow(ForbiddenException::class);
    });

    it('retorna not found quando plano não existe', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $planoId = fake()->uuid();
        $this->readRepository->shouldReceive('findById')->with($planoId)->andReturn(null);

        $dto = new PlanoTrabalhoLogIndexDTO($planoId, 1, 20, null, null, null, null, null, null, null);

        expect(fn () => $this->service->index($dto))
            ->toThrow(NotFoundException::class);
    });

    it('consulta audits via ChangeService', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = fake()->uuid();

        $this->readRepository->shouldReceive('findById')->with($plano->id)->andReturn($plano);

        $this->changeService->shouldReceive('query')
            ->once()
            ->with(Mockery::on(function (array $payload) use ($plano) {
                $filters = $payload['filters'] ?? [];

                return ($filters['auditable_type'] ?? null) === PlanoTrabalho::class
                    && ($filters['auditable_id'] ?? null) === $plano->id;
            }))
            ->andReturn([
                'count' => 1,
                'rows' => collect([(object) [
                    'id' => fake()->uuid(),
                    'event' => 'created',
                    'auditable_type' => PlanoTrabalho::class,
                    'usuario' => 'Teste',
                    'created_at' => now()->toDateTimeString(),
                    'old_values' => [],
                    'new_values' => ['numero' => 1],
                ]]),
                'extra' => ['current_page' => 1, 'last_page' => 1],
            ]);

        $dto = new PlanoTrabalhoLogIndexDTO($plano->id, 1, 20, null, null, null, null, null, null, null);
        $result = $this->service->index($dto);

        expect($result['total'])->toBe(1)
            ->and($result['data'])->toHaveCount(1)
            ->and($result['data'][0]['event'])->toBe('created')
            ->and($result['data'][0]['auditable_type'])->toBe('PlanoTrabalho');
    });

    it('repassa filtros de responsável e texto geral ao ChangeService', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = fake()->uuid();
        $usuarioId = fake()->uuid();

        $this->readRepository->shouldReceive('findById')->with($plano->id)->andReturn($plano);

        $this->changeService->shouldReceive('query')
            ->once()
            ->with(Mockery::on(function (array $payload) use ($plano, $usuarioId) {
                $filters = $payload['filters'] ?? [];

                return ($filters['auditable_id'] ?? null) === $plano->id
                    && ($filters['user_id'] ?? null) === $usuarioId
                    && ($filters['search'] ?? null) === 'justificativa';
            }))
            ->andReturn([
                'count' => 0,
                'rows' => collect([]),
                'extra' => ['current_page' => 1, 'last_page' => 1],
            ]);

        $dto = new PlanoTrabalhoLogIndexDTO(
            $plano->id,
            1,
            20,
            $usuarioId,
            null,
            null,
            null,
            null,
            'justificativa',
            null,
        );

        $this->service->index($dto);
    });

    it('repassa filtro por nome do responsável quando id não informado', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = fake()->uuid();

        $this->readRepository->shouldReceive('findById')->with($plano->id)->andReturn($plano);

        $this->changeService->shouldReceive('query')
            ->once()
            ->with(Mockery::on(function (array $payload) {
                $filters = $payload['filters'] ?? [];

                return ($filters['usuario_nome'] ?? null) === 'Maria';
            }))
            ->andReturn([
                'count' => 0,
                'rows' => collect([]),
                'extra' => ['current_page' => 1, 'last_page' => 1],
            ]);

        $dto = new PlanoTrabalhoLogIndexDTO(
            $plano->id,
            1,
            20,
            null,
            'Maria',
            null,
            null,
            null,
            null,
            null,
        );

        $this->service->index($dto);
    });

    it('restringe filtro de modelo ao plano de trabalho direto', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = fake()->uuid();

        $this->readRepository->shouldReceive('findById')->with($plano->id)->andReturn($plano);

        $this->changeService->shouldReceive('query')
            ->once()
            ->with(Mockery::on(function (array $payload) {
                $filters = $payload['filters'] ?? [];

                return ($filters['auditable_type'] ?? null) === PlanoTrabalho::class
                    && ($filters['only_direct_audits'] ?? false) === true
                    && !array_key_exists('only_related_model', $filters);
            }))
            ->andReturn([
                'count' => 0,
                'rows' => collect([]),
                'extra' => ['current_page' => 1, 'last_page' => 1],
            ]);

        $dto = new PlanoTrabalhoLogIndexDTO(
            $plano->id,
            1,
            20,
            null,
            null,
            null,
            null,
            null,
            null,
            PlanoTrabalho::class,
        );

        $this->service->index($dto);
    });

    it('restringe filtro de modelo a entidades relacionadas do plano', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = fake()->uuid();

        $this->readRepository->shouldReceive('findById')->with($plano->id)->andReturn($plano);

        $this->changeService->shouldReceive('query')
            ->once()
            ->with(Mockery::on(function (array $payload) {
                $filters = $payload['filters'] ?? [];

                return ($filters['auditable_type'] ?? null) === PlanoTrabalho::class
                    && ($filters['only_related_model'] ?? null) === Atividade::class
                    && !array_key_exists('only_direct_audits', $filters);
            }))
            ->andReturn([
                'count' => 0,
                'rows' => collect([]),
                'extra' => ['current_page' => 1, 'last_page' => 1],
            ]);

        $dto = new PlanoTrabalhoLogIndexDTO(
            $plano->id,
            1,
            20,
            null,
            null,
            null,
            null,
            null,
            null,
            Atividade::class,
        );

        $this->service->index($dto);
    });

    it('lista modelos relacionados ao plano de trabalho', function () {
        Auth::shouldReceive('user')->once()->andReturn(usuarioComPermissaoAuditLog());

        $modelos = $this->service->modelos();

        expect($modelos)->not->toBeEmpty()
            ->and(collect($modelos)->pluck('value'))->toContain('PlanoTrabalho', 'Atividade');
    });
});
