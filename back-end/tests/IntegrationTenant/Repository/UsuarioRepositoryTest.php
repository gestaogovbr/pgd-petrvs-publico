<?php

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Programa;
use App\Models\ProgramaParticipante;
use App\Repository\UsuarioRepository;
use App\Models\TipoModalidade;
use App\Models\Perfil;

beforeEach(function () {
    $this->repository = app(UsuarioRepository::class);
    $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
    $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
});

test('findById', function () {
    $usuario = Usuario::factory()->create([
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $found = $this->repository->findById($usuario->id);

    expect($found->id)->toBe($usuario->id);
});

test('findByCpfOrEmail', function () {
    $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
    $email = 'teste-' . uniqid() . '@example.com';

    $usuario = Usuario::factory()->create([
        'cpf' => $cpf,
        'email' => $email,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $foundCpf = $this->repository->findByCpfOrEmail($cpf, 'other@example.com');
    expect($foundCpf->id)->toBe($usuario->id);

    $foundEmail = $this->repository->findByCpfOrEmail('00000000000', $email);
    expect($foundEmail->id)->toBe($usuario->id);
});

test('findByCpfOrEmail ignora email nulo ou vazio', function () {
    $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);

    Usuario::factory()->create([
        'cpf' => $cpf,
        'email' => null,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $foundWithNullEmail = $this->repository->findByCpfOrEmail($cpf, null);
    expect($foundWithNullEmail)->not->toBeNull();
    expect($foundWithNullEmail->cpf)->toBe($cpf);

    $foundWithEmptyEmail = $this->repository->findByCpfOrEmail($cpf, '');
    expect($foundWithEmptyEmail)->not->toBeNull();
    expect($foundWithEmptyEmail->cpf)->toBe($cpf);
});

test('isParticipanteHabilitado', function () {
    $usuario = Usuario::factory()->create([
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $programa = Programa::factory()->create();

    expect($this->repository->isParticipanteHabilitado($usuario->id, $programa->id))->toBeFalse();

    ProgramaParticipante::factory()->create([
        'usuario_id' => $usuario->id,
        'programa_id' => $programa->id,
        'habilitado' => false,
    ]);

    expect($this->repository->isParticipanteHabilitado($usuario->id, $programa->id))->toBeFalse();

    ProgramaParticipante::where('usuario_id', $usuario->id)
        ->where('programa_id', $programa->id)
        ->update(['habilitado' => true]);

    expect($this->repository->isParticipanteHabilitado($usuario->id, $programa->id))->toBeTrue();
});

test('isIntegrante', function () {
    $usuario = Usuario::factory()->create([
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $unidade = Unidade::factory()->create();

    expect($this->repository->isIntegrante($usuario->id, $unidade->id, 'GESTOR'))->toBeFalse();

    $integrante = new UnidadeIntegrante();
    $integrante->usuario_id = $usuario->id;
    $integrante->unidade_id = $unidade->id;
    $integrante->save();

    $atribuicao = new UnidadeIntegranteAtribuicao();
    $atribuicao->unidade_integrante_id = $integrante->id;
    $atribuicao->atribuicao = 'LOTADO';
    $atribuicao->save();

    expect($this->repository->isIntegrante($usuario->id, $unidade->id, 'GESTOR'))->toBeFalse();
    expect($this->repository->isIntegrante($usuario->id, $unidade->id, 'LOTADO'))->toBeTrue();
});

test('getAtribuicoes', function () {
    $usuario = Usuario::factory()->create([
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $unidade = Unidade::factory()->create();

    $integrante = new UnidadeIntegrante();
    $integrante->usuario_id = $usuario->id;
    $integrante->unidade_id = $unidade->id;
    $integrante->save();

    $atribuicao1 = new UnidadeIntegranteAtribuicao();
    $atribuicao1->unidade_integrante_id = $integrante->id;
    $atribuicao1->atribuicao = 'LOTADO';
    $atribuicao1->save();

    $atribuicao2 = new UnidadeIntegranteAtribuicao();
    $atribuicao2->unidade_integrante_id = $integrante->id;
    $atribuicao2->atribuicao = 'AVALIADOR_PLANO_TRABALHO';
    $atribuicao2->save();

    $atribuicoes = $this->repository->getAtribuicoes($usuario->id, $unidade->id);

    expect($atribuicoes)->toHaveCount(2);
    expect($atribuicoes)->toContain('LOTADO');
    expect($atribuicoes)->toContain('AVALIADOR_PLANO_TRABALHO');
});

test('isLotacao', function () {
    $usuario = Usuario::factory()->create([
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $unidade = Unidade::factory()->create();

    expect($this->repository->isLotacao($usuario->id, $unidade->id))->toBeFalse();

    $integrante = new UnidadeIntegrante();
    $integrante->usuario_id = $usuario->id;
    $integrante->unidade_id = $unidade->id;
    $integrante->save();

    $atribuicao = new UnidadeIntegranteAtribuicao();
    $atribuicao->unidade_integrante_id = $integrante->id;
    $atribuicao->atribuicao = 'LOTADO';
    $atribuicao->save();

    expect($this->repository->isLotacao($usuario->id, $unidade->id))->toBeTrue();
});

test('findAllSemMatricula', function () {
    Usuario::factory()->create([
        'matricula' => '12345',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $semMatricula = Usuario::factory()->create([
        'matricula' => null,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllSemMatricula();

    expect($result->contains('id', $semMatricula->id))->toBeTrue();
    expect($result->contains('matricula', '12345'))->toBeFalse();
});

test('findByCpfAndLotacao', function () {
    $cpf = '99988877766';
    $usuario = Usuario::factory()->create([
        'cpf' => $cpf,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $unidade = Unidade::factory()->create();

    $integrante = new UnidadeIntegrante();
    $integrante->usuario_id = $usuario->id;
    $integrante->unidade_id = $unidade->id;
    $integrante->save();

    $atribuicao = new UnidadeIntegranteAtribuicao();
    $atribuicao->unidade_integrante_id = $integrante->id;
    $atribuicao->atribuicao = 'LOTADO';
    $atribuicao->save();

    $found = $this->repository->findByCpfAndLotacao($cpf, $unidade->id);
    expect($found->id)->toBe($usuario->id);

    $notFound = $this->repository->findByCpfAndLotacao('00000000000', $unidade->id);
    expect($notFound)->toBeNull();
});

test('findAllByCpf', function () {
    $cpf = '11122233344';

    Usuario::factory()->count(2)->create([
        'cpf' => $cpf,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    Usuario::factory()->create([
        'cpf' => '99999999999',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllByCpf($cpf);

    expect($result)->toHaveCount(2);
});

test('getUnidadesVinculadas', function () {
    $cpf = '55566677788';
    $usuario = Usuario::factory()->create([
        'cpf' => $cpf,
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $unidade1 = Unidade::factory()->create();
    $unidade2 = Unidade::factory()->create();

    $integrante1 = new UnidadeIntegrante();
    $integrante1->usuario_id = $usuario->id;
    $integrante1->unidade_id = $unidade1->id;
    $integrante1->save();

    $atribuicao1 = new UnidadeIntegranteAtribuicao();
    $atribuicao1->unidade_integrante_id = $integrante1->id;
    $atribuicao1->atribuicao = 'LOTADO';
    $atribuicao1->save();

    $integrante2 = new UnidadeIntegrante();
    $integrante2->usuario_id = $usuario->id;
    $integrante2->unidade_id = $unidade2->id;
    $integrante2->save();

    $atribuicao2 = new UnidadeIntegranteAtribuicao();
    $atribuicao2->unidade_integrante_id = $integrante2->id;
    $atribuicao2->atribuicao = 'COLABORADOR';
    $atribuicao2->save();

    $unidades = $this->repository->getUnidadesVinculadas($cpf);

    expect($unidades)->toHaveCount(2);
});

test('findAllByNomeMatricula por nome', function () {
    $usuario = Usuario::factory()->create([
        'nome' => 'João Silva Teste',
        'matricula' => '111111',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllByNomeMatricula('João Silva');

    expect($result->contains('id', $usuario->id))->toBeTrue();
});

test('findAllByNomeMatricula por matricula', function () {
    $usuario = Usuario::factory()->create([
        'nome' => 'Maria Oliveira',
        'matricula' => '999888',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllByNomeMatricula('99988');

    expect($result->contains('id', $usuario->id))->toBeTrue();
});

test('findAllByNomeMatricula sem resultado', function () {
    Usuario::factory()->create([
        'nome' => 'Carlos Souza',
        'matricula' => '123456',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllByNomeMatricula('TermoInexistente999');

    expect($result)->toHaveCount(0);
});

test('findAllByNomeMatricula busca parcial', function () {
    $u1 = Usuario::factory()->create([
        'nome' => 'Ana Paula Ferreira',
        'matricula' => '500100',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);
    $u2 = Usuario::factory()->create([
        'nome' => 'Pedro Henrique',
        'matricula' => '500200',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ]);

    $result = $this->repository->findAllByNomeMatricula('500');

    expect($result->contains('id', $u1->id))->toBeTrue();
    expect($result->contains('id', $u2->id))->toBeTrue();
});

test('createAndUpdate', function () {
    $attributes = [
        'nome' => 'Novo Usuário',
        'cpf' => '12312312312',
        'email' => 'novo@example.com',
        'matricula' => '654321',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'perfil_id' => $this->perfilId,
    ];

    $usuario = $this->repository->create($attributes);

    $this->assertDatabaseHas('usuarios', ['email' => 'novo@example.com']);

    $updated = $this->repository->update($usuario->id, ['nome' => 'Nome Atualizado']);
    expect($updated->nome)->toBe('Nome Atualizado');
});
