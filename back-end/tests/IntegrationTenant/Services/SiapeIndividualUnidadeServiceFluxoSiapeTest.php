<?php

use App\Models\Entidade;
use App\Models\IntegracaoUnidade;
use App\Models\SiapeBlacklistUnidade;
use App\Models\SiapeDadosUORG;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\IntegracaoService;
use App\Services\IntegracaoServiceFactory;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualUnidadeService;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\Sanctum;
use Stancl\Tenancy\Middleware\InitializeTenancyByRequestData;

beforeEach(function () {
    SiapeDadosUORG::query()->forceDelete();

    Log::shouldReceive('channel')->with('siape')->andReturnSelf();
    Log::shouldReceive('info')->withAnyArgs();
    Log::shouldReceive('error')->withAnyArgs()->zeroOrMoreTimes();

    $this->mockBuscarUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
    $this->mockBuscarUnidade->shouldReceive('getUorgAsXml')->andReturn('<xml/>');
    $this->mockBuscarUnidade->shouldReceive('getCpf')->andReturn('00000000000');

    $this->mockSiapeService = Mockery::mock(SiapeIndividualService::class);
    $this->mockSiapeService->config = [
        'codOrgao' => '40211',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'TESTE',
        'senha' => 'TESTE',
    ];
    $this->mockSiapeService->shouldReceive('getBuscarDadosSiapeUnidade')
        ->andReturn($this->mockBuscarUnidade);

    $this->mockIntegracaoService = Mockery::mock(IntegracaoService::class);

    $mockFactory = Mockery::mock(IntegracaoServiceFactory::class);
    $mockFactory->shouldReceive('make')->andReturn($this->mockIntegracaoService);
    $this->app->instance(IntegracaoServiceFactory::class, $mockFactory);

    $this->entidades = Entidade::factory()->count(3)->create();
    $this->entidadeIdsEsperados = Entidade::query()->pluck('id')->all();

    $this->registroProcessado = SiapeDadosUORG::factory()->processado()->create();
});

afterEach(function () {
    Mockery::close();
});

