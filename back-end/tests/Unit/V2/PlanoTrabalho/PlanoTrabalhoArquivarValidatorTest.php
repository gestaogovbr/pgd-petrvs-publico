<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoArquivarValidator;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\PlanoTrabalho\DTOs\ResumoConsolidacoesDTO;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Usuario;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Exceptions\ForbiddenException;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->authorization = Mockery::mock(PlanoTrabalhoAuthorization::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->dispensaPolicy = Mockery::mock(DispensaAvaliacaoPolicy::class);

    $this->validator = new PlanoTrabalhoArquivarValidator(
        $this->planoRepo,
        $this->authorization,
        $this->usuarioRepo,
        $this->consolidacaoRepo,
        $this->dispensaPolicy,
    );
});

afterEach(fn () => Mockery::close());

function criarPlano(string $status, ?string $encerradoAt = null, ?string $dataArquivamento = null): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->usuario_id = 'user-1';
    $plano->unidade_id = 'unidade-1';
    $plano->encerrado_at = $encerradoAt;
    $plano->data_arquivamento = $dataArquivamento;
    $plano->data_inicio = '2025-01-01';
    $plano->data_fim = '2025-06-30';

    return $plano;
}

describe('PlanoTrabalhoArquivarValidator::motivoImpedimento', function () {

    test('retorna null para plano cancelado (elegível)', function () {
        $plano = criarPlano('CANCELADO');

        expect($this->validator->motivoImpedimento($plano))->toBeNull();
    });

    test('retorna null para plano encerrado sem pendencias', function () {
        $plano = criarPlano('CONCLUIDO', encerradoAt: '2025-03-15');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: false,
                avaliacaoRecente: false,
                possuiPendencias: false,
                isAguardandoReavaliacao: false,
            ));

        expect($this->validator->motivoImpedimento($plano))->toBeNull();
    });

    test('retorna null para plano concluido com todos avaliados e fora do prazo', function () {
        $plano = criarPlano('CONCLUIDO');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: true,
                avaliacaoRecente: false,
                possuiPendencias: false,
                isAguardandoReavaliacao: false,
            ));

        expect($this->validator->motivoImpedimento($plano))->toBeNull();
    });

    test('retorna mensagem RN04 quando avaliacao recente (prazo de recurso)', function () {
        $plano = criarPlano('CONCLUIDO');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: true,
                avaliacaoRecente: true,
                possuiPendencias: false,
                isAguardandoReavaliacao: false,
            ));

        $resultado = $this->validator->motivoImpedimento($plano);

        expect($resultado)->toContain('prazo para recurso')
            ->and($resultado)->toContain('30 dias após a data da avaliação');
    });

    test('retorna mensagem RN04 quando aguardando reavaliacao', function () {
        $plano = criarPlano('CONCLUIDO');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: false,
                avaliacaoRecente: false,
                possuiPendencias: false,
                isAguardandoReavaliacao: true,
            ));

        $resultado = $this->validator->motivoImpedimento($plano);

        expect($resultado)->toContain('prazo para recurso');
    });

    test('retorna mensagem RN05 quando plano encerrado com pendencias', function () {
        $plano = criarPlano('CONCLUIDO', encerradoAt: '2025-03-15');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: false,
                avaliacaoRecente: false,
                possuiPendencias: true,
                isAguardandoReavaliacao: false,
            ));

        $resultado = $this->validator->motivoImpedimento($plano);

        expect($resultado)->toContain('registros de execução ou avaliações pendentes');
    });

    test('retorna mensagem de periodos pendentes quando concluido com periodos nao avaliados nao dispensados', function () {
        $plano = criarPlano('CONCLUIDO');

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: false,
                avaliacaoRecente: false,
                possuiPendencias: false,
                isAguardandoReavaliacao: false,
            ));

        $this->consolidacaoRepo->shouldReceive('findConsolidacoesVigentes')
            ->andReturn(new Collection([
                (function () {
                    $c = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
                    $c->id = 'cons-1';
                    $c->status = 'CONCLUIDO';
                    return $c;
                })(),
            ]));

        $this->dispensaPolicy->shouldReceive('consolidacoesDispensadas')
            ->andReturn([]);

        $resultado = $this->validator->motivoImpedimento($plano);

        expect($resultado)->toContain('períodos avaliativos pendentes de avaliação');
    });
});

describe('PlanoTrabalhoArquivarValidator::validar', function () {

    test('lanca NotFoundException quando plano nao encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar('plano-inexistente', 'user-1');
    })->throws(NotFoundException::class);

    test('lanca ValidateException quando plano ja esta arquivado', function () {
        $plano = criarPlano('CANCELADO', dataArquivamento: '2025-05-01');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'já está arquivado');

    test('lanca ValidateException com mensagem RN04 quando avaliacao recente', function () {
        $plano = criarPlano('CONCLUIDO');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $this->consolidacaoRepo->shouldReceive('resumoParaArquivamento')
            ->andReturn(new ResumoConsolidacoesDTO(
                todosAvaliados: true,
                avaliacaoRecente: true,
                possuiPendencias: false,
                isAguardandoReavaliacao: false,
            ));

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'prazo para recurso');

    test('lanca ForbiddenException quando usuario nao autorizado', function () {
        $plano = criarPlano('CANCELADO');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'outro-user';
        $usuario->shouldReceive('loadMissing')->andReturnSelf();
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->andReturn($usuario);
        $this->authorization->shouldReceive('isAutorizadoArquivar')->andReturn(false);

        $this->validator->validar('plano-1', 'outro-user');
    })->throws(ForbiddenException::class);

    test('retorna plano quando validacao passa com sucesso', function () {
        $plano = criarPlano('CANCELADO');
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-1';
        $usuario->shouldReceive('loadMissing')->andReturnSelf();
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->andReturn($usuario);
        $this->authorization->shouldReceive('isAutorizadoArquivar')->andReturn(true);

        expect($this->validator->validar('plano-1', 'user-1'))->toBe($plano);
    });
});
