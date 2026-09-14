<?php

namespace Tests\IntegrationTenant\Services;

use App\Models\Perfil;
use App\Models\SiapeListaUORGS;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
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

test('issue 2423 - carga parcial apos mudanca de matricula deve habilitar usuario para o PGD', function () {
    $cpf = '52998224725';
    $matriculaAntiga = '2423001';
    $matriculaNova = '2423002';
    $codigoUnidade = '24231';
    $emailFuncional = 'servidor.issue2423@teste.gov.br';

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'U2423',
        'nome' => 'Unidade Issue 2423',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Issue 2423',
        'email' => 'servidor-antigo.issue2423@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor 2423',
        'matricula' => $matriculaAntiga,
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

    $funcionaisRequest = 'xml-funcionais-request-2423';
    $pessoaisRequest = 'xml-pessoais-request-2423';
    $unidadeRequest = 'xml-unidade-request-2423';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matriculaNova}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                        <emailInstitucional>{$emailFuncional}</emailInstitucional>
                        <dataOcorrIngressoOrgao>01012026</dataOcorrIngressoOrgao>
                        <participaPGD>sim</participaPGD>
                        <modalidadePGD>Teletrabalho Parcial</modalidadePGD>
                    </tipo:DadosFuncionais>
                </out>
            </ns1:consultaDadosFuncionaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    $pessoaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
                <out></out>
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
                    <nomeExtendido>Unidade Issue 2423</nomeExtendido>
                    <siglaUorg>U2423</siglaUorg>
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

    $usuario->refresh();

    expect([
        'matricula' => $usuario->matricula,
        'modalidade_pgd' => $usuario->modalidade_pgd,
        'participa_pgd' => $usuario->participa_pgd,
        'email' => $usuario->email,
        'usuarios_com_cpf' => Usuario::where('cpf', $cpf)->count(),
    ])->toBe([
        'matricula' => $matriculaNova,
        'modalidade_pgd' => 'parcial',
        'participa_pgd' => 'sim',
        'email' => $emailFuncional,
        'usuarios_com_cpf' => 1,
    ]);
});

test('issue 2423 - carga parcial nao deve alterar usuario quando a nova matricula tem correlacao ambigua', function () {
    $cpf = '52998224725';
    $codigoUnidade = '24231';

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'U2423',
        'nome' => 'Unidade Issue 2423',
    ]);

    foreach (['2423001', '2423002'] as $matricula) {
        $usuario = Usuario::create([
            'nome' => "Servidor Issue 2423 {$matricula}",
            'email' => "servidor-{$matricula}.issue2423@teste.gov.br",
            'cpf' => $cpf,
            'apelido' => "Servidor {$matricula}",
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
    }

    $service = app(SiapeIndividualServidorService::class);
    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('atualizarDadosFuncionaisParciais');
    $method->setAccessible(true);
    $method->invoke($service, $cpf, [[
        'matriculaSiape' => '2423003',
        'codUorgExercicio' => $codigoUnidade,
        'codUorgLotacao' => $codigoUnidade,
        'emailInstitucional' => 'servidor-novo.issue2423@teste.gov.br',
        'participaPGD' => 'sim',
        'modalidadePGD' => 'Teletrabalho Parcial',
    ]], []);

    $usuarios = Usuario::where('cpf', $cpf)->orderBy('matricula')->get();

    expect($usuarios->pluck('matricula')->all())->toBe(['2423001', '2423002'])
        ->and($usuarios->pluck('modalidade_pgd')->all())->toBe([null, null])
        ->and($usuarios->pluck('participa_pgd')->all())->toBe(['não', 'não']);
});
