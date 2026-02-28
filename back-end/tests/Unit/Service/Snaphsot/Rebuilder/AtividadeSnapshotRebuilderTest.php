<?php

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Services\AtividadeService;
use App\Services\Snapshot\Rebuilder\AtividadeSnapshotRebuilder;
use DateTime;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;


uses(Tests\TestCase::class);

class TestAtividadeService extends AtividadeService
{
    public function metadados($atividade): array
    {
        return [
            'tempo_total' => 'metadados_' . ($atividade['tempo_planejado'] ?? 0),
            'progresso_calculado' => 'metadados_' . $atividade['progresso'] ?? 0,
            'status_metadado' => 'metadados_' . $atividade['status']
        ];
    }
}

beforeEach(function () {

    $this->testAtividadeService = Mockery::mock(AtividadeService::class);
    $this->rebuilder = Mockery::mock(AtividadeSnapshotRebuilder::class, [$this->testAtividadeService])
        ->makePartial()
        ->shouldAllowMockingProtectedMethods();
    $this->consolidacaoId = 'consolidacao-123';
    $this->dataConclusao = new DateTime('2024-01-15 10:00:00');
});

test('injeta AtividadeService via construtor', function () {
    $atividadeService = Mockery::mock(AtividadeService::class);
    $rebuilder = new AtividadeSnapshotRebuilder($atividadeService);

    expect($rebuilder)->toBeInstanceOf(AtividadeSnapshotRebuilder::class);
});

describe('rebuildFromSnapshot', function () {
    test('reconstrói atividade sem snapshot quando data conclusão é nula', function () {
        $atividade = Mockery::mock(Atividade::class);
        $atividade->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-123',
            'descricao' => 'Descrição original',
            'tempo_planejado' => 120,
            'status' => 'EM_ANDAMENTO',
            'comentarios' => [],
            'pausas' => [],
            'tarefas' => []
        ]);

        $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, null);

        expect($resultado['descricao'])->toBe('Descrição original');
        expect($resultado['tempo_planejado'])->toBe(120);
        expect($resultado['status'])->toBe('EM_ANDAMENTO');
    });

    test('reconstrói atividade com snapshot quando existe consolidação', function () {
        $atividade = Mockery::mock(Atividade::class);
        $atividade->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-123',
            'descricao' => 'Descrição original',
            'tempo_planejado' => 120,
            'status' => 'EM_ANDAMENTO',
            'comentarios' => [],
            'pausas' => [],
            'tarefas' => []
        ]);

        // Criar snapshot via SQL

        $snapshot = (new PlanoTrabalhoConsolidacaoAtividade())->fill([
            'id' => 'snapshot-123',
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'atividade_id' => 'atividade-123',
            'data_conclusao' => $this->dataConclusao->format('Y-m-d H:i:s'),
            'snapshot' => [
                'descricao' => 'Descrição do snapshot',
                'tempo_planejado' => 180,
                'data_estipulada_entrega' => '2024-01-20 10:00:00',
                'data_entrega' => '2024-01-18 15:30:00',
                'tempo_despendido' => 150,
                'data_arquivamento' => null,
                'status' => 'CONCLUIDO',
                'etiquetas' => ['urgente', 'importante'],
                'checklist' => [['item' => 'Tarefa 1', 'checked' => true]],
                'prioridade' => 1,
                'progresso' => 100,
                'deleted_at' => null
            ],
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $this->rebuilder->shouldReceive('consolidacaoAtividade')
            ->with($this->consolidacaoId, $this->dataConclusao, 'atividade-123')
            ->andReturn($snapshot);


        $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['descricao'])->toBe('Descrição do snapshot');
        expect($resultado['tempo_planejado'])->toBe(180);
        expect($resultado['data_estipulada_entrega'])->toBe('2024-01-20 10:00:00');
        expect($resultado['data_entrega'])->toBe('2024-01-18 15:30:00');
        expect($resultado['tempo_despendido'])->toBe(150);
        expect($resultado['data_arquivamento'])->toBeNull();
        expect($resultado['status'])->toBe('CONCLUIDO');
        expect($resultado['etiquetas'])->toBe(['urgente', 'importante']);
        expect($resultado['checklist'])->toHaveCount(1);
        expect($resultado['prioridade'])->toBe(1);
        expect($resultado['progresso'])->toBe(100);
        expect($resultado['deleted_at'])->toBeNull();
    });

    test('filtra comentários por data de consolidação', function () {
        $atividade = Mockery::mock(Atividade::class);
        $atividade->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-123',
            'descricao' => 'Teste',
            'comentarios' => [
                ['id' => '1', 'created_at' => '2024-01-10 10:00:00', 'deleted_at' => null],
                ['id' => '2', 'created_at' => '2024-01-20 10:00:00', 'deleted_at' => null], // Após consolidação
                ['id' => '3', 'created_at' => '2024-01-12 10:00:00', 'deleted_at' => '2024-01-13 10:00:00'] // Deletado antes
            ],
            'pausas' => [],
            'tarefas' => []
        ]);

        $this->rebuilder->shouldReceive('consolidacaoAtividade')
            ->with($this->consolidacaoId, $this->dataConclusao, 'atividade-123')
            ->andReturn(null);

        $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['comentarios'])->toHaveCount(2);
        expect($resultado['comentarios'][0]['id'])->toBe('1');
        expect($resultado['comentarios'][1]['id'])->toBe('3');
    });

    test('filtra pausas por data de consolidação', function () {
        $atividade = Mockery::mock(Atividade::class);
        $atividade->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-123',
            'descricao' => 'Teste',
            'comentarios' => [],
            'pausas' => [
                ['id' => '1', 'created_at' => '2024-01-10 10:00:00', 'deleted_at' => null],
                ['id' => '2', 'created_at' => '2024-01-20 10:00:00', 'deleted_at' => null] // Após consolidação
            ],
            'tarefas' => []
        ]);

        $this->rebuilder->shouldReceive('consolidacaoAtividade')
            ->with($this->consolidacaoId, $this->dataConclusao, 'atividade-123')
            ->andReturn(null);

        $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['pausas'])->toHaveCount(1);
        expect($resultado['pausas'][0]['id'])->toBe('1');
    });

    test('filtra tarefas por data de consolidação', function () {
        $atividade = Mockery::mock(Atividade::class);
        $atividade->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-123',
            'descricao' => 'Teste',
            'comentarios' => [],
            'pausas' => [],
            'tarefas' => [
                ['id' => '1', 'created_at' => '2024-01-10 10:00:00', 'deleted_at' => null, 'data_conclusao' => '2024-01-12 10:00:00'],
                ['id' => '2', 'created_at' => '2024-01-20 10:00:00', 'deleted_at' => null, 'data_conclusao' => null] // Após consolidação
            ]
        ]);

        $this->rebuilder->shouldReceive('consolidacaoAtividade')
            ->with($this->consolidacaoId, $this->dataConclusao, 'atividade-123')
            ->andReturn(null);

        $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['tarefas'])->toHaveCount(1);
        expect($resultado['tarefas'][0]['id'])->toBe('1');
    });

    test('chamada do método com o tipo errado de modelo retorna TypeError', function () {
        $naoAtividade = Mockery::mock('App\Models\NaoAtividade');
        expect(fn() => $this->rebuilder->rebuildFromSnapshot($naoAtividade, $this->consolidacaoId, $this->dataConclusao))->toThrow(TypeError::class);
    });
});

