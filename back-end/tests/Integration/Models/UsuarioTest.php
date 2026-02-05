<?php

namespace Tests\Integration\Models;

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Models\TipoModalidade;
use App\Models\Entidade;
use App\Services\Siape\Unidade\Enum\Atribuicao;

test('usuario deve retornar relacionamento lotacao corretamente', function () {
    $tenant = $this->setupTenant();

    $entidade = new Entidade();
    $entidade->id = \Illuminate\Support\Str::uuid();
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

    $tipoModalidade = new TipoModalidade();
    $tipoModalidade->id = \Illuminate\Support\Str::uuid();
    $tipoModalidade->fill([
        'nome' => 'Modalidade Teste',
        'exige_pedagio' => 0,
        'plano_trabalho_calcula_horas' => 0,
        'atividade_tempo_despendido' => 0,
        'atividade_esforco' => 0,
    ]);
    $tipoModalidade->save();

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_lotacao@petrvs.com',
        'nome' => 'Usuário Teste Lotação',
        'cpf' => '99999999999',
        'apelido' => 'TesteLotacao',
        'matricula' => '1234567',
        'sexo' => 'MASCULINO',
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);
    $usuario->save();

    $unidade = new Unidade();
    $unidade->id = \Illuminate\Support\Str::uuid();
    $unidade->fill([
        'codigo' => 'UNIT_TEST',
        'sigla' => 'UTEST',
        'nome' => 'Unidade de Teste',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
        'entidade_id' => $entidade->id,
    ]);
    $unidade->save();

    $integrante = new UnidadeIntegrante();
    $integrante->id = \Illuminate\Support\Str::uuid();
    $integrante->unidade_id = $unidade->id;
    $integrante->usuario_id = $usuario->id;
    $integrante->save();

    $atribuicao = new UnidadeIntegranteAtribuicao();
    $atribuicao->id = \Illuminate\Support\Str::uuid();
    $atribuicao->unidade_integrante_id = $integrante->id;
    $atribuicao->atribuicao = Atribuicao::LOTADO->value;
    $atribuicao->save();

    expect($usuario->lotacao)
        ->not->toBeNull()
        ->toBeInstanceOf(UnidadeIntegrante::class)
        ->and((string)$usuario->lotacao->id)->toBe((string)$integrante->id);
});

test('usuario deve retornar null para lotacao quando nao possui atribuicao LOTADO', function () {
    $tenant = $this->setupTenant();

    $tipoModalidade = new TipoModalidade();
    $tipoModalidade->id = \Illuminate\Support\Str::uuid();
    $tipoModalidade->fill([
        'nome' => 'Modalidade Teste 2',
        'exige_pedagio' => 0,
        'plano_trabalho_calcula_horas' => 0,
        'atividade_tempo_despendido' => 0,
        'atividade_esforco' => 0,
    ]);
    $tipoModalidade->save();

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_sem_lotacao@petrvs.com',
        'nome' => 'Usuário Teste Sem Lotação',
        'cpf' => '88888888888',
        'apelido' => 'TesteSemLotacao',
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);
    $usuario->save();

    $unidade = Unidade::create([
        'codigo' => 'UNIT_TEST_2',
        'sigla' => 'UTEST2',
        'nome' => 'Unidade de Teste 2',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
    ]);

    $integrante = UnidadeIntegrante::create([
        'unidade_id' => $unidade->id,
        'usuario_id' => $usuario->id,
    ]);

    UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => Atribuicao::COLABORADOR->value,
    ]);

    expect($usuario->lotacao)->toBeNull();
});
