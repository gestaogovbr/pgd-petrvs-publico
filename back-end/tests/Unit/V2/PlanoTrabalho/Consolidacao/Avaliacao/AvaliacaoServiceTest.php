<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoService;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacaoNota;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->authValidator = Mockery::mock(AvaliacaoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(AvaliacaoStoreValidator::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->service = new AvaliacaoService(
        $this->authValidator,
        $this->storeValidator,
        $this->statusService,
    );
});

afterEach(fn () => Mockery::close());

describe('AvaliacaoService::store', function () {

    test('propaga exceção de autorização', function () {
        $dto = new AvaliacaoStoreDTO('plano-1', 'consolidacao-1', 'usuario-1', 'nota-1', null);

        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Apenas a chefia da unidade pode avaliar períodos avaliativos.'));

        $this->service->store($dto);
    })->throws(ForbiddenException::class, 'Apenas a chefia da unidade pode avaliar períodos avaliativos.');
});
