<?php

/*
|--------------------------------------------------------------------------
| Rascunho TDD da refatoracao de inativacao de unidades SIAPE
|--------------------------------------------------------------------------
|
| Este arquivo foi criado no inicio da abordagem TDD para explicitar os
| comportamentos que a refatoracao devera cobrir quando a implementacao for
| feita em etapas. A primeira execucao em "red" confirmou exatamente o estado
| esperado naquele momento: o service SiapeUnidadeLifecycleService ainda nao
| existia e os pontos legados ainda nao limpavam a pendencia de inativacao.
|
| Ideia central registrada aqui:
| - listaUorgs vira a evidencia primaria de unidades ativas;
| - unidades locais ausentes da lista entram ou permanecem na blacklist;
| - unidades que reaparecem na lista cancelam a pendencia;
| - blacklist vencida inicia data_inicio_inativacao;
| - o segundo prazo so efetiva data_inativacao apos confirmacao negativa em
|   dadosUorg;
| - a efetivacao final deve ser transacional, incluindo a remocao das
|   atribuicoes/lotacoes;
| - falha, resposta vazia ou retorno ambiguo do SIAPE nao pode inativar;
| - remocao de blacklist e reativacao manual devem limpar data_inicio_inativacao.
|
| A etapa "Novo service de ciclo de vida" ativa estes testes para guiar a
| criacao do SiapeUnidadeLifecycleService. O caso de reativacao manual fica
| pulado porque pertence a uma etapa posterior do plano.
|
*/

use App\Models\SiapeBlacklistUnidade;
use App\Models\SiapeListaUORGS;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\Unidade\SiapeUnidadeLifecycleService;
use Carbon\Carbon;
use Illuminate\Support\Str;

afterEach(function () {
    Carbon::setTestNow();
});