describe('SiapeIndividualUnidadeService::fluxoSiape', function () {
    test('insere SiapeDadosUORG com codigo correto, remove processados e sincroniza cada entidade', function () {
        $codigo = (string) rand(1, 999);
        $codUorg = str_pad($codigo, 6, '0', STR_PAD_LEFT);

        $soapResponse = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                    <out xmlns="">
                        <codUorg xmlns="http://entidade.wssiapenet">$codUorg</codUorg>
                    </out>
                </ns1:dadosUorgResponse>
            </soap:Body>
        </soap:Envelope>
        XML;

        $entidadeIdsChamados = [];
        $totalEntidades = Entidade::query()->count();

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->times($totalEntidades)
            ->with(Mockery::on(function (array $inputs) use (&$entidadeIdsChamados): bool {
                $entidadeIdsChamados[] = $inputs['entidade'];
                return $inputs['unidades'] === true
                    && $inputs['servidores'] === true
                    && $inputs['gestores'] === true;
            }))
            ->andReturn([]);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->not->toBeNull();

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapResponse);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigo, $this->mockSiapeService);

        $entidadeIdsEsperados = Entidade::query()->pluck('id')->all();

        expect($entidadeIdsChamados)->toHaveCount(count($entidadeIdsEsperados));
        expect($entidadeIdsChamados)->toEqualCanonicalizing($entidadeIdsEsperados);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->toBeNull();

        $inserted = SiapeDadosUORG::where('codigo', $codigo)->first();
        expect($inserted)->not->toBeNull();
        expect($inserted->codigo)->toBe($codigo);
    });

    test('insere SiapeDadosUORG com codigo null, remove processados e sincroniza cada entidade quando SIAPE retorna fault', function () {
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

        $entidadeIdsChamados = [];
        $totalEntidades = Entidade::query()->count();

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->times($totalEntidades)
            ->with(Mockery::on(function (array $inputs) use (&$entidadeIdsChamados): bool {
                $entidadeIdsChamados[] = $inputs['entidade'];
                return $inputs['unidades'] === true
                    && $inputs['servidores'] === true
                    && $inputs['gestores'] === true;
            }))
            ->andReturn([]);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->not->toBeNull();

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapFault);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape('codigo invalido', $this->mockSiapeService);

        $entidadeIdsEsperados = Entidade::query()->pluck('id')->all();

        expect($entidadeIdsChamados)->toHaveCount(count($entidadeIdsEsperados));
        expect($entidadeIdsChamados)->toEqualCanonicalizing($entidadeIdsEsperados);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->toBeNull();

        $inserted = SiapeDadosUORG::whereNull('codigo')->first();
        expect($inserted)->not->toBeNull();
        expect($inserted->codigo)->toBeNull();
        expect($inserted->response)->toContain('faultstring');
    });

    test('resumo identifica unidade existente raiz sem tratar pai nulo como falha', function () {
        $codigo = '26101';
        $unidade = Unidade::factory()->create([
            'codigo' => $codigo,
            'nome' => 'Unidade Raiz',
            'sigla' => 'RAIZ',
            'unidade_pai_id' => null,
        ]);

        IntegracaoUnidade::create([
            'id_servo' => $codigo,
            'codigo_siape' => $codigo,
            'nomeuorg' => 'Unidade Raiz',
            'siglauorg' => 'RAIZ',
            'cpf_titular_autoridade_uorg' => '000.000.000-00',
        ]);

        $usuarioLotadoA = Usuario::factory()->create();
        $usuarioLotadoB = Usuario::factory()->create();
        $usuarioColaborador = Usuario::factory()->create();

        foreach ([$usuarioLotadoA, $usuarioLotadoB] as $usuario) {
            $integrante = UnidadeIntegrante::create([
                'usuario_id' => $usuario->id,
                'unidade_id' => $unidade->id,
            ]);
            UnidadeIntegranteAtribuicao::create([
                'unidade_integrante_id' => $integrante->id,
                'atribuicao' => 'LOTADO',
            ]);
        }

        $integranteColaborador = UnidadeIntegrante::create([
            'usuario_id' => $usuarioColaborador->id,
            'unidade_id' => $unidade->id,
        ]);
        UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integranteColaborador->id,
            'atribuicao' => 'COLABORADOR',
        ]);

        $totalEntidadesSync = Entidade::query()->count();

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->times($totalEntidadesSync)
            ->andReturn([]);

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn(xmlUnidadeResponse($codigo));

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigo, $this->mockSiapeService);

        $resumo = $service->getResumo();

        expect($resumo)->toHaveCount(1);
        expect($resumo[0]['status'])->toBe('sucesso');
        expect($resumo[0]['unidade_existia'])->toBeTrue();
        expect($resumo[0]['unidade_inserida'])->toBeFalse();
        expect($resumo[0]['unidade_pai_id'])->toBeNull();
        expect($resumo[0]['unidade_pai_codigo'])->toBeNull();
        expect($resumo[0]['unidade_pai_sigla'])->toBeNull();
        expect($resumo[0]['unidade_raiz'])->toBeTrue();
        expect($resumo[0]['quantidade_servidores_lotados'])->toBe(2);
        expect($resumo[0]['chefe_cpf'])->toBe('00000000000');
    });

    test('resumo identifica unidade nova criada durante sincronizacao', function () {
        $base = fake()->numberBetween(100000, 800000);
        $codigoPai = (string) $base;
        $codigo = (string) ($base + 1);
        $parent = Unidade::factory()->create([
            'codigo' => $codigoPai,
            'sigla' => 'PAI',
        ]);

        $totalEntidadesSync = Entidade::query()->count();

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->times($totalEntidadesSync)
            ->andReturnUsing(function () use ($codigo, $parent) {
                Unidade::firstOrCreate(
                    ['codigo' => $codigo],
                    [
                        'nome' => 'Unidade Nova',
                        'sigla' => 'NOVA',
                        'unidade_pai_id' => $parent->id,
                        'entidade_id' => $parent->entidade_id,
                    ]
                );

                return [];
            });

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn(xmlUnidadeResponse($codigo));

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigo, $this->mockSiapeService);

        $resumo = $service->getResumo();

        expect($resumo)->toHaveCount(1);
        expect($resumo[0]['status'])->toBe('sucesso');
        expect($resumo[0]['unidade_existia'])->toBeFalse();
        expect($resumo[0]['unidade_inserida'])->toBeTrue();
        expect($resumo[0]['unidade_pai_id'])->toBe($parent->id);
        expect($resumo[0]['unidade_pai_codigo'])->toBe($codigoPai);
        expect($resumo[0]['unidade_pai_sigla'])->toBe('PAI');
        expect($resumo[0]['unidade_raiz'])->toBeFalse();
    });

    test('resumo registra alteracoes em unidade existente com pai', function () {
        $base = fake()->numberBetween(100_000, 800_000);
        $codigoPaiAntigo = (string) $base;
        $codigoPaiNovo = (string) ($base + 1);
        $codigo = (string) ($base + 2);
        $parentAntigo = Unidade::factory()->create(['codigo' => $codigoPaiAntigo]);
        $parentNovo = Unidade::factory()->create(['codigo' => $codigoPaiNovo]);
        $unidade = Unidade::factory()->create([
            'codigo' => $codigo,
            'nome' => 'Nome Antigo',
            'sigla' => 'ANT',
            'unidade_pai_id' => $parentAntigo->id,
        ]);

        $totalEntidadesSync = Entidade::query()->count();

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->times($totalEntidadesSync)
            ->andReturnUsing(function () use ($unidade, $parentNovo) {
                $unidade->update([
                    'nome' => 'Nome Novo',
                    'sigla' => 'NOV',
                    'unidade_pai_id' => $parentNovo->id,
                ]);

                return [];
            });

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn(xmlUnidadeResponse($codigo));

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigo, $this->mockSiapeService);

        $resumo = $service->getResumo();

        expect($resumo[0]['unidade_existia'])->toBeTrue();
        expect($resumo[0]['unidade_pai_id'])->toBe($parentNovo->id);
        expect($resumo[0]['unidade_pai_codigo'])->toBe($codigoPaiNovo);
        expect($resumo[0]['alteracoes'])->toContain('nome', 'sigla', 'unidade_pai_id');
    });

    test('falha mantem resumo com status erro quando ha estado da unidade', function () {
        $codigo = '26104';
        Unidade::factory()->create([
            'codigo' => $codigo,
            'nome' => 'Unidade Com Erro',
        ]);

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andThrow(new Exception('Falha simulada no SIAPE'));

        $service = app(SiapeIndividualUnidadeService::class);

        expect(fn() => $service->fluxoSiape($codigo, $this->mockSiapeService))
            ->toThrow(Exception::class, 'Falha simulada no SIAPE');

        $resumo = $service->getResumo();

        expect($resumo)->toHaveCount(1);
        expect($resumo[0]['status'])->toBe('erro');
        expect($resumo[0]['mensagem'])->toBe('Falha simulada no SIAPE');
        expect($resumo[0]['unidade_existia'])->toBeTrue();
    });

    test('carga individual enfileira unidade relacionada por cpf titular e reativa unidade encontrada no siape', function () {
        $cpfTitular = '02559875108';
        $codigoAntigo = '26120';
        $codigoNovo = '26121';

        $unidadeAntiga = Unidade::factory()->create([
            'codigo' => $codigoAntigo,
            'nome' => 'Unidade Antiga',
        ]);
        $unidadeNova = Unidade::factory()->create([
            'codigo' => $codigoNovo,
            'nome' => 'Unidade Nova',
            'data_inicio_inativacao' => Carbon::now()->subDays(8),
            'data_inativacao' => Carbon::now()->subDay(),
        ]);

        IntegracaoUnidade::create([
            'id_servo' => $codigoAntigo,
            'codigo_siape' => $codigoAntigo,
            'nomeuorg' => 'Unidade Antiga',
            'siglauorg' => 'ANT',
            'cpf_titular_autoridade_uorg' => $cpfTitular,
        ]);
        IntegracaoUnidade::create([
            'id_servo' => $codigoNovo,
            'codigo_siape' => $codigoNovo,
            'nomeuorg' => 'Unidade Nova',
            'siglauorg' => 'NOV',
            'cpf_titular_autoridade_uorg' => $cpfTitular,
        ]);
        SiapeBlacklistUnidade::create([
            'codigo' => $codigoNovo,
            'response' => 'ausente em carga anterior',
            'inativado' => 1,
        ]);

        $this->mockIntegracaoService->shouldReceive('sincronizar')
            ->andReturn([]);

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->twice()
            ->andReturn(
                xmlUnidadeResponse($codigoNovo, $cpfTitular),
                xmlUnidadeResponse($codigoAntigo, null)
            );

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigoNovo, $this->mockSiapeService);

        $this->assertDatabaseHas('siape_dadosUORG', [
            'codigo' => $codigoNovo,
        ], 'tenant');
        $this->assertDatabaseHas('siape_dadosUORG', [
            'codigo' => $codigoAntigo,
        ], 'tenant');

        $unidadeNova->refresh();
        expect($unidadeNova->data_inicio_inativacao)->toBeNull()
            ->and($unidadeNova->data_inativacao)->toBeNull();
        expect(SiapeBlacklistUnidade::where('codigo', $codigoNovo)->exists())->toBeFalse();
        expect($unidadeAntiga->fresh())->not->toBeNull();
    });
});

