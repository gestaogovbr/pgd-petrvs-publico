<?php

namespace Tests\IntegrationTenant\Services;

use App\Models\Perfil;
use App\Models\SiapeListaUORGS;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\IntegracaoService;
use App\Services\IntegracaoServiceFactory;
use App\Services\NivelAcessoService;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualServidorService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Mockery;

beforeEach(function () {
    Bus::fake();

    Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_PARTICIPANTE],
        ['nome' => 'Participante', 'descricao' => 'Perfil participante']
    );
    Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_CONSULTA],
        ['nome' => 'Consulta', 'descricao' => 'Perfil consulta']
    );
});

afterEach(function () {
    Mockery::close();
});

test('issue 2423 - carga deve persistir dados PGD quando a sincronizacao final nao os aplica', function () {
    $cpf = '52998224725';
    $matricula = '2423101';
    $codigoUnidade = '24231';
    $codigoUnidadeLotacao = '24232';
    $emailFuncional = 'servidor.dados-minimos.issue2423@teste.gov.br';
    $emailAnterior = 'servidor-antigo.issue2423@teste.gov.br';

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'D2423',
        'nome' => 'Unidade Dados Minimos Issue 2423',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Dados Minimos Issue 2423',
        'email' => $emailAnterior,
        'cpf' => $cpf,
        'apelido' => 'Servidor 2423',
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO',
        'perfil_id' => NivelAcessoService::getPerfilParticipante()->id,
        'modalidade_pgd' => null,
        'participa_pgd' => 'não',
    ]);

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    SiapeListaUORGS::create([
        'id' => (string) Str::uuid(),
        'response' => '<uorgs />',
        'processado' => 0,
    ]);

    $funcionaisRequest = 'xml-funcionais-request-2423-dados-minimos';
    $pessoaisRequest = 'xml-pessoais-request-2423-dados-minimos';
    $unidadeRequest = 'xml-unidade-request-2423-dados-minimos';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:dadosFuncionais>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidadeLotacao}</codUorgLotacao>
                        <codOrgao>24230</codOrgao>
                        <codCargo>242301</codCargo>
                        <codSitFuncional>1</codSitFuncional>
                        <nomeSitFuncional>ATIVO PERMANENTE</nomeSitFuncional>
                        <codJornada>40</codJornada>
                        <nomeJornada>40 HORAS SEMANAIS</nomeJornada>
                        <emailInstitucional>{$emailFuncional}</emailInstitucional>
                        <dataOcorrIngressoOrgao>01012026</dataOcorrIngressoOrgao>
                        <participaPGD>sim</participaPGD>
                        <modalidadePGD>integral</modalidadePGD>
                    </tipo:DadosFuncionais>
                    </tipo:dadosFuncionais>
                </out>
            </ns1:consultaDadosFuncionaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    $pessoaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
                <out>
                    <nome>Servidor Dados Minimos Issue 2423</nome>
                    <nomeSexo>FEMININO</nomeSexo>
                    <nomeMunicipNasc>Brasilia</nomeMunicipNasc>
                    <ufNascimento>DF</ufNascimento>
                    <dataNascimento>01011990</dataNascimento>
                </out>
            </ns1:consultaDadosPessoaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    $unidadeResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                <out>
                    <codUorg>{$codigoUnidade}</codUorg>
                    <codUorgPai></codUorgPai>
                    <codUorgPagadora>{$codigoUnidade}</codUorgPagadora>
                    <nomeExtendido>Unidade Dados Minimos Issue 2423</nomeExtendido>
                    <siglaUorg>D2423</siglaUorg>
                    <dataUltimaTransacao>01012026</dataUltimaTransacao>
                </out>
            </ns1:dadosUorgResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
    $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn($funcionaisRequest);
    $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn($pessoaisRequest);
    $buscarDadosServidor->shouldReceive('executaRequisicao')
        ->with($funcionaisRequest)
        ->andReturn($funcionaisResponse);
    $buscarDadosServidor->shouldReceive('executaRequisicao')
        ->with($pessoaisRequest)
        ->andReturn($pessoaisResponse);

    $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
    $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn($unidadeRequest);
    $buscarDadosUnidade->shouldReceive('executaRequisicao')
        ->with($unidadeRequest)
        ->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoUnidade,
        'dataUltimaTransacao' => '01012026',
    ]]);

    $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
    $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();

    $integracaoService = Mockery::mock(IntegracaoService::class);
    $integracaoService->shouldReceive('sincronizar')->zeroOrMoreTimes()->andReturn([]);

    $integracaoServiceFactory = Mockery::mock(IntegracaoServiceFactory::class);
    $integracaoServiceFactory->shouldReceive('make')->andReturn($integracaoService);
    $this->app->instance(IntegracaoServiceFactory::class, $integracaoServiceFactory);

    $siapeService = app(SiapeIndividualService::class);
    $reflection = new \ReflectionClass(SiapeIndividualService::class);

    foreach ([
        'buscarDadosSiapeServidor' => $buscarDadosServidor,
        'buscarDadosSiapeUnidade' => $buscarDadosUnidade,
        'buscarDadosSiapeUnidades' => $buscarDadosUnidades,
        'processaDadosSiape' => new ProcessaDadosSiapeBD(),
    ] as $property => $value) {
        $reflectionProperty = $reflection->getProperty($property);
        $reflectionProperty->setAccessible(true);
        $reflectionProperty->setValue($siapeService, $value);
    }

    $this->app->instance(SiapeIndividualService::class, $siapeService);

    Sanctum::actingAs(Usuario::factory()->create());

    $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/usuario/processar-siape', ['cpf' => $cpf]);

    $response->assertOk();
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('relatorio_carga.status', 'parcial');

    $usuario->refresh();

    expect($usuario->matricula)->toBe($matricula)
        ->and($usuario->modalidade_pgd)->toBe('integral')
        ->and($usuario->participa_pgd)->toBe('sim')
        ->and($usuario->email)->toBe($emailAnterior);
});

