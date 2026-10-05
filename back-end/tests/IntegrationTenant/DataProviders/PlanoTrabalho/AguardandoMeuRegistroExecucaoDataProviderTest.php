<?php

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\V2\PlanoTrabalho\DataProviders\AguardandoMeuRegistroExecucaoDataProvider;

/**
 * Cria um PT ATIVO do usuário com uma consolidação INCLUIDA cuja data_fim já venceu
 * (além da tolerância), caracterizando registro de execução em atraso.
 */
function ptComConsolidacaoAtrasada(string $usuarioId, string $unidadeId, bool $atrasada = true): PlanoTrabalho
{
    $programa = Programa::factory()->create(['dias_tolerancia_consolidacao' => 0]);

    $plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $usuarioId,
        'unidade_id' => $unidadeId,
        'programa_id' => $programa->id,
    ]);

    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'status' => \App\Enums\StatusEnum::INCLUIDO->value,
        'data_fim' => $atrasada ? now()->subDays(10)->toDateString() : now()->addDays(10)->toDateString(),
    ]);

    return $plano;
}

beforeEach(function () {
    $this->provider = app(AguardandoMeuRegistroExecucaoDataProvider::class);
    $this->usuario = Usuario::factory()->create();
    $this->unidade = Unidade::factory()->create();
});

describe('AguardandoMeuRegistroExecucaoDataProvider', function () {

    test('count e buscar usam o mesmo critério e são consistentes', function () {
        ptComConsolidacaoAtrasada($this->usuario->id, $this->unidade->id);

        $count = $this->provider->count($this->usuario->id);
        $page = $this->provider->buscar($this->usuario->id, 1, 15);

        expect($count)->toBe(1);
        expect($page->total())->toBe(1);
    });

    test('não conta consolidação dentro do prazo (data_fim futura)', function () {
        ptComConsolidacaoAtrasada($this->usuario->id, $this->unidade->id, atrasada: false);

        expect($this->provider->count($this->usuario->id))->toBe(0);
        expect($this->provider->buscar($this->usuario->id)->total())->toBe(0);
    });

    test('não conta consolidação já concluída (status != INCLUIDO)', function () {
        $programa = Programa::factory()->create(['dias_tolerancia_consolidacao' => 0]);
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $programa->id,
        ]);
        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => \App\Enums\StatusEnum::CONCLUIDO->value,
            'data_fim' => now()->subDays(10)->toDateString(),
        ]);

        expect($this->provider->count($this->usuario->id))->toBe(0);
    });

    test('não conta consolidação de PT de outro usuário', function () {
        $outro = Usuario::factory()->create();
        ptComConsolidacaoAtrasada($outro->id, $this->unidade->id);

        expect($this->provider->count($this->usuario->id))->toBe(0);
    });

    test('buscar retorna o PT correto', function () {
        $plano = ptComConsolidacaoAtrasada($this->usuario->id, $this->unidade->id);

        $page = $this->provider->buscar($this->usuario->id, 1, 15);

        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($plano->id);
    });
});
