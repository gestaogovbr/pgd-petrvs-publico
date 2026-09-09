<?php

use App\Enums\UsuarioSituacaoSiape;
use App\Models\IntegracaoServidor;
use App\Models\SiapeBlackListServidor;
use App\Models\SiapeListaServidores;
use App\Models\SiapeListaUORGS;
use App\Models\Usuario;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Services\SiapeBlackListServidorService;
use Illuminate\Support\Facades\Config;

test('issue 2555 - carga automatica confirma ausencia e adiciona servidor local na blacklist', function () {
    $cpf = '25550000001';
    $matricula = '2555001';

    Usuario::create([
        'nome' => 'Servidor Ausente Issue 2555',
        'email' => 'servidor.ausente.2555@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Servidor Ausente',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
    ]);

    IntegracaoServidor::create([
        'cpf_ativo' => '1',
        'cpf' => $cpf,
        'nome' => 'Servidor Ausente Issue 2555',
        'matriculasiape' => $matricula,
        'vinculo_ativo' => '1',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'data_modificacao' => now()->subMonth(),
    ]);

    SiapeListaServidores::create([
        'response' => listaServidoresVaziaIssue2555(),
        'processado' => false,
    ]);

    $buscarDados = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidor
    {
        /** @param array<string, string> $xmlsData */
        public function executaRequisicoes(array $xmlsData): array
        {
            return array_fill_keys(array_keys($xmlsData), faultServidorAusenteIssue2555());
        }
    };

    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect(SiapeBlackListServidor::query()
        ->where('cpf', $cpf)
        ->where('matricula', $matricula)
        ->exists())->toBeTrue()
        ->and(SiapeBlackListServidor::query()->where('cpf', $cpf)->count())->toBe(1);
});

test('issue 2555 - carga automatica reavalia servidor em blacklist que voltou ao SIAPE', function () {
    $cpf = '25550000002';
    $matricula = '2555002';

    $usuario = Usuario::create([
        'nome' => 'Servidor Retornado Issue 2555',
        'email' => 'servidor.retornado.2555@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Servidor Retornado',
        'situacao_siape' => UsuarioSituacaoSiape::INATIVO->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
    ]);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => faultServidorAusenteIssue2555(),
    ]);
    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => null,
        'response' => faultServidorAusenteIssue2555(),
    ]);

    SiapeListaServidores::create([
        'response' => listaServidoresComCpfIssue2555($cpf),
        'processado' => false,
    ]);

    $buscarDados = new class(configuracaoSiapeIssue2555(), $cpf, $matricula) extends BuscarDadosSiapeServidor
    {
        public function __construct(
            array $config,
            private readonly string $cpfServidor,
            private readonly string $matriculaServidor,
        ) {
            parent::__construct($config);
        }

        /** @param array<string, string> $xmlsData */
        public function executaRequisicoes(array $xmlsData): array
        {
            $responses = [];

            foreach ($xmlsData as $key => $xmlData) {
                $responses[$key] = str_contains($xmlData, 'consultaDadosFuncionais')
                    ? dadosFuncionaisAtivosIssue2555($this->cpfServidor, $this->matriculaServidor)
                    : dadosPessoaisAtivosIssue2555($this->cpfServidor);
            }

            return $responses;
        }
    };

    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value)
        ->and(SiapeBlackListServidor::query()
            ->where('cpf', $cpf)
            ->exists())->toBeFalse();
});

test('issue 2555 - carga automatica nao cria candidatos quando uma resposta da lista e invalida', function () {
    $cpf = '25550000003';
    $matricula = '2555003';

    Usuario::create([
        'nome' => 'Servidor Protegido Issue 2555',
        'email' => 'servidor.protegido.2555@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Servidor Protegido',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
    ]);

    IntegracaoServidor::create([
        'cpf_ativo' => '1',
        'cpf' => $cpf,
        'nome' => 'Servidor Protegido Issue 2555',
        'matriculasiape' => $matricula,
        'vinculo_ativo' => '1',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'data_modificacao' => now()->subDay(),
    ]);

    SiapeListaServidores::create([
        'response' => '<resposta-invalida>',
        'processado' => false,
    ]);

    $buscarDados = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidor
    {
        public int $quantidadeRequisicoes = 0;

        /** @param array<string, string> $xmlsData */
        public function executaRequisicoes(array $xmlsData): array
        {
            $this->quantidadeRequisicoes += count($xmlsData);

            return array_fill_keys(array_keys($xmlsData), faultServidorAusenteIssue2555());
        }
    };

    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect($buscarDados->quantidadeRequisicoes)->toBe(0)
        ->and(SiapeBlackListServidor::query()->where('cpf', $cpf)->exists())->toBeFalse();
});

