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
            ->andReturn(['atividades' => [], 'planoTrabalho' => (object)[]]);

        expect(fn() => $service->concluir('consolidacao-123', null))
            ->toThrow(ServerException::class, 'Antes de concluir, é necessário fazer a descrição dos trabalhos executados.');
    });

    test('lança exceção quando não há plano de trabalho', function () {

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
            ->andReturn(['atividades' => [], 'planoTrabalho' => null]);

        expect(fn() => $service->concluir('consolidacao-123', null))
            ->toThrow(ServerException::class, 'Plano de Trabalho não encontrado');
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

describe('#consolidacaoDados', function () {
    test('retorna dados completos da consolidação', function () {
        DB::table('usuarios')->insert([
            'id' => 'user-test',
            'nome' => 'Test User',
            'email' => 'test@example.com',
            'cpf' => '12345678901',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('programas')->insert([
            'id' => 'programa-test',
            'nome' => 'Programa Test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('unidades')->insert([
            'id' => 'unidade-test',
            'nome' => 'Unidade Test',
            'sigla' => 'UT',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos')->insert([
            'id' => 'plano-test',
            'programa_id' => 'programa-test',
            'usuario_id' => 'user-test',
            'unidade_id' => 'unidade-test',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'status' => 'ATIVO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Create plano_entrega
        DB::table('planos_entregas')->insert([
            'id' => 'plano-entrega-test',
            'nome' => 'Plano Entrega Test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Create entrega
        DB::table('entregas')->insert([
            'id' => 'entrega-test',
            'nome' => 'Entrega Test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Create plano_entrega_entrega (the pivot/relationship table)
        DB::table('planos_entregas_entregas')->insert([
            'id' => 'plano-entrega-entrega-test',
            'plano_entrega_id' => 'plano-entrega-test',
            'entrega_id' => 'entrega-test',
            'descricao' => 'Descrição da entrega',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Create plano_trabalho_entrega (connects plano_trabalho to plano_entrega_entrega)
        DB::table('planos_trabalhos_entregas')->insert([
            'id' => 'plano-trabalho-entrega-test',
            'plano_trabalho_id' => 'plano-test',
            'plano_entrega_entrega_id' => 'plano-entrega-entrega-test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('planos_trabalhos_consolidacoes')->insert([
            'id' => 'consolidacao-test',
            'plano_trabalho_id' => 'plano-test',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-31',
            'justificativa_conclusao' => 'Justificativa de teste',
            'status' => 'INCLUIDO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('atividades')->insert([
            'id' => 'atividade-test',
            'plano_trabalho_consolidacao_id' => 'consolidacao-test',
            'data_estipulada_entrega' => '2024-01-15',
            'data_distribuicao' => '2024-01-20',
            'usuario_id' => 'user-test',
            'descricao' => 'Atividade de teste',
            'unidade_id' => 'unidade-test',
            'status' => 'CONCLUIDO',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('ocorrencias')->insert([
            'id'    => 'ocorrencia-test',
            'usuario_id' => 'user-test',
            'data_fim' => '2024-01-15',
            'data_inicio' => '2024-01-20'
        ]);
        DB::table('planos_trabalhos_consolidacoes_ocorrencias')->insert([
            'plano_trabalho_consolidacao_id' => 'consolidacao-test',
            'ocorrencia_id' => 'ocorrencia-test'
        ]);


        DB::table('afastamentos')->insert([
            'id'    => 'afastamento-test',
            'usuario_id' => 'user-test',
            'data_fim' => '2024-01-15',
            'data_inicio' => '2024-01-20'
        ]);
        DB::table('planos_trabalhos_consolidacoes_afastamentos')->insert([
            'plano_trabalho_consolidacao_id' => 'consolidacao-test',
            'afastamento_id' => 'afastamento-test'
        ]);

        DB::table('comparecimentos')->insert([
            'id' => 'comparecimento-test',
            'plano_trabalho_consolidacao_id' => 'consolidacao-test'
        ]);

        $service = new PlanoTrabalhoConsolidacaoService();
        $result = $service->consolidacaoDados('consolidacao-test');

        expect($result)->toBeArray();
        expect($result)->toHaveKeys([
            'programa',
            'planoTrabalho',
            'planosEntregas',
            'atividades',
            'afastamentos',
            'ocorrencias',
            'comparecimentos',
            'status',
            'justificativa_conclusao'
        ]);

        expect($result['programa']->id)->toBe('programa-test');
        expect($result['planoTrabalho']->id)->toBe('plano-test');
        expect($result['planosEntregas']->contains('plano-entrega-test'))->toBe(true);
        expect($result['atividades'][0]['id'])->toBe('atividade-test');
        expect($result['afastamentos'][0]['id'])->toBe('afastamento-test');
        expect($result['ocorrencias'][0]['id'])->toBe('ocorrencia-test');
        expect($result['comparecimentos']->contains('comparecimento-test'))->toBe(true);
        expect($result['status'])->toBe('INCLUIDO');
        expect($result['justificativa_conclusao'])->toBe('Justificativa de teste');
    });

    test('retorna dados vazios quando consolidação não existe', function () {
        $service = new PlanoTrabalhoConsolidacaoService();

        expect(fn() => $service->consolidacaoDados('inexistente-id'))
            ->toThrow(Exception::class);
    });
});
