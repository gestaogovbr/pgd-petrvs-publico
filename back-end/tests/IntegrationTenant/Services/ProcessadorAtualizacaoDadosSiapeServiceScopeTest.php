<?php

use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\ProcessadorAtualizacaoDadosSiapeService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    Bus::fake();
});

test('processador de dados SIAPE cria apenas usuario do escopo da carga individual', function () {
    Perfil::firstOrCreate(
        ['nivel' => 5],
        ['nome' => 'Participante', 'descricao' => 'Participante']
    );

    Unidade::factory()->create([
        'codigo' => '23261',
        'sigla' => 'U23261',
        'nome' => 'Unidade Escopo',
    ]);
    Unidade::factory()->create([
        'codigo' => '23262',
        'sigla' => 'U23262',
        'nome' => 'Unidade Fora Escopo',
    ]);

    inserirIntegracaoServidorProcessadorScope('11122233344', '2326101', 'Servidor Consultado', '23261');
    inserirIntegracaoServidorProcessadorScope('55566677788', '2326201', 'Servidor Fora Escopo', '23262');

    $result = [
        'servidores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
    ];

    app(ProcessadorAtualizacaoDadosSiapeService::class)->processar($result, 'Participante', [
        'origem' => 'carga_individual_servidor',
        'cpf' => '11122233344',
        'matriculas' => ['2326101'],
    ]);

    $usuarioCriado = Usuario::where('cpf', '11122233344')->where('matricula', '2326101')->first();
    expect($usuarioCriado)->not->toBeNull()
        ->and($usuarioCriado->lotacao)->not->toBeNull()
        ->and(Usuario::where('cpf', '55566677788')->where('matricula', '2326201')->exists())->toBeFalse();
});

test('processador escopado atualiza matricula antiga sem criar usuario duplicado', function () {
    Perfil::firstOrCreate(
        ['nivel' => 5],
        ['nome' => 'Participante', 'descricao' => 'Participante']
    );

    $cpf = '22233344455';
    $matriculaAntiga = '2257001';
    $matriculaNova = '2257002';
    $unidade = Unidade::factory()->create([
        'codigo' => '22571',
        'sigla' => 'U22571',
        'nome' => 'Unidade Matricula',
    ]);

    $usuario = Usuario::factory()->create([
        'cpf' => $cpf,
        'matricula' => $matriculaAntiga,
        'nome' => 'Servidor Matricula Antiga',
        'email' => 'matricula-antiga@teste.gov.br',
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

    inserirIntegracaoServidorProcessadorScope($cpf, $matriculaNova, 'Servidor Matricula Nova', '22571');
    inserirIntegracaoServidorProcessadorScope('66677788899', '2257999', 'Servidor Fora Escopo', '22571');

    $result = [
        'servidores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
    ];

    app(ProcessadorAtualizacaoDadosSiapeService::class)->processar($result, 'Participante', [
        'origem' => 'carga_individual_servidor',
        'cpf' => $cpf,
        'matriculas' => [$matriculaNova],
    ]);

    $usuario->refresh();

    expect($usuario->matricula)->toBe($matriculaNova)
        ->and(Usuario::where('cpf', $cpf)->count())->toBe(1)
        ->and(Usuario::where('cpf', '66677788899')->exists())->toBeFalse();
});

function inserirIntegracaoServidorProcessadorScope(string $cpf, string $matricula, string $nome, string $codigoUnidade): void
{
    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf_ativo' => true,
        'data_modificacao' => now(),
        'cpf' => $cpf,
        'nome' => $nome,
        'emailfuncional' => mb_strtolower(str_replace(' ', '.', $nome)) . '@teste.gov.br',
        'sexo' => 'MASCULINO',
        'municipio' => 'Brasilia',
        'uf' => 'DF',
        'data_nascimento' => '1990-01-01 00:00:00',
        'telefone' => null,
        'vinculo_ativo' => true,
        'matriculasiape' => $matricula,
        'codigo_cargo' => null,
        'coduorgexercicio' => $codigoUnidade,
        'coduorglotacao' => $codigoUnidade,
        'codigo_servo_exercicio' => $codigoUnidade,
        'nomeguerra' => $nome,
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'ident_unica' => null,
        'nome_jornada' => '40 HORAS SEMANAIS',
        'cod_jornada' => '40',
        'modalidade_pgd' => 'parcial',
        'participa_pgd' => 'sim',
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);
}
