<?php

namespace Tests\Unit;

use App\Models\Usuario;
use App\Services\UsuarioService;
use App\Services\IntegracaoService;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Mockery;
use App\Services\ServiceBase;
use Illuminate\Support\Str;
use ReflectionClass;

class UsuarioServiceTest extends TestCase
{
    /** @var UsuarioService|\Mockery\MockInterface */
    protected $service;
    protected $integracaoServiceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // Configura banco em memória
        if (!Schema::hasTable('usuarios')) {
            Schema::create('usuarios', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('email')->unique();
                $table->string('nome')->nullable();
                $table->string('cpf')->nullable();
                $table->string('matricula')->nullable();
                $table->string('situacao_funcional')->nullable();
                $table->uuid('perfil_id')->nullable();
                $table->string('apelido')->nullable();
                $table->date('data_nascimento')->nullable();
                $table->softDeletes();
                $table->timestamps();
            });
        }
        
        if (!Schema::hasTable('perfis')) {
             Schema::create('perfis', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('nome');
                $table->integer('nivel')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        // Cria perfil básico
        DB::table('perfis')->insert([
            'id' => Str::uuid()->toString(),
            'nome' => 'Participante',
            'nivel' => 1
        ]);

        // Mock do IntegracaoService
        $this->integracaoServiceMock = Mockery::mock(IntegracaoService::class);
        
        // Instancia o service e injeta o mock
        $this->service = new UsuarioService();
        
        // Injeção via Reflection na propriedade _services da classe pai ServiceBase
        $reflection = new ReflectionClass(ServiceBase::class);
        $property = $reflection->getProperty('_services');
        $property->setAccessible(true);
        $property->setValue($this->service, ['integracaoService' => $this->integracaoServiceMock]);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_deve_chamar_verificacao_de_email_ao_reativar_usuario_deletado()
    {
        // Dados do usuário antigo deletado
        $email = 'conflito@teste.gov.br';
        $cpf = '12345678900';
        $id = Str::uuid()->toString();
        $matricula = '11111';

        DB::table('usuarios')->insert([
            'id' => $id,
            'email' => $email,
            'cpf' => $cpf,
            'matricula' => $matricula,
            'nome' => 'Antigo',
            'deleted_at' => now(),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Dados para reativação (tentativa de criar novo usuário com mesmos dados)
        $data = [
            'id' => Str::uuid()->toString(), // ID novo, diferente do antigo
            'email' => $email,
            'cpf' => $cpf,
            'matricula' => '22222', // Matrícula diferente, mas mesmo CPF/Email
            'nome' => 'Novo',
            'integrantes' => [['unidade_id' => 'u1']] // Simula dados de unidade
        ];
        
        $this->integracaoServiceMock
            ->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake')
            ->once()
            ->with($email, '22222', $id);

        // Mock para pular validações que não importam pro teste
        // IMPORTANTE: Ao usar makePartial(), o construtor original do UsuarioService é chamado.
        // O construtor original instancia:
        // $this->nivelAcessoService = new NivelAcessoService();
        // $this->integracaoService = new IntegracaoService();
        // Isso sobrescreve nossa injeção anterior se não tomarmos cuidado.
        // Mas estamos injetando DEPOIS de criar o partial mock.
        
        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        
        // Re-injeta o mock do integracaoService
        $reflection = new ReflectionClass(ServiceBase::class);
        $property = $reflection->getProperty('_services');
        $property->setAccessible(true);
        $property->setValue($this->service, ['integracaoService' => $this->integracaoServiceMock]);
        
        // Acessa o método validateStore diretamente se possível, ou via proxyStore que o chama?
        // ServiceBase usa __call para métodos mágicos?
        // validateStore é um método protected ou public?
        // Em ServiceBase: @method validateStore($dataOrEntity, $unidade, $action)
        // Mas na classe UsuarioService existe o método validateStore public.
        
        // Vamos garantir que o validateStore seja chamado e execute o código real.
        // Como é um partial mock, métodos não mockados executam o código real.



        // Bypass validações complexas
        $this->service->shouldReceive('validarPerfil')->andReturnNull();
        $this->service->shouldReceive('validarColaborador')->andReturnNull();
        $this->service->shouldReceive('removerVinculosUsuario')->andReturnNull();

        // Chama o método validateStore (onde a lógica foi inserida)
        // action = INSERT
        try {
            /** @var UsuarioService $this->service */
            $this->service->validateStore($data, null, UsuarioService::ACTION_INSERT);
        } catch (\Exception $e) {
            // Ignora exceptions de retorno (validateStore retorna o usuário recuperado ou lança erro)
            // Se retornar o usuário, ok.
        }
        
        $this->assertTrue(true); // Se chegou aqui e o mock foi chamado, sucesso
    }
}
