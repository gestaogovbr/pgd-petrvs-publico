<?php

use App\Enums\ComentarioPrivacidadeEnum;
use App\Enums\ComentarioTipoEnum;

describe('Enums de Comentario', function () {
    it('mantém o valor esperado para o tipo técnico', function () {
        expect(ComentarioTipoEnum::TECNICO->value)->toBe('TECNICO');
    });

    it('mantém o valor esperado para a privacidade pública', function () {
        expect(ComentarioPrivacidadeEnum::PUBLICO->value)->toBe('PUBLICO');
    });
});
