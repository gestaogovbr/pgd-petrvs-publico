<?php

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoTrabalho\DataProviders\AguardandoMinhaAvaliacaoDataProvider;

/**
 * Cria um PT aguardando avaliação (status ATIVO + consolidação CONCLUIDA sem avaliação)
 * para o participante na unidade informada.
 */
function ptAguardandoAvaliacao(string $usuarioId, string $unidadeId): PlanoTrabalho
{
    $plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $usuarioId,
        'unidade_id' => $unidadeId,
        'data_arquivamento' => null,
    ]);

    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'status' => \App\Enums\StatusEnum::CONCLUIDO->value,
    ]);

    return $plano;
}

beforeEach(function () {
    $this->provider = app(AguardandoMinhaAvaliacaoDataProvider::class);

    // Hierarquia: avó → pai(gerenciada pelo chefe) → filha
    $this->avo = Unidade::factory()->create();
    $this->unidadeGerenciada = Unidade::factory()->create(['unidade_pai_id' => $this->avo->id]);
    $this->unidadeFilha = Unidade::factory()->create(['unidade_pai_id' => $this->unidadeGerenciada->id]);

    $this->chefe = Usuario::factory()->create();
    $this->participante = Usuario::factory()->create();

    // Chefe é GESTOR_SUBSTITUTO ativo da unidade gerenciada
    UnidadeIntegranteAtribuicao::factory()
        ->gestorSubstituto()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidadeGerenciada->id)
        ->create();
});

describe('AguardandoMinhaAvaliacaoDataProvider', function () {

    test('traz PT de unidade filha da unidade gerenciada pelo chefe', function () {
        ptAguardandoAvaliacao($this->participante->id, $this->unidadeFilha->id);

        expect($this->provider->count($this->chefe->id))->toBe(1);
    });

    test('traz PT da própria unidade gerenciada (avalia agentes lotados nela)', function () {
        ptAguardandoAvaliacao($this->participante->id, $this->unidadeGerenciada->id);

        expect($this->provider->count($this->chefe->id))->toBe(1);
    });

    test('NÃO conta unidade cuja atribuição de chefia está soft-deleted', function () {
        // Uma segunda unidade onde o chefe tinha atribuição, mas foi revogada (soft-deleted)
        $outraUnidade = Unidade::factory()->create(['unidade_pai_id' => $this->avo->id]);
        $atribuicao = UnidadeIntegranteAtribuicao::factory()
            ->gestorSubstituto()
            ->paraUsuarioUnidade($this->chefe->id, $outraUnidade->id)
            ->create();
        $atribuicao->delete(); // soft-delete: não é mais chefia dessa unidade

        // PT pactuado nessa unidade com atribuição revogada
        ptAguardandoAvaliacao($this->participante->id, $outraUnidade->id);

        // Não deve contar: a atribuição do chefe nessa unidade está revogada
        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('exclui PT do próprio usuário avaliador', function () {
        // O próprio chefe é o participante de um PT numa unidade filha
        ptAguardandoAvaliacao($this->chefe->id, $this->unidadeFilha->id);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('não conta quando a consolidação já foi avaliada', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->participante->id,
            'unidade_id' => $this->unidadeFilha->id,
            'data_arquivamento' => null,
        ]);
        // Consolidação sem status CONCLUIDO (ex.: INCLUIDO) não caracteriza pendência
        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => \App\Enums\StatusEnum::INCLUIDO->value,
        ]);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('não conta PT arquivado', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->participante->id,
            'unidade_id' => $this->unidadeFilha->id,
            'data_arquivamento' => now(),
        ]);
        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => \App\Enums\StatusEnum::CONCLUIDO->value,
        ]);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('buscar retorna os PTs paginados das unidades filhas', function () {
        ptAguardandoAvaliacao($this->participante->id, $this->unidadeFilha->id);

        $resultado = $this->provider->buscar($this->chefe->id, 1, 15);

        expect($resultado->total())->toBe(1);
        expect($resultado->items()[0]->unidade_id)->toBe($this->unidadeFilha->id);
    });
});
