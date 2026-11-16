<?php

use App\Enums\UsuarioSituacaoSiape;
use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Bus;
use Laravel\Sanctum\Sanctum;

// Mantém controller, service, parser SOAP e repositories reais; substitui apenas a fonte externa.
class Issue2684UsuarioService extends UsuarioService
{
    public BuscarDadosSiapeServidor $fonteSiape;

    protected function inicializaSiape($method): void
    {
        $this->configIntegracaoSiape = config('integracao.siape');
        $this->siapeClassBuscaDados = $this->fonteSiape;
    }
}

beforeEach(function (): void {
    Bus::fake();
    Sanctum::actingAs(Usuario::factory()->create());
    $this->withHeader('X-ENTIDADE', $this->tenantId);
});

function issue2684Usuario(string $matricula = '2684001'): Usuario
{
    return Usuario::create([
        'cpf' => '52998224725',
        'matricula' => $matricula,
        'nome' => 'Servidor Sintético ' . $matricula,
        'email' => $matricula . '@issue2684.test',
        'apelido' => 'Servidor Sintético',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'parcial',
        'participa_pgd' => 'sim',
    ]);
}

function issue2684PayloadGrid(array $where = [], array $orderBy = []): array
{
    return [
        'page' => 1,
        'limit' => 20,
        'fields' => ['usuarios.nome', 'siape_blacklist_servidores.*'],
        'where' => $where,
        'orderBy' => $orderBy,
        'with' => [],
        'join' => [],
    ];
}

function issue2684Fault(): string
{
    return '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        . '<soap:Body><soap:Fault><faultcode>0002</faultcode>'
        . '<faultstring>Não existem dados para consulta</faultstring>'
        . '</soap:Fault></soap:Body></soap:Envelope>';
}

test('issue 2684 - blacklist responde ao payload da tela sem ambiguidade de CPF', function (array $where, int $count): void {
    $usuario = issue2684Usuario();
    SiapeBlackListServidor::create([
        'cpf' => $usuario->cpf,
        'matricula' => $usuario->matricula,
        'response' => issue2684Fault(),
    ]);

    $response = $this->postJson('/api/SiapeBlacklistServidor/query', issue2684PayloadGrid($where));

    $response->assertOk()->assertJsonPath('success', true)
        ->assertJsonPath('count', $count)->assertJsonCount($count, 'rows');
    if ($count > 0) {
        $response->assertJsonPath('rows.0.cpf', $usuario->cpf)
            ->assertJsonPath('rows.0.nome', $usuario->nome);
    }
})->with([
    'sem filtro' => [[], 1],
    'CPF completo' => [[['cpf', 'like', '%52998224725%']], 1],
    'CPF parcial' => [[['cpf', 'like', '%52998%']], 1],
    'CPF inexistente' => [[['cpf', 'like', '%11111111111%']], 0],
    'CPF em contagem' => [[['cpf', 'like', '%52998224725%'], ['inativado', '==', false]], 1],
    'CPF sem registro inativado' => [[['cpf', 'like', '%52998224725%'], ['inativado', '==', true]], 0],
]);

test('issue 2755 - blacklist preserva matriculas distintas e aceita vinculo sem usuario', function (): void {
    $primeiro = issue2684Usuario();
    $segundo = issue2684Usuario('2684002');
    $segundo->update(['situacao_siape' => UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value]);
    foreach ([$primeiro->matricula, $segundo->matricula, null] as $matricula) {
        SiapeBlackListServidor::create([
            'cpf' => $primeiro->cpf, 'matricula' => $matricula, 'response' => issue2684Fault(),
        ]);
    }

    $response = $this->postJson('/api/SiapeBlacklistServidor/query', issue2684PayloadGrid(
        [['cpf', 'like', '%' . $primeiro->cpf . '%']], [['matricula', 'asc']],
    ));

    $response->assertOk()->assertJsonPath('success', true)->assertJsonPath('count', 3);
    expect(collect($response->json('rows'))->pluck('nome', 'matricula')->all())->toBe([
        '' => null,
        $primeiro->matricula => $primeiro->nome,
        $segundo->matricula => $segundo->nome,
    ]);
    expect($segundo->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value);
});

// TODO #2684: confirmar o payload real do ambiente antes de testar ordenação por nome.
// orderBy=[['nome','asc']] gera SQL 1054, mas a coluna Nome da tela atual não oferece ordenação.
// Não manter esse cenário como regressão quebrada da ocorrência sem confirmar sua origem.

