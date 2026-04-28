<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasetProvider;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Template;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->datasetProvider = new TCRDatasetProvider();
    $this->builder = new TCRDatasourceBuilder($this->datasetProvider);
});

afterEach(function () {
    Mockery::close();
});

describe('TCRDatasourceBuilder', function () {

    test('getTemplate retorna conteúdo do templateTcr do programa', function () {
        $template = Mockery::mock(Template::class)->makePartial();
        $template->conteudo = '<html>TCR</html>';

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->shouldReceive('getAttribute')->with('templateTcr')->andReturn($template);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn($programa);

        expect($this->builder->getTemplate($plano))->toBe('<html>TCR</html>');
    });

    test('getTemplate retorna string vazia quando templateTcr é null', function () {
        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->shouldReceive('getAttribute')->with('templateTcr')->andReturn(null);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn($programa);

        expect($this->builder->getTemplate($plano))->toBe('');
    });

    test('getTemplateId retorna template_tcr_id do programa', function () {
        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->shouldReceive('getAttribute')->with('template_tcr_id')->andReturn('tmpl-123');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn($programa);

        expect($this->builder->getTemplateId($plano))->toBe('tmpl-123');
    });

    test('getDataset delega ao TCRDatasetProvider', function () {
        expect($this->builder->getDataset())->toBeArray()->not->toBeEmpty();
    });

    test('getDatasource retorna objeto com campos do plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->shouldReceive('toArray')->andReturn([
            'carga_horaria' => 8,
            'status' => 'INCLUIDO',
        ]);
        $plano->shouldReceive('getAttribute')->with('modalidade_pgd_label')->andReturn(null);
        $plano->shouldReceive('getAttribute')->with('unidade')->andReturn(null);
        $plano->shouldReceive('getAttribute')->with('usuario')->andReturn(null);
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn(null);
        $plano->shouldReceive('getAttribute')->with('entregas')->andReturn(null);
        $plano->shouldReceive('getAttribute')->with('criterios_avaliacao')->andReturn(null);

        $datasource = $this->builder->getDatasource($plano);

        expect($datasource)->toBeObject();
        expect($datasource->carga_horaria)->toBe(8);
        expect($datasource->status)->toBe('INCLUIDO');
    });
});
