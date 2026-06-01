<?php

use App\V2\PlanoTrabalho\Consolidacao\Validators\RecursoValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Avaliacao;
use App\Models\TipoAvaliacaoNota;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->validator = new RecursoValidator($this->planoRepo, $this->consolidacaoRepo);
});

afterEach(fn () => Mockery::close());

function mockAvaliacaoComNota(bool $aprova, string $dataAvaliacao = null): Avaliacao
{
    $nota = Mockery::mock(TipoAvaliacaoNota::class)->makePartial();
    $nota->aprova = $aprova ? 1 : 0;

    $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
    $avaliacao->data_avaliacao = $dataAvaliacao ?? now()->format('Y-m-d H:i:s');
    $avaliacao->setRelation('tipoAvaliacaoNota', $nota);

    return $avaliacao;
}

describe('RecursoValidator::validarAutorizacao', function () {

    test('retorna plano quando usuario e participante dono', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'user-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        expect($this->validator->validarAutorizacao('plano-1', 'user-1'))->toBe($plano);
    });

    test('lanca excecao quando plano nao encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validarAutorizacao('plano-1', 'user-1');
    })->throws(NotFoundException::class);

    test('lanca excecao quando usuario nao e participante dono', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'outro-user';

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->validator->validarAutorizacao('plano-1', 'user-1');
    })->throws(ForbiddenException::class, 'Apenas o participante dono do Plano de Trabalho pode solicitar recurso.');
});

describe('RecursoValidator::validar', function () {

    test('retorna avaliacao quando todas condicoes satisfeitas', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao = mockAvaliacaoComNota(false);

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'AVALIADO';
        $consolidacao->shouldReceive('load')->with('avaliacoes.tipoAvaliacaoNota')->andReturnSelf();
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        expect($this->validator->validar($plano, 'consolidacao-1'))->toBe($avaliacao);
    });

    test('lanca excecao quando PT nao esta ativo nem concluido', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO, CONCLUÍDO ou AVALIADO.');

    test('lanca excecao quando consolidacao nao esta avaliada', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status AVALIADO para solicitar recurso.');

    test('lanca excecao quando nota aprova', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao = mockAvaliacaoComNota(true);

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'AVALIADO';
        $consolidacao->shouldReceive('load')->andReturnSelf();
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'Recurso só pode ser solicitado para período avaliado como "Inadequado" ou "Não exeutado".');

    test('lanca excecao quando prazo expirou', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao = mockAvaliacaoComNota(false, now()->subDays(11)->format('Y-m-d H:i:s'));

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'AVALIADO';
        $consolidacao->shouldReceive('load')->andReturnSelf();
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'O prazo de 10 dias corridos para solicitar recurso expirou.');
});