test('issue 2555 - coleta parcial de UORGs preserva o snapshot anterior de servidores', function () {
    $snapshotAnterior = SiapeListaServidores::create([
        'response' => listaServidoresVaziaIssue2555(),
        'processado' => true,
    ]);

    SiapeListaUORGS::create([
        'response' => listaUorgsIssue2555(),
        'processado' => true,
    ]);
    $quantidadeSnapshotsAntes = SiapeListaServidores::query()->count();

    $buscarLista = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidores
    {
        /** @param array<int, string> $xmlsData */
        public function executaRequisicoes(array $xmlsData): array
        {
            $primeiraChave = array_key_first($xmlsData);

            return [$primeiraChave => listaServidoresVaziaIssue2555()];
        }
    };

    $buscarLista->enviar();

    expect(SiapeListaServidores::query()->count())->toBe($quantidadeSnapshotsAntes)
        ->and(SiapeListaServidores::query()->whereKey($snapshotAnterior->id)->exists())->toBeTrue();
});

test('issue 2555 - blacklist ja inativada nao e reativada automaticamente', function () {
    $cpf = '25550000004';
    $matricula = '2555004';
    $usuario = criarUsuarioIssue2555($cpf, $matricula, UsuarioSituacaoSiape::INATIVO);
    $blacklist = SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => faultServidorAusenteIssue2555(),
    ]);
    $blacklist->forceFill(['inativado' => true])->save();
    SiapeListaServidores::create([
        'response' => listaServidoresComCpfIssue2555($cpf),
        'processado' => false,
    ]);

    $buscarDados = new class(configuracaoSiapeIssue2555(), $cpf, $matricula) extends BuscarDadosSiapeServidor
    {
        public function __construct(array $config, private readonly string $cpfServidor, private readonly string $matriculaServidor)
        {
            parent::__construct($config);
        }

        public function executaRequisicoes(array $xmlsData): array
        {
            $responses = [];
            foreach ($xmlsData as $key => $xmlData) {
                $responses[$key] = str_contains($xmlData, 'consultaDadosFuncionais')
                    ? dadosFuncionaisAtivosIssue2555($this->cpfServidor, $this->matriculaServidor)
                    : dadosPessoaisAtivosIssue2555($this->cpfServidor);
            }
            return $responses;
        }
    };

    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::INATIVO->value)
        ->and($blacklist->fresh())->not->toBeNull()
        ->and((bool) $blacklist->fresh()->inativado)->toBeTrue();
});

test('issue 2555 - retorno funcional remove pendencia mesmo quando dados pessoais falham', function () {
    $cpf = '25550000005';
    $matricula = '2555005';
    $usuario = criarUsuarioIssue2555($cpf, $matricula, UsuarioSituacaoSiape::INATIVO);
    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => faultServidorAusenteIssue2555(),
    ]);
    SiapeListaServidores::create([
        'response' => listaServidoresComCpfIssue2555($cpf),
        'processado' => false,
    ]);

    $buscarDados = new class(configuracaoSiapeIssue2555(), $cpf, $matricula) extends BuscarDadosSiapeServidor
    {
        public function __construct(array $config, private readonly string $cpfServidor, private readonly string $matriculaServidor)
        {
            parent::__construct($config);
        }

        public function executaRequisicoes(array $xmlsData): array
        {
            $responses = [];
            foreach ($xmlsData as $key => $xmlData) {
                $responses[$key] = str_contains($xmlData, 'consultaDadosFuncionais')
                    ? dadosFuncionaisAtivosIssue2555($this->cpfServidor, $this->matriculaServidor)
                    : faultServidorAusenteIssue2555();
            }
            return $responses;
        }
    };

    $buscarDados->enviar();
    $resultado = (new ProcessaDadosSiapeBD())->dadosServidor();

    expect($resultado)->toBe([])
        ->and($usuario->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value)
        ->and(SiapeBlackListServidor::query()->where('cpf', $cpf)->exists())->toBeFalse();
});

