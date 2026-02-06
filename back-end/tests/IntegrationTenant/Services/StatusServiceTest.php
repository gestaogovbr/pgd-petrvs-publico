<?php

namespace Tests\IntegrationTenant\Services;

use App\Services\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Entidade;

// Uses automatically applies DatabaseTenantTestCase from Pest.php config for IntegrationTenant suite
// but we explicitly extended it above for clarity, or we can just use uses() if configured.
// Pest.php usually handles it. Let's follow the doc pattern which uses 'uses(DatabaseTenantTestCase::class)' implicitly or explicitly.
// The doc says: "Todos os arquivos criados dentro de tests/IntegrationTenant usarão automaticamente a classe base Tests\DatabaseTenantTestCase"

describe('StatusService Integration', function () {
    
    beforeEach(function () {
        // Criar dependências básicas
        $this->entidade = Entidade::create([
            'id' => 'entidade-teste',
            'nome' => 'Entidade Teste',
            'sigla' => 'ET'
        ]);
        
        $this->unidade = Unidade::create([
            'id' => 'unidade-teste',
            'entidade_id' => $this->entidade->id,
            'nome' => 'Unidade Teste',
            'sigla' => 'UT',
            'codigo' => '123',
            'instituidora' => 1
        ]);

        $this->tipoModalidade = TipoModalidade::create([
            'id' => 'modalidade-teste',
            'nome' => 'Modalidade Teste',
            'sigla' => 'MT'
        ]);

        $this->usuario = new Usuario();
        $this->usuario->fill([
            'id' => 'usuario-teste',
            'nome' => 'Usuario Teste',
            'email' => 'usuario@teste.com',
            'cpf' => '00000000000',
            'apelido' => 'UserTeste',
            'tipo_modalidade_id' => $this->tipoModalidade->id
        ]);
        $this->usuario->saveOrFail();

        $this->programa = Programa::create([
            'id' => 'programa-teste',
            'nome' => 'Programa Teste',
            'unidade_id' => $this->unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'prazo_max_alteracao_plano' => 10
        ]);
    });

    it('atualiza status e cria historico no banco de dados', function () {
        // Garantir que o usuário foi criado corretamente
        expect($this->usuario->exists)->toBeTrue();
        expect($this->usuario->id)->not->toBeEmpty();

        // Preparar
        $planoTrabalho = PlanoTrabalho::create([
            // 'id' => 'plano-teste', // ID não é fillable, deixar gerar UUID
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'tipo_modalidade_id' => $this->tipoModalidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addMonth(),
            'status' => 'INCLUIDO',
            'criacao_usuario_id' => $this->usuario->id
        ]);

        $service = new StatusService();

        // Executar
        $novoStatus = 'ATIVO';
        $justificativa = 'Aprovação do plano';
        
        // Simular usuário logado para evitar erro se o usuarioId passado for vazio (fallback)
        $this->actingAs($this->usuario);

        // Testar passando o ID explicitamente
        $service->atualizaStatus($planoTrabalho, $novoStatus, $justificativa, $this->usuario->id);

        // Verificar
        
        // 1. O status da entidade foi atualizado
        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $planoTrabalho->id,
            'status' => $novoStatus
        ]);

        // 2. O histórico foi criado
        $planoTrabalho->refresh();
        expect($planoTrabalho->status)->toBe($novoStatus);
        
        // Verificar via relacionamento
        expect($planoTrabalho->statusHistorico()->count())->toBe(1);
        
        $historico = $planoTrabalho->statusHistorico()->first();
        expect($historico->codigo)->toBe($novoStatus);
        expect($historico->justificativa)->toBe($justificativa);
        expect($historico->usuario_id)->toBe($this->usuario->id);
    });
});
