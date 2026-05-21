<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAssinarValidator;
use App\Repository\DocumentoRepository;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\UnidadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\Documento;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->assinaturaRepo = Mockery::mock(DocumentoAssinaturaRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoAssinarValidator($this->documentoRepo, $this->assinaturaRepo, $this->unidadeRepo);
});

afterEach(function () {
    Mockery::close();
});

function fakePlanoAssinar(string $status): PlanoTrabalho
{
    $relation = Mockery::mock(HasMany::class);
    $relation->shouldReceive('exists')->andReturn(true);

    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->usuario_id = 'user-1';
    $plano->unidade_id = 'unidade-1';
    $plano->status = $status;
    $plano->shouldReceive('entregas')->andReturn($relation);
    return $plano;
}

describe('PlanoTrabalhoDocumentoAssinarValidator', function () {

    test('lança exceção quando status é ATIVO', function () {
        $plano = fakePlanoAssinar(StatusEnum::ATIVO->value);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Plano de Trabalho deve estar com status Incluído ou Aguardando Assinatura para ser assinado.');

    test('lança exceção quando plano não possui entregas', function () {
        $relation = Mockery::mock(HasMany::class);
        $relation->shouldReceive('exists')->andReturn(false);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::INCLUIDO->value;
        $plano->shouldReceive('entregas')->andReturn($relation);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para ser assinado.');

    test('lança exceção quando TCR não existe', function () {
        $plano = fakePlanoAssinar(StatusEnum::INCLUIDO->value);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn(null);

        $this->validator->validar($plano, 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não possui documento TCR gerado.');

    test('lança exceção quando usuário já assinou', function () {
        $plano = fakePlanoAssinar(StatusEnum::INCLUIDO->value);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')
            ->with('doc-1', 'user-1')
            ->andReturn(true);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Usuário já assinou este documento.');

    test('retorna documento quando todas as validações passam', function () {
        $plano = fakePlanoAssinar(StatusEnum::INCLUIDO->value);

        $assinaturasRelation = Mockery::mock(\Illuminate\Database\Eloquent\Relations\HasMany::class);
        $assinaturasRelation->shouldReceive('count')->andReturn(0);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->shouldReceive('assinaturas')->andReturn($assinaturasRelation);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->andReturn(false);

        expect($this->validator->validar($plano, 'user-1'))->toBe($documento);
    });

    test('permite com status AGUARDANDO_ASSINATURA', function () {
        $plano = fakePlanoAssinar(StatusEnum::AGUARDANDO_ASSINATURA->value);

        $assinaturasRelation = Mockery::mock(\Illuminate\Database\Eloquent\Relations\HasMany::class);
        $assinaturasRelation->shouldReceive('count')->andReturn(1);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->shouldReceive('assinaturas')->andReturn($assinaturasRelation);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->andReturn(false);

        expect($this->validator->validar($plano, 'user-1'))->toBe($documento);
    });

    test('lança exceção quando já atingiu o máximo de assinaturas', function () {
        $plano = fakePlanoAssinar(StatusEnum::AGUARDANDO_ASSINATURA->value);

        $assinaturasRelation = Mockery::mock(\Illuminate\Database\Eloquent\Relations\HasMany::class);
        $assinaturasRelation->shouldReceive('count')->andReturn(2);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->shouldReceive('assinaturas')->andReturn($assinaturasRelation);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')->andReturn(false);

        $this->validator->validar($plano, 'user-1');
    })->throws(ValidateException::class, 'Todas as assinaturas exigidas já foram realizadas.');


});
