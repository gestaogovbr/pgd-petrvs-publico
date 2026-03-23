<?php

use App\Models\Perfil;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

function criarUsuarioComDependencias(string $matricula, ?string $cpf = null): Usuario
{
    $tipoModalidade = TipoModalidade::factory()->create();
    $perfil = Perfil::factory()->create();

    return Usuario::factory()->create([
        'matricula' => $matricula,
        'cpf' => $cpf ?? fake()->numerify('###########'),
        'tipo_modalidade_id' => $tipoModalidade->id,
        'perfil_id' => $perfil->id,
    ]);
}

function criarLotacao(Usuario $usuario, ?Unidade $unidade = null, ?string $createdAt = null): UnidadeIntegranteAtribuicao
{
    $unidade = $unidade ?? Unidade::factory()->create();

    $integrante = UnidadeIntegrante::create([
        'unidade_id' => $unidade->id,
        'usuario_id' => $usuario->id,
    ]);

    $atribuicao = UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    if ($createdAt) {
        DB::table('unidades_integrantes_atribuicoes')
            ->where('id', $atribuicao->id)
            ->update(['created_at' => $createdAt]);
    }

    return $atribuicao;
}

function executarMigration(): void
{
    $migration = require database_path('migrations/tenant/2026_03_16_222108_remove_duplicate_lotacao_atribuicoes.php');
    $migration->up();
}

test('remove lotações duplicadas mantendo a mais recente', function () {
    $usuario = criarUsuarioComDependencias('MAT001');

    $lotacaoAntiga = criarLotacao($usuario, null, '2024-01-01 00:00:00');
    $lotacaoRecente = criarLotacao($usuario, null, '2025-01-01 00:00:00');

    executarMigration();

    $lotacaoAntiga->refresh();
    $lotacaoRecente->refresh();

    expect($lotacaoAntiga->deleted_at)->not->toBeNull();
    expect($lotacaoRecente->deleted_at)->toBeNull();
});

test('não altera usuário com apenas uma lotação', function () {
    $usuario = criarUsuarioComDependencias('MAT002');

    $lotacaoUnica = criarLotacao($usuario);

    executarMigration();

    $lotacaoUnica->refresh();

    expect($lotacaoUnica->deleted_at)->toBeNull();
});

test('ignora usuários com matrícula nula', function () {
    $usuario = criarUsuarioComDependencias('placeholder');

    DB::table('usuarios')
        ->where('id', $usuario->id)
        ->update(['matricula' => null]);

    $lotacao1 = criarLotacao($usuario, null, '2024-01-01 00:00:00');
    $lotacao2 = criarLotacao($usuario, null, '2025-01-01 00:00:00');

    executarMigration();

    $lotacao1->refresh();
    $lotacao2->refresh();

    expect($lotacao1->deleted_at)->toBeNull();
    expect($lotacao2->deleted_at)->toBeNull();
});

test('com três lotações duplicadas remove as duas mais antigas', function () {
    $usuario = criarUsuarioComDependencias('MAT003');

    $lotacao1 = criarLotacao($usuario, null, '2023-01-01 00:00:00');
    $lotacao2 = criarLotacao($usuario, null, '2024-01-01 00:00:00');
    $lotacao3 = criarLotacao($usuario, null, '2025-01-01 00:00:00');

    executarMigration();

    $lotacao1->refresh();
    $lotacao2->refresh();
    $lotacao3->refresh();

    expect($lotacao1->deleted_at)->not->toBeNull();
    expect($lotacao2->deleted_at)->not->toBeNull();
    expect($lotacao3->deleted_at)->toBeNull();
});

test('não afeta atribuições já soft-deletadas', function () {
    $usuario = criarUsuarioComDependencias('MAT004');

    $lotacaoAtiva = criarLotacao($usuario);
    $lotacaoDeletada = criarLotacao($usuario);
    $lotacaoDeletada->delete();

    executarMigration();

    $lotacaoAtiva->refresh();

    expect($lotacaoAtiva->deleted_at)->toBeNull();
});

test('processa múltiplas matrículas independentemente', function () {
    $usuario1 = criarUsuarioComDependencias('MAT005');
    $usuario2 = criarUsuarioComDependencias('MAT006');

    $lotacao1Antiga = criarLotacao($usuario1, null, '2024-01-01 00:00:00');
    $lotacao1Recente = criarLotacao($usuario1, null, '2025-01-01 00:00:00');

    $lotacao2Antiga = criarLotacao($usuario2, null, '2024-01-01 00:00:00');
    $lotacao2Recente = criarLotacao($usuario2, null, '2025-01-01 00:00:00');

    executarMigration();

    $lotacao1Antiga->refresh();
    $lotacao1Recente->refresh();
    $lotacao2Antiga->refresh();
    $lotacao2Recente->refresh();

    expect($lotacao1Antiga->deleted_at)->not->toBeNull();
    expect($lotacao1Recente->deleted_at)->toBeNull();
    expect($lotacao2Antiga->deleted_at)->not->toBeNull();
    expect($lotacao2Recente->deleted_at)->toBeNull();
});
