<?php

use App\Exceptions\ServerException;
use App\Services\CodigoOrgaoService;
use App\Services\TenantService;

uses(Tests\TestCase::class);

it('rejeita tenant sem código do órgão antes de acessar o banco', function () {
    $service = new TenantService();

    $service->validateStore([], null, 'INSERT');
})->throws(ServerException::class, CodigoOrgaoService::MENSAGEM_OBRIGATORIO);