beforeEach(function () {
    $codigos = [
        '100',
        '101',
        '102',
        '103',
        '104',
        '105',
        '106',
        '107',
        '108',
        '109',
        '110',
        '111',
        '112',
        '200',
        '300',
        '999',
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
    SiapeListaUORGS::withTrashed()->forceDelete();
});

function criarVinculoUnidadeComAtribuicoes(Unidade $unidade, array $atribuicoes = ['LOTADO', 'GESTOR']): UnidadeIntegrante
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

function expectDataHoraString(mixed $data, string $esperado): void
{
    expect($data)->toBeInstanceOf(Carbon::class);

    if (! $data instanceof Carbon) {
        throw new RuntimeException('A data esperada nao foi carregada como Carbon.');
    }

    expect($data->toDateTimeString())->toBe($esperado);
}

describe('SiapeUnidadeLifecycleService', function () {
    test('cria blacklist para unidade ausente na listaUorgs e cancela pendencia de unidade que voltou', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        $ausente = Unidade::factory()->create(['codigo' => '100']);
        $presente = Unidade::factory()->create([
            'codigo' => '200',
            'data_inicio_inativacao' => now()->subDays(8),
        ]);
        $inativa = Unidade::factory()->create([
            'codigo' => '300',
            'data_inativacao' => now()->subDays(1),
        ]);

        SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '200',
            'response' => 'ausente em carga anterior',
            'inativado' => 1,
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        $resultado = app(SiapeUnidadeLifecycleService::class)
            ->sincronizarBlacklistPelaListaUorgs([
                ['codigo' => '200'],
                ['codigo' => '999'],
            ]);

        expect($resultado['blacklists_criadas'])->toBe(1)
            ->and($resultado['pendencias_canceladas'])->toBe(1);

        $this->assertDatabaseHas('siape_blacklist_unidades', [
            'codigo' => '100',
            'inativado' => 0,
            'deleted_at' => null,
        ], 'tenant');

        expect(SiapeBlacklistUnidade::where('codigo', '200')->exists())->toBeFalse();
        expect($presente->fresh()->data_inicio_inativacao)->toBeNull();
        expect(SiapeBlacklistUnidade::where('codigo', '300')->exists())->toBeFalse();
        expect($inativa->fresh()->data_inativacao)->not->toBeNull();
        expect($ausente->fresh()->data_inicio_inativacao)->toBeNull();
    });

    test('blacklist vencida inicia o processo de inativacao da unidade', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create(['codigo' => '101']);
        SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '101',
            'response' => 'ausente da listaUorgs',
            'inativado' => 0,
            'created_at' => now()->subDays(7),
            'updated_at' => now()->subDays(7),
        ]);

        $resultado = app(SiapeUnidadeLifecycleService::class)->iniciarInativacoesComBlacklistVencida();

        expect($resultado['unidades_iniciadas'])->toBe(1);
        $unidade->refresh();
        expectDataHoraString($unidade->data_inicio_inativacao, '2026-04-20 10:00:00');

        $this->assertDatabaseHas('siape_blacklist_unidades', [
            'codigo' => '101',
            'inativado' => 1,
        ], 'tenant');
    });

    test('blacklist nao vencida nao inicia processo de inativacao', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create(['codigo' => '111']);
        SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '111',
            'response' => 'ausente da listaUorgs',
            'inativado' => 0,
            'created_at' => now()->subDays(6),
            'updated_at' => now()->subDays(6),
        ]);

        $resultado = app(SiapeUnidadeLifecycleService::class)->iniciarInativacoesComBlacklistVencida();

        expect($resultado['unidades_iniciadas'])->toBe(0);
        expect($unidade->fresh()->data_inicio_inativacao)->toBeNull();
    });

    test('blacklist ativa preserva created_at quando unidade segue ausente', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        Unidade::factory()->create(['codigo' => '109']);
        $blacklist = SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '109',
            'response' => 'ausente em carga anterior',
            'inativado' => 0,
            'created_at' => now()->subDays(5),
            'updated_at' => now()->subDays(5),
        ]);

        $resultado = app(SiapeUnidadeLifecycleService::class)->sincronizarBlacklistPelaListaUorgs([]);

        $blacklist->refresh();

        expect($resultado['blacklists_mantidas'])->toBe(1);
        expect($blacklist->created_at?->toDateTimeString())->toBe('2026-04-15 10:00:00');
        expect($blacklist->updated_at?->toDateTimeString())->toBe('2026-04-20 10:00:00');
    });

    test('blacklist soft-deleted restaurada reinicia prazo de inativacao', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        Unidade::factory()->create(['codigo' => '110']);
        $blacklist = SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '110',
            'response' => 'ausente antiga',
            'inativado' => 1,
            'created_at' => now()->subDays(20),
            'updated_at' => now()->subDays(20),
        ]);
        $blacklist->delete();

        $resultado = app(SiapeUnidadeLifecycleService::class)->sincronizarBlacklistPelaListaUorgs([]);

        $blacklist->refresh();

        expect($resultado['blacklists_criadas'])->toBe(1);
        expect($blacklist->deleted_at)->toBeNull();
        expect($blacklist->inativado)->toBe(0);
        expect($blacklist->created_at?->toDateTimeString())->toBe('2026-04-20 10:00:00');
    });

    test('segundo prazo vencido com dadosUorg negativo inativa unidade e remove atribuicoes', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create([
            'codigo' => '102',
            'data_inicio_inativacao' => now()->subDays(7),
            'data_inativacao' => null,
        ]);
        $integrante = criarVinculoUnidadeComAtribuicoes($unidade);

        $service = new SiapeUnidadeLifecycleService(confirmarAusencia: fn (string $codigo): bool => $codigo === '102');
        $resultado = $service->efetivarInativacoesPendentes();

        expect($resultado['unidades_inativadas'])->toBe(1);
        $unidade->refresh();
        expectDataHoraString($unidade->data_inativacao, '2026-04-20 10:00:00');
        expect(UnidadeIntegranteAtribuicao::where('unidade_integrante_id', $integrante->id)->count())->toBe(0);
    });

    test('dadosUorg positivo impede inativacao final e preserva atribuicoes', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create([
            'codigo' => '103',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => null,
        ]);
        $integrante = criarVinculoUnidadeComAtribuicoes($unidade);

        $service = new SiapeUnidadeLifecycleService(confirmarAusencia: fn (): bool => false);
        $resultado = $service->efetivarInativacoesPendentes();

        expect($resultado['unidades_inativadas'])->toBe(0)
            ->and($resultado['confirmacoes_presentes'])->toBe(1);
        expect($unidade->fresh()->data_inativacao)->toBeNull();
        expect(UnidadeIntegranteAtribuicao::where('unidade_integrante_id', $integrante->id)->count())->toBe(2);
    });

    test('falha ambigua em dadosUorg impede inativacao final', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create([
            'codigo' => '104',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => null,
        ]);

        $service = new SiapeUnidadeLifecycleService(confirmarAusencia: fn () => throw new RuntimeException('SIAPE indisponivel'));
        $resultado = $service->efetivarInativacoesPendentes();

        expect($resultado['unidades_inativadas'])->toBe(0)
            ->and($resultado['confirmacoes_falhas'])->toBe(1);
        expect($unidade->fresh()->data_inativacao)->toBeNull();
    });

    test('dadosUorg com fault de ausencia confirma inativacao segura', function () {
        $soapFault = <<<XML
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

        $service = app(SiapeUnidadeLifecycleService::class);

        expect($service->dadosUorgConfirmaAusencia('112', $soapFault))->toBeTrue();
    });

    test('dadosUorg com out preserva unidade como presente', function () {
        $soapResponse = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                    <out xmlns="">
                        <codUorg xmlns="http://entidade.wssiapenet">112</codUorg>
                    </out>
                </ns1:dadosUorgResponse>
            </soap:Body>
        </soap:Envelope>
        XML;

        $service = app(SiapeUnidadeLifecycleService::class);

        expect($service->dadosUorgConfirmaAusencia('112', $soapResponse))->toBeFalse();
    });

    test('remocao de blacklist cancela pendencia sem reativar unidade ja inativada', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        $pendente = Unidade::factory()->create([
            'codigo' => '105',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => null,
        ]);
        $finalizada = Unidade::factory()->create([
            'codigo' => '106',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => now()->subDay(),
        ]);

        foreach (['105', '106'] as $codigo) {
            SiapeBlacklistUnidade::create([
                'id' => (string) Str::uuid(),
                'codigo' => $codigo,
                'response' => 'ausente da listaUorgs',
                'inativado' => 1,
            ]);
        }

        $service = app(SiapeUnidadeLifecycleService::class);

        expect($service->cancelarPendenciaPorCodigo('105')['blacklists_removidas'])->toBe(1);
        expect($service->cancelarPendenciaPorCodigo('106')['blacklists_removidas'])->toBe(1);

        expect($pendente->fresh()->data_inicio_inativacao)->toBeNull()
            ->and($pendente->fresh()->data_inativacao)->toBeNull();
        expect($finalizada->fresh()->data_inicio_inativacao)->toBeNull()
            ->and($finalizada->fresh()->data_inativacao)->not->toBeNull();
    });

    test('reativacao manual limpa datas de inativacao e dados temporarios', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        $unidade = Unidade::factory()->create([
            'codigo' => '107',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => now()->subDay(),
            'data_ativacao_temporaria' => now()->subDay(),
            'justificativa_ativacao_temporaria' => 'liberacao operacional',
        ]);

        $this->markTestSkipped('Reativacao manual sera implementada na etapa Reativacao e remocao de blacklist.');

        $unidade->refresh();

        expect($unidade->data_inicio_inativacao)->toBeNull()
            ->and($unidade->data_inativacao)->toBeNull()
            ->and($unidade->data_ativacao_temporaria)->toBeNull()
            ->and($unidade->justificativa_ativacao_temporaria)->toBeNull();
});

    test('erro na remocao de atribuicoes faz rollback da inativacao final', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));
        config(['integracao.siape.inativacao_unidade_prazo_dias' => 7]);

        $unidade = Unidade::factory()->create([
            'codigo' => '108',
            'data_inicio_inativacao' => now()->subDays(8),
            'data_inativacao' => null,
        ]);
        criarVinculoUnidadeComAtribuicoes($unidade);

        $service = new class(confirmarAusencia: fn (): bool => true) extends SiapeUnidadeLifecycleService {
            protected function removerAtribuicoesDaUnidade(Unidade $unidade): int
            {
                throw new RuntimeException('falha ao remover atribuicoes');
            }
        };

        expect(fn () => $service->efetivarInativacoesPendentes())->toThrow(RuntimeException::class);
        expect($unidade->fresh()->data_inativacao)->toBeNull();
    });

    test('processamento da listaUorgs sincroniza blacklist antes de buscar dados das unidades ativas', function () {
        Carbon::setTestNow(Carbon::parse('2026-04-20 10:00:00'));

        Unidade::factory()->create(['codigo' => '100']);
        $unidadeReativadaNoSiape = Unidade::factory()->create([
            'codigo' => '200',
            'data_inicio_inativacao' => now()->subDays(8),
        ]);
        Unidade::factory()->create([
            'codigo' => '300',
            'data_inativacao' => now()->subDay(),
        ]);

        SiapeBlacklistUnidade::create([
            'id' => (string) Str::uuid(),
            'codigo' => '200',
            'response' => 'ausente em carga anterior',
            'inativado' => 1,
            'created_at' => now()->subDays(10),
            'updated_at' => now()->subDays(10),
        ]);

        $listaUorgs = SiapeListaUORGS::create([
            'response' => <<<XML
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <ns1:listaUorgsResponse xmlns:ns1="http://servico.wssiapenet">
                        <out xmlns="">
                            <ns2:Uorg xmlns:ns2="http://entidade.wssiapenet">
                                <codigo xmlns="http://entidade.wssiapenet">200</codigo>
                                <dataUltimaTransacao xmlns="http://entidade.wssiapenet">05062025</dataUltimaTransacao>
                                <nome xmlns="http://entidade.wssiapenet">UNIDADE REATIVADA</nome>
                            </ns2:Uorg>
                            <ns2:Uorg xmlns:ns2="http://entidade.wssiapenet">
                                <codigo xmlns="http://entidade.wssiapenet">999</codigo>
                                <dataUltimaTransacao xmlns="http://entidade.wssiapenet">05062025</dataUltimaTransacao>
                                <nome xmlns="http://entidade.wssiapenet">UNIDADE NOVA</nome>
                            </ns2:Uorg>
                        </out>
                    </ns1:listaUorgsResponse>
                </soap:Body>
            </soap:Envelope>
            XML,
            'processado' => 0,
        ]);

        $buscarDadosUnidade = new class([
            'cpf' => '00000000000',
            'url' => 'http://localhost',
            'conectagov_chave' => 'chave',
            'conectagov_senha' => 'senha',
            'conectagov_qtd_max_requisicoes' => 10,
            'codOrgao' => '1',
            'siglaSistema' => 'SIGLA',
            'nomeSistema' => 'NOME',
            'senha' => 'SENHA',
        ]) extends BuscarDadosSiapeUnidade {
            /** @var array<string, string> */
            public array $xmlUnidadesBuscadas = [];

            public function buscarUnidades(array $xmlUnidades): bool
            {
                $this->xmlUnidadesBuscadas = $xmlUnidades;

                return true;
            }
        };

        $buscarDadosUnidade->enviar();

        expect($buscarDadosUnidade->xmlUnidadesBuscadas)->toHaveKeys([
            '200.05062025',
            '999.05062025',
        ]);
        expect(SiapeBlacklistUnidade::where('codigo', '100')->exists())->toBeTrue();
        expect(SiapeBlacklistUnidade::where('codigo', '200')->exists())->toBeFalse();
        expect(SiapeBlacklistUnidade::where('codigo', '300')->exists())->toBeFalse();
        expect($unidadeReativadaNoSiape->fresh()->data_inicio_inativacao)->toBeNull();
        expect($listaUorgs->fresh()->processado)->toBe(1);
    });
});