test('issue 2555 - limite de seguranca evita tempestade de consultas individuais', function () {
    Config::set('integracao.siape.reconciliacao_servidores_max_candidatos', 1);
    foreach ([['25550000006', '2555006'], ['25550000007', '2555007']] as [$cpf, $matricula]) {
        criarUsuarioIssue2555($cpf, $matricula);
        criarIntegracaoServidorIssue2555($cpf, $matricula);
    }
    SiapeListaServidores::create(['response' => listaServidoresVaziaIssue2555(), 'processado' => false]);

    $buscarDados = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidor
    {
        public int $quantidadeRequisicoes = 0;

        public function executaRequisicoes(array $xmlsData): array
        {
            $this->quantidadeRequisicoes += count($xmlsData);
            return [];
        }
    };
    $buscarDados->enviar();

    expect($buscarDados->quantidadeRequisicoes)->toBe(0)
        ->and(SiapeBlackListServidor::query()->whereIn('cpf', ['25550000006', '25550000007'])->count())->toBe(0);
});

test('issue 2555 - apenas matricula ausente entra na blacklist no fluxo automatico completo', function () {
    $cpf = '25550000008';
    $matriculaAusente = '2555008';
    $matriculaRetornada = '2555009';
    criarUsuarioIssue2555($cpf, $matriculaAusente);
    criarUsuarioIssue2555($cpf, $matriculaRetornada);
    criarIntegracaoServidorIssue2555($cpf, $matriculaRetornada);
    SiapeListaServidores::create(['response' => listaServidoresComCpfIssue2555($cpf), 'processado' => false]);

    $buscarDados = new class(configuracaoSiapeIssue2555(), $cpf, $matriculaRetornada) extends BuscarDadosSiapeServidor
    {
        public function __construct(array $config, private readonly string $cpfServidor, private readonly string $matriculaServidor)
        {
            parent::__construct($config);
        }

        public function executaRequisicoes(array $xmlsData): array
        {
            $responses = [];
            foreach ($xmlsData as $key => $xmlData) {
                $responses[$key] = str_contains($xmlData, 'consultaDadosFuncionais')
                    ? dadosFuncionaisAtivosIssue2555($this->cpfServidor, $this->matriculaServidor)
                    : dadosPessoaisAtivosIssue2555($this->cpfServidor);
            }
            return $responses;
        }
    };
    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect(SiapeBlackListServidor::query()->where('cpf', $cpf)->pluck('matricula')->all())
        ->toBe([$matriculaAusente]);
});

test('issue 2555 - falha funcional repetida preserva o inicio da contagem', function () {
    $cpf = '25550000009';
    $matricula = '2555010';
    criarUsuarioIssue2555($cpf, $matricula);
    $processador = new ProcessaDadosSiapeBD();

    try {
        $processador->processaDadosFuncionais($cpf, faultServidorAusenteIssue2555());
    } catch (Throwable) {
    }
    $inicioContagem = now()->subDays(10)->startOfSecond();
    $registroInicial = SiapeBlackListServidor::query()->where('cpf', $cpf)->firstOrFail();
    $registroInicial->forceFill(['created_at' => $inicioContagem])->save();

    try {
        $processador->processaDadosFuncionais($cpf, faultServidorAusenteIssue2555());
    } catch (Throwable) {
    }

    $registros = SiapeBlackListServidor::query()->where('cpf', $cpf)->get();
    expect($registros)->toHaveCount(1)
        ->and($registros->first()->matricula)->toBe($matricula)
        ->and($registros->first()->created_at->toDateTimeString())->toBe($inicioContagem->toDateTimeString());
});

