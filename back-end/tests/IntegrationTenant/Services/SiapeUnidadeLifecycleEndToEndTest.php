<?php

use App\Models\SiapeBlacklistUnidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\IntegracaoUnidadeService;
use App\Services\Siape\Unidade\SiapeUnidadeLifecycleService;
use App\Services\UnidadeService;
use Carbon\Carbon;
use Illuminate\Support\Str;

afterEach(function () {
    Carbon::setTestNow();
    Mockery::close();
});

beforeEach(function () {
    $codigos = [
        'E2E-A1',
        'E2E-A2',
    ];

    $unidadeIds = Unidade::withTrashed()
        ->whereIn('codigo', $codigos)
        ->pluck('id');
    $integranteIds = UnidadeIntegrante::withTrashed()
        ->whereIn('unidade_id', $unidadeIds->all())
        ->pluck('id');

    UnidadeIntegranteAtribuicao::withTrashed()
        ->whereIn('unidade_integrante_id', $integranteIds->all())
        ->forceDelete();
    UnidadeIntegrante::withTrashed()
        ->whereIn('id', $integranteIds->all())
        ->forceDelete();
    Unidade::withTrashed()
        ->whereIn('id', $unidadeIds->all())
        ->forceDelete();
    SiapeBlacklistUnidade::withTrashed()
        ->whereIn('codigo', $codigos)
        ->forceDelete();
});

function criarServidorLotadoE2E(Unidade $unidade): UnidadeIntegrante
{
    return criarIntegranteComAtribuicoesE2E($unidade, ['LOTADO']);
}

function criarChefeLotadoE2E(Unidade $unidade): UnidadeIntegrante
{
    return criarIntegranteComAtribuicoesE2E($unidade, ['LOTADO', 'GESTOR']);
}

/**
 * @param array<int, string> $atribuicoes
 */
