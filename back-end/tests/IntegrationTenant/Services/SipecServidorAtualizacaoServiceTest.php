<?php

use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\Sipec\Servidor\SipecServidorAtualizacaoService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    Bus::fake();

    $this->perfilParticipanteId = Str::uuid()->toString();
    DB::table('perfis')->insert([
        'id' => $this->perfilParticipanteId,
        'nivel' => 5,
        'nome' => 'Participante',
        'descricao' => 'Participante',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $this->entidadeId = Str::uuid()->toString();
    DB::table('entidades')->insert([
        'id' => $this->entidadeId,
        'sigla' => 'TST',
        'nome' => 'Entidade Teste',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $this->unidadeId = Str::uuid()->toString();
    DB::table('unidades')->insert([
        'id' => $this->unidadeId,
        'codigo' => '3000',
        'codigo_orgao' => '20000',
        'nome' => 'Unidade Teste',
        'sigla' => 'UT',
        'entidade_id' => $this->entidadeId,
        'notificacoes' => '{}',
        'etiquetas' => '[]',
        'checklist' => '[]',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $this->service = new class(
        app(\App\Repository\IntegracaoServidorRepository::class),
        app(\App\Repository\UsuarioRepository::class),
        app(\App\Repository\UnidadeRepository::class),
        app(\App\Services\UnidadeIntegranteService::class),
    ) extends SipecServidorAtualizacaoService {
        protected function getPerfilParticipante(): ?\App\Models\Perfil
        {
            return \App\Services\NivelAcessoService::getPerfilParticipante();
        }
    };
});

function inserirIntegracaoServidor(array $overrides = []): void
{
    DB::table('integracao_servidores')->insert(array_merge([
        'id' => Str::uuid()->toString(),
        'codigo_orgao' => '20000',
        'cpf_ativo' => 'true',
        'data_modificacao' => now(),
        'cpf' => '11122233344',
        'nome' => 'Servidor Teste',
        'emailfuncional' => null,
        'sexo' => null,
        'municipio' => null,
        'uf' => null,
        'data_nascimento' => null,
        'telefone' => null,
        'vinculo_ativo' => 'true',
        'matriculasiape' => '9999999',
        'codigo_cargo' => null,
        'coduorgexercicio' => '3000',
        'coduorglotacao' => '3000',
        'codigo_servo_exercicio' => '3000',
        'nomeguerra' => '',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'nome_jornada' => null,
        'cod_jornada' => null,
        'modalidade_pgd' => 'presencial',
        'participa_pgd' => 'não',
        'ident_unica' => null,
        'created_at' => now(),
        'updated_at' => now(),
    ], $overrides));
}

test('deve criar novo usuário quando matrícula não existe no sistema', function () {
    inserirIntegracaoServidor(['matriculasiape' => '8888888', 'cpf' => '99988877766']);

    $resultado = $this->service->processar();

    expect($resultado['usuarios_criados'])->toBe(1)
        ->and($resultado['erros'])->toBe(0);

    $this->assertDatabaseHas('usuarios', [
        'matricula' => '8888888',
        'cpf' => '99988877766',
    ]);
});

test('deve atualizar matrícula de usuario sem matrícula quando CPF existe em integracao_servidores', function () {
    $usuarioId = Str::uuid()->toString();
    DB::table('usuarios')->insert([
        'id' => $usuarioId,
        'cpf' => '11122233344',
        'nome' => 'Sem Matricula',
        'matricula' => null,
        'modalidade_pgd' => 'presencial',
        'perfil_id' => $this->perfilParticipanteId,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    DB::table('unidades_integrantes')->insert([
        'id' => Str::uuid()->toString(),
        'usuario_id' => $usuarioId,
        'unidade_id' => $this->unidadeId,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    $integranteId = DB::table('unidades_integrantes')->where('usuario_id', $usuarioId)->value('id');
    DB::table('unidades_integrantes_atribuicoes')->insert([
        'id' => Str::uuid()->toString(),
        'unidade_integrante_id' => $integranteId,
        'atribuicao' => 'LOTADO',
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    inserirIntegracaoServidor(['matriculasiape' => '5555555', 'cpf' => '11122233344']);

    $resultado = $this->service->processar();

    // A matrícula é preenchida durante atualizarLotacoes (atualizarMatriculasUsuariosSemMatricula)
    // e não em cadastrarNovos
    expect($resultado['usuarios_criados'])->toBe(0)
        ->and($resultado['erros'])->toBe(0);

    $this->assertDatabaseHas('usuarios', [
        'id' => $usuarioId,
        'matricula' => '5555555',
    ]);
});

test('deve criar novo usuário quando batch já alterou matrícula do mesmo CPF+unidade', function () {
    $usuarioId = Str::uuid()->toString();
    DB::table('usuarios')->insert([
        'id' => $usuarioId,
        'cpf' => '55566677788',
        'nome' => 'Ana',
        'matricula' => '0000000',
        'modalidade_pgd' => 'presencial',
        'perfil_id' => $this->perfilParticipanteId,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('unidades_integrantes')->insert([
        'id' => Str::uuid()->toString(),
        'usuario_id' => $usuarioId,
        'unidade_id' => $this->unidadeId,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    $integranteId = DB::table('unidades_integrantes')->where('usuario_id', $usuarioId)->value('id');
    DB::table('unidades_integrantes_atribuicoes')->insert([
        'id' => Str::uuid()->toString(),
        'unidade_integrante_id' => $integranteId,
        'atribuicao' => 'LOTADO',
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    // Dois vínculos com matrículas diferentes para o mesmo CPF+unidade
    inserirIntegracaoServidor(['matriculasiape' => '1111111', 'cpf' => '55566677788']);
    inserirIntegracaoServidor(['matriculasiape' => '2222222', 'cpf' => '55566677788']);

    $resultado = $this->service->processar();

    expect($resultado['matriculas_atualizadas'])->toBe(1)
        ->and($resultado['usuarios_criados'])->toBe(1);

    // Primeiro vínculo: atualizou matrícula do usuario existente
    $this->assertDatabaseHas('usuarios', [
        'id' => $usuarioId,
        'matricula' => '1111111',
    ]);

    // Segundo vínculo: criou novo usuario
    $this->assertDatabaseHas('usuarios', [
        'cpf' => '55566677788',
        'matricula' => '2222222',
    ]);
});
