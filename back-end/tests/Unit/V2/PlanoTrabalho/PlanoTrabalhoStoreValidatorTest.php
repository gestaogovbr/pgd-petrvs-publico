<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\Repository\UnidadeRepository;
use App\Repository\ProgramaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Exceptions\ValidateException;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

function buildStoreDTO(array $overrides = []): PlanoTrabalhoStoreDTO
{
    return PlanoTrabalhoStoreDTO::fromArray(array_merge([
        'usuario_id' => 'user-1',
        'unidade_id' => 'unidade-1',
        'programa_id' => 'programa-1',
        'data_inicio' => '2024-03-01',
        'data_fim' => '2024-06-30',
        'modalidade_pgd' => 'presencial',
    ], $overrides), 'criador-1');
}

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->programaRepo = Mockery::mock(ProgramaRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validacao = new PlanoTrabalhoStoreValidator(
        $this->unidadeRepo,
        $this->programaRepo,
        $this->planoRepo,
        $this->usuarioRepo,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoStoreValidator', function () {

    test('lança exceção quando participante não está habilitado no SIAPE (RN25)', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(false);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ValidateException::class, 'O regramento selecionado não está vigente para a unidade informada.');

    test('lança exceção quando unidade está inativa', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = '2024-01-01';

        $this->unidadeRepo->shouldReceive('findById')->with('unidade-1')->andReturn($unidade);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ValidateException::class, 'A unidade está inativa.');

    test('lança exceção quando datas fora do período do regramento', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-04-01';
        $programa->data_fim = '2024-12-31';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->programaRepo->shouldReceive('findById')->with('programa-1')->andReturn($programa);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ValidateException::class, 'As datas do plano de trabalho estão fora do período de vigência do regramento.');

    test('lança exceção quando existe conflito de período', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->programaRepo->shouldReceive('findById')->andReturn($programa);
        $this->planoRepo->shouldReceive('existeConflitoPeriodo')
            ->with('user-1', '2024-03-01', '2024-06-30')
            ->andReturn(true);

        $this->validacao->validar(buildStoreDTO());
    })->throws(ValidateException::class, 'Este participante já possui plano de trabalho cadastrado para o período.');

    test('lança exceção quando modalidade diverge do SIAPE sem justificativa', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->modalidade_pgd = 'integral';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->programaRepo->shouldReceive('findById')->andReturn($programa);
        $this->planoRepo->shouldReceive('existeConflitoPeriodo')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validar(buildStoreDTO(['modalidade_pgd' => 'parcial']));
    })->throws(ValidateException::class, 'Modalidade distinta daquela registrada no SIAPE. A justificativa é obrigatória.');

    test('permite quando modalidade diverge do SIAPE com justificativa', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->modalidade_pgd = 'integral';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->programaRepo->shouldReceive('findById')->andReturn($programa);
        $this->planoRepo->shouldReceive('existeConflitoPeriodo')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validar(buildStoreDTO([
            'modalidade_pgd' => 'parcial',
            'justificativa_modalidade' => 'Modalidade ajustada por necessidade do serviço.',
        ]));

        expect(true)->toBeTrue();
    });

    test('permite quando modalidade igual ao SIAPE sem justificativa', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->modalidade_pgd = 'presencial';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->programaRepo->shouldReceive('findById')->andReturn($programa);
        $this->planoRepo->shouldReceive('existeConflitoPeriodo')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validar(buildStoreDTO());

        expect(true)->toBeTrue();
    });
});

describe('PlanoTrabalhoStoreValidator - autorização', function () {

    test('participante só pode cadastrar para si mesmo (RN18.i)', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 5;
        $criador->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);

        $this->validacao->validarAutorizacao(buildStoreDTO(['usuario_id' => 'outro-user']));
    })->throws(ForbiddenException::class, 'Participante só pode cadastrar plano para si mesmo.');

    test('participante pode cadastrar para si mesmo sem erro', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 5;
        $criador->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);
        $this->unidadeRepo->shouldNotReceive('hasUsuarioLotacao');

        $this->validacao->validarAutorizacao(buildStoreDTO(['usuario_id' => 'criador-1']));

        expect(true)->toBeTrue();
    });

    test('colaborador não pode cadastrar PT', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 6;
        $criador->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);

        $this->validacao->validarAutorizacao(buildStoreDTO());
    })->throws(ForbiddenException::class, 'Usuário com este perfil não pode cadastrar plano de trabalho.');

    test('consulta não pode cadastrar PT', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 7;
        $criador->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);

        $this->validacao->validarAutorizacao(buildStoreDTO());
    })->throws(ForbiddenException::class, 'Usuário com este perfil não pode cadastrar plano de trabalho.');

    test('agente público do PT não pode ser colaborador (RN18.iv)', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 3;
        $criador->setRelation('perfil', $perfil);

        /** @var Usuario $agente */
        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->id = 'user-1';
        $perfilColaborador = Mockery::mock(Perfil::class)->makePartial();
        $perfilColaborador->nivel = 6;
        $agente->setRelation('perfil', $perfilColaborador);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validarAutorizacao(buildStoreDTO());
    })->throws(ValidateException::class, 'Este usuário não pode ser agente público de um plano de trabalho.');

    test('agente público do PT não pode ser consulta', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 3;
        $criador->setRelation('perfil', $perfil);

        /** @var Usuario $agente */
        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->id = 'user-1';
        $perfilConsulta = Mockery::mock(Perfil::class)->makePartial();
        $perfilConsulta->nivel = 7;
        $agente->setRelation('perfil', $perfilConsulta);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validarAutorizacao(buildStoreDTO());
    })->throws(ValidateException::class, 'Este usuário não pode ser agente público de um plano de trabalho.');

    test('demais perfis só podem cadastrar para agentes lotados/vinculados nas suas unidades (RN18.ii,iii)', function () {
        /** @var Usuario $criador */
        $criador = Mockery::mock(Usuario::class)->makePartial();
        $criador->id = 'criador-1';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = 3;
        $criador->setRelation('perfil', $perfil);

        /** @var Usuario $agente */
        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->id = 'user-1';
        $perfilAgente = Mockery::mock(Perfil::class)->makePartial();
        $perfilAgente->nivel = 5;
        $agente->setRelation('perfil', $perfilAgente);

        $this->usuarioRepo->shouldReceive('findById')->with('criador-1')->andReturn($criador);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);
        $this->unidadeRepo->shouldReceive('hasUsuarioLotacao')->with('unidade-1', 'user-1', true)->andReturn(false);

        $this->validacao->validarAutorizacao(buildStoreDTO());
    })->throws(ForbiddenException::class, 'O agente público não está lotado ou vinculado nas unidades do usuário logado.');
});
