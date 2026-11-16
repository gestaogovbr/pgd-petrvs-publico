<?php

use App\Enums\UsuarioSituacaoSiape;
use App\Models\CargaIndividualSiapeRelatorio;
use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Models\Tenant;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\MensagemConsultaServidorSiape;
use App\Services\SiapeIndividualService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;

beforeEach(function (): void {
    Bus::fake();
    $this->withoutExceptionHandling();
    if (!Schema::connection('tenant')->hasTable('cargas_individuais_siape_relatorios')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_04_22_000000_create_cargas_individuais_siape_relatorios_table.php',
            '--database' => 'tenant', '--force' => true,
        ]);
    }
    // Reconstitui somente a fixture central se ela tiver sido revertida pela transação de outro teste.
    // Sem eventos: o banco tenant de teste já existe e não deve ser recriado.
    if (Tenant::find($this->tenantId) === null) {
        Tenant::withoutEvents(function (): void {
            $tenant = new Tenant();
            $tenant->setRawAttributes($this->tenant->getAttributes());
            $tenant->save();
        });
    }

    Sanctum::actingAs(Usuario::factory()->create());
    $this->withHeader('X-ENTIDADE', $this->tenantId);
});

test('issue 2684 - carga individual orienta conforme o retorno e preserva mensagem no relatorio', function (string $cenario, string $mensagem, ?bool $criaBlacklist): void {
    $usuario = Usuario::create([
        'cpf' => '52998224725', 'matricula' => '2684001',
        'nome' => 'Servidor Sintético', 'apelido' => 'Sintético',
        'email' => 'servidor@issue2684.test',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'parcial', 'participa_pgd' => 'sim',
    ]);

    $fonte = Mockery::mock(BuscarDadosSiapeServidor::class);
    $fonte->shouldReceive('consultaDadosFuncionais')->once()->andReturn('pedido-funcional');
    $fonte->shouldReceive('consultaDadosPessoais')->once()->andReturn('pedido-pessoal');
    if ($cenario === 'timeout') {
        $fonte->shouldReceive('executaRequisicao')->once()->with('pedido-funcional')
            ->andThrow(new RuntimeException('Timeout sintético'));
        $fonte->shouldNotReceive('executaRequisicao')->with('pedido-pessoal');
    } else {
        $funcional = match ($cenario) {
            'ausencia' => '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><soap:Fault><faultcode>0002</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Body></soap:Envelope>',
            'fault desconhecido' => '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><soap:Fault><faultcode>0001</faultcode><faultstring>Erro temporário sintético</faultstring></soap:Fault></soap:Body></soap:Envelope>',
            default => '<xml-incompleto',
        };
        $fonte->shouldReceive('executaRequisicao')->once()->with('pedido-funcional')->andReturn($funcional);
        $fonte->shouldReceive('executaRequisicao')->once()->with('pedido-pessoal')->andReturn('<pessoal/>');
    }

    $service = app(SiapeIndividualService::class);
    (new ReflectionProperty(SiapeIndividualService::class, 'buscarDadosSiapeServidor'))->setValue($service, $fonte);
    app()->instance(SiapeIndividualService::class, $service);

    expect(Tenant::find($this->tenantId), 'Tenant central deve existir antes do HTTP: ' . $cenario)->not->toBeNull();
    $response = $this->postJson('/api/usuario/processar-siape', ['cpf' => $usuario->cpf]);
    $response->assertStatus(400)->assertJsonPath('success', false)
        ->assertJsonPath('message', $mensagem);
    expect($response->json('resumo.0.mensagem'))->toStartWith($mensagem)
        ->and($usuario->fresh()->modalidade_pgd)->toBe('parcial')
        ->and($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);

    if ($criaBlacklist !== null) {
        expect(SiapeBlackListServidor::where('cpf', $usuario->cpf)->exists())->toBe($criaBlacklist);
    }
    // TODO #2684: analisar separadamente o efeito legado de fault não catalogado na blacklist.
    // Este cenário valida a mensagem; não define nova regra de inativação ou ausência.

    $relatorio = CargaIndividualSiapeRelatorio::findOrFail($response->json('relatorio_carga.id'));
    expect($relatorio->mensagem_usuario)->toBe($mensagem);
    if ($cenario === 'ausencia') {
        expect(implode(' ', $relatorio->orientacoes))->toContain('gestão de pessoas')
            ->not->toContain('abra chamado');
    }
})->with([
    'ausencia confirmada' => ['ausencia', MensagemConsultaServidorSiape::DADOS_FUNCIONAIS_AUSENTES, true],
    'falha de transporte' => ['timeout', MensagemConsultaServidorSiape::FALHA_CONSULTA, false],
    'XML invalido' => ['xml', MensagemConsultaServidorSiape::DADOS_FUNCIONAIS_INVALIDOS, false],
    'fault nao catalogado' => ['fault desconhecido', MensagemConsultaServidorSiape::DADOS_FUNCIONAIS_INVALIDOS, null],
]);
