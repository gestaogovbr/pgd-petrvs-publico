<?php

namespace Tests\IntegrationTenant\Services;

use App\Enums\UsuarioSituacaoSiape;
use App\Models\Perfil;
use App\Models\SiapeBlackListServidor;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\SiapeListaUORGS;
use App\Services\NivelAcessoService;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoService;
use App\Services\ProcessadorAtualizacaoDadosSiapeService;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualServidorService;
use App\Services\UnidadeIntegranteService;
use App\Services\UsuarioService;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Mockery;


// Uses DatabaseTenantTestCase implicitly via folder configuration in Pest.php

beforeEach(function () {
    // No manual schema creation needed!
    // DatabaseTenantTestCase handles tenant creation and schema loading.
    Bus::fake();

    Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_PARTICIPANTE],
        ['nome' => 'Participante', 'descricao' => 'Perfil participante']
    );
    Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_CONSULTA],
        ['nome' => 'Consulta', 'descricao' => 'Perfil consulta']
    );

    $this->service = app(SiapeIndividualServidorService::class);

    // Mock external service
    $this->mockSiapeService = Mockery::mock(SiapeIndividualService::class);
    $this->mockSiapeService->config = [
        'codOrgao' => '12345',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'SISTEMA TESTE',
        'senha' => 'senha',
        'parmExistPag' => 'S',
        'parmTipoVinculo' => '1'
    ];
});

afterEach(function () {
    Mockery::close();
});

test('deve identificar usuario novo no resumo', function () {
    $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);

    // Ensure user does not exist
    $this->assertDatabaseMissing('usuarios', ['cpf' => $cpf], 'tenant');

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $usuariosAntes = [];

    // Create user manually to simulate insertion
    $usuario = Usuario::create([
        'nome' => 'Novo Usuario',
        'email' => 'novo@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Novo',
        'matricula' => '11111',
        'modalidade_pgd' => 'presencial'
    ]);

    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo)->toHaveCount(1);
    expect($resumo[0]['nome'])->toBe('Novo Usuario');
    expect($resumo[0]['usuario_existia'])->toBeFalse();
    expect($resumo[0]['usuario_inserido'])->toBeTrue();
});

test('deve identificar usuario existente no resumo', function () {
    $cpf = '98765432109';

    $usuario = Usuario::create([
        'nome' => 'Usuario Existente',
        'email' => 'existente@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Existente',
        'matricula' => '22222',
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial'
    ]);

    $usuariosAntes = [[
        'id' => $usuario->id,
        'matricula' => $usuario->matricula,
        'nome' => $usuario->nome,
        'email' => $usuario->email,
        'situacao_siape' => $usuario->situacao_siape,
        'lotacao_id' => null
    ]];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo)->toHaveCount(1);
    expect($resumo[0]['nome'])->toBe('Usuario Existente');
    expect($resumo[0]['usuario_existia'])->toBeTrue();
    expect($resumo[0]['usuario_inserido'])->toBeFalse();
});

test('deve identificar alteracoes no usuario', function () {
     $cpf = '11122233344';

     $usuario = Usuario::create([
        'nome' => 'Nome Novo',
        'email' => 'mudanca@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Mudanca',
        'matricula' => '33333',
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial'
    ]);

     $usuariosAntes = [[
         'id' => $usuario->id,
         'matricula' => $usuario->matricula,
         'nome' => 'Nome Antigo',
         'email' => $usuario->email,
         'situacao_siape' => $usuario->situacao_siape,
         'lotacao_id' => null
     ]];

     $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
     $method = $reflection->getMethod('gerarResumo');
     $method->setAccessible(true);

     $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

     expect($resumo[0]['usuario_existia'])->toBeTrue();
     expect($resumo[0]['alteracoes'])->toContain('nome');
});

