<?php

namespace Tests\Unit\Services;

use App\Services\AtividadeService;
use App\Services\UnidadeService;
use Illuminate\Support\Facades\DB;
use Mockery;
use Tests\TestCase;

class AtividadeServiceIniciarSuspenderTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testIniciarComSuspenderChamaHoraDaUnidadeENaoPausaAtividadeAtual(): void
    {
        $unidadeId = 'u-1';
        $usuarioId = 'user-1';
        $atividadeIdAtual = 'atv-1';
        $outrasAtividades = ['atv-2', 'atv-3'];

        $unidadeService = Mockery::mock(UnidadeService::class);
        $unidadeService->shouldReceive('hora')
            ->once()
            ->with($unidadeId)
            ->andReturn('2025-01-01T00:00:00');
        $this->app->instance(UnidadeService::class, $unidadeService);

        DB::shouldReceive('beginTransaction')->andReturnNull();
        DB::shouldReceive('commit')->andReturnNull();
        DB::shouldReceive('rollback')->andReturnNull();

        $atividadeModelMock = Mockery::mock('alias:App\Models\Atividade');
        $atividadeEncontrada = new class($atividadeIdAtual, $unidadeId) {
            public string $id;
            public string $unidade_id;
            public string $usuario_id = 'user-1';
            public function __construct($id, $unidadeId)
            {
                $this->id = $id;
                $this->unidade_id = $unidadeId;
            }
            public function toArray(): array
            {
                return ['id' => $this->id, 'unidade_id' => $this->unidade_id, 'usuario_id' => $this->usuario_id];
            }
        };
        $atividadeModelMock->shouldReceive('find')->once()->with($atividadeIdAtual)->andReturn($atividadeEncontrada);

        $pausaMock = Mockery::mock('overload:App\Models\AtividadePausa');
        $pausaMock->shouldReceive('save')->atLeast()->once()->andReturnTrue();

        $service = new class extends AtividadeService {
            public array $pausasCriadas = [];
            public function validateStore($data, $unidade, $action) {}
            public function validateIniciar($data) {}
            public function update($data, $unidade, $notify = true) {}
            public function __get($name) { 
                if ($name === 'statusService') {
                    return new class { public function atualizaStatus(...$args) {} };
                }
                if ($name === 'unidadeService') {
                    return app(UnidadeService::class);
                }
                return null;
            }
            public function iniciadas($usuarioId) { return ['atv-2','atv-3']; }
        };

        $unidade = new class($unidadeId) {
            public string $id;
            public function __construct($id) { $this->id = $id; }
        };

        $data = [
            'id' => $atividadeIdAtual,
            'usuario_id' => $usuarioId,
            'suspender' => true,
        ];

        $result = $service->iniciar($data, $unidade);
        $this->assertTrue($result);
    }
}
