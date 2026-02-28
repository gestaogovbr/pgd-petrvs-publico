<?php

namespace Tests\Unit\Services;

use App\Services\StatusService;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Mockery;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

describe('StatusService', function () {
    it('atualiza status e cria historico corretamente', function () {
        // 1. Mock de Usuario Logado (Auth)
        $mockUsuario = Mockery::mock(Usuario::class);
        $mockUsuario->shouldReceive('getAttribute')->with('id')->andReturn('user-id-123');
        
        Auth::shouldReceive('user')
            ->andReturn($mockUsuario);

        // 2. Mock da Entidade e Relacionamentos
        $mockEntity = Mockery::mock('App\Models\PlanoTrabalho');
        $mockHistoricoRelation = Mockery::mock('Illuminate\Database\Eloquent\Relations\HasMany');
        $mockHistoricoModel = Mockery::mock('App\Models\StatusJustificativa');

        // Configuração do mock da entidade
        $mockEntity->shouldReceive('getAttribute')->with('latestStatus')->andReturn(null); // Caso acesse latestStatus (comentado no código original, mas bom prevenir)
        
        // Mock do relacionamento statusHistorico()
        $mockEntity->shouldReceive('statusHistorico')
            ->once()
            ->andReturn($mockHistoricoRelation);

        // Mock do create() no relacionamento
        $mockHistoricoRelation->shouldReceive('create')
            ->once()
            ->with([
                'codigo' => 'NOVO_STATUS',
                'justificativa' => 'Teste de justificativa',
                'usuario_id' => 'user-id-123'
            ])
            ->andReturn($mockHistoricoModel);

        // Mock do save() no histórico
        $mockHistoricoModel->shouldReceive('save')
            ->once();

        // Mock da atualização de status na entidade
        $mockEntity->shouldReceive('setAttribute')
            ->with('status', 'NOVO_STATUS')
            ->once();
            
        $mockEntity->shouldReceive('save')
            ->once();

        $mockEntity->shouldReceive('refresh')
            ->once();

        // 3. Service (Instanciação direta pois não precisamos de partial mock para este caso simples)
        // Se precisasse de partial mock para métodos protegidos, faríamos:
        // $service = Mockery::mock(StatusService::class)->makePartial();
        $service = new StatusService();

        // Execução
        $service->atualizaStatus($mockEntity, 'NOVO_STATUS', 'Teste de justificativa');

        // Assertions implícitas nos shouldReceive
        expect(true)->toBeTrue();
    });
});