test('deve retornar parcial se lotacao falhar para usuario existente', function () {
    $cpf = '55566677788';

    $usuario = Usuario::create([
        'nome' => 'Usuario Sem Lotacao',
        'email' => 'semlotacao@teste.com',
        'cpf' => $cpf,
        'apelido' => 'SemLotacao',
        'matricula' => '44444',
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial'
    ]);

    $usuariosAntes = [[
        'id' => $usuario->id,
        'matricula' => $usuario->matricula,
        'nome' => $usuario->nome,
        'email' => $usuario->email,
        'situacao_siape' => $usuario->situacao_siape,
        'lotacao_id' => null
    ]];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo[0]['usuario_existia'])->toBeTrue();
    expect($resumo[0]['lotacao_associada'])->toBeFalse();
    expect($resumo[0]['status'])->toBe('parcial');
    expect($resumo[0]['mensagem'])->toContain('Lotação não associada');
});

test('deve gerenciar blacklist corretamente para multiplas matriculas', function () {
    $cpf = '11122233344';

    $userA = Usuario::create([
        'nome' => 'User A',
        'email' => 'a@test.com',
        'cpf' => $cpf,
        'matricula' => '11111',
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial'
    ]);

    $userB = Usuario::create([
        'nome' => 'User B',
        'email' => 'b@test.com',
        'cpf' => $cpf,
        'matricula' => '22222',
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial'
    ]);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => '11111',
        'response' => 'test'
    ]);

    $dadosFuncionais = [
        ['matriculaSiape' => '11111', 'codUorgExercicio' => '123'],
        ['matriculaSiape' => '33333', 'codUorgExercicio' => '123']
    ];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('removeVinculoParaforcarSerLotadoNovamente');
    $method->setAccessible(true);

    $method->invokeArgs($this->service, [$cpf, $dadosFuncionais]);

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => '11111'
    ]);

    $this->assertDatabaseHas('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => '22222'
    ]);
});

test('processaDadosFuncionais reativa servidor encontrado no siape e remove blacklist', function () {
    $cpf = '01428751637';
    $matricula = '1234567';

    $usuario = Usuario::create([
        'nome' => 'Servidor Reativado',
        'email' => 'reativado@teste.com',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'situacao_siape' => 'INATIVO',
        'data_ativacao_temporaria' => now()->subDay(),
        'justicativa_ativacao_temporaria' => 'teste',
        'modalidade_pgd' => 'presencial',
    ]);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => null,
        'response' => 'fault anterior',
    ]);
    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => 'matricula ausente anteriormente',
    ]);

    $xml = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:resp xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <tipo:DadosFuncionais>
                    <matriculaSiape>$matricula</matriculaSiape>
                    <codUorgExercicio>27</codUorgExercicio>
                </tipo:DadosFuncionais>
            </ns1:resp>
        </soap:Body>
    </soap:Envelope>
    XML;

    $dados = (new ProcessaDadosSiapeBD())->processaDadosFuncionais($cpf, $xml);

    expect($dados)->toHaveCount(1)
        ->and($dados[0]['matriculaSiape'])->toBe($matricula);

    $usuario->refresh();
    expect($usuario->situacao_siape)->toBe('ATIVO')
        ->and($usuario->data_ativacao_temporaria)->toBeNull()
        ->and($usuario->justicativa_ativacao_temporaria)->toBeNull();

    expect(SiapeBlackListServidor::where('cpf', $cpf)->exists())->toBeFalse();
});

test('matricula ativa preserva lotacao existente durante carga individual', function () {
    $cpf = '02852091240';
    $matricula = '7654321';
    $unidade = Unidade::factory()->create(['codigo' => '27']);
    $usuario = Usuario::create([
        'nome' => 'Servidor Com Lotacao',
        'email' => 'lotado@teste.com',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO',
        'modalidade_pgd' => 'presencial',
    ]);

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);
    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('removeVinculoParaforcarSerLotadoNovamente');
    $method->setAccessible(true);

    $method->invokeArgs($this->service, [$cpf, [
        ['matriculaSiape' => $matricula, 'codUorgExercicio' => '27'],
    ]]);

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
        'deleted_at' => null,
    ], 'tenant');
});

