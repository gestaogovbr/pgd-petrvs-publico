<?php

use App\Enums\Atribuicao;
use App\Enums\UsuarioSituacaoSiape;
use App\Models\Perfil;
use App\Models\SiapeBlackListServidor;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\IntegracaoService;
use App\Services\IntegracaoServidorService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    criarEntidadeIssueRegression();
    criarPerfilIssueRegression(5, 'Participante');
    criarPerfilIssueRegression(7, 'Consulta');
});

function criarEntidadeIssueRegression(): string
{
    $id = (string) Str::uuid();

    DB::table('entidades')->insert([
        'id' => $id,
        'sigla' => 'E2E',
        'nome' => 'Entidade E2E SIAPE',
        'abrangencia' => 'NACIONAL',
        'carga_horaria_padrao' => 8,
        'gravar_historico_processo' => 0,
        'layout_formulario_atividade' => 'COMPLETO',
        'forma_contagem_carga_horaria' => 'DIA',
        'expediente' => json_encode([
            'domingo' => [],
            'segunda' => [],
            'terca' => [],
            'quarta' => [],
            'quinta' => [],
            'sexta' => [],
            'sabado' => [],
            'especial' => [],
        ]),
        'habilitar_relatos_siape' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return $id;
}

function criarPerfilIssueRegression(int $nivel, string $nome): string
{
    $id = (string) Str::uuid();

    DB::table('perfis')->insert([
        'id' => $id,
        'nivel' => $nivel,
        'nome' => $nome,
        'descricao' => $nome,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return $id;
}

function criarUnidadeIssueRegression(string $codigo): Unidade
{
    return Unidade::create([
        'nome' => 'Unidade ' . $codigo,
        'codigo' => $codigo,
        'sigla' => 'U' . $codigo,
        'entidade_id' => DB::table('entidades')->value('id'),
        'instituidora' => 0,
        'atividades_arquivamento_automatico' => 0,
        'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
        'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
        'executora' => true,
    ]);
}

function lotarUsuarioIssueRegression(Usuario $usuario, Unidade $unidade): UnidadeIntegrante
{
    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => Atribuicao::LOTADO->value,
    ]);

    return $integrante;
}

function assertUsuarioLotadoIssueRegression(string $usuarioId, string $unidadeId): void
{
    $integranteId = UnidadeIntegrante::where('usuario_id', $usuarioId)
        ->where('unidade_id', $unidadeId)
        ->value('id');

    test()->assertNotNull($integranteId);

    test()->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integranteId,
        'atribuicao' => Atribuicao::LOTADO->value,
        'deleted_at' => null,
    ], 'tenant');
}

function servidorSiapeIssueRegression(
    string $cpf,
    string $matricula,
    string $codigoUnidade,
    string $participaPgd = 'S',
    string $nome = 'Servidor Issue Regression'
): array {
    return [
        'pessoal' => [
            'cpf_ativo' => $cpf,
            'data_modificacao' => '2026-05-01 10:00:00',
            'cpf' => $cpf,
            'nome' => $nome,
            'sexo' => 'MASCULINO',
            'municipio' => 'Brasilia',
            'uf' => 'DF',
            'data_nascimento' => '1980-01-01',
            'telefone' => null,
        ],
        'funcionais' => [
            [
                'emailfuncional' => mb_strtolower($matricula) . '@teste.gov.br',
                'matriculas' => [
                    'dados' => [
                        'vinculo_ativo' => 'SIM',
                        'matriculasiape' => $matricula,
                        'codsitfuncional' => 1,
                        'nomeguerra' => $nome,
                        'codigo_servo_exercicio' => $codigoUnidade,
                        'coduorgexercicio' => $codigoUnidade,
                        'coduorglotacao' => $codigoUnidade,
                        'participa_pgd' => $participaPgd,
                        'modalidade_pgd' => 'presencial',
                        'ident_unica' => 'ID' . $matricula,
                        'cod_jornada' => '40',
                        'nome_jornada' => '40 Horas',
                    ],
                ],
            ],
        ],
    ];
}

function processarServidoresIssueRegression(array $servidores): void
{
    $service = new IntegracaoService();
    $service->integracao_config['perfilComum'] = 'usuario_comum';

    $result = [
        'unidades' => ['Resultado' => 'Nao foi executado!', 'Observações' => [], 'Falhas' => []],
        'servidores' => ['Resultado' => 'Nao foi executado!', 'Observações' => [], 'Falhas' => []],
        'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
    ];

    $service->result = $result;
    $service->processarServidoresTransaction($servidores);
}

