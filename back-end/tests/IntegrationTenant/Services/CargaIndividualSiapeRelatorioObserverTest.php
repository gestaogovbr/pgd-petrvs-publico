<?php

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\IntegracaoService;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeRelatorioService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Schema::connection('tenant')->hasTable('cargas_individuais_siape_relatorios')) {
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant/2026_04_22_000000_create_cargas_individuais_siape_relatorios_table.php',
            '--database' => 'tenant',
            '--force' => true,
        ]);
    }

    $this->tipoModalidade = TipoModalidade::create([
        'nome' => 'Teletrabalho',
        'exige_pedagio' => 0,
        'plano_trabalho_calcula_horas' => 0,
        'atividade_tempo_despendido' => 0,
        'atividade_esforco' => 0,
    ]);
});

test('observer persiste relatorio de sucesso para unidade comum sem municipio nem chefia substituta', function () {
    $pai = Unidade::factory()->create([
        'codigo' => '26000',
        'nome' => 'Unidade Pai',
        'sigla' => 'PAI',
    ]);

    $unidade = Unidade::factory()->create([
        'codigo' => '26001',
        'nome' => 'Unidade Filha',
        'sigla' => 'FILHA',
        'unidade_pai_id' => $pai->id,
    ]);

    $gestor = Usuario::factory()->create([
        'cpf' => '12345678901',
        'tipo_modalidade_id' => $this->tipoModalidade->id,
    ]);
    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $gestor->id,
        'unidade_id' => $unidade->id,
    ]);
    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'GESTOR',
    ]);

    $relatorio = app(CargaIndividualSiapeSubject::class)->notificar(new CargaIndividualSiapeProcessamentoDTO(
        processamentoId: (string) Str::uuid(),
        tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_UNIDADE,
        chave: '26001',
        status: CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO,
        entradaValida: true,
        dadosSiape: [
            'codUorg' => '26001',
            'codUorgPai' => '26000',
            'nomeExtendido' => 'Unidade Filha',
            'siglaUorg' => 'FILHA',
            'dataUltimaTransacao' => '22042026',
            'cpfTitularAutoridadeUorg' => '123.456.789-01',
            'cpfSubstitutoAutoridadeUorg' => '99999999999',
            'nomeMunicipio' => 'Brasilia',
        ],
        resumo: [['status' => 'sucesso']],
        mensagemErro: null,
        solicitanteId: null,
    ));

    expect($relatorio)->toBeInstanceOf(CargaIndividualSiapeRelatorio::class);
    expect($relatorio->tipo)->toBe('unidade');
    expect($relatorio->entrada_valida)->toBeTrue();

    $payload = json_encode($relatorio->secoes, JSON_UNESCAPED_UNICODE);

    expect($payload)->toContain('codUorg');
    expect($payload)->toContain('codUorgPai');
    expect($payload)->toContain('cpfTitularAutoridadeUorg');
    expect($payload)->not->toContain('Municipio');
    expect($payload)->not->toContain('nomeMunicipio');
    expect($payload)->not->toContain('cpfSubstitutoAutoridadeUorg');
});

test('observer trata unidade raiz por pai_servo 999999 como situacao normal', function () {
    Unidade::factory()->create([
        'codigo' => '99901',
        'nome' => 'Unidade Raiz',
        'sigla' => 'RAIZ',
        'unidade_pai_id' => null,
    ]);

    $relatorio = app(CargaIndividualSiapeSubject::class)->notificar(new CargaIndividualSiapeProcessamentoDTO(
        processamentoId: (string) Str::uuid(),
        tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_UNIDADE,
        chave: '99901',
        status: CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO,
        entradaValida: true,
        dadosSiape: [
            'codUorg' => '99901',
            'codUorgPai' => (string) IntegracaoService::CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI,
            'nomeExtendido' => 'Unidade Raiz',
            'siglaUorg' => 'RAIZ',
            'dataUltimaTransacao' => '22042026',
            'cpfTitularAutoridadeUorg' => null,
        ],
        resumo: [['status' => 'sucesso']],
        mensagemErro: null,
        solicitanteId: null,
    ));

    $payload = json_encode($relatorio->secoes, JSON_UNESCAPED_UNICODE);

    expect($relatorio->status)->toBe('sucesso');
    expect($payload)->toContain('Unidade raiz');
    expect($payload)->toContain('nao_aplicavel');
});

