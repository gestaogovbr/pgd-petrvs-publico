<?php

use App\Models\Capacidade;
use App\Models\Perfil;
use App\Models\SiapeListaUORGS;
use App\Models\TipoCapacidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Services\SiapeIndividualService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    Bus::fake();

    if (!Schema::connection('tenant')->hasTable('cargas_individuais_siape_relatorios')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_04_22_000000_create_cargas_individuais_siape_relatorios_table.php',
            '--database' => 'tenant',
            '--force' => true,
        ]);
    }
});

afterEach(function () {
    Mockery::close();
});

function issue2209UsuarioAutorizado(): Usuario
{
    $perfil = Perfil::factory()->create();
    $tipoCapacidade = TipoCapacidade::create([
        'id' => (string) Str::uuid(),
        'codigo' => 'MOD_SIAPE_RELATORIO_CARGA',
        'descricao' => 'Relatorio de carga individual SIAPE',
    ]);
    Capacidade::create([
        'id' => (string) Str::uuid(),
        'perfil_id' => $perfil->id,
        'tipo_capacidade_id' => $tipoCapacidade->id,
    ]);

    return Usuario::factory()->create(['perfil_id' => $perfil->id]);
}

/**
 * @param array<int, array{matricula: string, unidade: string, email: string}> $vinculos
 */
function issue2209XmlFuncionais(array $vinculos): string
{
    $dados = collect($vinculos)->map(fn(array $vinculo) => <<<XML
        <tipo:DadosFuncionais>
            <matriculaSiape>{$vinculo['matricula']}</matriculaSiape>
            <codUorgExercicio>{$vinculo['unidade']}</codUorgExercicio>
            <codUorgLotacao>{$vinculo['unidade']}</codUorgLotacao>
            <codSitFuncional>1</codSitFuncional>
            <nomeSitFuncional>ATIVO PERMANENTE</nomeSitFuncional>
            <emailInstitucional>{$vinculo['email']}</emailInstitucional>
            <dataOcorrIngressoOrgao>01012024</dataOcorrIngressoOrgao>
            <nomeJornada>40 horas semanais</nomeJornada>
            <codJornada>40</codJornada>
            <participaPGD>sim</participaPGD>
            <modalidadePGD>presencial</modalidadePGD>
        </tipo:DadosFuncionais>
    XML)->implode("\n");

    return <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <out>{$dados}</out>
            </ns1:consultaDadosFuncionaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;
}

function issue2209XmlPessoais(): string
{
    return <<<'XML'
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
                <out>
                    <nome>Servidor Multiplos Vinculos</nome>
                    <nomeSexo>MASCULINO</nomeSexo>
                    <nomeMunicipNasc>Brasilia</nomeMunicipNasc>
                    <ufNascimento>DF</ufNascimento>
                    <dataNascimento>01011990</dataNascimento>
                </out>
            </ns1:consultaDadosPessoaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;
}

function issue2209XmlUnidade(string $codigo): string
{
    return <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                <out>
                    <codUorg>{$codigo}</codUorg>
                    <codUorgPai></codUorgPai>
                    <codUorgPagadora>{$codigo}</codUorgPagadora>
                    <nomeExtendido>Unidade {$codigo}</nomeExtendido>
                    <siglaUorg>U{$codigo}</siglaUorg>
                    <dataUltimaTransacao>01012024</dataUltimaTransacao>
                </out>
            </ns1:dadosUorgResponse>
        </soap:Body>
    </soap:Envelope>
    XML;
}

/**
 * @param array<int, array{matricula: string, unidade: string, email: string}> $vinculos
 */
function issue2209ConfigurarSiape(array $vinculos): void
{
    SiapeListaUORGS::create([
        'id' => (string) Str::uuid(),
        'response' => '<uorgs />',
        'processado' => 0,
    ]);

    $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
    $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('issue-2209-funcionais');
    $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('issue-2209-pessoais');
    $buscarDadosServidor->shouldReceive('executaRequisicao')
        ->with('issue-2209-funcionais')
        ->andReturn(issue2209XmlFuncionais($vinculos));
    $buscarDadosServidor->shouldReceive('executaRequisicao')
        ->with('issue-2209-pessoais')
        ->andReturn(issue2209XmlPessoais());

    $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
    $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('00000000000');
    $buscarDadosUnidade->shouldReceive('getUorgAsXml')
        ->andReturnUsing(fn(...$argumentos) => 'issue-2209-unidade-' . end($argumentos));
    $buscarDadosUnidade->shouldReceive('executaRequisicao')
        ->andReturnUsing(function (string $request): string {
            $codigo = Str::afterLast($request, '-');

            return issue2209XmlUnidade($codigo);
        });
    $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn(
        collect($vinculos)->map(fn(array $vinculo) => [
            'codigo' => $vinculo['unidade'],
            'dataUltimaTransacao' => '01012024',
        ])->all()
    );

    $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
    $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();

    $siapeService = app(SiapeIndividualService::class);
    $reflection = new ReflectionClass(SiapeIndividualService::class);

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

    app()->instance(SiapeIndividualService::class, $siapeService);
}

function issue2209AssertLotacao(string $cpf, string $matricula, string $codigoUnidade): void
{
    $usuario = Usuario::where('cpf', $cpf)->where('matricula', $matricula)->first();
    $unidade = Unidade::where('codigo', $codigoUnidade)->first();

    expect($usuario)->not->toBeNull()
        ->and($unidade)->not->toBeNull();

    $integrante = UnidadeIntegrante::where('usuario_id', $usuario->id)
        ->where('unidade_id', $unidade->id)
        ->first();

    expect($integrante)->not->toBeNull();

    test()->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
        'deleted_at' => null,
    ], 'tenant');
}

