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

describe('RelatorioEntrega - filtro por unidade da entrega (pee.unidade_id)', function () {

    test('filtra pela unidade demandante da entrega, não pela unidade do plano', function () {
        // Entrega cuja unidade demandante difere da unidade do plano
        PlanoEntregaEntrega::factory()->forPlanoEntrega($this->plano)->create([
            'unidade_id' => $this->unidadeDemandante->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        // Consulta pela unidade demandante retorna a entrega
        $resultadoDemandante = consultarPorUnidade($this->repository, $this->unidadeDemandante->id);
        expect($resultadoDemandante['count'])->toBe(1);

        // Consulta pela unidade do plano NÃO retorna a entrega
        $resultadoPlano = consultarPorUnidade($this->repository, $this->unidadePlano->id);
        expect($resultadoPlano['count'])->toBe(0);
    });

    test('conta apenas entregas da unidade demandante consultada', function () {
        PlanoEntregaEntrega::factory()->forPlanoEntrega($this->plano)->count(2)->create([
            'unidade_id' => $this->unidadeDemandante->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);
        PlanoEntregaEntrega::factory()->forPlanoEntrega($this->plano)->create([
            'unidade_id' => $this->unidadePlano->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        $resultado = consultarPorUnidade($this->repository, $this->unidadeDemandante->id);
        expect($resultado['count'])->toBe(2);
    });
});