test('issue 2555 - grid associa nome pela combinacao de cpf e matricula sem duplicar linhas', function () {
    $cpf = '25550000010';
    criarUsuarioIssue2555($cpf, '2555011', nome: 'Primeira matrícula');
    criarUsuarioIssue2555($cpf, '2555012', nome: 'Segunda matrícula');
    foreach (['2555011', '2555012'] as $matricula) {
        SiapeBlackListServidor::create(['cpf' => $cpf, 'matricula' => $matricula, 'response' => 'fixture']);
    }

    $resultado = app(SiapeBlackListServidorService::class)->query([
        'fields' => ['usuarios.nome', 'siape_blacklist_servidores.*'],
        'where' => [['cpf', '==', $cpf]],
        'orderBy' => [['matricula', 'asc']],
        'join' => [],
        'with' => [],
        'page' => 1,
        'limit' => 20,
    ]);

    expect($resultado['count'])->toBe(2)
        ->and(collect($resultado['rows'])->pluck('nome', 'matricula')->all())->toBe([
            '2555011' => 'Primeira matrícula',
            '2555012' => 'Segunda matrícula',
        ]);
});

test('issue 2555 - ausencia do cpf gera uma consulta candidata mesmo com duas matriculas locais', function () {
    $cpf = '25550000011';
    foreach (['2555013', '2555014'] as $matricula) {
        criarUsuarioIssue2555($cpf, $matricula);
        criarIntegracaoServidorIssue2555($cpf, $matricula);
    }
    SiapeListaServidores::create(['response' => listaServidoresVaziaIssue2555(), 'processado' => false]);

    $buscarDados = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidor
    {
        /** @var list<list<string>> */
        public array $lotesRequisitados = [];

        public function executaRequisicoes(array $xmlsData): array
        {
            $this->lotesRequisitados[] = array_keys($xmlsData);
            return array_fill_keys(array_keys($xmlsData), faultServidorAusenteIssue2555());
        }
    };

    $buscarDados->enviar();
    (new ProcessaDadosSiapeBD())->dadosServidor();

    expect($buscarDados->lotesRequisitados)->toHaveCount(2)
        ->and($buscarDados->lotesRequisitados[0])->toHaveCount(1)
        ->and($buscarDados->lotesRequisitados[1])->toHaveCount(1)
        ->and(SiapeBlackListServidor::query()->where('cpf', $cpf)->pluck('matricula')->sort()->values()->all())
        ->toBe(['2555013', '2555014']);
});

test('issue 2555 - coleta completa substitui o snapshot anterior de servidores', function () {
    $snapshotAnterior = SiapeListaServidores::create([
        'response' => listaServidoresVaziaIssue2555(),
        'processado' => true,
    ]);
    SiapeListaUORGS::create(['response' => listaUorgsIssue2555(), 'processado' => true]);

    $buscarLista = new class(configuracaoSiapeIssue2555()) extends BuscarDadosSiapeServidores
    {
        public function executaRequisicoes(array $xmlsData): array
        {
            return array_fill_keys(array_keys($xmlsData), listaServidoresVaziaIssue2555());
        }
    };
    $buscarLista->enviar();

    expect(SiapeListaServidores::query()->whereKey($snapshotAnterior->id)->exists())->toBeFalse()
        ->and(SiapeListaServidores::query()->where('processado', false)->count())->toBe(2);
});

test('issue 2555 - remocao manual reativa todas as matriculas do cpf', function () {
    $cpf = '25550000012';
    foreach (['2555015', '2555016'] as $matricula) {
        criarUsuarioIssue2555($cpf, $matricula, UsuarioSituacaoSiape::INATIVO);
        SiapeBlackListServidor::create(['cpf' => $cpf, 'matricula' => $matricula, 'response' => 'fixture']);
    }

    $resultado = app(SiapeBlackListServidorService::class)->remover($cpf);

    expect($resultado['success'])->toBeTrue()
        ->and($resultado['count'])->toBe(2)
        ->and(SiapeBlackListServidor::query()->where('cpf', $cpf)->exists())->toBeFalse()
        ->and(Usuario::query()->where('cpf', $cpf)->pluck('situacao_siape')->unique()->all())
        ->toBe([UsuarioSituacaoSiape::ATIVO->value]);
});

function criarUsuarioIssue2555(
    string $cpf,
    string $matricula,
    UsuarioSituacaoSiape $situacao = UsuarioSituacaoSiape::ATIVO,
    string $nome = 'Servidor Issue 2555',
): Usuario {
    return Usuario::create([
        'nome' => $nome,
        'email' => "{$matricula}@issue2555.test",
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => $nome,
        'situacao_siape' => $situacao->value,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
    ]);
}

