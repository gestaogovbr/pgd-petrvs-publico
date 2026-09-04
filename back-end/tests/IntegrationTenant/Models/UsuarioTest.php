<?php

namespace Tests\IntegrationTenant\Models;

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Models\Entidade;
use App\Services\Siape\Unidade\Enum\Atribuicao;

test('usuario deve retornar relacionamento lotacao corretamente', function () {
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

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_lotacao@petrvs.com',
        'nome' => 'Usuário Teste Lotação',
        'cpf' => '99999999999',
        'apelido' => 'TesteLotacao',
        'matricula' => '1234567',
        'sexo' => 'MASCULINO',
        'modalidade_pgd' => 'presencial',
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
    $entidade = new Entidade();
    $entidade->id = \Illuminate\Support\Str::uuid();
    $entidade->fill([
        'sigla' => 'ENT_TEST_2',
        'nome' => 'Entidade de Teste 2',
        'abrangencia' => 'NACIONAL',
        'carga_horaria_padrao' => 8,
        'gravar_historico_processo' => 0,
        'layout_formulario_atividade' => 'COMPLETO',
        'forma_contagem_carga_horaria' => 'DIA',
    ]);
    $entidade->save();

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_sem_lotacao@petrvs.com',
        'nome' => 'Usuário Teste Sem Lotação',
        'cpf' => '88888888888',
        'apelido' => 'TesteSemLotacao',
        'modalidade_pgd' => 'presencial',
    ]);
    $usuario->save();

    $unidade = Unidade::create([
        'codigo' => 'UNIT_TEST_2',
        'sigla' => 'UTEST2',
        'nome' => 'Unidade de Teste 2',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
        'entidade_id' => $entidade->id,
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

test('usuario nao aparece em areasTrabalho quando a unica atribuicao esta inativa (soft-deleted)', function () {
    $entidade = Entidade::create([
        'sigla' => 'ENT_TEST_3',
        'nome' => 'Entidade de Teste 3',
        'abrangencia' => 'NACIONAL',
        'carga_horaria_padrao' => 8,
        'gravar_historico_processo' => 0,
        'layout_formulario_atividade' => 'COMPLETO',
        'forma_contagem_carga_horaria' => 'DIA',
    ]);

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_atribuicao_inativa@petrvs.com',
        'nome' => 'Usuário Teste Atribuição Inativa',
        'cpf' => '77777777777',
        'apelido' => 'TesteAtribInativa',
        'modalidade_pgd' => 'presencial',
    ]);
    $usuario->save();

    $unidade = Unidade::create([
        'codigo' => 'UNIT_TEST_3',
        'sigla' => 'UTEST3',
        'nome' => 'Unidade de Teste 3',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
        'entidade_id' => $entidade->id,
    ]);

    $integrante = UnidadeIntegrante::create([
        'unidade_id' => $unidade->id,
        'usuario_id' => $usuario->id,
    ]);

    $atribuicao = UnidadeIntegranteAtribuicao::create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => Atribuicao::COLABORADOR->value,
    ]);
    $atribuicao->delete(); // simula o vinculo "removido" que a hipotese do Sintoma 1 supoe

    $usuario->refresh();

    expect($usuario->areasTrabalho)->toHaveCount(0);
});

test('usuario com atribuicoes ativas em varias unidades aparece em todas em areasTrabalho', function () {
    $entidade = Entidade::create([
        'sigla' => 'ENT_TEST_4',
        'nome' => 'Entidade de Teste 4',
        'abrangencia' => 'NACIONAL',
        'carga_horaria_padrao' => 8,
        'gravar_historico_processo' => 0,
        'layout_formulario_atividade' => 'COMPLETO',
        'forma_contagem_carga_horaria' => 'DIA',
    ]);

    $usuario = new Usuario();
    $usuario->id = \Illuminate\Support\Str::uuid();
    $usuario->fill([
        'email' => 'teste_multiplas_unidades@petrvs.com',
        'nome' => 'Usuário Teste Múltiplas Unidades',
        'cpf' => '66666666666',
        'apelido' => 'TesteMultiUnid',
        'modalidade_pgd' => 'presencial',
    ]);
    $usuario->save();

    $unidadeIds = [];
    foreach (['UNIT_TEST_4A', 'UNIT_TEST_4B'] as $codigo) {
        $unidade = Unidade::create([
            'codigo' => $codigo,
            'sigla' => $codigo,
            'nome' => "Unidade $codigo",
            'instituidora' => 1,
            'atividades_arquivamento_automatico' => 0,
            'entidade_id' => $entidade->id,
        ]);
        $unidadeIds[] = $unidade->id;

        $integrante = UnidadeIntegrante::create([
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
        ]);

        UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => Atribuicao::COLABORADOR->value,
        ]);
    }

    $usuario->refresh();

    expect($usuario->areasTrabalho)->toHaveCount(2)
        ->and($usuario->areasTrabalho->pluck('unidade_id')->sort()->values()->all())
        ->toBe(collect($unidadeIds)->sort()->values()->all());
});
