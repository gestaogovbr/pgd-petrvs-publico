<?php

namespace Tests\IntegrationTenant\Services\PlanoTrabalhoService;

use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoEntrega;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\DB;
use Mockery;

beforeEach(function () {
    $this->service = Mockery::mock(PlanoTrabalhoService::class)->makePartial();
    $this->mockUser = Mockery::mock(Usuario::class);
});

describe('PlanoTrabalhoService::validateCancelamento', function () {
    test('retorna erro quando usuário não tem permissão MOD_PTR_CNC', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(false);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBe("O usuário logado não tem permissão para cancelar planos de trabalho (MOD_PTR_CNC).\n[ver RN_PTR_R]");
    });

    test('retorna erro quando plano não está em status válido', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(true);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $this->service->shouldReceive('buscaCondicoes')
            ->with(['id' => $plano->id])
            ->andReturn([
                'planoDeletado' => false,
                'planoStatus' => 'CANCELADO',
                'gestorUnidadeExecutora' => true
            ]);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBe("O plano de trabalho não pode ser cancelado porque foi deletado ou não está em nenhum dos seguintes status: INCLUIDO, AGUARDANDO ASSINATURA ou ATIVO.\n[ver RN_PTR_R]");
    });

    test('retorna erro quando usuário não é gestor da unidade executora', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(true);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $this->service->shouldReceive('buscaCondicoes')
            ->with(['id' => $plano->id])
            ->andReturn([
                'planoDeletado' => false,
                'planoStatus' => 'ATIVO',
                'gestorUnidadeExecutora' => false
            ]);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBe("O plano de trabalho não pode ser cancelado porque o usuário logado não é um dos gestores da sua unidade executora.\n[ver RN_PTR_R]");
    });

    test('retorna null mesmo quando plano possui atividades lançadas', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(true);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $this->service->shouldReceive('buscaCondicoes')
            ->with(['id' => $plano->id])
            ->andReturn([
                'planoDeletado' => false,
                'planoStatus' => 'ATIVO',
                'gestorUnidadeExecutora' => true
            ]);

        $entrega = PlanoTrabalhoEntrega::factory()->create(['plano_trabalho_id' => $plano->id]);
        $atividade = Atividade::factory()->create([
            'plano_trabalho_entrega_id' => $entrega->id,
        ]);

        DB::table('atividades')->where('id', $atividade->id)->update(['numero' => 123]);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBeNull();
    });

    test('retorna null mesmo quando plano possui consolidação concluída', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(true);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $this->service->shouldReceive('buscaCondicoes')
            ->with(['id' => $plano->id])
            ->andReturn([
                'planoDeletado' => false,
                'planoStatus' => 'ATIVO',
                'gestorUnidadeExecutora' => true
            ]);

        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'CONCLUIDO',
        ]);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBeNull();
    });


    test('retorna null quando plano pode ser cancelado', function () {
        $plano = PlanoTrabalho::factory()->create();

        $this->mockUser->shouldReceive('hasPermissionTo')
            ->with('MOD_PTR_CNC')
            ->andReturn(true);

        $this->service->shouldReceive('loggedUser')
            ->andReturn($this->mockUser);

        $this->service->shouldReceive('buscaCondicoes')
            ->with(['id' => $plano->id])
            ->andReturn([
                'planoDeletado' => false,
                'planoStatus' => 'ATIVO',
                'gestorUnidadeExecutora' => true
            ]);

        $result = $this->service->validateCancelamento($plano->id);

        expect($result)->toBeNull();
    });
});