test('issue 2175 - endpoint processar siape deve reativar usuario inativo localizado no SIAPE e remover blacklist', function () {
    $cpf = '52998224725';
    $matricula = '1170001';
    $codigoUnidade = '17';

    $perfilConsulta = NivelAcessoService::getPerfilConsulta();
    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'SPRU',
        'nome' => 'Unidade SIAPE 17',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Issue 2175',
        'email' => 'servidor.issue2175@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor 2175',
        'matricula' => $matricula,
        'situacao_siape' => 'INATIVO',
        'perfil_id' => $perfilConsulta->id,
        'modalidade_pgd' => 'presencial',
    ]);

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'COLABORADOR',
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    SiapeBlackListServidor::create([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => null,
        'response' => 'fault anterior',
        'inativado' => 0,
    ]);

    SiapeListaUORGS::create([
        'id' => (string) Str::uuid(),
        'response' => '<uorgs />',
        'processado' => 0,
    ]);

    $funcionaisRequest = 'xml-funcionais-request';
    $pessoaisRequest = 'xml-pessoais-request';
    $unidadeRequest = 'xml-unidade-request';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                        <emailInstitucional>servidor.issue2175@teste.gov.br</emailInstitucional>
                        <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
                        <participaPGD>sim</participaPGD>
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
                <out>
                    <nome>Servidor Issue 2175</nome>
                    <nomeSexo>MASCULINO</nomeSexo>
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
                    <nomeExtendido>Unidade SIAPE 17</nomeExtendido>
                    <siglaUorg>SPRU</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
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
    $buscarDadosUnidade->shouldReceive('executaRequisicao')->with($unidadeRequest)->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoUnidade,
        'dataUltimaTransacao' => '01012024',
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
    $response->assertJsonPath('resumo.0.status', 'sucesso');
    $response->assertJsonPath('resumo.0.usuario_existia', true);
    $response->assertJsonPath('resumo.0.lotacao_associada', true);

    $usuario->refresh();
    $alteracoes = $response->json('resumo.0.alteracoes');

    expect($alteracoes)->toContain('situacao_siape')
        ->and($usuario->situacao_siape)->toBe('ATIVO');

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => null,
        'deleted_at' => null,
    ], 'tenant');

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
        'deleted_at' => null,
    ], 'tenant');

    expect($usuario->perfil_id)->toBe($perfilParticipante->id)
        ->and($usuario->perfil_id)->not->toBe($perfilConsulta->id);
});

test('issue 2175 - processamento funcional deve converter ativo temporario em ativo e trocar perfil consulta', function () {
    $cpf = '52998224726';
    $matricula = '1170002';

    $perfilConsulta = NivelAcessoService::getPerfilConsulta();
    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $usuario = Usuario::create([
        'nome' => 'Servidor Temporario Issue 2175',
        'email' => 'servidor.temporario.issue2175@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor Temporario 2175',
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO_TEMPORARIO',
        'perfil_id' => $perfilConsulta->id,
        'modalidade_pgd' => 'presencial',
        'data_ativacao_temporaria' => now(),
        'justicativa_ativacao_temporaria' => 'Ativacao manual para teste',
    ]);

    SiapeBlackListServidor::create([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => 'fault anterior',
        'inativado' => 0,
    ]);

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>17</codUorgExercicio>
                        <codUorgLotacao>17</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                    </tipo:DadosFuncionais>
                </out>
            </ns1:consultaDadosFuncionaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    (new ProcessaDadosSiapeBD())->processaDadosFuncionais($cpf, $funcionaisResponse);

    $usuario->refresh();

    expect($usuario->situacao_siape)->toBe('ATIVO')
        ->and($usuario->perfil_id)->toBe($perfilParticipante->id)
        ->and($usuario->perfil_id)->not->toBe($perfilConsulta->id)
        ->and($usuario->data_ativacao_temporaria)->toBeNull()
        ->and($usuario->justicativa_ativacao_temporaria)->toBeNull();

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => $matricula,
        'deleted_at' => null,
    ], 'tenant');
});