test('issue 2118 - troca de matricula preserva participacao PGD da matricula ativa', function () {
    $cpf = '51566850304';
    $matriculaAntiga = '1786538';
    $matriculaAtiva = '2786538';
    $unidade = criarUnidadeIssueRegression('4173');

    $usuario = Usuario::create([
        'nome' => 'Reiginaldo Rosa',
        'email' => 'reiginaldo.teste@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'apelido' => 'Reiginaldo',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'não',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
        'data_modificacao' => '2026-01-01 00:00:00',
    ]);
    lotarUsuarioIssueRegression($usuario, $unidade);

    processarServidoresIssueRegression([
        servidorSiapeIssueRegression($cpf, $matriculaAtiva, '4173', 'S', 'Reiginaldo Rosa'),
    ]);

    $usuario->refresh();

    expect(Usuario::where('cpf', $cpf)->count())->toBe(1)
        ->and($usuario->matricula)->toBe($matriculaAtiva)
        ->and($usuario->participa_pgd)->toBe('sim')
        ->and($usuario->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'atribuicao' => Atribuicao::LOTADO->value,
        'deleted_at' => null,
    ], 'tenant');
});

test('issue 2118 - ausencia de participaPGD na integracao nao deve derrubar participacao existente', function () {
    $cpf = '51566850305';
    $matricula = '2786539';
    $unidade = criarUnidadeIssueRegression('5173');

    $usuario = Usuario::create([
        'nome' => 'Servidor Participante',
        'email' => 'participante.teste@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Participante',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
        'data_modificacao' => '2026-01-01 00:00:00',
    ]);
    lotarUsuarioIssueRegression($usuario, $unidade);

    $servidor = servidorSiapeIssueRegression($cpf, $matricula, '5173', 'S', 'Servidor Participante');
    unset($servidor['funcionais'][0]['matriculas']['dados']['participa_pgd']);
    $servidor['pessoal']['data_modificacao'] = '2026-05-02 10:00:00';

    processarServidoresIssueRegression([$servidor]);

    expect($usuario->fresh()->participa_pgd)->toBe('sim');
});

test('issue 2118 - duplicidade da mesma matricula no lote deve preservar a informacao positiva de PGD', function () {
    $cpf = '51566850306';
    $matricula = '2786540';
    $unidade = criarUnidadeIssueRegression('6173');

    $usuario = Usuario::create([
        'nome' => 'Servidor Duplicado',
        'email' => 'duplicado.teste@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Duplicado',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
        'data_modificacao' => '2026-01-01 00:00:00',
    ]);
    lotarUsuarioIssueRegression($usuario, $unidade);

    $entradaComPgd = servidorSiapeIssueRegression($cpf, $matricula, '6173', 'S', 'Servidor Duplicado');
    $entradaSemPgd = servidorSiapeIssueRegression($cpf, $matricula, '6173', 'S', 'Servidor Duplicado');
    unset($entradaSemPgd['funcionais'][0]['matriculas']['dados']['participa_pgd']);
    $entradaSemPgd['pessoal']['data_modificacao'] = '2026-05-02 10:00:00';

    processarServidoresIssueRegression([$entradaComPgd, $entradaSemPgd]);

    expect($usuario->fresh()->participa_pgd)->toBe('sim');
});

test('issue 2093 - servidor ausente retornado pelo SIAPE e criado com lotacao', function () {
    $cpf = '69379408153';
    $matricula = '9002093';
    $unidade = criarUnidadeIssueRegression('2093');

    processarServidoresIssueRegression([
        servidorSiapeIssueRegression($cpf, $matricula, '2093', 'S', 'Carolina Menezes Palhares'),
    ]);

    $usuario = Usuario::where('cpf', $cpf)->first();

    expect($usuario)->not->toBeNull()
        ->and($usuario->matricula)->toBe($matricula)
        ->and($usuario->perfil_id)->toBe(Perfil::where('nivel', 5)->first()?->id);

    $this->assertDatabaseHas('unidades_integrantes', [
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'deleted_at' => null,
    ], 'tenant');

    assertUsuarioLotadoIssueRegression($usuario->id, $unidade->id);
});