function criarIntegranteComAtribuicoesE2E(Unidade $unidade, array $atribuicoes): UnidadeIntegrante
{
    $usuario = Usuario::factory()->create();

    $integrante = UnidadeIntegrante::create([
        'id' => (string) Str::uuid(),
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    foreach ($atribuicoes as $atribuicao) {
        UnidadeIntegranteAtribuicao::create([
            'id' => (string) Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => $atribuicao,
        ]);
    }

    return $integrante;
}

function contarAtribuicoesAtivasDaUnidadeE2E(Unidade $unidade): int
{
    $integranteIds = UnidadeIntegrante::query()
        ->where('unidade_id', $unidade->id)
        ->pluck('id');

    return UnidadeIntegranteAtribuicao::query()
        ->whereIn('unidade_integrante_id', $integranteIds->all())
        ->count();
}

function contarLotacoesAtivasDaUnidadeE2E(Unidade $unidade): int
{
    $integranteIds = UnidadeIntegrante::query()
        ->where('unidade_id', $unidade->id)
        ->pluck('id');

    return UnidadeIntegranteAtribuicao::query()
        ->whereIn('unidade_integrante_id', $integranteIds->all())
        ->where('atribuicao', 'LOTADO')
        ->count();
}

function expectDataHoraE2E(mixed $data, string $esperado): void
{
    expect($data)->toBeInstanceOf(Carbon::class);

    if (! $data instanceof Carbon) {
        throw new RuntimeException('A data esperada nao foi carregada como Carbon.');
    }

    expect($data->toDateTimeString())->toBe($esperado);
}

function faultDadosUorgAusenteE2E(): string
{
    return <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <soap:Body>
            <soap:Fault>
                <faultcode>0002</faultcode>
                <faultstring>Não existem dados para consulta</faultstring>
            </soap:Fault>
        </soap:Body>
    </soap:Envelope>
    XML;
}

test('ciclo de vida completo de unidade SIAPE atualiza o estado real do banco de ponta a ponta', function () {
    config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

    $inicio = Carbon::parse('2026-04-20 10:00:00');
    Carbon::setTestNow($inicio);

    $unidadeAusente = Unidade::factory()->create([
        'codigo' => 'E2E-A1',
        'nome' => 'Unidade que deixa de vir no SIAPE',
        'data_inativacao' => null,
        'data_inicio_inativacao' => null,
    ]);
    $unidadeAtiva = Unidade::factory()->create([
        'codigo' => 'E2E-A2',
        'nome' => 'Unidade que segue ativa no SIAPE',
        'data_inativacao' => null,
        'data_inicio_inativacao' => null,
    ]);

    criarServidorLotadoE2E($unidadeAusente);
    criarChefeLotadoE2E($unidadeAusente);
    criarServidorLotadoE2E($unidadeAtiva);
    criarChefeLotadoE2E($unidadeAtiva);

    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(2)
        ->and(contarLotacoesAtivasDaUnidadeE2E($unidadeAtiva))->toBe(2);
    expect(contarAtribuicoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(3)
        ->and(contarAtribuicoesAtivasDaUnidadeE2E($unidadeAtiva))->toBe(3);

    $siape = Mockery::mock();
    $siape->shouldReceive('listaUorgs')
        ->twice()
        ->andReturn([
            ['codigo' => 'E2E-A2'],
        ]);
    $siape->shouldReceive('dadosUorg')
        ->twice()
        ->with('E2E-A1')
        ->andReturn(faultDadosUorgAusenteE2E());

    $parserDadosUorg = new SiapeUnidadeLifecycleService();
    $this->app->bind(
        SiapeUnidadeLifecycleService::class,
        fn (): SiapeUnidadeLifecycleService => new SiapeUnidadeLifecycleService(
            confirmarAusencia: fn (string $codigo): bool => $parserDadosUorg
                ->dadosUorgConfirmaAusencia($codigo, $siape->dadosUorg($codigo))
        )
    );

    app(SiapeUnidadeLifecycleService::class)
        ->sincronizarBlacklistPelaListaUorgs($siape->listaUorgs());

    $this->assertDatabaseHas('siape_blacklist_unidades', [
        'codigo' => 'E2E-A1',
        'inativado' => 0,
        'deleted_at' => null,
    ], 'tenant');
    expect(SiapeBlacklistUnidade::where('codigo', 'E2E-A2')->exists())->toBeFalse();
    expect($unidadeAusente->fresh()->data_inativacao)->toBeNull()
        ->and($unidadeAtiva->fresh()->data_inativacao)->toBeNull();

    Carbon::setTestNow($inicio->copy()->addDays(4));
    app(SiapeUnidadeLifecycleService::class)
        ->sincronizarBlacklistPelaListaUorgs($siape->listaUorgs());
    app(IntegracaoUnidadeService::class)->processaUnidadesRemovidasNoSiape();

    expect(SiapeBlacklistUnidade::where('codigo', 'E2E-A1')->where('inativado', 0)->exists())->toBeTrue();
    expect(SiapeBlacklistUnidade::where('codigo', 'E2E-A2')->exists())->toBeFalse();
    expect($unidadeAusente->fresh()->data_inicio_inativacao)->toBeNull()
        ->and($unidadeAusente->fresh()->data_inativacao)->toBeNull();
    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(2);

    Carbon::setTestNow($inicio->copy()->addDays(7));
    app(IntegracaoUnidadeService::class)->processaUnidadesRemovidasNoSiape();

    $unidadeAusente->refresh();
    expectDataHoraE2E($unidadeAusente->data_inicio_inativacao, '2026-04-27 10:00:00');
    expect($unidadeAusente->data_inativacao)->toBeNull();
    $this->assertDatabaseHas('siape_blacklist_unidades', [
        'codigo' => 'E2E-A1',
        'inativado' => 1,
        'deleted_at' => null,
    ], 'tenant');
    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(2);

    Carbon::setTestNow($inicio->copy()->addDays(14));
    app(UnidadeService::class)->processarUnidadesTemporarias();

    $unidadeAusente->refresh();
    $unidadeAtiva->refresh();
    expectDataHoraE2E($unidadeAusente->data_inativacao, '2026-05-04 10:00:00');
    expect($unidadeAtiva->data_inativacao)->toBeNull();
    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(0)
        ->and(contarAtribuicoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(0);
    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAtiva))->toBe(2)
        ->and(contarAtribuicoesAtivasDaUnidadeE2E($unidadeAtiva))->toBe(3);

    app(UnidadeService::class)->ativarTemporariamente([
        'unidade_id' => $unidadeAusente->id,
        'justificativa' => 'reativacao temporaria no teste e2e',
    ]);

    $unidadeAusente->refresh();
    expect($unidadeAusente->data_inativacao)->toBeNull();
    expectDataHoraE2E($unidadeAusente->data_inicio_inativacao, '2026-05-04 10:00:00');

    Carbon::setTestNow($inicio->copy()->addDays(21));
    app(UnidadeService::class)->processarUnidadesTemporarias();

    $unidadeAusente->refresh();
    expectDataHoraE2E($unidadeAusente->data_inativacao, '2026-05-11 10:00:00');
    expect(contarLotacoesAtivasDaUnidadeE2E($unidadeAusente))->toBe(0);
});