test('observer persiste relatorio de sucesso para servidor e nao exibe dataOcorrExclusao', function () {
    $unidade = Unidade::factory()->create([
        'codigo' => '12345',
        'nome' => 'Unidade Exercicio',
        'sigla' => 'UEX',
    ]);

    Usuario::factory()->create([
        'cpf' => '11122233344',
        'nome' => 'Maria Silva',
        'email' => 'maria.silva@orgao.gov.br',
        'matricula' => '777888',
        'situacao_funcional' => '1',
        'nome_jornada' => '40 horas semanais',
        'cod_jornada' => 40,
        'tipo_modalidade_id' => $this->tipoModalidade->id,
        'participa_pgd' => 'sim',
    ]);

    $relatorio = app(CargaIndividualSiapeSubject::class)->notificar(new CargaIndividualSiapeProcessamentoDTO(
        processamentoId: (string) Str::uuid(),
        tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_SERVIDOR,
        chave: '11122233344',
        status: CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO,
        entradaValida: true,
        dadosSiape: [
            'dadosPessoais' => [
                'nome' => 'Maria Silva',
            ],
            'dadosFuncionais' => [[
                'emailInstitucional' => 'maria.silva@orgao.gov.br',
                'dataUltimaTransacao' => '22042026',
                'nomeJornada' => '40 horas semanais',
                'codJornada' => '40',
                'matriculaSiape' => '777888',
                'codUorgExercicio' => $unidade->codigo,
                'codSitFuncional' => '1',
                'modalidadePGD' => 'Teletrabalho',
                'participaPGD' => 'sim',
                'dataOcorrExclusao' => '01012020',
            ]],
        ],
        resumo: [['status' => 'sucesso']],
        mensagemErro: null,
        solicitanteId: null,
    ));

    $payload = json_encode($relatorio->secoes, JSON_UNESCAPED_UNICODE);

    expect($payload)->toContain('nome');
    expect($payload)->toContain('emailInstitucional');
    expect($payload)->toContain('matriculaSiape');
    expect($payload)->not->toContain('dataOcorrExclusao');
});

test('observer persiste relatorio amigavel para falha SOAP sem XML nem termos tecnicos', function () {
    $relatorio = app(CargaIndividualSiapeSubject::class)->notificar(new CargaIndividualSiapeProcessamentoDTO(
        processamentoId: (string) Str::uuid(),
        tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_SERVIDOR,
        chave: '11122233344',
        status: CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
        entradaValida: false,
        dadosSiape: [],
        resumo: [['status' => 'erro']],
        mensagemErro: '<soap:Envelope><soap:Fault><faultcode>0002</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Envelope>',
        solicitanteId: null,
    ));

    $payload = json_encode($relatorio->toArray(), JSON_UNESCAPED_UNICODE);

    expect($relatorio->entrada_valida)->toBeFalse();
    expect($relatorio->mensagem_usuario)->toContain('não há dados disponíveis');
    expect($payload)->not->toContain('<soap');
    expect($payload)->not->toContain('faultcode');
    expect($payload)->not->toContain('response');
});

test('relatorio permanece disponivel apos limpeza das tabelas siape volateis', function () {
    $relatorio = app(CargaIndividualSiapeSubject::class)->notificar(new CargaIndividualSiapeProcessamentoDTO(
        processamentoId: (string) Str::uuid(),
        tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_SERVIDOR,
        chave: '11122233344',
        status: CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
        entradaValida: false,
        dadosSiape: [],
        resumo: [['status' => 'erro']],
        mensagemErro: 'Falha simulada',
        solicitanteId: null,
    ));

    foreach (['siape_consultaDadosPessoais', 'siape_consultaDadosFuncionais', 'siape_dadosUORG', 'siape_listaServidores', 'siape_listaUORG'] as $table) {
        if (Schema::connection('tenant')->hasTable($table)) {
            DB::connection('tenant')->table($table)->delete();
        }
    }

    expect(CargaIndividualSiapeRelatorio::query()->find($relatorio->id))->not->toBeNull();
});

test('limpeza remove apenas relatorios expirados', function () {
    $expirado = CargaIndividualSiapeRelatorio::create([
        'processamento_id' => (string) Str::uuid(),
        'tipo' => 'servidor',
        'chave' => '11122233344',
        'status' => 'erro',
        'entrada_valida' => false,
        'mensagem_usuario' => 'Expirado',
        'orientacoes' => [],
        'secoes' => [],
        'processado_em' => CarbonImmutable::now()->subDays(40),
        'expira_em' => CarbonImmutable::now()->subDay(),
    ]);

    $vigente = CargaIndividualSiapeRelatorio::create([
        'processamento_id' => (string) Str::uuid(),
        'tipo' => 'servidor',
        'chave' => '11122233344',
        'status' => 'sucesso',
        'entrada_valida' => true,
        'mensagem_usuario' => 'Vigente',
        'orientacoes' => [],
        'secoes' => [],
        'processado_em' => CarbonImmutable::now(),
        'expira_em' => CarbonImmutable::now()->addDay(),
    ]);

    $removidos = app(CargaIndividualSiapeRelatorioService::class)->limparExpirados(CarbonImmutable::now());

    expect($removidos)->toBe(1);
    expect(CargaIndividualSiapeRelatorio::withTrashed()->find($expirado->id))->toBeNull();
    expect(CargaIndividualSiapeRelatorio::query()->find($vigente->id))->not->toBeNull();
});