test('issue 2093 - nova matricula em outra unidade cria usuario enquanto antiga aguarda inativacao', function () {
    $cpf = '69379408153';
    $matriculaAntiga = '2093001';
    $matriculaNova = '2093002';
    $unidadeAntiga = criarUnidadeIssueRegression('12093');
    $unidadeNova = criarUnidadeIssueRegression('22093');

    $usuarioAntigo = Usuario::create([
        'nome' => 'Servidor Matricula Antiga',
        'email' => 'matricula.antiga@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'apelido' => 'Antiga',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
    ]);
    lotarUsuarioIssueRegression($usuarioAntigo, $unidadeAntiga);

    DB::table('siape_blacklist_servidores')->insert([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'response' => 'Matricula antiga nao retornou no SIAPE',
        'inativado' => 0,
        'created_at' => now()->subDays(10),
        'updated_at' => now()->subDays(10),
    ]);

    processarServidoresIssueRegression([
        servidorSiapeIssueRegression($cpf, $matriculaNova, '22093', 'S', 'Servidor Matricula Nova'),
    ]);

    $usuarioNovo = Usuario::where('cpf', $cpf)->where('matricula', $matriculaNova)->first();

    expect(Usuario::where('cpf', $cpf)->count())->toBe(2)
        ->and($usuarioNovo)->not->toBeNull()
        ->and($usuarioAntigo->fresh()->matricula)->toBe($matriculaAntiga)
        ->and($usuarioAntigo->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);

    assertUsuarioLotadoIssueRegression($usuarioAntigo->id, $unidadeAntiga->id);
    assertUsuarioLotadoIssueRegression($usuarioNovo->id, $unidadeNova->id);
});

test('issue 2093 - duas matriculas ativas em unidades distintas ficam lotadas separadamente', function () {
    $cpf = '69379408154';
    $unidadeA = criarUnidadeIssueRegression('12094');
    $unidadeB = criarUnidadeIssueRegression('22094');

    processarServidoresIssueRegression([
        servidorSiapeIssueRegression($cpf, '2093A01', '12094', 'S', 'Servidor Matricula A'),
        servidorSiapeIssueRegression($cpf, '2093B01', '22094', 'S', 'Servidor Matricula B'),
    ]);

    $usuarioA = Usuario::where('cpf', $cpf)->where('matricula', '2093A01')->first();
    $usuarioB = Usuario::where('cpf', $cpf)->where('matricula', '2093B01')->first();

    expect(Usuario::where('cpf', $cpf)->count())->toBe(2)
        ->and($usuarioA)->not->toBeNull()
        ->and($usuarioB)->not->toBeNull();

    assertUsuarioLotadoIssueRegression($usuarioA->id, $unidadeA->id);
    assertUsuarioLotadoIssueRegression($usuarioB->id, $unidadeB->id);
});

test('issue 2093 - tres matriculas ativas em unidades distintas ficam lotadas separadamente', function () {
    $cpf = '69379408155';
    $unidadeA = criarUnidadeIssueRegression('13093');
    $unidadeB = criarUnidadeIssueRegression('23093');
    $unidadeC = criarUnidadeIssueRegression('33093');

    processarServidoresIssueRegression([
        servidorSiapeIssueRegression($cpf, '3093A01', '13093', 'S', 'Servidor Matricula A'),
        servidorSiapeIssueRegression($cpf, '3093B01', '23093', 'S', 'Servidor Matricula B'),
        servidorSiapeIssueRegression($cpf, '3093C01', '33093', 'S', 'Servidor Matricula C'),
    ]);

    $usuarioA = Usuario::where('cpf', $cpf)->where('matricula', '3093A01')->first();
    $usuarioB = Usuario::where('cpf', $cpf)->where('matricula', '3093B01')->first();
    $usuarioC = Usuario::where('cpf', $cpf)->where('matricula', '3093C01')->first();

    expect(Usuario::where('cpf', $cpf)->count())->toBe(3)
        ->and($usuarioA)->not->toBeNull()
        ->and($usuarioB)->not->toBeNull()
        ->and($usuarioC)->not->toBeNull();

    assertUsuarioLotadoIssueRegression($usuarioA->id, $unidadeA->id);
    assertUsuarioLotadoIssueRegression($usuarioB->id, $unidadeB->id);
    assertUsuarioLotadoIssueRegression($usuarioC->id, $unidadeC->id);
});

// TODO(issue 2093): avaliar, com a equipe, como diferenciar dois cenarios
// validos e conflitantes no SIAPE: troca real de matricula dentro da mesma
// unidade e duas matriculas ativas do mesmo CPF na mesma unidade. A regra atual
// preserva a reclamacao ja conhecida de usuarios que mudam de matricula e
// permanecem na mesma unidade, atualizando o usuario existente em vez de criar
// outro registro.

