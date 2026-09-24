<?php

use App\Exceptions\ServerException;
use App\Services\CodigoOrgaoService;

it('normaliza o identificador conforme o formato usado nas consultas SIAPE', function () {
    expect(CodigoOrgaoService::normalizar(' 0020000 '))->toBe('20000')
        ->and(CodigoOrgaoService::normalizar('ORG-A'))->toBe('ORG-A');
});

it('rejeita código do órgão vazio', function () {
    CodigoOrgaoService::obrigatorio('   ');
})->throws(ServerException::class, CodigoOrgaoService::MENSAGEM_OBRIGATORIO);

it('rejeita código do órgão maior que a coluna de destino', function () {
    CodigoOrgaoService::obrigatorio(str_repeat('1', 21));
})->throws(ServerException::class, CodigoOrgaoService::MENSAGEM_TAMANHO);
