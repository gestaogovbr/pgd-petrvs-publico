<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\ValidateException;
use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Models\Usuario;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoAssembler;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoAuthorization;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoOperacao;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeReadRepositoryContract::class);
    $this->integranteRepo = Mockery::mock(UnidadeIntegranteReadRepositoryContract::class);
    $this->authorization = new DispensaPlanoTrabalhoAuthorization($this->unidadeRepo, $this->integranteRepo);
    $this->assembler = new DispensaPlanoTrabalhoAssembler();
});

afterEach(function () {
    Mockery::close();
});

function atorComNivel(int $nivel, string $id = 'ator-1'): Usuario
{
    $perfil = new \App\Models\Perfil();
    $perfil->nivel = $nivel;
    $ator = new Usuario();
    $ator->id = $id;
    $ator->nome = 'Ator';
    $ator->setRelation('perfil', $perfil);

    return $ator;
}

describe('DispensaPlanoTrabalhoAuthorization', function () {

    test('perfil abaixo de Administrador Negocial não pode formalizar', function () {
        $ator = atorComNivel(PerfilEnum::UNIDADE->value);

        expect(fn () => $this->authorization->assertPerfilPodeFormalizar($ator))
            ->toThrow(ForbiddenException::class, DispensaPlanoTrabalhoAuthorization::MSG_PERMISSAO);
    });

    test('Desenvolvedor, Master e Negocial podem formalizar', function () {
        expect($this->authorization->podeFormalizar(atorComNivel(PerfilEnum::DESENVOLVEDOR->value)))->toBeTrue()
            ->and($this->authorization->podeFormalizar(atorComNivel(PerfilEnum::ADMINISTRADOR_MASTER->value)))->toBeTrue()
            ->and($this->authorization->podeFormalizar(atorComNivel(PerfilEnum::ADMINISTRADOR_NEGOCIAL->value)))->toBeTrue();
    });

    test('mensagem de elegibilidade segue a RN07', function () {
        expect(DispensaPlanoTrabalhoAuthorization::MSG_ELEGIBILIDADE)
            ->toBe('Não é possível formalizar a dispensa de Plano de Trabalho. O agente público não atende aos critérios estabelecidos no §3º do art. 19 da IN Conjunta SEGES-SGPRT/MGI nº 24/2023.');
    });

    test('lança ValidateException com mensagem da RN07 quando não elegível', function () {
        $auth = Mockery::mock(DispensaPlanoTrabalhoAuthorization::class, [$this->unidadeRepo, $this->integranteRepo])->makePartial();
        $auth->shouldReceive('isElegivel')->once()->with('agente-1')->andReturn(false);

        expect(fn () => $auth->assertElegivel('agente-1'))
            ->toThrow(ValidateException::class, DispensaPlanoTrabalhoAuthorization::MSG_ELEGIBILIDADE);
    });

    test('isElegivel delega ao repositório de integrante', function () {
        $this->integranteRepo
            ->shouldReceive('usuarioEhChefiaDeUnidadeExecutora')
            ->once()
            ->with('agente-1')
            ->andReturn(true);

        expect($this->authorization->isElegivel('agente-1'))->toBeTrue();
    });
});

describe('DispensaPlanoTrabalhoAssembler', function () {

    test('monta resumo com histórico e flags de vigência/encerramento', function () {
        $agente = new Usuario();
        $agente->id = 'agente-1';
        $agente->nome = 'Agente Público';

        $responsavel = new Usuario();
        $responsavel->id = 'resp-1';
        $responsavel->nome = 'Responsável';

        $dispensa = Mockery::mock(DispensaPlanoTrabalho::class)->makePartial();
        $dispensa->id = 'disp-1';
        $dispensa->usuario_id = 'agente-1';
        $dispensa->data_inicio = \Carbon\Carbon::parse('2026-01-01');
        $dispensa->data_fim = null;
        $dispensa->ciencia_em = \Carbon\Carbon::parse('2026-01-01 10:00:00');
        $dispensa->responsavel_id = 'resp-1';
        $dispensa->updated_at = \Carbon\Carbon::parse('2026-01-01 10:00:00');
        $dispensa->setRelation('responsavel', $responsavel);
        $dispensa->shouldReceive('isVigente')->andReturn(true);

        $historico = Mockery::mock(DispensaPlanoTrabalhoHistorico::class)->makePartial();
        $historico->id = 'hist-1';
        $historico->operacao = DispensaPlanoTrabalhoOperacao::FORMALIZAR;
        $historico->data_inicio = \Carbon\Carbon::parse('2026-01-01');
        $historico->data_fim = null;
        $historico->ciencia_em = \Carbon\Carbon::parse('2026-01-01 10:00:00');
        $historico->responsavel_id = 'resp-1';
        $historico->created_at = \Carbon\Carbon::parse('2026-01-01 10:00:00');
        $historico->setRelation('responsavel', $responsavel);

        $resumo = $this->assembler->montarResumo(
            $agente,
            $dispensa,
            [$historico],
            true,
            true,
        );

        expect($resumo->vigente)->toBeTrue()
            ->and($resumo->pode_encerrar)->toBeTrue()
            ->and($resumo->data_inicio)->toBe('2026-01-01')
            ->and($resumo->data_fim)->toBeNull()
            ->and($resumo->historico)->toHaveCount(1)
            ->and($resumo->historico[0]->operacao)->toBe('FORMALIZAR')
            ->and($resumo->responsavel_nome)->toBe('Responsável');
    });
});