describe('POST /api/unidade/relatorio-processamento-siape', function () {
    beforeEach(function () {
        // Com RefreshDatabase + segunda requisição HTTP, o resolver por X-ENTIDADE pode falhar
        // ao buscar o tenant central; o setUp do tenant já inicializa o contexto necessário.
        $this->withoutMiddleware(InitializeTenancyByRequestData::class);
    });

    afterEach(function () {
        $this->withMiddleware(InitializeTenancyByRequestData::class);
    });

    test('retorna relatorio agregado da unidade processada', function () {
        $usuario = Usuario::factory()->create();
        Sanctum::actingAs($usuario);

        $parent = Unidade::factory()->create([
            'codigo' => '26010',
            'sigla' => 'SUP',
        ]);
        $unidade = Unidade::factory()->create([
            'codigo' => '26110',
            'nome' => 'Unidade Relatorio',
            'sigla' => 'REL',
            'unidade_pai_id' => $parent->id,
        ]);

        IntegracaoUnidade::create([
            'id_servo' => '26110',
            'codigo_siape' => '26110',
            'nomeuorg' => 'Unidade Relatorio',
            'siglauorg' => 'REL',
            'cpf_titular_autoridade_uorg' => '111.222.333-44',
        ]);

        $integrante = UnidadeIntegrante::create([
            'usuario_id' => $usuario->id,
            'unidade_id' => $unidade->id,
        ]);
        UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'LOTADO',
        ]);

        $relatorio = app(SiapeIndividualUnidadeService::class)->relatorioProcessamento('26110');
        $mockSiapeIndividualService = Mockery::mock(SiapeIndividualService::class);
        $mockSiapeIndividualService->shouldReceive('relatorioProcessamentoUnidade')
            ->once()
            ->with('26110')
            ->andReturn($relatorio);
        $this->app->instance(SiapeIndividualService::class, $mockSiapeIndividualService);

        $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
            ->postJson('/api/unidade/relatorio-processamento-siape', [
                'unidade' => '26110',
            ]);

        $response->assertOk()
            ->assertJsonPath('success', $relatorio['success'])
            ->assertJsonPath('chefeCpf', $relatorio['chefeCpf'])
            ->assertJsonPath('quantidadeServidoresLotados', $relatorio['quantidadeServidoresLotados'])
            ->assertJsonPath('unidade.id', $relatorio['unidade']['id'])
            ->assertJsonPath('unidade.unidade_pai_id', $relatorio['unidade']['unidade_pai_id'])
            ->assertJsonPath('unidade.unidade_pai_codigo', $relatorio['unidade']['unidade_pai_codigo'])
            ->assertJsonPath('unidade.unidade_pai_sigla', $relatorio['unidade']['unidade_pai_sigla'])
            ->assertJsonPath('unidade.unidade_raiz', $relatorio['unidade']['unidade_raiz']);
    });

    test('retorna erro quando unidade nao existe no relatorio agregado', function () {
        Sanctum::actingAs(Usuario::factory()->create());

        $mockSiapeIndividualService = Mockery::mock(SiapeIndividualService::class);
        $mockSiapeIndividualService->shouldReceive('relatorioProcessamentoUnidade')
            ->once()
            ->with('999999')
            ->andThrow(new Exception('Unidade 999999 não encontrada no Petrvs.'));
        $this->app->instance(SiapeIndividualService::class, $mockSiapeIndividualService);

        $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
            ->postJson('/api/unidade/relatorio-processamento-siape', [
                'unidade' => '999999',
            ]);

        $response->assertBadRequest()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Unidade 999999 não encontrada no Petrvs.');
    });
});

function xmlUnidadeResponse(string $codigo, ?string $cpfTitular = null): string
{
    $codUorg = str_pad($codigo, 6, '0', STR_PAD_LEFT);
    $cpfTitularXml = $cpfTitular === null
        ? ''
        : "<cpfTitularAutoridadeUorg xmlns=\"http://entidade.wssiapenet\">$cpfTitular</cpfTitularAutoridadeUorg>";

    return <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                <out xmlns="">
                    <codUorg xmlns="http://entidade.wssiapenet">$codUorg</codUorg>
                    $cpfTitularXml
                </out>
            </ns1:dadosUorgResponse>
        </soap:Body>
    </soap:Envelope>
    XML;
}
