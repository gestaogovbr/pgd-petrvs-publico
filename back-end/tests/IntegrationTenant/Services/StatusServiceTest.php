<?php

namespace Tests\IntegrationTenant\Services;

use App\Services\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Entidade;
use App\Models\TipoJustificativa;
use App\Models\TipoAvaliacao;
use Illuminate\Support\Facades\DB;

// Uses automatically applies DatabaseTenantTestCase from Pest.php config for IntegrationTenant suite
// but we explicitly extended it above for clarity, or we can just use uses() if configured.
// Pest.php usually handles it. Let's follow the doc pattern which uses 'uses(DatabaseTenantTestCase::class)' implicitly or explicitly.
// The doc says: "Todos os arquivos criados dentro de tests/IntegrationTenant usarão automaticamente a classe base Tests\DatabaseTenantTestCase"

describe('StatusService Integration', function () {
    
    beforeEach(function () {
        // Criar dependências básicas
        
        // Ensure Entidade exists
        $this->entidade = new Entidade();
        $this->entidade->id = 'entidade-teste';
        if (!Entidade::find('entidade-teste')) {
            DB::table('entidades')->insert([
                'id' => 'entidade-teste',
                'nome' => 'Entidade Teste',
                'sigla' => 'ET',
                'abrangencia' => 'NACIONAL',
                'layout_formulario_atividade' => 'COMPLETO',
                'forma_contagem_carga_horaria' => 'DIA',
                'carga_horaria_padrao' => 8,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        $this->entidade = Entidade::find('entidade-teste');

        $this->unidade = new Unidade();
        $this->unidade->fill([
            'entidade_id' => $this->entidade->id,
            'nome' => 'Unidade Teste',
            'sigla' => 'UT',
            'codigo' => '123',
            'instituidora' => 1
        ]);
        $this->unidade->id = 'unidade-teste';
        $this->unidade->save();

        $this->tipoModalidade = new TipoModalidade();
        $this->tipoModalidade->fill([
            'nome' => 'Modalidade Teste',
        ]);
        $this->tipoModalidade->id = 'modalidade-teste'; // Force ID
        $this->tipoModalidade->saveOrFail();

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
        $this->actingAs($this->usuario);

        // Create dependencies for Programa
        $this->tipoJustificativa = new TipoJustificativa();
        $this->tipoJustificativa->fill(['nome' => 'Justificativa Teste']);
        $this->tipoJustificativa->save();

        $this->tipoAvaliacao = new TipoAvaliacao();
        $this->tipoAvaliacao->fill(['nome' => 'Avaliação Teste', 'tipo' => 'QUANTITATIVO']);
        $this->tipoAvaliacao->save();

        $this->programa = new Programa();
        $this->programa->fill([
            'nome' => 'Programa Teste',
            'unidade_id' => $this->unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'prazo_max_alteracao_plano' => 10,
            'prazo_max_plano_entrega' => 30,
            'termo_obrigatorio' => 1,
            'periodicidade_consolidacao' => 'MENSAL',
            'periodicidade_valor' => 1,
            'dias_tolerancia_consolidacao' => 10,
            'dias_tolerancia_avaliacao' => 10,
            'dias_tolerancia_recurso_avaliacao' => 10,
            'plano_trabalho_assinatura_participante' => 1,
            'plano_trabalho_assinatura_gestor_unidade' => 1,
            'plano_trabalho_assinatura_gestor_lotacao' => 1,
            'plano_trabalho_assinatura_gestor_entidade' => 1,
            'tipo_justificativa_id' => $this->tipoJustificativa->id,
            'tipo_avaliacao_plano_trabalho_id' => $this->tipoAvaliacao->id,
            'tipo_avaliacao_plano_entrega_id' => $this->tipoAvaliacao->id
        ]);
        $this->programa->id = 'programa-teste';
        $this->programa->save();
    });

    it('atualiza status e cria historico no banco de dados', function () {
        // Garantir que o usuário foi criado corretamente
        expect($this->usuario->exists)->toBeTrue();
        expect($this->usuario->id)->not->toBeEmpty();

        // Preparar
        $planoTrabalho = new PlanoTrabalho();
        $planoTrabalho->fill([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'tipo_modalidade_id' => $this->tipoModalidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addMonth(),
            //'status' => 'INCLUIDO',
            'criacao_usuario_id' => $this->usuario->id,
            'carga_horaria' => 8,
            'tempo_total' => 100,
            'tempo_proporcional' => 100,
            'forma_contagem_carga_horaria' => 'DIA'
        ]);
        $planoTrabalho->save();
        $planoTrabalho->refresh();

        $service = new StatusService();

        // Executar
        $novoStatus = 'ATIVO';
        $justificativa = 'Aprovação do plano';
        
        // Simular usuário logado para evitar erro se o usuarioId passado for vazio (fallback)
        $this->actingAs($this->usuario);

        $planoTrabalho->save();
        $planoTrabalho->refresh();

        $service = new StatusService();

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
        $count = $planoTrabalho->statusHistorico()->count();
        expect($count)->toBe(1);
        
        $historico = $planoTrabalho->statusHistorico()->first();
        expect($historico->codigo)->toBe($novoStatus);
        expect($historico->justificativa)->toBe($justificativa);
        expect($historico->usuario_id)->toBe($this->usuario->id);
    });
});
