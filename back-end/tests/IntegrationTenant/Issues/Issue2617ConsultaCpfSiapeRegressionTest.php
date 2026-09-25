<?php

use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\IntegracaoService;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;

class Issue2617UsuarioService extends UsuarioService
{
    protected BuscarDadosSiapeServidor $buscarDadosSiapeServidorFixture;

    public function usarRespostaSiape(BuscarDadosSiapeServidor $buscarDadosSiapeServidor): void
    {
        $this->buscarDadosSiapeServidorFixture = $buscarDadosSiapeServidor;
    }

    protected function inicializaSiape($method): void
    {
        $this->configIntegracaoSiape = config('integracao.siape');
        $this->siapeClassBuscaDados = $this->buscarDadosSiapeServidorFixture;
    }
}

function issue2617RespostaFuncional(string $matricula, string $codigoUnidade): string
{
    return <<<XML
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
}

function issue2617RespostaPessoal(string $nome): string
{
    return <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
                <out>
                    <nome>{$nome}</nome>
                    <dataNascimento>01011990</dataNascimento>
                </out>
            </ns1:consultaDadosPessoaisResponse>
        </soap:Body>
    </soap:Envelope>
    XML;
}

test('issue 2617 - consulta CPF SIAPE retorna dados funcionais e pessoais no endpoint tenant', function () {
    $cpf = '52998224725';
    $matricula = '2617001';
    $codigoUnidade = '26170';
    $nome = 'Servidor Sintético Issue 2617';

    Config::set('integracao.siape', [
        'codOrgao' => '2617',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'SISTEMA TESTE',
        'senha' => 'senha-sintetica',
        'parmExistPag' => 'S',
        'parmTipoVinculo' => '1',
        'cpf' => '00000000000',
        'url' => 'https://siape.test',
        'conectagov_chave' => 'chave-sintetica',
        'conectagov_senha' => 'senha-sintetica',
    ]);

    Unidade::factory()->create([
        'codigo' => $codigoUnidade,
        'sigla' => 'U2617',
    ]);

    $siape = Mockery::mock(BuscarDadosSiapeServidor::class)->makePartial();
    $siape->shouldReceive('consultaDadosFuncionais')->once()->andReturn('request-funcional-sintetico');
    $siape->shouldReceive('consultaDadosPessoais')->once()->andReturn('request-pessoal-sintetico');
    $siape->shouldReceive('buscaSincrona')->once()->with('request-funcional-sintetico')
        ->andReturn(issue2617RespostaFuncional($matricula, $codigoUnidade));
    $siape->shouldReceive('buscaSincrona')->once()->with('request-pessoal-sintetico')
        ->andReturn(issue2617RespostaPessoal($nome));
    $siape->shouldReceive('prepareResponseXml')->twice()
        ->andReturnUsing(static fn (string $xml): SimpleXMLElement => new SimpleXMLElement($xml));

    $service = new Issue2617UsuarioService();
    $service->usarRespostaSiape($siape);
    app()->instance(UsuarioService::class, $service);

    Sanctum::actingAs(Usuario::factory()->create());

    $response = $this->withHeader('X-ENTIDADE', $this->tenantId)
        ->postJson('/api/usuario/consultar-cpf-siape', ['cpf' => $cpf]);

    $response->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('pessoais.nome', $nome)
        ->assertJsonPath('funcionais.0.matriculaSiape', $matricula)
        ->assertJsonPath('funcionais.0.unidadeSigla', 'U2617');
});

test('issue 2617 - atualizar unidade com troca de unidade pai usa apenas bindings declarados no update', function () {
    $codigoOrgao = '2617';
    $entidade = \App\Models\Entidade::factory()->create();
    $unidadePai = Unidade::factory()->create([
        'entidade_id' => $entidade->id,
        'codigo' => '2617100',
        'codigo_orgao' => $codigoOrgao,
        'path' => '',
    ]);
    $unidade = Unidade::factory()->create([
        'entidade_id' => $entidade->id,
        'codigo' => '2617101',
        'codigo_orgao' => $codigoOrgao,
        'unidade_pai_id' => $unidadePai->id,
        'path' => $unidadePai->id,
    ]);

    $service = new IntegracaoService();
    $service->codigoOrgao = $codigoOrgao;

    $service->deepReplaceUnidades((object) [
        'id_servo' => '2617101',
        'codigo_antigo' => '2617101',
        'nomeuorg' => 'Unidade Atualizada Issue 2617',
        'nome_antigo' => 'Unidade Issue 2617',
        'siglauorg' => 'U2617A',
        'sigla_antiga' => 'U2617',
        'pai_servo' => '2617199',
        'id_pai_antigo' => 'pai-anterior',
        'id' => $unidade->id,
        'path_antigo' => '',
        'cidade_id' => null,
        'cidade_antiga' => null,
        'unidade_pai_id' => $unidadePai->id,
        'codigo_pai_antigo' => '2617100',
        'path_pai' => $unidadePai->path,
        'data_modificacao_siape' => now()->toDateTimeString(),
        'data_modificacao_und' => null,
    ], $entidade->id);

    expect($unidade->fresh()->nome)->toBe('Unidade Atualizada Issue 2617')
        ->and($unidade->fresh()->unidade_pai_id)->toBe($unidadePai->id);
});

test('issue 2617 - atualizar unidade sem troca de unidade pai usa apenas bindings declarados no update', function () {
    $codigoOrgao = '2617';
    $entidade = \App\Models\Entidade::factory()->create();
    $unidadePai = Unidade::factory()->create([
        'entidade_id' => $entidade->id,
        'codigo' => '2617200',
        'codigo_orgao' => $codigoOrgao,
    ]);
    $unidade = Unidade::factory()->create([
        'entidade_id' => $entidade->id,
        'codigo' => '2617201',
        'codigo_orgao' => $codigoOrgao,
        'unidade_pai_id' => $unidadePai->id,
        'path' => $unidadePai->id,
    ]);

    $service = new IntegracaoService();
    $service->codigoOrgao = $codigoOrgao;

    $service->deepReplaceUnidades((object) [
        'id_servo' => '2617201',
        'codigo_antigo' => '2617201',
        'nomeuorg' => 'Unidade Atualizada Sem Mudança de Pai Issue 2617',
        'nome_antigo' => 'Unidade Issue 2617',
        'siglauorg' => 'U2617B',
        'sigla_antiga' => 'U2617',
        'pai_servo' => '2617200',
        'id_pai_antigo' => 'outra-unidade',
        'id' => $unidade->id,
        'path_antigo' => $unidade->path,
        'cidade_id' => null,
        'cidade_antiga' => null,
        'unidade_pai_id' => $unidadePai->id,
        'codigo_pai_antigo' => '2617200',
        'path_pai' => $unidadePai->path,
        'data_modificacao_siape' => now()->toDateTimeString(),
        'data_modificacao_und' => null,
    ], $entidade->id);

    expect($unidade->fresh()->nome)->toBe('Unidade Atualizada Sem Mudança de Pai Issue 2617')
        ->and($unidade->fresh()->unidade_pai_id)->toBe($unidadePai->id);
});
