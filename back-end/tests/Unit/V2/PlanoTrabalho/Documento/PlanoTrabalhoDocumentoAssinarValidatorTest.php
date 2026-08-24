<?php

use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAssinarValidator;
use App\Repository\DocumentoRepository;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Documento;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->assinaturaRepo = Mockery::mock(DocumentoAssinaturaRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->validator = new PlanoTrabalhoDocumentoAssinarValidator($this->documentoRepo, $this->assinaturaRepo, $this->unidadeRepo, $this->usuarioRepo);
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

        $this->validator->validar($plano, 'user-1', '12345678901');
    })->throws(ValidateException::class, 'Plano de Trabalho deve estar com status Incluído ou Aguardando Assinatura para ser assinado.');

    test('lança exceção quando plano não possui entregas', function () {
        $relation = Mockery::mock(HasMany::class);
        $relation->shouldReceive('exists')->andReturn(false);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::INCLUIDO->value;
        $plano->shouldReceive('entregas')->andReturn($relation);

        $this->validator->validar($plano, 'user-1', '12345678901');
    })->throws(ValidateException::class, 'Plano de Trabalho deve possuir ao menos uma entrega para ser assinado.');

    test('lança exceção quando TCR não existe', function () {
        $plano = fakePlanoAssinar(StatusEnum::INCLUIDO->value);

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn(null);

        $this->validator->validar($plano, 'user-1', '12345678901');
    })->throws(NotFoundException::class, 'Plano de Trabalho não possui documento TCR gerado.');

    test('lança exceção quando usuário já assinou', function () {
        $plano = fakePlanoAssinar(StatusEnum::INCLUIDO->value);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('usuarioJaAssinou')
            ->with('doc-1', '12345678901')
            ->andReturn(true);

        $this->validator->validar($plano, 'user-1', '12345678901');
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

        expect($this->validator->validar($plano, 'user-1', '12345678901'))->toBe($documento);
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

        expect($this->validator->validar($plano, 'user-1', '12345678901'))->toBe($documento);
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

        $this->validator->validar($plano, 'user-1', '12345678901');
    })->throws(ValidateException::class, 'Todas as assinaturas exigidas já foram realizadas.');

    test('bloqueia assinatura como chefia quando usuario diferente possui mesmo CPF do participante', function () {
        $relation = Mockery::mock(HasMany::class);
        $relation->shouldReceive('exists')->andReturn(true);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';
        $plano->unidade_id = 'unidade-1';
        $plano->status = StatusEnum::INCLUIDO->value;
        $plano->shouldReceive('entregas')->andReturn($relation);

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';

        $this->usuarioRepo->shouldReceive('findById')
            ->with('participante-1')
            ->andReturn($participante);

        $this->validator->validar($plano, 'chefia-outro-registro', '12345678901');
    })->throws(ForbiddenException::class, 'Não é permitido assinar o próprio Plano de Trabalho como chefia.');

    test('lança exceção quando gestor tenta assinar e já existe assinatura de outro gestor', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->assinaturaRepo->shouldReceive('existeAssinaturaDeNaoParticipante')
            ->with('doc-1', 'participante-1')
            ->andReturn(true);

        $this->validator->validarSlotGestorDisponivel($plano, 'gestor-2', $documento);
    })->throws(ValidateException::class, 'Já existe assinatura de gestor registrada para este Plano de Trabalho.');

    test('permite gestor assinar quando não existe assinatura de outro gestor', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'participante-1';

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->assinaturaRepo->shouldReceive('existeAssinaturaDeNaoParticipante')
            ->with('doc-1', 'participante-1')
            ->andReturn(false);

        $this->validator->validarSlotGestorDisponivel($plano, 'gestor-1', $documento);

        // Se não lançou exceção, passou
        expect(true)->toBeTrue();
    });

    test('participante pode assinar mesmo que gestor já tenha assinado', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'user-1';

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        // NÃO deve chamar existeAssinaturaDeNaoParticipante pois é o participante
        $this->assinaturaRepo->shouldNotReceive('existeAssinaturaDeNaoParticipante');

        $this->validator->validarSlotGestorDisponivel($plano, 'user-1', $documento);

        expect(true)->toBeTrue();
    });

});
