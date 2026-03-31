<?php

use App\V2\PlanoTrabalho\Documento\TcrDatasourceBuilder;
use App\Services\TemplateDatasetService;
use App\Services\TemplateService;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Template;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->templateDatasetService = Mockery::mock(TemplateDatasetService::class);
    $this->templateService = Mockery::mock(TemplateService::class);

    $this->builder = new TcrDatasourceBuilder(
        $this->templateDatasetService,
        $this->templateService,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('TcrDatasourceBuilder', function () {

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

    test('getDataset delega ao TemplateDatasetService', function () {
        $expected = [['field' => 'nome', 'label' => 'nome']];

        $this->templateDatasetService->shouldReceive('getDataset')
            ->with('PLANO_TRABALHO', true)
            ->andReturn($expected);

        expect($this->builder->getDataset())->toBe($expected);
    });

    test('getDatasource delega ao TemplateService', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $expected = (object) ['nome' => 'Teste'];

        $this->templateService->shouldReceive('getDatasource')
            ->with('PLANO_TRABALHO', $plano)
            ->andReturn($expected);

        expect($this->builder->getDatasource($plano))->toBe($expected);
    });
});
