<?php

use App\Services\Snapshot\Rebuilder\PlanoTrabalhoConsolidacaoRebuildService;
use App\Services\Snapshot\Rebuilder\BaseRebuilder;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

uses(Tests\TestCase::class);

class MockRebuilder extends BaseRebuilder
{
    public $rebuildCalls = [];

    public function rebuildFromSnapshot($model, $consolidacaoId, $consolidacaoDataConclusao)
    {
        $this->rebuildCalls[] = [
            'model' => $model,
            'consolidacaoId' => $consolidacaoId,
            'consolidacaoDataConclusao' => $consolidacaoDataConclusao
        ];
        return ['rebuilt' => true, 'id' => $model->id ?? 'test'];
    }
}

beforeEach(function () {
    $this->atividadeRebuilder = new MockRebuilder();
    $this->afastamentoRebuilder = new MockRebuilder();
    $this->ocorrenciaRebuilder = new MockRebuilder();
    
    $rebuilders = [
        'atividades' => $this->atividadeRebuilder,
        'afastamento' => $this->afastamentoRebuilder,
        'ocorrencia' => $this->ocorrenciaRebuilder
    ];
    
    $this->service = new PlanoTrabalhoConsolidacaoRebuildService($rebuilders);
    
    $this->consolidacao = new PlanoTrabalhoConsolidacao();
    $this->consolidacao->id = 'consolidacao-123';
    $this->consolidacao->data_conclusao = new \DateTime('2024-01-15 10:00:00');
    
    $this->collection = new Collection([
        (object)['id' => 'item-1'],
        (object)['id' => 'item-2']
    ]);
});

test('chama rebuilder correto para atividades', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'atividades');
    
    expect($resultado)->toBeArray();
    expect($resultado)->toHaveCount(2);
    expect($this->atividadeRebuilder->rebuildCalls)->toHaveCount(2);
});

test('chama rebuilder correto para afastamentos', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'afastamento');
    
    expect($resultado)->toBeArray();
    expect($this->afastamentoRebuilder->rebuildCalls)->toHaveCount(2);
});

test('chama rebuilder correto para ocorrências', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'ocorrencia');
    
    expect($resultado)->toBeArray();
    expect($this->ocorrenciaRebuilder->rebuildCalls)->toHaveCount(2);
});

test('lança exceção para tipo não suportado', function () {
    expect(fn() => $this->service->rebuildCollections($this->collection, $this->consolidacao, 'tipo_inexistente'))
        ->toThrow(\TypeError::class, 'Rebuilder não listado: tipo_inexistente');
});
