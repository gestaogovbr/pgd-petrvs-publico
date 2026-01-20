<?php

use App\Services\PlanoTrabalhoConsolidacaoService;
use App\Services\StatusService;
use App\Services\UsuarioService;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\DatabaseSetup;

uses(Tests\TestCase::class);

beforeEach(function () {
    $this->service = new PlanoTrabalhoConsolidacaoService();
    DatabaseSetup::DBup();
});

describe('#concluir - exceções', function () {
    test('lança exceção quando consolidação não existe', function () {
        expect(fn() => $this->service->concluir('inexistente-id', null))
            ->toThrow(ServerException::class, 'Consolidação não encontrada');
    });

    test('lança exceção quando consolidação já está concluída', function () {
        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-123',
            'plano_trabalho_id' => 'plano-123',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'data_conclusao' => '2024-02-01 10:00:00',
            'status' => 'CONCLUIDO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos')->insert([
            'id' => 'plano-123',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'programa_id' => 'programa-123',
            'tipo_modalidade_id' => 'modalidade-123',
            'criacao_usuario_id' => 'criacao-usuario-123',
            'unidade_id' => 'unidade-123',
            'usuario_id' => 'usuario-123',
            'status' => 'ATIVO',
            'created_at' => now(),
            'updated_at' => now()
        ]);



        expect(fn() => $this->service->concluir('consolidacao-123', null))
            ->toThrow(ServerException::class, 'Consolidação já concluída');
    });

    test('lança exceção quando não há atividades', function () {

        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-123',
            'plano_trabalho_id' => 'plano-123',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'status' => 'ATIVO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        /** @var PlanoTrabalhoConsolidacaoService $service */
        $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial()->shouldAllowMockingProtectedMethods();
        $service->shouldReceive('consolidacaoDados')
            ->with('consolidacao-123')
            ->andReturn(['atividades' => []]);

        expect(fn() => $service->concluir('consolidacao-123', null))
            ->toThrow(ServerException::class, 'Antes de concluir, é necessário fazer a descrição dos trabalhos executados.');
    });

    test('executa rollback em caso de erro', function () {
        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-error',
            'plano_trabalho_id' => 'plano-error',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'data_conclusao' => null,
            'status' => 'INCLUIDO'
        ]);

        $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();
        $service->shouldReceive('consolidacaoDados')
            ->andThrow(new Exception('Erro simulado'));

        /** @var PlanoTrabalhoConsolidacaoService $service */
        expect(fn() => $service->concluir('consolidacao-error', null))
            ->toThrow(Exception::class, 'Erro simulado');

        $unchangedConsolidacao = PlanoTrabalhoConsolidacao::find('consolidacao-error');
        expect($unchangedConsolidacao->data_conclusao)->toBeNull();
    });

    test('lança exceção quando usuário não é gestor e há entregas sem atividades', function () {
        // Create user and authenticate
        DB::table('usuarios')->insert([
            'id' => 'user-regular',
            'nome' => 'Regular User',
            'email' => 'regular@example.com',
            'cpf' => '12345678904',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $user = Usuario::find('user-regular');
        $this->actingAs($user);

        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-regular',
            'plano_trabalho_id' => 'plano-regular',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'status' => 'INCLUIDO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos')->insert([
            'id' => 'plano-regular',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'programa_id' => 'programa-123',
            'tipo_modalidade_id' => 'modalidade-123',
            'criacao_usuario_id' => 'criacao-usuario-123',
            'unidade_id' => 'unidade-123',
            'usuario_id' => 'usuario-123',
            'status' => 'ATIVO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos_entregas')->insert([
            'id' => 'entrega-1',
            'plano_trabalho_id' => 'plano-regular',
        ]);
        DB::table('planos_trabalhos_entregas')->insert([
            'id' => 'entrega-2',
            'plano_trabalho_id' => 'plano-regular',
        ]);

        $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();

        $service->shouldReceive('consolidacaoDados')
            ->andReturn([
                'atividades' => [
                    ['id' => 'atividade-1', 'plano_trabalho_entrega_id' => 'entrega-1']
                    // Missing activity for entrega-2
                ],
                'afastamentos' => [],
                'ocorrencias' => [],
                'planoTrabalho' => (object)[
                    'unidade_id' => 'unidade-123',
                    'entregas' => collect([
                        (object)['id' => 'entrega-1'],
                        (object)['id' => 'entrega-2'] // This entrega has no activity
                    ])
                ],
                'programa' => (object)[]
            ]);

        $usuarioService = Mockery::mock(UsuarioService::class);
        $usuarioService->shouldReceive('isGestorUnidade')->with('unidade-123')->andReturn(false);

        $service->shouldReceive('__get')->with('usuarioService')->andReturn($usuarioService);

        /** @var PlanoTrabalhoConsolidacaoService $service */
        expect(fn() => $service->concluir('consolidacao-regular', null))
            ->toThrow(ServerException::class, 'Para concluir é preciso que todas as entregas tenham atividades associadas');
    });
});

describe('#concluir - happy path', function () {
    test('concluir executa com sucesso quando dados são válidos', function () {
        DB::table('usuarios')->insert([
            'id' => 'user-123',
            'nome' => 'Test User',
            'email' => 'test@example.com',
            'cpf' => '12345678901',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $user = Usuario::find('user-123');
        $this->actingAs($user);

        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-123',
            'plano_trabalho_id' => 'plano-123',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'status' => 'INCLUIDO'
        ]);


        DB::table('planos_trabalhos')->insert([
            'id' => 'plano-123',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'programa_id' => 'programa-123',
            'tipo_modalidade_id' => 'modalidade-123',
            'criacao_usuario_id' => 'criacao-usuario-123',
            'unidade_id' => 'unidade-123',
            'usuario_id' => 'usuario-123',
            'status' => 'ATIVO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('atividades')->insert([
            'id' => 'atividade-1',
            'plano_trabalho_id' => 'plano-123',
            'plano_trabalho_entrega_id' => 'entrega-1',
            'descricao' => 'Atividade de teste',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos_entregas')->insert([
            'id' => 'entrega-1',
            'plano_trabalho_id' => 'plano-123',
        ]);

        $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();

        $service->shouldReceive('consolidacaoDados')
            ->andReturn([
                'atividades' => [['id' => 'atividade-1', 'plano_trabalho_entrega_id' => 'entrega-1',]],
                'afastamentos' => [],
                'ocorrencias' => [],
                'planoTrabalho' => (object)['unidade_id' => 'unidade-123', 'entregas' => collect((object)['id' => 'entrega-1'])],
                'programa' => (object)[]
            ]);

        $statusService = Mockery::mock(StatusService::class);
        $usuarioService = Mockery::mock(UsuarioService::class);

        $service->shouldReceive('__get')->with('statusService')->andReturn($statusService);
        $service->shouldReceive('__get')->with('usuarioService')->andReturn($usuarioService);

        /** @var PlanoTrabalhoConsolidacaoService $service */
        $result = $service->concluir('consolidacao-123', 'Justificativa teste');
        expect($result)->toBeArray();

        $updatedConsolidacao = PlanoTrabalhoConsolidacao::find('consolidacao-123');
        expect($updatedConsolidacao->data_conclusao)->not->toBeNull();
        expect($updatedConsolidacao->justificativa_conclusao)->toBe('Justificativa teste');
    });
});
