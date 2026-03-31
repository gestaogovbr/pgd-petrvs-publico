<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('TCRDocumentoDTO', function () {

    test('toArray retorna todos os campos para persistência', function () {
        $dto = new TCRDocumentoDTO(
            planoTrabalhoId: 'plano-1',
            entidadeId: 'entidade-1',
            conteudo: '<html>Renderizado</html>',
            template: '<html>{{nome}}</html>',
            dataset: [['field' => 'nome']],
            datasource: (object) ['nome' => 'Teste'],
            templateId: 'tmpl-1',
        );

        $array = $dto->toArray();

        expect($array['tipo'])->toBe('HTML');
        expect($array['especie'])->toBe('TCR');
        expect($array['titulo'])->toBe('Termo de Ciência e Responsabilidade');
        expect($array['status'])->toBe('GERADO');
        expect($array['conteudo'])->toBe('<html>Renderizado</html>');
        expect($array['template'])->toBe('<html>{{nome}}</html>');
        expect($array['plano_trabalho_id'])->toBe('plano-1');
        expect($array['entidade_id'])->toBe('entidade-1');
        expect($array['template_id'])->toBe('tmpl-1');
    });

    test('toArray aceita templateId null', function () {
        $dto = new TCRDocumentoDTO(
            planoTrabalhoId: 'plano-1',
            entidadeId: 'entidade-1',
            conteudo: '',
            template: '',
            dataset: [],
            datasource: (object) [],
            templateId: null,
        );

        expect($dto->toArray()['template_id'])->toBeNull();
    });
});
