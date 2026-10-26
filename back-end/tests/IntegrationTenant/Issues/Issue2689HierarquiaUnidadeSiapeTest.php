<?php

use App\Models\IntegracaoUnidade;
use App\Models\Unidade;
use App\Services\CodigoOrgaoService;
use App\Services\IntegracaoService;

function integracaoUnidadesIssue2689(string $codigoOrgao): IntegracaoService
{
    $config = config('integracao');
    $config['useLocalFiles'] = true;
    $config['siape']['codOrgao'] = $codigoOrgao;

    $integracao = new IntegracaoService($config);
    $integracao->integracaoServiceAdapter = new class {
        public function retornarUorgs(): array
        {
            return ['uorg' => []];
        }
    };

    return $integracao;
}

test('issue 2689 - carga vincula unidade existente sem pai ao superior informado pelo SIAPE', function () {
    $codigoOrgao = CodigoOrgaoService::atual();
    $pai = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '71001',
        'nome' => 'Unidade Superior',
        'sigla' => 'SUPERIOR',
        'path' => '',
    ]);
    $filha = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '71002',
        'nome' => 'Unidade Subordinada',
        'sigla' => 'SUBORDINADA',
        'cidade_id' => null,
        'unidade_pai_id' => null,
        'path' => '',
        'entidade_id' => $pai->entidade_id,
    ]);

    IntegracaoUnidade::create([
        'codigo_orgao' => $codigoOrgao,
        'id_servo' => $filha->codigo,
        'codigo_siape' => $filha->codigo,
        'pai_servo' => $pai->codigo,
        'pai_siape' => $pai->codigo,
        'nomeuorg' => $filha->nome,
        'siglauorg' => $filha->sigla,
        'ativa' => 'true',
        'data_modificacao' => '2026-10-01 00:00:00',
    ]);

    $integracao = integracaoUnidadesIssue2689($codigoOrgao);
    $integracao->sincronizacao([
        'entidade' => $pai->entidade_id,
        'unidades' => true,
        'servidores' => false,
        'gestores' => false,
    ]);

    expect($integracao->result['unidades']['Resultado'])->toBe('Sucesso');
    expect($filha->fresh()->unidade_pai_id)->toBe($pai->id);
    expect($filha->fresh()->path)->toBe('/' . $pai->id);
});

test('issue 2689 - raiz legitima permanece sem pai ao atualizar seus dados', function (string $codigoPaiSiape) {
    $codigoOrgao = CodigoOrgaoService::atual();
    $raiz = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '72001',
        'nome' => 'Unidade Raiz',
        'sigla' => 'RAIZ',
        'unidade_pai_id' => null,
        'path' => '',
    ]);

    IntegracaoUnidade::create([
        'codigo_orgao' => $codigoOrgao,
        'id_servo' => $raiz->codigo,
        'codigo_siape' => $raiz->codigo,
        'pai_servo' => $codigoPaiSiape,
        'pai_siape' => $codigoPaiSiape,
        'nomeuorg' => 'Unidade Raiz Atualizada',
        'siglauorg' => $raiz->sigla,
        'ativa' => 'true',
        'data_modificacao' => '2026-10-01 00:00:00',
    ]);

    $integracao = integracaoUnidadesIssue2689($codigoOrgao);
    $integracao->sincronizacao([
        'entidade' => $raiz->entidade_id,
        'unidades' => true,
        'servidores' => false,
        'gestores' => false,
    ]);

    expect($integracao->result['unidades']['Resultado'])->toBe('Sucesso');
    expect($raiz->fresh()->nome)->toBe('Unidade Raiz Atualizada');
    expect($raiz->fresh()->unidade_pai_id)->toBeNull();
    expect($raiz->fresh()->path)->toBe('');
    expect($integracao->paisAlterados)->toBe([]);
})->with([
    'sentinela SIAPE' => [(string) IntegracaoService::CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI],
    'pai vazio' => [''],
]);