function issue2684SimularFonte(string|Throwable $funcional, ?string $pessoal = null): void
{
    config()->set('integracao.siape', array_replace(config('integracao.siape'), [
        'codOrgao' => '20000', 'siglaSistema' => 'TESTE', 'nomeSistema' => 'TESTE',
        'senha' => 'sintetica', 'cpf' => '00000000000',
        'parmExistPag' => 'S', 'parmTipoVinculo' => '1',
    ]));
    $fonte = Mockery::mock(BuscarDadosSiapeServidor::class)->makePartial();
    $fonte->shouldReceive('consultaDadosFuncionais')->once()->andReturn('pedido-funcional');
    $busca = $fonte->shouldReceive('buscaSincrona')->once()->with('pedido-funcional');
    if ($funcional instanceof Throwable) {
        $busca->andThrow($funcional);
    } else {
        $busca->andReturn($funcional);
    }
    if ($pessoal === null) {
        $fonte->shouldNotReceive('consultaDadosPessoais');
    } else {
        $fonte->shouldReceive('consultaDadosPessoais')->once()->andReturn('pedido-pessoal');
        $fonte->shouldReceive('buscaSincrona')->once()->with('pedido-pessoal')->andReturn($pessoal);
    }
    $service = new Issue2684UsuarioService();
    $service->fonteSiape = $fonte;
    app()->instance(UsuarioService::class, $service);
}

test('issue 2684 - ausencia funcional confirmada gera blacklist consultavel sem alterar modalidade', function (): void {
    $usuario = issue2684Usuario();
    issue2684SimularFonte(issue2684Fault());

    $this->postJson('/api/usuario/consultar-cpf-siape', ['cpf' => $usuario->cpf])
        ->assertStatus(400)->assertJsonPath('success', false);

    $this->assertDatabaseHas('siape_blacklist_servidores', [
        'cpf' => $usuario->cpf, 'matricula' => $usuario->matricula,
    ], 'tenant');
    expect($usuario->fresh()->modalidade_pgd)->toBe('parcial')
        ->and($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);

    $this->postJson('/api/SiapeBlacklistServidor/query', issue2684PayloadGrid(
        [['cpf', 'like', '%' . $usuario->cpf . '%']],
    ))->assertOk()->assertJsonPath('count', 1);
});

test('issue 2684 - falha tecnica na consulta funcional nao confirma ausencia nem cria blacklist', function (string $cenario): void {
    $usuario = issue2684Usuario();
    issue2684SimularFonte($cenario === 'transporte' ? new RuntimeException('Timeout sintético') : '<xml-incompleto');

    $this->postJson('/api/usuario/consultar-cpf-siape', ['cpf' => $usuario->cpf])
        ->assertStatus(400)->assertJsonPath('success', false);

    expect(SiapeBlackListServidor::where('cpf', $usuario->cpf)->exists())->toBeFalse()
        ->and($usuario->fresh()->modalidade_pgd)->toBe('parcial')
        ->and($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);
})->with(['transporte', 'xml invalido']);

test('issue 2684 - consulta valida preserva campos PGD presentes ou ausentes no SIAPE', function (bool $comDadosPgd): void {
    $usuario = issue2684Usuario();
    $camposPgd = $comDadosPgd ? '<modalidadePGD>parcial</modalidadePGD><participaPGD>sim</participaPGD>' : '';
    $funcional = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body><ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
        <out><tipo:DadosFuncionais><matriculaSiape>{$usuario->matricula}</matriculaSiape>
          <codSitFuncional>18</codSitFuncional><codUorgExercicio>2684</codUorgExercicio>
          {$camposPgd}
        </tipo:DadosFuncionais></out>
      </ns1:consultaDadosFuncionaisResponse></soap:Body>
    </soap:Envelope>
    XML;
    $pessoal = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        . '<soap:Body><out><nome>Servidor Sintético</nome><dataNascimento>01011990</dataNascimento></out></soap:Body></soap:Envelope>';
    issue2684SimularFonte($funcional, $pessoal);

    $response = $this->postJson('/api/usuario/consultar-cpf-siape', ['cpf' => $usuario->cpf]);
    $response->assertOk()->assertJsonPath('success', true)
        ->assertJsonPath('funcionais.0.codSitFuncional', '18')
        ->assertJsonPath('pessoais.nome', 'Servidor Sintético');

    if ($comDadosPgd) {
        $response->assertJsonPath('funcionais.0.modalidadePGD', 'parcial')
            ->assertJsonPath('funcionais.0.participaPGD', 'sim');
    } else {
        $response->assertJsonMissingPath('funcionais.0.modalidadePGD')
            ->assertJsonMissingPath('funcionais.0.participaPGD');
    }
    expect(SiapeBlackListServidor::where('cpf', $usuario->cpf)->exists())->toBeFalse();
})->with(['campos PGD recebidos' => [true], 'campos PGD nao recebidos' => [false]]);
