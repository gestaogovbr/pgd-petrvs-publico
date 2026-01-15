<?php

use App\Services\Snapshot\Rebuilder\PlanoTrabalhoConsolidacaoRebuildService;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

uses(Tests\TestCase::class);

beforeEach(function () {
    $this->service = new PlanoTrabalhoConsolidacaoRebuildService();
    $this->consolidacao = new PlanoTrabalhoConsolidacao();
    $this->consolidacao->id = 'consolidacao-123';
    $this->consolidacao->data_conclusao = new \DateTime('2024-01-15 10:00:00');
    $this->collection = new Collection();
});

test('chama rebuilder correto para atividades', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'atividades');
    
    expect($resultado)->toBeArray();
});

test('chama rebuilder correto para afastamentos', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'afastamento');
    
    expect($resultado)->toBeArray();
});

test('chama rebuilder correto para ocorrências', function () {
    $resultado = $this->service->rebuildCollections($this->collection, $this->consolidacao, 'ocorrencia');
    
    expect($resultado)->toBeArray();
});

test('lança exceção para tipo não suportado', function () {
    expect(fn() => $this->service->rebuildCollections($this->collection, $this->consolidacao, 'tipo_inexistente'))
        ->toThrow(\InvalidArgumentException::class, 'Rebuilder não listado: tipo_inexistente');
});
