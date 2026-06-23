<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->renderer = new TCRTemplateRenderer();
});

describe('TCRTemplateRenderer', function () {

    test('renderiza variável simples', function () {
        $result = $this->renderer->render('Olá {{nome}}!', (object) ['nome' => 'João']);

        expect($result)->toBe('Olá João!');
    });

    test('renderiza variável aninhada', function () {
        $result = $this->renderer->render(
            '{{usuario.nome}} - {{unidade.sigla}}',
            (object) ['usuario' => (object) ['nome' => 'Maria'], 'unidade' => (object) ['sigla' => 'CGPGD']]
        );

        expect($result)->toBe('Maria - CGPGD');
    });

    test('retorna string vazia quando template é vazio', function () {
        expect($this->renderer->render('', null))->toBe('');
    });

    test('retorna template sem tags inalterado', function () {
        expect($this->renderer->render('<p>Sem variáveis</p>', (object) []))->toBe('<p>Sem variáveis</p>');
    });

    test('variável inexistente renderiza vazio', function () {
        expect($this->renderer->render('{{inexistente}}', (object) []))->toBe('');
    });

    test('renderiza if verdadeiro', function () {
        $result = $this->renderer->render(
            '{{if:status="ATIVO"}}Ativo{{end-if}}',
            (object) ['status' => 'ATIVO']
        );

        expect($result)->toBe('Ativo');
    });

    test('renderiza if falso como vazio', function () {
        $result = $this->renderer->render(
            '{{if:status="ATIVO"}}Ativo{{end-if}}',
            (object) ['status' => 'INCLUIDO']
        );

        expect($result)->toBe('');
    });

    test('renderiza for com array', function () {
        $result = $this->renderer->render(
            '{{for:itens[item]}}{{item.nome}};{{end-for}}',
            (object) ['itens' => [(object) ['nome' => 'A'], (object) ['nome' => 'B']]]
        );

        expect($result)->toBe('A;B;');
    });
});
