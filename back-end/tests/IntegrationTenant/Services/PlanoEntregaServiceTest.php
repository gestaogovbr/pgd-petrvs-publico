<?php

namespace Tests\IntegrationTenant\Services;

use App\Services\PlanoEntregaService;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Models\TipoModalidade;
use App\Models\TipoAvaliacao;
use App\Models\TipoJustificativa;
use Illuminate\Support\Str;

describe('PlanoEntregaService - Cancelar Avaliacao (Integração)', function () {
    
    it('deve cancelar a avaliação persistindo no banco de dados', function () {
        // Criar dados manualmente (Factories não disponíveis)
        
        // 0. Dependências de Programa
        $tipoAvaliacao = new TipoAvaliacao();
        $tipoAvaliacao->id = Str::uuid();
        $tipoAvaliacao->fill([
            'nome' => 'Avaliação Padrão',
            'tipo' => 'QUALITATIVO'
        ]);
        $tipoAvaliacao->save();

        $tipoJustificativa = new TipoJustificativa();
        $tipoJustificativa->id = Str::uuid();
        $tipoJustificativa->fill([
            'nome' => 'Justificativa Padrão'
        ]);
        $tipoJustificativa->save();

        // 1. Entidade
        $entidade = new Entidade();
        $entidade->id = Str::uuid();
        $entidade->fill([
            'sigla' => 'ENT_TEST',
            'nome' => 'Entidade de Teste',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
        ]);
        $entidade->save();

        // 2. Unidade
        $unidade = new Unidade();
        $unidade->id = Str::uuid();
        $unidade->fill([
            'sigla' => 'UNI_TEST',
            'nome' => 'Unidade de Teste',
            'entidade_id' => $entidade->id,
            'codigo' => '12345',
            'instituidora' => 1
        ]);
        $unidade->save();

        // 3. Programa
        $programa = new Programa();
        $programa->id = Str::uuid();
        $programa->fill([
            'nome' => 'Programa Teste',
            'normativa' => 'Normativa 1',
            'config_plano_entrega' => '{"tipo_entrega": "POR_ENTREGA"}',
            'unidade_id' => $unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'prazo_max_plano_entrega' => 30,
            'termo_obrigatorio' => 0,
            // 'tipo_avaliacao_id' => $tipoAvaliacao->id, // Removido pois parece não existir no banco
            'tipo_avaliacao_plano_entrega_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_plano_trabalho_id' => $tipoAvaliacao->id,
            'tipo_justificativa_id' => $tipoJustificativa->id
        ]);
        $programa->save();

        // 4. Tipo Modalidade (necessário para usuário)
        $tipoModalidade = new TipoModalidade();
        $tipoModalidade->id = Str::uuid();
        $tipoModalidade->fill([
            'nome' => 'Modalidade Teste',
            'exige_pedagio' => 0,
            'plano_trabalho_calcula_horas' => 0,
            'atividade_tempo_despendido' => 0,
            'atividade_esforco' => 0,
        ]);
        $tipoModalidade->save();

        // 5. Usuario
        $usuario = new Usuario();
        $usuario->id = Str::uuid();
        $usuario->fill([
            'email' => 'teste@petrvs.com',
            'nome' => 'Usuário Teste',
            'cpf' => '11111111111',
            'apelido' => 'Teste',
            'matricula' => '1234567',
            'sexo' => 'MASCULINO',
            'tipo_modalidade_id' => $tipoModalidade->id,
        ]);
        $usuario->save();
        
        // Autenticar usuário
        $this->actingAs($usuario);
        
        // 6. PlanoEntrega
        $planoEntrega = PlanoEntrega::withoutEvents(function () use ($unidade, $programa, $usuario) {
            $planoEntrega = new PlanoEntrega();
            $planoEntrega->id = Str::uuid();
            $planoEntrega->fill([
                'unidade_id' => $unidade->id,
                'programa_id' => $programa->id,
                'status' => 'AVALIADO',
                'criacao_usuario_id' => $usuario->id,
                'nome' => 'Plano de Entrega Teste',
                'data_inicio' => now(),
                'data_fim' => now()->addMonth(),
                'numero' => 123
            ]);
            $planoEntrega->save();
            return $planoEntrega;
        });

        $service = new PlanoEntregaService();
        
        $data = [
            'id' => $planoEntrega->id,
            'justificativa' => 'Justificativa do teste de integração'
        ];

        // Execução
        $resultado = $service->cancelarAvaliacao($data, $unidade->toArray());

        expect($resultado)->toBeTrue();

        // Verificação no banco
        $planoEntrega->refresh();
        expect($planoEntrega->status)->toBe('CONCLUIDO');
    });
});