describe('rebuildCollection', function () {
    test('chama metadados do AtividadeService no rebuildCollection', function () {
        $atividade1 = Mockery::mock(Atividade::class);
        $atividade1->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-1',
            'descricao' => 'Atividade 1',
            'tempo_planejado' => 120,
            'tempo_despendido' => 80,
            'progresso' => 75,
            'status' => 'EM_ANDAMENTO',
            'comentarios' => [],
            'pausas' => [],
            'tarefas' => []
        ]);

        $atividade2 = Mockery::mock(Atividade::class);
        $atividade2->shouldReceive('toArray')->andReturn([
            'id' => 'atividade-2',
            'descricao' => 'Atividade 2',
            'tempo_planejado' => 180,
            'tempo_despendido' => 150,
            'progresso' => 100,
            'status' => 'CONCLUIDO',
            'comentarios' => [],
            'pausas' => [],
            'tarefas' => []
        ]);

        $collection = new Collection([$atividade1, $atividade2]);

        $this->testAtividadeService->shouldReceive('metadados')
            ->andReturnUsing(function ($atividade) {
                return [
                    'tempo_total' => 'metadados_' . ($atividade['tempo_planejado'] ?? 0),
                    'progresso_calculado' => 'metadados_' . ($atividade['progresso'] ?? 0),
                    'status_metadado' => 'metadados_' . $atividade['status']
                ];
            });

        $resultado = $this->rebuilder->rebuildCollection($collection, $this->consolidacaoId, null);

        expect($resultado)->toHaveCount(2);
        expect($resultado[0]['metadados']['tempo_total'])->toBe('metadados_120');
        expect($resultado[0]['metadados']['progresso_calculado'])->toBe('metadados_75');
        expect($resultado[0]['metadados']['status_metadado'])->toBe('metadados_EM_ANDAMENTO');

        expect($resultado[1]['metadados']['tempo_total'])->toBe('metadados_180');
        expect($resultado[1]['metadados']['progresso_calculado'])->toBe('metadados_100');
        expect($resultado[1]['metadados']['status_metadado'])->toBe('metadados_CONCLUIDO');
    });
});
