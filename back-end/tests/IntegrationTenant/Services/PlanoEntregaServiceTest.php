<?php

namespace Tests\IntegrationTenant\Services;

use App\Models\Entidade;
use App\Models\PlanoEntrega;
use App\Models\Programa;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Models\TipoJustificativa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Services\PlanoEntregaService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Str;


describe('PlanoEntregaService - Cancelar Avaliacao (Integração)', function () {

    it('deve cancelar a avaliação persistindo no banco de dados', function () {
        Bus::fake();

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

        // 5. Usuario
        $usuario = new Usuario();
        $usuario->id = Str::uuid();
        $usuario->forceFill([
            'email' => 'teste@petrvs.com',
            'nome' => 'Usuário Teste',
            'cpf' => '11111111111',
            'apelido' => 'Teste',
            'matricula' => '1234567',
            'sexo' => 'MASCULINO',
            'modalidade_pgd' => 'presencial',
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

describe('PlanoEntregaService::buscaCondicoes - gestorDelegadoUnidadePlano', function () {

    test('retorna true quando usuário logado é gestor delegado da unidade do plano', function () {
        Bus::fake();

        $tipoAvaliacao = new TipoAvaliacao();
        $tipoAvaliacao->id = Str::uuid();
        $tipoAvaliacao->fill(['nome' => 'Avaliação Delegado', 'tipo' => 'QUALITATIVO']);
        $tipoAvaliacao->save();

        $tipoJustificativa = new TipoJustificativa();
        $tipoJustificativa->id = Str::uuid();
        $tipoJustificativa->fill(['nome' => 'Justificativa Delegado']);
        $tipoJustificativa->save();

        $entidade = new Entidade();
        $entidade->id = Str::uuid();
        $entidade->fill([
            'sigla' => 'ENT_DELEG',
            'nome' => 'Entidade Delegado Teste',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
        ]);
        $entidade->save();

        $unidade = new Unidade();
        $unidade->id = Str::uuid();
        $unidade->fill([
            'sigla' => 'UNI_DELEG',
            'nome' => 'Unidade Delegado Teste',
            'entidade_id' => $entidade->id,
            'codigo' => '99901',
            'instituidora' => 1,
        ]);
        $unidade->save();

        $programa = new Programa();
        $programa->id = Str::uuid();
        $programa->fill([
            'nome' => 'Programa Delegado Teste',
            'normativa' => 'Normativa 1',
            'config_plano_entrega' => '{"tipo_entrega": "POR_ENTREGA"}',
            'unidade_id' => $unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'prazo_max_plano_entrega' => 30,
            'termo_obrigatorio' => 0,
            'tipo_avaliacao_plano_entrega_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_plano_trabalho_id' => $tipoAvaliacao->id,
            'tipo_justificativa_id' => $tipoJustificativa->id,
        ]);
        $programa->save();

        $usuario = new Usuario();
        $usuario->id = Str::uuid();
        $usuario->forceFill([
            'email' => 'delegado-pe-test@petrvs.com',
            'nome' => 'Gestor Delegado PE',
            'cpf' => '99988877766',
            'apelido' => 'Delegado',
            'matricula' => '9999001',
            'sexo' => 'MASCULINO',
            'modalidade_pgd' => 'presencial',
        ]);
        $usuario->save();

        $integrante = new UnidadeIntegrante();
        $integrante->id = Str::uuid();
        $integrante->forceFill([
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
        ]);
        $integrante->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->id = Str::uuid();
        $atribuicao->forceFill([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR_DELEGADO',
        ]);
        $atribuicao->save();

        $this->actingAs($usuario);

        $planoEntrega = PlanoEntrega::withoutEvents(function () use ($unidade, $programa, $usuario) {
            $pe = new PlanoEntrega();
            $pe->id = Str::uuid();
            $pe->fill([
                'unidade_id' => $unidade->id,
                'programa_id' => $programa->id,
                'status' => 'INCLUIDO',
                'criacao_usuario_id' => $usuario->id,
                'nome' => 'PE Delegado Teste',
                'data_inicio' => now(),
                'data_fim' => now()->addMonth(),
                'numero' => 9001,
            ]);
            $pe->save();
            return $pe;
        });

        $service = new PlanoEntregaService();
        $condicoes = $service->buscaCondicoes(['id' => $planoEntrega->id]);

        expect($condicoes['gestorDelegadoUnidadePlano'])->toBeTrue()
            ->and($condicoes['gestorUnidadePlano'])->toBeFalse();
    });

    test('retorna false quando usuário logado não é gestor delegado da unidade do plano', function () {
        Bus::fake();

        $tipoAvaliacao = new TipoAvaliacao();
        $tipoAvaliacao->id = Str::uuid();
        $tipoAvaliacao->fill(['nome' => 'Avaliação Lotado', 'tipo' => 'QUALITATIVO']);
        $tipoAvaliacao->save();

        $tipoJustificativa = new TipoJustificativa();
        $tipoJustificativa->id = Str::uuid();
        $tipoJustificativa->fill(['nome' => 'Justificativa Lotado']);
        $tipoJustificativa->save();

        $entidade = new Entidade();
        $entidade->id = Str::uuid();
        $entidade->fill([
            'sigla' => 'ENT_LOT',
            'nome' => 'Entidade Lotado Teste',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
        ]);
        $entidade->save();

        $unidade = new Unidade();
        $unidade->id = Str::uuid();
        $unidade->fill([
            'sigla' => 'UNI_LOT',
            'nome' => 'Unidade Lotado Teste',
            'entidade_id' => $entidade->id,
            'codigo' => '99902',
            'instituidora' => 1,
        ]);
        $unidade->save();

        $programa = new Programa();
        $programa->id = Str::uuid();
        $programa->fill([
            'nome' => 'Programa Lotado Teste',
            'normativa' => 'Normativa 2',
            'config_plano_entrega' => '{"tipo_entrega": "POR_ENTREGA"}',
            'unidade_id' => $unidade->id,
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'prazo_max_plano_entrega' => 30,
            'termo_obrigatorio' => 0,
            'tipo_avaliacao_plano_entrega_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_plano_trabalho_id' => $tipoAvaliacao->id,
            'tipo_justificativa_id' => $tipoJustificativa->id,
        ]);
        $programa->save();

        $usuario = new Usuario();
        $usuario->id = Str::uuid();
        $usuario->forceFill([
            'email' => 'lotado-pe-test@petrvs.com',
            'nome' => 'Lotado PE',
            'cpf' => '99988877755',
            'apelido' => 'Lotado',
            'matricula' => '9999002',
            'sexo' => 'MASCULINO',
            'modalidade_pgd' => 'presencial',
        ]);
        $usuario->save();

        $integrante = new UnidadeIntegrante();
        $integrante->id = Str::uuid();
        $integrante->forceFill([
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
        ]);
        $integrante->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->id = Str::uuid();
        $atribuicao->forceFill([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'LOTADO',
        ]);
        $atribuicao->save();

        $this->actingAs($usuario);

        $planoEntrega = PlanoEntrega::withoutEvents(function () use ($unidade, $programa, $usuario) {
            $pe = new PlanoEntrega();
            $pe->id = Str::uuid();
            $pe->fill([
                'unidade_id' => $unidade->id,
                'programa_id' => $programa->id,
                'status' => 'INCLUIDO',
                'criacao_usuario_id' => $usuario->id,
                'nome' => 'PE Lotado Teste',
                'data_inicio' => now(),
                'data_fim' => now()->addMonth(),
                'numero' => 9002,
            ]);
            $pe->save();
            return $pe;
        });

        $service = new PlanoEntregaService();
        $condicoes = $service->buscaCondicoes(['id' => $planoEntrega->id]);

        expect($condicoes['gestorDelegadoUnidadePlano'])->toBeFalse()
            ->and($condicoes['gestorUnidadePlano'])->toBeFalse();
    });
});