test('issue 2689 - troca de pai atualiza caminho da filha e de sua descendente', function () {
    $codigoOrgao = CodigoOrgaoService::atual();
    $paiAntigo = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '75001',
        'path' => '',
    ]);
    $paiNovo = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '75002',
        'path' => '',
        'entidade_id' => $paiAntigo->entidade_id,
    ]);
    $filha = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '75003',
        'nome' => 'Unidade Subordinada',
        'sigla' => 'SUBORDINADA',
        'unidade_pai_id' => $paiAntigo->id,
        'path' => '/' . $paiAntigo->id,
        'entidade_id' => $paiAntigo->entidade_id,
    ]);
    $descendente = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '75004',
        'unidade_pai_id' => $filha->id,
        'path' => '/' . $paiAntigo->id . '/' . $filha->id,
        'entidade_id' => $paiAntigo->entidade_id,
    ]);

    IntegracaoUnidade::create([
        'codigo_orgao' => $codigoOrgao,
        'id_servo' => $filha->codigo,
        'codigo_siape' => $filha->codigo,
        'pai_servo' => $paiNovo->codigo,
        'pai_siape' => $paiNovo->codigo,
        'nomeuorg' => $filha->nome,
        'siglauorg' => $filha->sigla,
        'ativa' => 'true',
        'data_modificacao' => '2026-10-01 00:00:00',
    ]);

    $integracao = integracaoUnidadesIssue2689($codigoOrgao);
    $integracao->sincronizacao([
        'entidade' => $paiAntigo->entidade_id,
        'unidades' => true,
        'servidores' => false,
        'gestores' => false,
    ]);

    expect($integracao->result['unidades']['Resultado'])->toBe('Sucesso');
    expect($filha->fresh()->unidade_pai_id)->toBe($paiNovo->id);
    expect($filha->fresh()->path)->toBe('/' . $paiNovo->id);
    expect($descendente->fresh()->path)->toBe('/' . $paiNovo->id . '/' . $filha->id);
});

test('issue 2689 - pai inexistente interrompe atualizacao sem converter subordinada em raiz', function () {
    $codigoOrgao = CodigoOrgaoService::atual();
    $filha = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '73001',
        'nome' => 'Unidade Subordinada',
        'sigla' => 'SUBORDINADA',
        'unidade_pai_id' => null,
        'path' => '',
    ]);

    IntegracaoUnidade::create([
        'codigo_orgao' => $codigoOrgao,
        'id_servo' => $filha->codigo,
        'codigo_siape' => $filha->codigo,
        'pai_servo' => '73999',
        'pai_siape' => '73999',
        'nomeuorg' => $filha->nome,
        'siglauorg' => $filha->sigla,
        'ativa' => 'true',
        'data_modificacao' => '2026-10-01 00:00:00',
    ]);

    $integracao = integracaoUnidadesIssue2689($codigoOrgao);
    $integracao->sincronizacao([
        'entidade' => $filha->entidade_id,
        'unidades' => true,
        'servidores' => false,
        'gestores' => false,
    ]);

    expect($integracao->result['unidades']['Resultado'])->toStartWith('ERRO: Unidade pai 73999 não encontrada');
    expect($filha->fresh()->unidade_pai_id)->toBeNull();
    expect($filha->fresh()->path)->toBe('');
});

test('issue 2689 - pai ausente nao impede atualizar outra unidade do lote', function () {
    $codigoOrgao = CodigoOrgaoService::atual();
    $pai = Unidade::factory()->create(['codigo_orgao' => $codigoOrgao, 'codigo' => '76001']);
    $comFalha = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '76002',
        'nome' => 'Unidade sem pai resolvido',
        'sigla' => 'SEM-PAI',
        'unidade_pai_id' => null,
        'entidade_id' => $pai->entidade_id,
    ]);
    $valida = Unidade::factory()->create([
        'codigo_orgao' => $codigoOrgao,
        'codigo' => '76003',
        'nome' => 'Unidade com pai resolvido',
        'sigla' => 'COM-PAI',
        'unidade_pai_id' => null,
        'entidade_id' => $pai->entidade_id,
    ]);

    foreach ([[$comFalha, '76999'], [$valida, $pai->codigo]] as [$unidade, $codigoPai]) {
        IntegracaoUnidade::create([
            'codigo_orgao' => $codigoOrgao,
            'id_servo' => $unidade->codigo,
            'codigo_siape' => $unidade->codigo,
            'pai_servo' => $codigoPai,
            'pai_siape' => $codigoPai,
            'nomeuorg' => $unidade->nome,
            'siglauorg' => $unidade->sigla,
            'ativa' => 'true',
            'data_modificacao' => '2026-10-01 00:00:00',
        ]);
    }

    $integracao = integracaoUnidadesIssue2689($codigoOrgao);
    $integracao->sincronizacao([
        'entidade' => $pai->entidade_id,
        'unidades' => true,
        'servidores' => false,
        'gestores' => false,
    ]);

    expect($integracao->result['unidades']['Resultado'])->toBe(IntegracaoService::RESULTADO_UNIDADES_PARCIAL);
    expect($integracao->result['unidades']['Falhas'])->toHaveCount(1);
    expect($comFalha->fresh()->unidade_pai_id)->toBeNull();
    expect($valida->fresh()->unidade_pai_id)->toBe($pai->id);
    expect($valida->fresh()->path)->toBe('/' . $pai->id);
});
