<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\DocumentoRepository;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\Documento;
use App\Enums\StatusEnum;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->assinaturaRepo = Mockery::mock(DocumentoAssinaturaRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->invalidador = new TCRInvalidador(
        $this->documentoRepo,
        $this->assinaturaRepo,
        $this->planoRepo,
        $this->statusService,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('TCRInvalidador', function () {

    test('remove TCR, assinaturas e reverte status para INCLUIDO', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::AGUARDANDO_ASSINATURA->value;

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->with('plano-1')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('deleteAssinaturasDocumento')->once()->with('doc-1');
        $this->documentoRepo->shouldReceive('delete')->once()->with('doc-1');
        $this->planoRepo->shouldReceive('update')->once()->with('plano-1', ['documento_id' => null]);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($plano, StatusEnum::INCLUIDO->value, Mockery::type('string'));

        $this->invalidador->invalidar('plano-1');
    });

    test('não reverte status quando já está INCLUIDO', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::INCLUIDO->value;

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        $this->statusService->shouldNotReceive('atualizaStatus');
        $this->documentoRepo->shouldNotReceive('delete');

        $this->invalidador->invalidar('plano-1');
    });

    test('não faz nada quando plano não existe', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-x')->andReturn(null);

        $this->documentoRepo->shouldNotReceive('findTcrByPlanoTrabalhoId');
        $this->statusService->shouldNotReceive('atualizaStatus');

        $this->invalidador->invalidar('plano-x');
    });

    test('reverte status mesmo sem TCR', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::AGUARDANDO_ASSINATURA->value;

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        $this->documentoRepo->shouldNotReceive('delete');
        $this->statusService->shouldReceive('atualizaStatus')->once();

        $this->invalidador->invalidar('plano-1');
    });
});
