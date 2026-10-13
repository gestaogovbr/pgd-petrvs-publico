<?php

use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Unidade;
use App\Repository\RelatorioEntregaRepository;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaIndexFiltersDTO;
use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaQueryDTO;

beforeEach(function () {
    $this->repository = app(RelatorioEntregaRepository::class);

    $this->unidadePlano = Unidade::factory()->create();
    $this->unidadeDemandante = Unidade::factory()->create();

    $this->plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePlano->id]);
});

function consultarPorUnidade(RelatorioEntregaRepository $repository, string $unidadeId): array
{
    $filters = new RelatorioEntregaIndexFiltersDTO(
        unidadeId: $unidadeId,
        incluirUnidadesSubordinadas: false,
        periodoInicio: null,
        periodoFim: null,
    );

    $query = new RelatorioEntregaQueryDTO(
        page: 1,
        limit: 0,
        filters: $filters,
        orderBy: [],
    );

    return $repository->query($query);
}

describe('RelatorioEntrega - filtro por unidade executora do plano (pe.unidade_id)', function () {

    test('filtra pela unidade do plano, não pela unidade demandante da entrega', function () {
        PlanoEntregaEntrega::factory()->forPlanoEntrega($this->plano)->create([
            'unidade_id' => $this->unidadeDemandante->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        $resultadoPlano = consultarPorUnidade($this->repository, $this->unidadePlano->id);
        expect($resultadoPlano['count'])->toBe(1);

        $resultadoDemandante = consultarPorUnidade($this->repository, $this->unidadeDemandante->id);
        expect($resultadoDemandante['count'])->toBe(0);
    });

    test('conta apenas entregas cujo plano pertence à unidade consultada', function () {
        $planoDemandante = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadeDemandante->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($this->plano)->count(2)->create([
            'unidade_id' => $this->unidadeDemandante->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);
        PlanoEntregaEntrega::factory()->forPlanoEntrega($planoDemandante)->create([
            'unidade_id' => $this->unidadePlano->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        $resultado = consultarPorUnidade($this->repository, $this->unidadePlano->id);
        expect($resultado['count'])->toBe(2);
    });
});
