<?php

namespace Tests\IntegrationTenant\Services;

use App\Services\PlanoTrabalhoConsolidacaoService;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\ServerException;
use Mockery;

beforeEach(function () {
    $this->service = app(PlanoTrabalhoConsolidacaoService::class);
});

describe('PlanoTrabalhoConsolidacaoService::concluir', function () {
    test('lança exceção quando consolidação não existe', function () {
        expect(fn() => $this->service->concluir('inexistente-id', null))
            ->toThrow(ServerException::class, 'Consolidação não encontrada');
    });

    test('lança exceção quando consolidação já está concluída', function () {
        $plano = PlanoTrabalho::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'CONCLUIDO',
            'data_conclusao' => now()
        ]);

        expect(fn() => $this->service->concluir($consolidacao->id, null))
            ->toThrow(ServerException::class, 'Consolidação já concluída');
    });

    test('lança exceção quando não há atividades', function () {
        $plano = PlanoTrabalho::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO'
        ]);

        expect(fn() => $this->service->concluir($consolidacao->id, null))
            ->toThrow(ServerException::class, 'Antes de concluir, é necessário fazer a descrição dos trabalhos executados.');
    });

    test('lança exceção quando usuário não é gestor e há entregas sem atividades', function () {
        $usuario = Usuario::factory()->create();
        $this->actingAs($usuario);

        $plano = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31'
        ]);

        $entrega1 = PlanoTrabalhoEntrega::factory()->create(['plano_trabalho_id' => $plano->id]);
        $entrega2 = PlanoTrabalhoEntrega::factory()->create(['plano_trabalho_id' => $plano->id]);
        
        Atividade::factory()->create([
            'plano_trabalho_entrega_id' => $entrega1->id,
            'usuario_id' => $usuario->id,
            'data_distribuicao' => '2024-01-15',
            'data_estipulada_entrega' => '2024-01-20'
        ]);

        expect(fn() => $this->service->concluir($consolidacao->id, null))
            ->toThrow(ServerException::class, 'Para concluir é preciso que todas as entregas tenham atividades associadas');
    });

    test('executa rollback em caso de erro', function () {
        $plano = PlanoTrabalho::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO'
        ]);

        $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();
        $service->shouldReceive('consolidacaoDados')
            ->andThrow(new \Exception('Erro simulado'));

        /** @var PlanoTrabalhoConsolidacaoService $service */
        expect(fn() => $service->concluir($consolidacao->id, null))
            ->toThrow(\Exception::class, 'Erro simulado');

        $consolidacao->refresh();
        expect($consolidacao->data_conclusao)->toBeNull();
    });

    test('concluir executa com sucesso quando dados são válidos', function () {
        $usuario = Usuario::factory()->create();
        $this->actingAs($usuario);

        $plano = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31'
        ]);

        $entrega = PlanoTrabalhoEntrega::factory()->create(['plano_trabalho_id' => $plano->id]);
        Atividade::factory()->create([
            'plano_trabalho_entrega_id' => $entrega->id,
            'usuario_id' => $usuario->id,
            'data_distribuicao' => '2024-01-15',
            'data_estipulada_entrega' => '2024-01-20'
        ]);

        $result = $this->service->concluir($consolidacao->id, 'Justificativa teste');
        
        expect($result)->toBeArray();
        
        $consolidacao->refresh();
        expect($consolidacao->data_conclusao)->not->toBeNull();
        expect($consolidacao->justificativa_conclusao)->toBe('Justificativa teste');
    });
});

describe('PlanoTrabalhoConsolidacaoService::consolidacaoDados', function () {
    test('retorna dados completos da consolidação', function () {
        $plano = PlanoTrabalho::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'justificativa_conclusao' => 'Justificativa de teste'
        ]);

        $result = $this->service->consolidacaoDados($consolidacao->id);

        expect($result)->toBeArray();
        expect($result)->toHaveKeys([
            'programa',
            'planoTrabalho',
            'atividades',
            'afastamentos',
            'ocorrencias',
            'status',
            'justificativa_conclusao'
        ]);

        expect($result['planoTrabalho']->id)->toBe($plano->id);
        expect($result['justificativa_conclusao'])->toBe('Justificativa de teste');
    });

    test('lança exceção quando consolidação não existe', function () {
        expect(fn() => $this->service->consolidacaoDados('inexistente-id'))
            ->toThrow(\Exception::class);
    });
});
