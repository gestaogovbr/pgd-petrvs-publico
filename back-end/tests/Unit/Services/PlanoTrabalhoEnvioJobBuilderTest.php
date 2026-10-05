<?php

namespace Tests\Unit\Services;

use App\Enums\StatusEnum;
use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

function planoTrabalhoParaCadeiaEnvio(
    string $status = StatusEnum::ATIVO->value,
    bool $participantePendente = true,
    array $entregas = [],
): PlanoTrabalho {
    $planoTrabalho = new PlanoTrabalho();
    $planoTrabalho->id = 'pt-1';
    $planoTrabalho->numero = 42;
    $planoTrabalho->status = $status;
    $planoTrabalho->cod_unidade_autorizadora = '32589478925114';

    $usuario = new Usuario();
    $usuario->id = 'user-1';
    $usuario->matricula = '1234567';
    $usuario->updated_at = Carbon::parse('2026-06-10 12:00:00');
    $usuario->data_envio_api_pgd = $participantePendente
        ? null
        : Carbon::parse('2026-06-10 12:00:00');
    $usuario->setRelation('planosTrabalho', new Collection([$planoTrabalho]));

    $planoTrabalho->setRelation('usuario', $usuario);
    $planoTrabalho->setRelation('entregas', new Collection($entregas));

    return $planoTrabalho;
}

function entregaComPlanoEntregaValido(
    string $planoEntregaId = 'pe-1',
    string $entregaId = 'pte-1',
    int $numero = 10,
): PlanoTrabalhoEntrega {
    $unidade = new Unidade();
    $unidade->id = 'uni-1';

    $programa = new Programa();
    $programa->id = 'prog-1';
    $programa->setRelation('unidade', $unidade);

    $planoEntrega = new PlanoEntrega();
    $planoEntrega->id = $planoEntregaId;
    $planoEntrega->numero = $numero;
    $planoEntrega->status = StatusEnum::ATIVO->value;
    $planoEntrega->setRelation('programa', $programa);
    $planoEntrega->setRelation('unidade', $unidade);

    $planoEntregaEntrega = new PlanoEntregaEntrega();
    $planoEntregaEntrega->id = 'pee-'.$entregaId;
    $planoEntregaEntrega->setRelation('planoEntrega', $planoEntrega);

    $entrega = new PlanoTrabalhoEntrega();
    $entrega->id = $entregaId;
    $entrega->plano_entrega_entrega_id = $planoEntregaEntrega->id;
    $entrega->setRelation('planoEntregaEntrega', $planoEntregaEntrega);

    return $entrega;
}

function mockRepositorioPlanoTrabalho(): void
{
    $repositorio = Mockery::mock(PlanoTrabalhoRepository::class);
    $repositorio->shouldReceive('garantirCodUnidadeAutorizadora')->once();
    $repositorio->shouldReceive('findById')->andReturn(null);
    $repositorio->shouldReceive('registrarLog')->zeroOrMoreTimes();

    app()->instance(PlanoTrabalhoRepository::class, $repositorio);
}

describe('PlanoTrabalhoEnvioJobBuilder', function () {
    it('monta a cadeia com participante, plano de entrega e plano de trabalho nessa ordem', function () {
        mockRepositorioPlanoTrabalho();

        $jobs = PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(entregas: [entregaComPlanoEntregaValido()]),
            'pt-envio',
        );

        expect($jobs)->toHaveCount(3);
        expect($jobs[0])->toBeInstanceOf(ExportarParticipanteJob::class);
        expect($jobs[1])->toBeInstanceOf(ExportarPlanoEntregaJob::class);
        expect($jobs[2])->toBeInstanceOf(ExportarPlanoTrabalhoJob::class);
        expect($jobs[0]->getCodUnidadeAutorizadora())->toBe('32589478925114');
    });

    it('omite o participante quando já foi enviado e não há alteração pendente', function () {
        mockRepositorioPlanoTrabalho();
        Log::shouldReceive('info')->withAnyArgs();

        $jobs = PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(participantePendente: false, entregas: [entregaComPlanoEntregaValido()]),
        );

        expect($jobs)->toHaveCount(2);
        expect($jobs[0])->toBeInstanceOf(ExportarPlanoEntregaJob::class);
        expect($jobs[1])->toBeInstanceOf(ExportarPlanoTrabalhoJob::class);
    });

    it('ignora entrega sem plano de entrega vinculado', function () {
        mockRepositorioPlanoTrabalho();

        $entregaAvulsa = new PlanoTrabalhoEntrega();
        $entregaAvulsa->id = 'pte-avulsa';
        $entregaAvulsa->plano_entrega_entrega_id = null;

        $jobs = PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(entregas: [$entregaAvulsa]),
        );

        expect($jobs)->toHaveCount(2);
        expect($jobs[0])->toBeInstanceOf(ExportarParticipanteJob::class);
        expect($jobs[1])->toBeInstanceOf(ExportarPlanoTrabalhoJob::class);
    });

    it('lança quando o plano de trabalho não está em status válido para envio', function () {
        mockRepositorioPlanoTrabalho();

        expect(fn () => PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(status: StatusEnum::INCLUIDO->value),
        ))->toThrow(EnvioNaoAgendadoException::class);
    });

    it('encadeia cada plano de entrega em sequência antes do plano de trabalho', function () {
        mockRepositorioPlanoTrabalho();

        $jobs = PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(entregas: [
                entregaComPlanoEntregaValido('pe-1', 'pte-1', 10),
                entregaComPlanoEntregaValido('pe-2', 'pte-2', 11),
            ]),
        );

        expect($jobs)->toHaveCount(4);
        expect($jobs[0])->toBeInstanceOf(ExportarParticipanteJob::class);
        expect($jobs[1])->toBeInstanceOf(ExportarPlanoEntregaJob::class);
        expect($jobs[2])->toBeInstanceOf(ExportarPlanoEntregaJob::class);
        expect($jobs[3])->toBeInstanceOf(ExportarPlanoTrabalhoJob::class);
    });

    it('não duplica o mesmo plano de entrega na cadeia', function () {
        mockRepositorioPlanoTrabalho();

        $jobs = PlanoTrabalhoEnvioJobBuilder::make(
            'tenant-1',
            planoTrabalhoParaCadeiaEnvio(entregas: [
                entregaComPlanoEntregaValido('pe-1', 'pte-1'),
                entregaComPlanoEntregaValido('pe-1', 'pte-2'),
            ]),
        );

        expect($jobs)->toHaveCount(3);
        expect($jobs[0])->toBeInstanceOf(ExportarParticipanteJob::class);
        expect($jobs[1])->toBeInstanceOf(ExportarPlanoEntregaJob::class);
        expect($jobs[2])->toBeInstanceOf(ExportarPlanoTrabalhoJob::class);
    });
});
