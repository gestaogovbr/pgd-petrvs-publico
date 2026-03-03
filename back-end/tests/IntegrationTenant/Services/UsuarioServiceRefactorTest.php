<?php

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\IntegracaoServidor;
use App\Services\UsuarioService;
use App\Services\IntegracaoService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Repository\UsuarioRepository;
use Mockery\MockInterface;
use Tests\TestCase;

describe('UsuarioService - Refactor Methods (Integration)', function () {

    beforeEach(function () {
        // Setup básico
        config(['database.default' => 'tenant']);
        DB::setDefaultConnection('tenant');
        
        $this->entidadeId = Str::uuid()->toString();
        $this->tipoModalidadeId = Str::uuid()->toString();
        $this->perfilId = Str::uuid()->toString();
        
        // Criar Entidade
        DB::table('entidades')->insert([
            'id' => $this->entidadeId,
            'sigla' => 'ENT',
            'nome' => 'Entidade Teste',
            'abrangencia' => 'NACIONAL',
            'carga_horaria_padrao' => 8,
            'gravar_historico_processo' => 0,
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'expediente' => json_encode(['domingo'=>[],'segunda'=>[],'terca'=>[],'quarta'=>[],'quinta'=>[],'sexta'=>[],'sabado'=>[],'especial'=>[]]),
            'habilitar_relatos_siape' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Criar Tipo Modalidade
        DB::table('tipos_modalidades')->insert([
            'id' => $this->tipoModalidadeId,
            'nome' => 'Presencial',
            'exige_pedagio' => 0,
            'plano_trabalho_calcula_horas' => 1,
            'atividade_tempo_despendido' => 1,
            'atividade_esforco' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Criar Perfil
        DB::table('perfis')->insert([
            'id' => $this->perfilId,
            'nome' => 'Perfil Teste',
            'nivel' => 1,
            'descricao' => 'Perfil Teste',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Mock do IntegracaoService
        $this->mock(IntegracaoService::class, function (MockInterface $mock) {
            $mock->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake')->andReturnNull();
            $mock->shouldReceive('validarModalidadePgd')->andReturn($this->tipoModalidadeId);
        });
    });

    test('atualizarMatriculasUsuariosSemMatricula deve atualizar matricula baseada na integracao', function () {
        // Criar usuário sem matrícula
        $cpf = '12345678900';
        $matriculaSiape = 'SIAPE123';
        
        $usuario = new Usuario();
        $usuario->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Teste Sem Matricula',
            'cpf' => $cpf,
            'email' => 'teste@semmatricula.com',
            'matricula' => null,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ])->save();

        // Criar registro na integracao
        // IntegracaoServidor pode não ter factory, criar manualmente
        // Assumindo que IntegracaoServidor usa conexão tenant ou default? Geralmente dados externos são em outro banco, mas aqui parece ser model local.
        // Vou assumir tenant pois o service usa model direto.
        
        // Verificar se IntegracaoServidor tem tabela e fillable. Se não, forceFill.
        $integracao = new IntegracaoServidor();
        $integracao->forceFill([
            //'id' => Str::uuid(), // Se tiver ID
            'cpf' => $cpf,
            'matriculasiape' => $matriculaSiape,
            // Outros campos obrigatórios se houver.
        ])->save();

        // Instanciar service
        $service = app(UsuarioService::class);
        
        // Executar
        $service->atualizarMatriculasUsuariosSemMatricula();

        // Verificar
        $this->assertDatabaseHas('usuarios', [
            'id' => $usuario->id,
            'matricula' => $matriculaSiape
        ]);
    });

    test('verificaSeUsuarioSoMudouMatricula deve atualizar matricula e retornar false se usuario existe na unidade', function () {
        $cpf = '98765432100';
        $matriculaAntiga = 'ANTIGA';
        $matriculaNova = 'NOVA';
        $unidadeId = Str::uuid()->toString();

        // Criar Unidade
        $unidade = new Unidade();
        $unidade->forceFill([
            'id' => $unidadeId,
            'nome' => 'Unidade Teste',
            'codigo' => 'U1',
            'sigla' => 'U1',
            'entidade_id' => $this->entidadeId,
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'executora' => true,
        ])->save();

        // Criar Usuário
        $usuario = new Usuario();
        $usuario->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Teste Lotacao',
            'cpf' => $cpf,
            'email' => 'teste@lotacao.com',
            'matricula' => $matriculaAntiga,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ])->save();

        // Criar Vínculo (UnidadeIntegrante + Atribuicao LOTADO)
        $integrante = new UnidadeIntegrante();
        $integrante->forceFill([
            'id' => Str::uuid(),
            'unidade_id' => $unidadeId,
            'usuario_id' => $usuario->id
        ])->save();

        $atribuicao = new UnidadeIntegranteAtribuicao();
        $atribuicao->forceFill([
            'id' => Str::uuid(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'LOTADO'
        ])->save();

        $service = app(UsuarioService::class);

        // Executar
        $result = $service->verificaSeUsuarioSoMudouMatricula($cpf, $unidadeId, $matriculaNova, 'CODIGO_U');

        // Verificar
        expect($result)->toBeFalse();
        
        $this->assertDatabaseHas('usuarios', [
            'id' => $usuario->id,
            'matricula' => $matriculaNova
        ]);
    });
    
    test('atualizarServidor deve atualizar dados do usuario via repository', function () {
        $usuario = new Usuario();
        $usuario->forceFill([
            'id' => Str::uuid(),
            'nome' => 'Nome Antigo',
            'email' => 'antigo@email.com',
            'matricula' => 'TESTE1',
            'cpf' => '11122233344',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId
        ])->save();
        
        // Simular objeto de entrada
        $dadosAtualizacao = (object) [
            'id' => $usuario->id,
            'matriculasiape' => 'TESTE1',
            'emailfuncional' => 'novo@email.com',
            'nome_servidor' => 'Nome Novo',
            'nome_guerra' => 'Apelido Novo',
            'cod_jornada' => '40',
            'nome_jornada' => '40 Horas',
            'modalidade_pgd' => 'TELETRABALHO',
            'participa_pgd' => true,
            'ident_unica' => '123456',
            'data_modificacao' => now(),
            'data_nascimento' => '1990-01-01'
        ];

        $service = app(UsuarioService::class);
        $service->atualizarServidor($dadosAtualizacao);
        
        $this->assertDatabaseHas('usuarios', [
            'id' => $usuario->id,
            'nome' => 'Nome Novo',
            'email' => 'novo@email.com',
            'apelido' => 'Apelido Novo'
        ]);
    });

});
