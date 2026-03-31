<?php

use App\V2\PlanoTrabalho\Documento\TcrRenderer;
use App\Services\TemplateService;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->templateService = Mockery::mock(TemplateService::class);
    $this->renderer = new TcrRenderer($this->templateService);
});

afterEach(function () {
    Mockery::close();
});

describe('TcrRenderer', function () {

    test('render delega ao TemplateService::renderTemplate', function () {
        $template = '<html>{{nome}}</html>';
        $datasource = (object) ['nome' => 'João'];

        $this->templateService->shouldReceive('renderTemplate')
            ->once()
            ->with($template, $datasource)
            ->andReturn('<html>João</html>');

        expect($this->renderer->render($template, $datasource))->toBe('<html>João</html>');
    });

    test('render retorna string vazia quando template é vazio', function () {
        $this->templateService->shouldReceive('renderTemplate')
            ->with('', null)
            ->andReturn('');

        expect($this->renderer->render('', null))->toBe('');
    });
});