test('issue 2175 - reativacao definitiva restaura participante lotado em qualquer inativacao', function (
    string $situacaoInicial,
    string $cpf,
    string $matricula,
) {
    $codigoUnidade = '27';

    $perfilConsulta = NivelAcessoService::getPerfilConsulta();
    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'R2175',
        'nome' => 'Unidade Reativacao 2175',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Reativacao 2175',
        'email' => 'reativacao.issue2175@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Reativacao 2175',
        'matricula' => $matricula,
        'situacao_siape' => $situacaoInicial,
        'perfil_id' => $perfilConsulta->id,
        'modalidade_pgd' => 'presencial',
        'data_ativacao_temporaria' => now()->subDay(),
        'justicativa_ativacao_temporaria' => 'Ativacao temporaria para regressao',
    ]);

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    SiapeBlackListServidor::create([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => null,
        'response' => 'cpf ausente anteriormente',
        'inativado' => 0,
    ]);

    SiapeBlackListServidor::create([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => 'matricula ausente anteriormente',
        'inativado' => 0,
    ]);

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                    </tipo:DadosFuncionais>
                </out>
            </ns1:consultaDadosFuncionaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;

    (new ProcessaDadosSiapeBD())->processaDadosFuncionais($cpf, $funcionaisResponse);

    $usuario->refresh();

    expect($usuario->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value)
        ->and($usuario->perfil_id)->toBe($perfilParticipante->id)
        ->and($usuario->perfil_id)->not->toBe($perfilConsulta->id)
        ->and($usuario->data_ativacao_temporaria)->toBeNull()
        ->and($usuario->justicativa_ativacao_temporaria)->toBeNull();

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'deleted_at' => null,
    ], 'tenant');

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
        'deleted_at' => null,
    ], 'tenant');
})->with([
    'usuario inativo' => [UsuarioSituacaoSiape::INATIVO->value, '52998224731', '2175011'],
    'usuario ativo temporario' => [UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value, '52998224732', '2175012'],
]);

test('issue 2185 - carga individual deve usar emailServidor e sinalizar parcial quando dados funcionais ficam incompletos', function () {
    $cpf = '52998224725';
    $matricula = '1180001';
    $codigoUnidade = '18';
    $emailServidor = 'servidor.issue2185@teste.gov.br';

    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'S2185',
        'nome' => 'Unidade SIAPE 2185',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Issue 2185',
        'email' => null,
        'cpf' => $cpf,
        'apelido' => 'Servidor 2185',
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO',
        'perfil_id' => $perfilParticipante->id,
        'modalidade_pgd' => 'presencial',
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

    $funcionaisRequest = 'xml-funcionais-request-2185';
    $pessoaisRequest = 'xml-pessoais-request-2185';
    $unidadeRequest = 'xml-unidade-request-2185';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                        <emailInstitucional></emailInstitucional>
                        <emailServidor>{$emailServidor}</emailServidor>
                        <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
                        <participaPGD>sim</participaPGD>
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
                <out>
                    <nome>Servidor Issue 2185</nome>
                    <nomeSexo>MASCULINO</nomeSexo>
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
                    <nomeExtendido>Unidade SIAPE 2185</nomeExtendido>
                    <siglaUorg>S2185</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
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
    $buscarDadosUnidade->shouldReceive('executaRequisicao')->with($unidadeRequest)->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoUnidade,
        'dataUltimaTransacao' => '01012024',
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
    $response->assertJsonPath('resumo.0.status', 'parcial');
    $response->assertJsonPath('relatorio_carga.status', 'parcial');
    $response->assertJsonPath('resumo.0.usuario_existia', true);

    $usuario->refresh();
    $alteracoes = $response->json('resumo.0.alteracoes');

    expect($usuario->email)->toBe($emailServidor)
        ->and($alteracoes)->toContain('email');
});

test('issue 2313 - carga individual deve persistir modalidade e participa pgd de usuario existente', function () {
    $cpf = '52998224725';
    $matricula = '2313002';
    $codigoUnidade = '23132';
    $emailServidor = 'servidor.modalidade.issue2313@teste.gov.br';

    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'M2313',
        'nome' => 'Unidade Modalidade Issue 2313',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Modalidade Issue 2313',
        'email' => 'modalidade-antiga.issue2313@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor Modalidade 2313',
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO',
        'perfil_id' => $perfilParticipante->id,
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

    $funcionaisRequest = 'xml-funcionais-request-2313-modalidade';
    $pessoaisRequest = 'xml-pessoais-request-2313-modalidade';
    $unidadeRequest = 'xml-unidade-request-2313-modalidade';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                        <emailInstitucional>{$emailServidor}</emailInstitucional>
                        <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
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
                <out>
                    <nome>Servidor Modalidade Issue 2313</nome>
                    <nomeSexo>MASCULINO</nomeSexo>
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
                    <nomeExtendido>Unidade Modalidade Issue 2313</nomeExtendido>
                    <siglaUorg>M2313</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
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
    $buscarDadosUnidade->shouldReceive('executaRequisicao')->with($unidadeRequest)->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoUnidade,
        'dataUltimaTransacao' => '01012024',
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
    $response->assertJsonPath('resumo.0.status', 'parcial');
    $response->assertJsonPath('resumo.0.usuario_existia', true);
    $response->assertJsonPath('resumo.0.lotacao_associada', true);

    $usuario->refresh();

    expect($usuario->modalidade_pgd)->toBe('parcial')
        ->and($usuario->participa_pgd)->toBe('sim')
        ->and($usuario->email)->toBe($emailServidor);
});