test('issue 2423 - dados pessoais validos nao devem aplicar PGD de nova matricula no vinculo antigo', function () {
    $cpf = '52998224725';
    $matriculaAnterior = '2423201';
    $matriculaNova = '2423202';
    $codigoUnidade = '24232';
    $emailAnterior = 'vinculo-antigo.issue2423@teste.gov.br';

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'V2423',
        'nome' => 'Unidade Vinculo Issue 2423',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Vinculo Antigo Issue 2423',
        'email' => $emailAnterior,
        'cpf' => $cpf,
        'apelido' => 'Vinculo antigo 2423',
        'matricula' => $matriculaAnterior,
        'situacao_siape' => 'ATIVO',
        'perfil_id' => NivelAcessoService::getPerfilParticipante()->id,
        'modalidade_pgd' => null,
        'participa_pgd' => 'não',
    ]);

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    $service = app(SiapeIndividualServidorService::class);
    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('atualizarDadosFuncionaisParciais');
    $method->setAccessible(true);
    $method->invoke($service, $cpf, [[
        'matriculaSiape' => $matriculaNova,
        'codUorgExercicio' => $codigoUnidade,
        'codUorgLotacao' => $codigoUnidade,
        'emailInstitucional' => 'vinculo-novo.issue2423@teste.gov.br',
        'participaPGD' => 'sim',
        'modalidadePGD' => 'integral',
    ]], ['nome' => 'Servidor Vinculo Novo Issue 2423']);

    $usuario->refresh();

    expect($usuario->matricula)->toBe($matriculaAnterior)
        ->and($usuario->modalidade_pgd)->toBeNull()
        ->and($usuario->participa_pgd)->toBe('não')
        ->and($usuario->email)->toBe($emailAnterior);
});
