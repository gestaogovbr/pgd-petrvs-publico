<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\UnidadeIntegranteService;
use Illuminate\Support\Facades\DB;

function criarVinculoComAtribuicoesParaPreservacao(Unidade $unidade, Usuario $usuario, array $atribuicoes): UnidadeIntegrante
{
    $integrante = UnidadeIntegrante::create([
        'unidade_id' => $unidade->id,
        'usuario_id' => $usuario->id,
    ]);

    foreach ($atribuicoes as $atribuicao) {
        UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => $atribuicao,
        ]);
    }

    return $integrante;
}

function atribuicoesAtivasParaPreservacao(UnidadeIntegrante $integrante): array
{
    return UnidadeIntegranteAtribuicao::query()
        ->where('unidade_integrante_id', $integrante->id)
        ->pluck('atribuicao')
        ->sort()
        ->values()
        ->all();
}

test('modo SIAPE preserva atribuicoes existentes quando payload contem apenas lotacao', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidade = Unidade::factory()->create();
    $integrante = criarVinculoComAtribuicoesParaPreservacao($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_DELEGADO',
    ]);

    app(UnidadeIntegranteService::class)->salvarIntegrantes([[
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'atribuicoes' => ['LOTADO'],
    ]], false, true);

    expect(atribuicoesAtivasParaPreservacao($integrante))->toBe([
        'COLABORADOR',
        'GESTOR_DELEGADO',
        'LOTADO',
    ]);
});

test('modo manual continua removendo atribuicoes ausentes do payload consolidado', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidade = Unidade::factory()->create();
    $integrante = criarVinculoComAtribuicoesParaPreservacao($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_DELEGADO',
    ]);

    app(UnidadeIntegranteService::class)->salvarIntegrantes([[
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'atribuicoes' => ['LOTADO'],
    ]], false);

    expect(atribuicoesAtivasParaPreservacao($integrante))->toBe(['LOTADO']);
});

test('modo SIAPE preserva vinculado ao promover chefia substituta para titular', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidade = Unidade::factory()->create();
    $integrante = criarVinculoComAtribuicoesParaPreservacao($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_SUBSTITUTO',
    ]);

    app(UnidadeIntegranteService::class)->salvarIntegrantes([[
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'atribuicoes' => ['LOTADO', 'GESTOR'],
    ]], false, true);

    expect(atribuicoesAtivasParaPreservacao($integrante))->toBe([
        'COLABORADOR',
        'GESTOR',
        'LOTADO',
    ]);
});
test('transfere lotação preservando a unidade anterior como colaborador', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidadeOrigem = Unidade::factory()->create([
        'codigo_orgao' => '20000',
        'unidade_antiga' => true,
    ]);
    $unidadeDestino = Unidade::factory()->create([
        'codigo_orgao' => '30212',
        'unidade_antiga' => false,
    ]);
    $vinculoOrigem = criarVinculoComAtribuicoesParaPreservacao($unidadeOrigem, $usuario, ['LOTADO']);

    DB::transaction(function () use ($usuario, $unidadeDestino): void {
        app(UnidadeIntegranteService::class)->salvarIntegrantes([[
            'usuario_id' => $usuario->id,
            'unidade_id' => $unidadeDestino->id,
            'atribuicoes' => ['LOTADO'],
        ]], false, true);
    });

    $vinculoDestino = UnidadeIntegrante::query()
        ->where('usuario_id', $usuario->id)
        ->where('unidade_id', $unidadeDestino->id)
        ->firstOrFail();

    expect(atribuicoesAtivasParaPreservacao($vinculoOrigem))->toBe(['COLABORADOR'])
        ->and(atribuicoesAtivasParaPreservacao($vinculoDestino))->toBe(['LOTADO']);
});

test('desfaz toda a transferência quando a transação do servidor falha', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidadeOrigem = Unidade::factory()->create();
    $unidadeDestino = Unidade::factory()->create();
    $vinculoOrigem = criarVinculoComAtribuicoesParaPreservacao($unidadeOrigem, $usuario, ['LOTADO']);

    $transferir = fn () => DB::transaction(
        function () use ($usuario, $unidadeDestino): void {
            app(UnidadeIntegranteService::class)->salvarIntegrantes([[
                'usuario_id' => $usuario->id,
                'unidade_id' => $unidadeDestino->id,
                'atribuicoes' => ['LOTADO'],
            ]], false, true);

            throw new RuntimeException('Falha simulada após alterar a lotação');
        }
    );

    expect($transferir)->toThrow(RuntimeException::class, 'Falha simulada após alterar a lotação')
        ->and(atribuicoesAtivasParaPreservacao($vinculoOrigem))->toBe(['LOTADO'])
        ->and(UnidadeIntegrante::query()
            ->where('usuario_id', $usuario->id)
            ->where('unidade_id', $unidadeDestino->id)
            ->exists())->toBeFalse();
});