test('issue 2313 - carga parcial com dados pessoais invalidos deve persistir modalidade funcional', function () {
    $cpf = '52998224725';
    $matricula = '2313003';
    $codigoUnidade = '23133';
    $emailServidor = 'servidor.parcial-modalidade.issue2313@teste.gov.br';

    $perfilParticipante = NivelAcessoService::getPerfilParticipante();

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'P2313',
        'nome' => 'Unidade Parcial Modalidade Issue 2313',
    ]);

    $usuario = Usuario::create([
        'nome' => 'Servidor Parcial Modalidade Issue 2313',
        'email' => 'parcial-modalidade-antiga.issue2313@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor Parcial Modalidade 2313',
        'matricula' => $matricula,
        'situacao_siape' => 'ATIVO',
        'perfil_id' => $perfilParticipante->id,
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

    $funcionaisRequest = 'xml-funcionais-request-2313-modalidade-parcial';
    $pessoaisRequest = 'xml-pessoais-request-2313-modalidade-parcial';
    $unidadeRequest = 'xml-unidade-request-2313-modalidade-parcial';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio>{$codigoUnidade}</codUorgExercicio>
                        <codUorgLotacao>{$codigoUnidade}</codUorgLotacao>
                        <codSitFuncional>1</codSitFuncional>
                        <emailInstitucional>{$emailServidor}</emailInstitucional>
                        <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
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
                    <nomeExtendido>Unidade Parcial Modalidade Issue 2313</nomeExtendido>
                    <siglaUorg>P2313</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
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
    $buscarDadosUnidade->shouldReceive('executaRequisicao')->with($unidadeRequest)->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoUnidade,
        'dataUltimaTransacao' => '01012024',
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
    $response->assertJsonPath('resumo.0.status', 'parcial');
    $response->assertJsonPath('resumo.0.usuario_existia', true);

    $usuario->refresh();

    expect($usuario->modalidade_pgd)->toBe('parcial')
        ->and($usuario->participa_pgd)->toBe('sim')
        ->and($usuario->email)->toBe($emailServidor);
});

