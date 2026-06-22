<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Services\UnidadeIntegranteService;

function criarVinculoIssue2222(Unidade $unidade, Usuario $usuario, array $atribuicoes): UnidadeIntegrante
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

function atribuicoesIssue2222(UnidadeIntegrante $integrante): array
{
    return UnidadeIntegranteAtribuicao::query()
        ->where('unidade_integrante_id', $integrante->id)
        ->pluck('atribuicao')
        ->sort()
        ->values()
        ->all();
}

test('issue 2222 - carga SIAPE preserva atribuicoes manuais quando payload contem apenas lotacao', function () {
    $usuario = Usuario::factory()->create([
        'nome' => 'Servidor Issue 2222',
        'modalidade_pgd' => 'presencial',
    ]);
    $unidade = Unidade::factory()->create([
        'sigla' => 'SUEST-PR',
    ]);
    $integrante = criarVinculoIssue2222($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_DELEGADO',
        'GESTOR_SUBSTITUTO',
    ]);

    app(UnidadeIntegranteService::class)->salvarIntegrantes([[
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'atribuicoes' => ['LOTADO'],
    ]], false, true);

    expect(atribuicoesIssue2222($integrante))->toBe([
        'COLABORADOR',
        'GESTOR_DELEGADO',
        'GESTOR_SUBSTITUTO',
        'LOTADO',
    ]);
});

test('issue 2222 - integracao de gestores sem chefia titular nao remove substituto manual', function () {
    $usuario = Usuario::factory()->create([
        'nome' => 'Servidor Chefia Substituta Issue 2222',
        'modalidade_pgd' => 'presencial',
    ]);
    $unidade = Unidade::factory()->create([
        'sigla' => 'COQUAT',
    ]);
    $integrante = criarVinculoIssue2222($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_SUBSTITUTO',
    ]);

    /** @var GestorIntegracao $integracao */
    $integracao = app(GestorIntegracao::class, [
        'dados' => [[
            'id_unidade' => $unidade->id,
            'id_chefe' => null,
        ]],
        'unidadeIntegranteService' => app(UnidadeIntegranteService::class),
        'nivelAcessoService' => app(NivelAcessoService::class),
        'perfilService' => app(PerfilService::class),
        'config' => [],
    ]);

    $integracao->processar();

    expect(atribuicoesIssue2222($integrante))->toBe([
        'COLABORADOR',
        'GESTOR_SUBSTITUTO',
        'LOTADO',
    ]);
});

test('issue 2222 - integracao de gestores promove substituto para titular preservando demais atribuicoes', function () {
    $usuario = Usuario::factory()->create([
        'nome' => 'Servidor Promovido Issue 2222',
        'modalidade_pgd' => 'presencial',
    ]);
    $unidade = Unidade::factory()->create([
        'sigla' => 'COQUAT',
    ]);
    $integrante = criarVinculoIssue2222($unidade, $usuario, [
        'LOTADO',
        'COLABORADOR',
        'GESTOR_SUBSTITUTO',
    ]);

    /** @var GestorIntegracao $integracao */
    $integracao = app(GestorIntegracao::class, [
        'dados' => [[
            'id_unidade' => $unidade->id,
            'id_chefe' => $usuario->id,
        ]],
        'unidadeIntegranteService' => app(UnidadeIntegranteService::class),
        'nivelAcessoService' => app(NivelAcessoService::class),
        'perfilService' => app(PerfilService::class),
        'config' => [],
    ]);

    $integracao->processar();

    expect(atribuicoesIssue2222($integrante))->toBe([
        'COLABORADOR',
        'GESTOR',
        'LOTADO',
    ]);
});
