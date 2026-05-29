<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoCancelarAssinaturaValidator;
use App\Repository\DocumentoRepository;
use App\Repository\DocumentoAssinaturaRepository;
use App\Models\PlanoTrabalho;
use App\Models\Documento;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->assinaturaRepo = Mockery::mock(DocumentoAssinaturaRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoCancelarAssinaturaValidator($this->documentoRepo, $this->assinaturaRepo);
});

afterEach(function () {
    Mockery::close();
});

function fakePlanoCancelar(string $usuarioId, string $status): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->usuario_id = $usuarioId;
    $plano->status = $status;
    return $plano;
}

describe('PlanoTrabalhoDocumentoCancelarAssinaturaValidator', function () {

    test('lança ValidateException quando usuário não possui assinatura no documento', function () {
        $plano = fakePlanoCancelar('user-dono', StatusEnum::AGUARDANDO_ASSINATURA->value);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->with('plano-1')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->with('doc-1', 'user-outro')->andReturn(false);

        $this->validator->validar($plano, 'user-outro');
    })->throws(ValidateException::class, 'Usuário não possui assinatura neste documento.');

    test('lança ValidateException quando status não é AGUARDANDO_ASSINATURA', function () {
        $plano = fakePlanoCancelar('user-1', StatusEnum::INCLUIDO->value);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Plano de Trabalho deve estar com status Aguardando Assinatura para cancelar.');

    test('lança NotFoundException quando TCR não existe', function () {
        $plano = fakePlanoCancelar('user-1', StatusEnum::AGUARDANDO_ASSINATURA->value);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->with('plano-1')->andReturn(null);

        $this->validator->validar($plano, 'user-1');
    })->throws(NotFoundException::class, 'Documento TCR não encontrado para este Plano de Trabalho.');

    test('lança ValidateException quando usuário não assinou', function () {
        $plano = fakePlanoCancelar('user-1', StatusEnum::AGUARDANDO_ASSINATURA->value);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->with('doc-1', 'user-1')->andReturn(false);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Usuário não possui assinatura neste documento.');

    test('retorna documento quando todas as validações passam', function () {
        $plano = fakePlanoCancelar('user-1', StatusEnum::AGUARDANDO_ASSINATURA->value);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->andReturn(true);

        expect($this->validator->validar($plano, 'user-1'))->toBe($documento);
    });
});