test('issue 2093 - carga individual deve lotar contrato temporario e sinalizar parcial quando exercicio vem vazio', function () {
    $cpf = '52998224725';
    $matricula = '2093001';
    $codigoLotacao = '1281';
    $siglaLotacao = 'UPAGT';
    $emailServidor = 'servidor.temporario.issue2093@teste.gov.br';

    $unidade = Unidade::factory()->create([
        'codigo' => $codigoLotacao,
        'sigla' => $siglaLotacao,
        'nome' => 'Unidade Temporaria Issue 2093',
    ]);

    SiapeListaUORGS::create([
        'id' => (string) Str::uuid(),
        'response' => '<uorgs />',
        'processado' => 0,
    ]);

    $funcionaisRequest = 'xml-funcionais-request-2093';
    $pessoaisRequest = 'xml-pessoais-request-2093';
    $unidadeRequest = 'xml-unidade-request-2093';

    $funcionaisResponse = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>
                    <tipo:DadosFuncionais>
                        <matriculaSiape>{$matricula}</matriculaSiape>
                        <codUorgExercicio></codUorgExercicio>
                        <codUorgLotacao>00000{$codigoLotacao}</codUorgLotacao>
                        <siglaUorgLotacao>{$siglaLotacao}</siglaUorgLotacao>
                        <codSitFuncional>12</codSitFuncional>
                        <emailInstitucional></emailInstitucional>
                        <emailServidor>{$emailServidor}</emailServidor>
                        <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
                        <participaPGD>sim</participaPGD>
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
                <out>
                    <nome>Servidor Temporario Issue 2093</nome>
                    <nomeSexo>MASCULINO</nomeSexo>
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
                    <codUorg>{$codigoLotacao}</codUorg>
                    <codUorgPai></codUorgPai>
                    <codUorgPagadora>{$codigoLotacao}</codUorgPagadora>
                    <nomeExtendido>Unidade Temporaria Issue 2093</nomeExtendido>
                    <siglaUorg>{$siglaLotacao}</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
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
    $buscarDadosUnidade->shouldReceive('executaRequisicao')->with($unidadeRequest)->andReturn($unidadeResponse);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([[
        'codigo' => $codigoLotacao,
        'dataUltimaTransacao' => '01012024',
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
    $response->assertJsonPath('resumo.0.status', 'parcial');
    $response->assertJsonPath('relatorio_carga.status', 'parcial');
    $response->assertJsonPath('resumo.0.usuario_inserido', true);
    $response->assertJsonPath('resumo.0.lotacao_associada', true);

    $usuario = Usuario::where('cpf', $cpf)->where('matricula', $matricula)->first();

    expect($usuario)->not->toBeNull()
        ->and($usuario->email)->toBe($emailServidor);

    $this->assertDatabaseHas('unidades_integrantes', [
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'deleted_at' => null,
    ], 'tenant');
});

test('issue 2313 - cadastro de usuario ausente com exercicio nulo nao deve abortar sincronizacao', function () {
    $cpf = '52998224733';
    $matricula = '2313001';

    $vinculoSemExercicio = (object) [
        'cpf' => $cpf,
        'codigo_orgao' => '20000',
        'matricula' => $matricula,
        'exercicio' => null,
        'nome' => 'Servidor Issue 2313',
        'apelido' => 'Servidor 2313',
        'telefone' => null,
        'data_nascimento' => '1990-01-01',
        'sexo' => 'MASCULINO',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => null,
        'uf' => 'DF',
        'data_modificacao' => '2026-07-14',
        'ident_unica' => 'ISSUE2313',
        'emailfuncional' => 'servidor.issue2313@teste.gov.br',
    ];

    $integracaoServidorRepository = Mockery::mock(IntegracaoServidorRepository::class);
    $integracaoServidorRepository->shouldReceive('getUsuariosAusentes')
        ->once()
        ->andReturn([$vinculoSemExercicio]);

    $unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $unidadeRepository->shouldReceive('findByCodigo')->never();

    $registro = new Usuario([
        'id' => (string) Str::uuid(),
        'nome' => 'Servidor Issue 2313',
        'email' => 'servidor.issue2313@teste.gov.br',
        'cpf' => $cpf,
        'apelido' => 'Servidor 2313',
        'matricula' => $matricula,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => null,
    ]);

    $usuarioService = Mockery::mock(UsuarioService::class);
    $usuarioService->shouldReceive('verificaSeUsuarioSoMudouMatricula')
        ->once()
        ->with($cpf, null, $matricula, null, Mockery::on(fn ($batch) => is_array($batch)))
        ->andReturn(true);
    $usuarioService->shouldReceive('gerarUsuario')
        ->once()
        ->andReturn($registro);

    $integracaoService = Mockery::mock(IntegracaoService::class);
    $integracaoService->shouldReceive('validarModalidadePgd')->once()->with('')->andReturn(null);
    $integracaoService->shouldReceive('liberarEmailDuplicadoDefinindoComoNulo')
        ->once()
        ->with('servidor.issue2313@teste.gov.br', $matricula);

    $usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $usuarioCriado = new Usuario(['id' => (string) Str::uuid(), 'matricula' => $matricula]);
    $usuarioRepository->shouldReceive('create')
        ->once()
        ->with(Mockery::on(fn (array $attributes) => ($attributes['matricula'] ?? null) === $matricula))
        ->andReturn($usuarioCriado);

    $unidadeIntegrante = Mockery::mock(UnidadeIntegranteService::class);
    $unidadeIntegrante->shouldReceive('salvarIntegrantes')->never();

    $service = app(ProcessadorAtualizacaoDadosSiapeService::class);
    $reflection = new \ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);

    foreach ([
        'integracaoServidorRepository' => $integracaoServidorRepository,
        'unidadeRepository' => $unidadeRepository,
        'usuarioRepository' => $usuarioRepository,
    ] as $propertyName => $value) {
        $property = $reflection->getProperty($propertyName);
        $property->setAccessible(true);
        $property->setValue($service, $value);
    }

    $resultProperty = $reflection->getProperty('result');
    $resultProperty->setAccessible(true);
    $resultProperty->setValue($service, [
        'unidades' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
        'servidores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
        'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
    ]);

    $usuarioComumProperty = $reflection->getProperty('usuarioComum');
    $usuarioComumProperty->setAccessible(true);
    $usuarioComumProperty->setValue($service, 'Participante');

    $servicesProperty = $reflection->getParentClass()->getProperty('_services');
    $servicesProperty->setAccessible(true);
    $servicesProperty->setValue($service, [
        'usuarioService' => $usuarioService,
        'integracaoService' => $integracaoService,
        'unidadeIntegrante' => $unidadeIntegrante,
    ]);

    $method = $reflection->getMethod('cadastrarUsuariosAusentes');
    $method->setAccessible(true);

    expect(fn () => $method->invoke($service))->not->toThrow(\Throwable::class);
});

test('issue 2163 - backend deve salvar atribuicoes de usuario interno com email nulo', function () {
    $perfilDesenvolvedor = Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_DESENVOLVEDOR],
        ['nome' => 'Desenvolvedor', 'descricao' => 'Perfil desenvolvedor']
    );
    $perfilParticipante = Perfil::firstOrCreate(
        ['nivel' => NivelAcessoService::PERFIL_PARTICIPANTE],
        ['nome' => 'Participante', 'descricao' => 'Perfil participante']
    );

    $admin = Usuario::factory()->create([
        'email' => 'admin.issue2163@teste.gov.br',
        'perfil_id' => $perfilDesenvolvedor->id,
    ]);
    Sanctum::actingAs($admin);

    $usuario = Usuario::create([
        'nome' => 'Servidor Issue 2163',
        'email' => null,
        'cpf' => '52998224726',
        'apelido' => 'Servidor 2163',
        'matricula' => '1190001',
        'usuario_externo' => 0,
        'perfil_id' => $perfilParticipante->id,
        'modalidade_pgd' => 'presencial',
    ]);

    $unidadeLotacao = Unidade::factory()->create([
        'codigo' => '19',
        'sigla' => 'L2163',
        'nome' => 'Lotacao Issue 2163',
    ]);
    $unidadeVinculo = Unidade::factory()->create([
        'codigo' => '20',
        'sigla' => 'V2163',
        'nome' => 'Vinculo Issue 2163',
    ]);

    $service = app(UsuarioService::class);

    $service->store([
        'id' => $usuario->id,
        'email' => null,
        'usuario_externo' => 0,
        'perfil_id' => $perfilParticipante->id,
        'integrantes' => [[
            'unidade_id' => $unidadeLotacao->id,
            'atribuicoes' => ['LOTADO'],
        ], [
            'unidade_id' => $unidadeVinculo->id,
            'atribuicoes' => ['COLABORADOR'],
        ]],
    ], null);

    $usuario->refresh();

    expect($usuario->email)->toBeNull();

    $integrante = UnidadeIntegrante::where('usuario_id', $usuario->id)
        ->where('unidade_id', $unidadeVinculo->id)
        ->first();

    expect($integrante)->not->toBeNull();

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'COLABORADOR',
        'deleted_at' => null,
    ], 'tenant');
});

function prepararPerfisSiapeIndividualServidor(): void
{
    foreach ([
        NivelAcessoService::PERFIL_CONSULTA => 'Consulta',
        NivelAcessoService::PERFIL_PARTICIPANTE => 'Participante',
    ] as $nivel => $nome) {
        Perfil::firstOrCreate(
            ['nivel' => $nivel],
            [
                'id' => (string) Str::uuid(),
                'nome' => $nome,
                'descricao' => $nome,
            ]
        );
    }
}