test('issue 2209 - processamento e relatorio preservam tres matriculas em lotacoes distintas', function () {
    $cpf = '52998224725';
    Perfil::firstOrCreate(
        ['nivel' => 5],
        ['nome' => 'Participante', 'descricao' => 'Participante']
    );
    $vinculos = [
        ['matricula' => '1002209', 'unidade' => '22091', 'email' => 'vinculo1@teste.gov.br'],
        ['matricula' => '2002209', 'unidade' => '22092', 'email' => 'vinculo2@teste.gov.br'],
        ['matricula' => '4002209', 'unidade' => '22093', 'email' => 'vinculo4@teste.gov.br'],
    ];

    foreach ($vinculos as $vinculo) {
        Unidade::factory()->create([
            'codigo' => $vinculo['unidade'],
            'sigla' => 'U' . $vinculo['unidade'],
            'nome' => 'Unidade ' . $vinculo['unidade'],
        ]);
    }

    issue2209ConfigurarSiape($vinculos);

    $usuarioAutorizado = issue2209UsuarioAutorizado();
    Sanctum::actingAs($usuarioAutorizado);

    $processamento = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/usuario/processar-siape', ['cpf' => $cpf]);

    $processamento->assertOk();
    $processamento->assertJsonPath('success', true);
    $processamento->assertJsonCount(3, 'resumo');
    $processamento->assertJsonStructure([
        'relatorio_carga' => ['id', 'status', 'tipo'],
        'relatorio_carga_id',
    ]);

    expect(Usuario::where('cpf', $cpf)->count())->toBe(3);

    foreach ($vinculos as $vinculo) {
        issue2209AssertLotacao($cpf, $vinculo['matricula'], $vinculo['unidade']);
    }

    $relatorio = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/siape/relatorio-carga-individual', [
            'id' => $processamento->json('relatorio_carga_id'),
        ]);

    $relatorio->assertOk();
    $relatorio->assertJsonPath('success', true);
    $relatorio->assertJsonPath('relatorio.tipo', 'servidor');
    $relatorio->assertJsonPath('relatorio.status', 'sucesso');
    $relatorio->assertJsonCount(3, 'relatorio.secoes');

    expect(collect($processamento->json('resumo'))->pluck('status')->unique()->all())
        ->toBe(['sucesso'])
        ->and($processamento->json('relatorio_carga.status'))->toBe('sucesso');

    $matriculasRelatorio = collect($relatorio->json('relatorio.secoes'))
        ->flatMap(fn(array $secao) => $secao['campos'])
        ->where('campo', 'matriculaSiape')
        ->pluck('registrado_petrvs')
        ->sort()
        ->values()
        ->all();

    expect($matriculasRelatorio)->toBe(['1002209', '2002209', '4002209']);

    $listagem = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/siape/relatorio-carga-individual', [
            'tipo' => 'servidor',
            'chave' => $cpf,
            'limit' => 10,
        ]);

    $listagem->assertOk();
    $listagem->assertJsonPath('success', true);
    $listagem->assertJsonCount(1, 'relatorios');
    $listagem->assertJsonCount(3, 'relatorios.0.secoes');
});

test('issue 2209 - unidade ausente nao interrompe as demais matriculas e gera processamento parcial', function () {
    $cpf = '39053344705';
    Perfil::firstOrCreate(
        ['nivel' => 5],
        ['nome' => 'Participante', 'descricao' => 'Participante']
    );
    $vinculos = [
        ['matricula' => '1002210', 'unidade' => '22101', 'email' => 'existente1@teste.gov.br'],
        ['matricula' => '2002210', 'unidade' => '22102', 'email' => 'existente2@teste.gov.br'],
        ['matricula' => '4002210', 'unidade' => '22103', 'email' => 'ausente4@teste.gov.br'],
    ];

    foreach (array_slice($vinculos, 0, 2) as $vinculo) {
        Unidade::factory()->create([
            'codigo' => $vinculo['unidade'],
            'sigla' => 'U' . $vinculo['unidade'],
            'nome' => 'Unidade ' . $vinculo['unidade'],
        ]);
    }

    issue2209ConfigurarSiape($vinculos);

    $usuarioAutorizado = issue2209UsuarioAutorizado();
    Sanctum::actingAs($usuarioAutorizado);

    $processamento = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/usuario/processar-siape', ['cpf' => $cpf]);

    $processamento->assertOk();
    $processamento->assertJsonPath('success', true);
    $processamento->assertJsonPath('relatorio_carga.status', 'parcial');
    $processamento->assertJsonStructure(['relatorio_carga_id']);

    expect(Usuario::where('cpf', $cpf)->count())->toBe(3)
        ->and(Usuario::where('cpf', $cpf)->where('matricula', '4002210')->exists())->toBeTrue();

    foreach (array_slice($vinculos, 0, 2) as $vinculo) {
        issue2209AssertLotacao($cpf, $vinculo['matricula'], $vinculo['unidade']);
    }

    $relatorio = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/siape/relatorio-carga-individual', [
            'id' => $processamento->json('relatorio_carga_id'),
        ]);

    $relatorio->assertOk();
    $relatorio->assertJsonPath('success', true);
    $relatorio->assertJsonPath('relatorio.status', 'parcial');
    $relatorio->assertJsonCount(3, 'relatorio.secoes');

    $resumo = $processamento->json('resumo');
    expect($resumo)->toHaveCount(3)
        ->and(collect($resumo)->pluck('status')->unique()->all())->toContain('parcial');
});
