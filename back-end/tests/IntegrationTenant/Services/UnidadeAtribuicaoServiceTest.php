<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\UnidadeIntegranteAtribuicaoService;

function criarVinculoParaTransferencia(Unidade $unidade, Usuario $usuario, array $atribuicoes): UnidadeIntegrante
{
    $integrante = UnidadeIntegrante::query()->create([
        'unidade_id' => $unidade->id,
        'usuario_id' => $usuario->id,
    ]);

    foreach ($atribuicoes as $atribuicao) {
        UnidadeIntegranteAtribuicao::query()->create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => $atribuicao,
        ]);
    }

    return $integrante;
}

function atribuicoesAtivasDaTransferencia(UnidadeIntegrante $integrante): array
{
    return UnidadeIntegranteAtribuicao::query()
        ->where('unidade_integrante_id', $integrante->id)
        ->pluck('atribuicao')
        ->sort()
        ->values()
        ->all();
}

test('transferência manual preserva a unidade anterior como colaborador', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidadeOrigem = Unidade::factory()->create();
    $unidadeDestino = Unidade::factory()->create();
    $integranteOrigem = criarVinculoParaTransferencia($unidadeOrigem, $usuario, ['LOTADO']);
    $integranteDestino = criarVinculoParaTransferencia($unidadeDestino, $usuario, []);

    app(UnidadeIntegranteAtribuicaoService::class)->store([
        'unidade_integrante_id' => $integranteDestino->id,
        'atribuicao' => 'LOTADO',
    ], $unidadeDestino, false);

    expect(atribuicoesAtivasDaTransferencia($integranteOrigem))->toBe(['COLABORADOR'])
        ->and(atribuicoesAtivasDaTransferencia($integranteDestino))->toBe(['LOTADO']);
});

test('transferência restaura colaborador excluído sem criar duplicidade', function () {
    $usuario = Usuario::factory()->create(['modalidade_pgd' => 'presencial']);
    $unidadeOrigem = Unidade::factory()->create();
    $unidadeDestino = Unidade::factory()->create();
    $integranteOrigem = criarVinculoParaTransferencia($unidadeOrigem, $usuario, ['LOTADO', 'COLABORADOR']);
    $colaborador = UnidadeIntegranteAtribuicao::query()
        ->where('unidade_integrante_id', $integranteOrigem->id)
        ->where('atribuicao', 'COLABORADOR')
        ->firstOrFail();
    $colaborador->delete();
    $integranteDestino = criarVinculoParaTransferencia($unidadeDestino, $usuario, []);

    app(UnidadeIntegranteAtribuicaoService::class)->store([
        'unidade_integrante_id' => $integranteDestino->id,
        'atribuicao' => 'LOTADO',
    ], $unidadeDestino, false);

    expect(atribuicoesAtivasDaTransferencia($integranteOrigem))->toBe(['COLABORADOR'])
        ->and(UnidadeIntegranteAtribuicao::withTrashed()
            ->where('unidade_integrante_id', $integranteOrigem->id)
            ->where('atribuicao', 'COLABORADOR')
            ->count())->toBe(1);
});
