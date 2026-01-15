<?php

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Services\AtividadeService;
use App\Services\Snapshot\Rebuilder\AtividadeSnapshotRebuilder;
use Illuminate\Support\Facades\Schema;
use DateTime;
use Illuminate\Support\Facades\DB;

uses(Tests\TestCase::class);

beforeEach(function () {
    if (!Schema::hasTable('atividades')) {
        Schema::create('atividades', function ($table) {
            $table->uuid('id')->primary();
            $table->string('descricao');
            $table->integer('tempo_planejado')->nullable();
            $table->datetime('data_estipulada_entrega')->nullable();
            $table->datetime('data_entrega')->nullable();
            $table->integer('tempo_despendido')->nullable();
            $table->string('status')->default('PLANEJADO');
            $table->json('etiquetas')->nullable();
            $table->json('checklist')->nullable();
            $table->integer('prioridade')->default(3);
            $table->integer('progresso')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    if (!Schema::hasTable('planos_trabalhos_consolidacoes_atividades')) {
        Schema::create('planos_trabalhos_consolidacoes_atividades', function ($table) {
            $table->uuid('id')->primary();
            $table->uuid('plano_trabalho_consolidacao_id');
            $table->uuid('atividade_id');
            $table->datetime('data_conclusao');
            $table->json('snapshot');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    $this->rebuilder = new AtividadeSnapshotRebuilder();
    $this->consolidacaoId = 'consolidacao-123';
    $this->dataConclusao = new DateTime('2024-01-15 10:00:00');
});

test('reconstrói atividade sem snapshot quando data conclusão é nula', function () {
    $atividade = Mockery::mock('App\Models\Atividade');
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
    $atividade = Mockery::mock('App\Models\Atividade');
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
    DB::table('planos_trabalhos_consolidacoes_atividades')->insert([
        'id' => 'snapshot-123',
        'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
        'atividade_id' => 'atividade-123',
        'data_conclusao' => $this->dataConclusao->format('Y-m-d H:i:s'),
        'snapshot' => json_encode([
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
        ]),
        'created_at' => now(),
        'updated_at' => now()
    ]);


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
    $atividade = Mockery::mock('App\Models\Atividade');
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

    $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

    expect($resultado['comentarios'])->toHaveCount(2);
    expect($resultado['comentarios'][0]['id'])->toBe('1');
    expect($resultado['comentarios'][1]['id'])->toBe('3');
});

test('filtra pausas por data de consolidação', function () {
    $atividade = Mockery::mock('App\Models\Atividade');
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

    $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

    expect($resultado['pausas'])->toHaveCount(1);
    expect($resultado['pausas'][0]['id'])->toBe('1');
});

test('filtra tarefas por data de consolidação', function () {
    $atividade = Mockery::mock('App\Models\Atividade');
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

    $resultado = $this->rebuilder->rebuildFromSnapshot($atividade, $this->consolidacaoId, $this->dataConclusao);

    expect($resultado['tarefas'])->toHaveCount(1);
    expect($resultado['tarefas'][0]['id'])->toBe('1');
});

test('chamada do método com o tipo errado de modelo retorna AssertionError', function () {
    $naoAtividade = Mockery::mock('App\Models\NaoAtividade');
    expect(fn() => $this->rebuilder->rebuildFromSnapshot($naoAtividade, $this->consolidacaoId, $this->dataConclusao))->toThrow(AssertionError::class);
});