test('issue 2093 - matricula antiga que volta no SIAPE e reativada sem remover matricula atual', function () {
    $cpf = '69379408157';
    $matriculaAntiga = '2093R01';
    $matriculaAtual = '2093R02';
    $unidadeAntiga = criarUnidadeIssueRegression('52093');
    $unidadeAtual = criarUnidadeIssueRegression('62093');

    $usuarioAntigo = Usuario::create([
        'nome' => 'Servidor Matricula Antiga',
        'email' => 'antiga.retorno@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'apelido' => 'Antiga',
        'situacao_siape' => UsuarioSituacaoSiape::INATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'não',
        'perfil_id' => Perfil::where('nivel', 7)->first()?->id,
    ]);
    lotarUsuarioIssueRegression($usuarioAntigo, $unidadeAntiga);

    $usuarioAtual = Usuario::create([
        'nome' => 'Servidor Matricula Atual',
        'email' => 'atual.retorno@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAtual,
        'apelido' => 'Atual',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
    ]);
    lotarUsuarioIssueRegression($usuarioAtual, $unidadeAtual);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'response' => 'matricula antiga ausente anteriormente',
    ]);

    $xml = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:resp xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <tipo:DadosFuncionais>
                    <matriculaSiape>{$matriculaAntiga}</matriculaSiape>
                    <codUorgExercicio>52093</codUorgExercicio>
                </tipo:DadosFuncionais>
            </ns1:resp>
        </soap:Body>
    </soap:Envelope>
    XML;

    (new App\Services\Siape\ProcessaDadosSiapeBD())->processaDadosFuncionais($cpf, $xml);

    expect($usuarioAntigo->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value)
        ->and($usuarioAtual->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value)
        ->and(Usuario::where('cpf', $cpf)->count())->toBe(2);

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
    ], 'tenant');
});

test('issue 2018 - servidor em blacklist ha mais de 30 dias e inativado', function () {
    $cpf = '85648485700';
    $matricula = '2018001';
    $perfilConsulta = Perfil::where('nivel', 7)->first();

    $usuario = Usuario::create([
        'nome' => 'Raquel Benayon',
        'email' => 'raquel.teste@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matricula,
        'apelido' => 'Raquel',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'perfil_id' => Perfil::where('nivel', 5)->first()?->id,
    ]);

    DB::table('siape_blacklist_servidores')->insert([
        'id' => (string) Str::uuid(),
        'cpf' => $cpf,
        'matricula' => $matricula,
        'response' => 'Servidor ausente no SIAPE',
        'inativado' => 0,
        'created_at' => now()->subDays(31),
        'updated_at' => now()->subDays(31),
    ]);

    $ids = app(IntegracaoServidorService::class)->processaServidoresRemovidosNoSiape();

    $usuario->refresh();

    expect($ids)->toContain($usuario->id)
        ->and($usuario->situacao_siape)->toBe(UsuarioSituacaoSiape::INATIVO->value)
        ->and($usuario->perfil_id)->toBe($perfilConsulta?->id);

    $this->assertDatabaseHas('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => $matricula,
        'inativado' => 1,
    ], 'tenant');
});

test('carga individual remove blacklist da matricula ativa e mantem lotacao existente', function () {
    $cpf = '01428751637';
    $matriculaAtiva = '7654321';
    $matriculaAusente = '1234567';
    $unidade = criarUnidadeIssueRegression('27');

    $usuarioAtivo = Usuario::create([
        'nome' => 'Fernando Ativo',
        'email' => 'fernando.ativo@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAtiva,
        'apelido' => 'Fernando',
        'situacao_siape' => UsuarioSituacaoSiape::INATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'sim',
        'data_ativacao_temporaria' => now()->subDay(),
    ]);
    $integrante = lotarUsuarioIssueRegression($usuarioAtivo, $unidade);

    Usuario::create([
        'nome' => 'Fernando Ausente',
        'email' => 'fernando.ausente@teste.gov.br',
        'cpf' => $cpf,
        'matricula' => $matriculaAusente,
        'apelido' => 'Fernando',
        'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'não',
    ]);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => $matriculaAtiva,
        'response' => 'matricula ativa ausente anteriormente',
    ]);

    $xml = <<<XML
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ns1:resp xmlns:ns1="http://servico.wssiapenet" xmlns:tipo="http://tipo.servico.wssiapenet">
                <tipo:DadosFuncionais>
                    <matriculaSiape>{$matriculaAtiva}</matriculaSiape>
                    <codUorgExercicio>27</codUorgExercicio>
                </tipo:DadosFuncionais>
            </ns1:resp>
        </soap:Body>
    </soap:Envelope>
    XML;

    $dados = (new App\Services\Siape\ProcessaDadosSiapeBD())->processaDadosFuncionais($cpf, $xml);

    expect($dados)->toHaveCount(1)
        ->and($usuarioAtivo->fresh()->situacao_siape)->toBe(UsuarioSituacaoSiape::ATIVO->value);

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => $matriculaAtiva,
    ], 'tenant');

    $this->assertDatabaseHas('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => $matriculaAusente,
    ], 'tenant');

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => Atribuicao::LOTADO->value,
        'deleted_at' => null,
    ], 'tenant');
});