function criarIntegracaoServidorIssue2555(string $cpf, string $matricula): IntegracaoServidor
{
    return IntegracaoServidor::create([
        'cpf_ativo' => '1',
        'cpf' => $cpf,
        'nome' => 'Servidor Issue 2555',
        'matriculasiape' => $matricula,
        'vinculo_ativo' => '1',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'data_modificacao' => now()->subMonth(),
    ]);
}

/** @return array<string, int|string> */
function configuracaoSiapeIssue2555(): array
{
    return [
        'cpf' => '00000000000',
        'url' => 'https://siape.invalid',
        'conectagov_chave' => 'fixture',
        'conectagov_senha' => 'fixture',
        'conectagov_qtd_max_requisicoes' => 10,
        'codOrgao' => '00000',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'TESTE',
        'senha' => 'fixture',
        'parmExistPag' => 'S',
        'parmTipoVinculo' => '1',
    ];
}

function listaServidoresVaziaIssue2555(): string
{
    return <<<'XML'
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:listaServidoresResponse
                    xmlns:ns1="http://servico.wssiapenet"
                    xmlns:ns2="http://entidade.wssiapenet"
                >
                    <out />
                </ns1:listaServidoresResponse>
            </soap:Body>
        </soap:Envelope>
        XML;
}

function listaServidoresComCpfIssue2555(string $cpf): string
{
    return <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:listaServidoresResponse
                    xmlns:ns1="http://servico.wssiapenet"
                    xmlns:ns2="http://entidade.wssiapenet"
                >
                    <out>
                        <ns2:Servidor>
                            <cpf>{$cpf}</cpf>
                            <dataUltimaTransacao>01092026</dataUltimaTransacao>
                        </ns2:Servidor>
                    </out>
                </ns1:listaServidoresResponse>
            </soap:Body>
        </soap:Envelope>
        XML;
}

function listaUorgsIssue2555(): string
{
    return <<<'XML'
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:listaUorgsResponse
                    xmlns:ns1="http://servico.wssiapenet"
                    xmlns:ns2="http://entidade.wssiapenet"
                >
                    <out>
                        <ns2:Uorg><codigo>2555</codigo></ns2:Uorg>
                        <ns2:Uorg><codigo>2556</codigo></ns2:Uorg>
                    </out>
                </ns1:listaUorgsResponse>
            </soap:Body>
        </soap:Envelope>
        XML;
}

function faultServidorAusenteIssue2555(): string
{
    return <<<'XML'
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <soap:Fault>
                    <faultcode>0002</faultcode>
                    <faultstring>Não existem dados para consulta</faultstring>
                </soap:Fault>
            </soap:Body>
        </soap:Envelope>
        XML;
}

function dadosFuncionaisAtivosIssue2555(string $cpf, string $matricula): string
{
    return <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:consultaDadosFuncionaisResponse
                    xmlns:ns1="http://servico.wssiapenet"
                    xmlns:tipo="http://tipo.servico.wssiapenet"
                >
                    <out>
                        <tipo:DadosFuncionais>
                            <cpf>{$cpf}</cpf>
                            <matriculaSiape>{$matricula}</matriculaSiape>
                            <codSitFuncional>1</codSitFuncional>
                            <nomeSitFuncional>ATIVO PERMANENTE</nomeSitFuncional>
                            <codUorgExercicio>2555</codUorgExercicio>
                            <codUorgLotacao>2555</codUorgLotacao>
                            <participaPGD>sim</participaPGD>
                            <modalidadePGD>presencial</modalidadePGD>
                        </tipo:DadosFuncionais>
                    </out>
                </ns1:consultaDadosFuncionaisResponse>
            </soap:Body>
        </soap:Envelope>
        XML;
}

function dadosPessoaisAtivosIssue2555(string $cpf): string
{
    return <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
                    <out>
                        <cpf>{$cpf}</cpf>
                        <nome>Servidor Retornado Issue 2555</nome>
                        <dataNascimento>01011990</dataNascimento>
                    </out>
                </ns1:consultaDadosPessoaisResponse>
            </soap:Body>
        </soap:Envelope>
        XML;
}
