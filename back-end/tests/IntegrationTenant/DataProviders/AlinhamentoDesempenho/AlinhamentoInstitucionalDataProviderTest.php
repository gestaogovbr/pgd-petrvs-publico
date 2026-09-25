<?php

use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Unidade;
use App\V2\PainelGerencial\AlinhamentoDesempenho\DataProviders\AlinhamentoInstitucionalDataProvider;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;

beforeEach(function () {
    $this->provider = app(AlinhamentoInstitucionalDataProvider::class);

    $this->unidadePai = Unidade::factory()->create();

    $this->filtros = new FiltrosPainelDTO(
        tipoConsulta: 'situacao_atual',
        unidadeId: $this->unidadePai->id,
        dataInicio: null,
        dataFim: null,
    );
});

describe('AlinhamentoInstitucionalDataProvider - plano soft-deleted', function () {

    test('exclui entregas cujo plano de entrega está soft-deleted', function () {
        $planoAtivo = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);
        $planoDeletado = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($planoAtivo)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);
        PlanoEntregaEntrega::factory()->forPlanoEntrega($planoDeletado)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        $planoDeletado->delete();

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->total)->toBe(1);
    });

    test('conta entregas de planos ativos normalmente', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->count(2)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDay(),
        ]);

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->total)->toBe(2);
    });
});

describe('AlinhamentoInstitucionalDataProvider - interseção de datas', function () {

    test('situacao_atual conta entrega vigente hoje', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDays(5),
            'data_fim' => now()->addDays(5),
        ]);

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->total)->toBe(1);
    });

    test('situacao_atual conta entrega pontual com data_fim nula vigente hoje', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->toDateString(),
            'data_fim' => null,
        ]);

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->total)->toBe(1);
    });

    test('situacao_atual exclui entrega fora da vigência', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDays(10),
            'data_fim' => now()->subDays(5),
        ]);

        $resultado = $this->provider->getData($this->filtros);

        expect($resultado->distribuicoes[0]->total)->toBe(0);
    });

    test('historico conta entrega que intersecta o período consultado', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        // Entrega começa antes e termina dentro do período consultado
        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDays(20),
            'data_fim' => now()->subDays(8),
        ]);

        $filtrosHistorico = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: now()->subDays(10)->toDateString(),
            dataFim: now()->subDays(5)->toDateString(),
        );

        $resultado = $this->provider->getData($filtrosHistorico);

        expect($resultado->distribuicoes[0]->total)->toBe(1);
    });

    test('historico exclui entrega totalmente fora do período consultado', function () {
        $plano = PlanoEntrega::factory()->create(['unidade_id' => $this->unidadePai->id]);

        PlanoEntregaEntrega::factory()->forPlanoEntrega($plano)->create([
            'unidade_id' => $this->unidadePai->id,
            'data_inicio' => now()->subDays(60),
            'data_fim' => now()->subDays(50),
        ]);

        $filtrosHistorico = new FiltrosPainelDTO(
            tipoConsulta: 'historico',
            unidadeId: $this->unidadePai->id,
            dataInicio: now()->subDays(10)->toDateString(),
            dataFim: now()->subDays(5)->toDateString(),
        );

        $resultado = $this->provider->getData($filtrosHistorico);

        expect($resultado->distribuicoes[0]->total)->toBe(0);
    });
});
