<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRAssinaturaDTO;
use App\Models\Documento;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('TCRAssinaturaDTO', function () {

    test('toArray retorna campos para persistência', function () {
        $dto = new TCRAssinaturaDTO(
            documentoId: 'doc-1',
            usuarioId: 'user-1',
            dataAssinatura: now(),
            hash: 'abc123',
        );

        $array = $dto->toArray();

        expect($array['documento_id'])->toBe('doc-1');
        expect($array['usuario_id'])->toBe('user-1');
        expect($array['assinatura'])->toBe('abc123');
        expect($array)->toHaveKeys(['documento_id', 'usuario_id', 'data_assinatura', 'assinatura']);
    });

    test('fromDocumento gera hash a partir do conteúdo do documento', function () {
        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->conteudo = '<html>TCR</html>';

        $dto = TCRAssinaturaDTO::fromDocumento($documento, 'user-1');

        expect($dto->documentoId)->toBe('doc-1');
        expect($dto->usuarioId)->toBe('user-1');
        expect($dto->hash)->toBeString()->not->toBeEmpty();
    });
});
