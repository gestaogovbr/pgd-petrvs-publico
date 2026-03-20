<?php

namespace Tests\Unit\Services;

use App\Models\Usuario;
use App\Services\UsuarioService;
use App\Services\IntegracaoService;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Repository\SiapeBlackListServidorRepository;
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

        $this->integracaoServiceMock = Mockery::mock(IntegracaoService::class);
        
        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        
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

        // Mock do UsuarioRepository
        $usuarioRepositoryMock = Mockery::mock(UsuarioRepository::class);
        
        $usuario = new Usuario();
        $usuario->forceFill([
            'id' => $id,
            'cpf' => $cpf,
            'email' => $email,
            'matricula' => $matricula,
            'nome' => 'Antigo',
            'apelido' => 'Antigo',
            'data_nascimento' => '1990-01-01',
            'deleted_at' => '2023-01-01 00:00:00'
        ]);

        $usuarioRepositoryMock->shouldReceive('findByCpfOrEmail')
            ->once()
            ->with($cpf, $email, Mockery::any(), true)
            ->andReturn($usuario);
            
        // Mock do UnidadeRepository para evitar erros no construtor
        $unidadeRepositoryMock = Mockery::mock(UnidadeRepository::class);

        // Mock para pular validações que não importam pro teste
        // IMPORTANTE: Ao usar makePartial(), o construtor original do UsuarioService NÃO é chamado automaticamente
        // se não instanciarmos a classe antes. Como estamos criando um mock da classe, precisamos injetar as dependências.
        
        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        $this->service->shouldAllowMockingProtectedMethods();

        // Inject repositories via Reflection
        $reflection = new ReflectionClass(UsuarioService::class);
        
        $usuarioRepoProp = $reflection->getProperty('usuarioRepository');
        $usuarioRepoProp->setAccessible(true);
        $usuarioRepoProp->setValue($this->service, $usuarioRepositoryMock);
        
        $unidadeRepoProp = $reflection->getProperty('unidadeRepository');
        $unidadeRepoProp->setAccessible(true);
        $unidadeRepoProp->setValue($this->service, $unidadeRepositoryMock);
        
        // Re-injeta o mock do integracaoService via Reflection pois ele é injetado via Reflection no setUp
        // Mas como criamos uma NOVA instância (mock), precisamos injetar nela também.
        $reflectionBase = new ReflectionClass(ServiceBase::class);
        $property = $reflectionBase->getProperty('_services');
        $property->setAccessible(true);
        $property->setValue($this->service, ['integracaoService' => $this->integracaoServiceMock]);
        
        // Bypass validações complexas
        
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

    public function test_matriculas_deve_anexar_em_processo_de_inativacao()
    {
        $cpf = '12345678900';

        $usuarioA = new Usuario();
        $usuarioA->cpf = $cpf;
        $usuarioA->matricula = '0001';

        $usuarioB = new Usuario();
        $usuarioB->cpf = $cpf;
        $usuarioB->matricula = '0002';

        $usuarios = new \Illuminate\Database\Eloquent\Collection([$usuarioA, $usuarioB]);

        $usuarioRepositoryMock = Mockery::mock(UsuarioRepository::class);
        $usuarioRepositoryMock->shouldReceive('findAllByCpf')
            ->once()
            ->with($cpf)
            ->andReturn($usuarios);

        $siapeBlackListServidorRepositoryMock = Mockery::mock(SiapeBlackListServidorRepository::class);
        $siapeBlackListServidorRepositoryMock->shouldReceive('findByCpfAndOptionalMatricula')
            ->once()
            ->with($cpf, '0001')
            ->andReturn(Mockery::mock(\App\Models\SiapeBlackListServidor::class));

        $siapeBlackListServidorRepositoryMock->shouldReceive('findByCpfAndOptionalMatricula')
            ->once()
            ->with($cpf, '0002')
            ->andReturn(null);

        $this->service = Mockery::mock(UsuarioService::class)->makePartial();
        $this->service->shouldAllowMockingProtectedMethods();

        $reflection = new ReflectionClass(UsuarioService::class);

        $usuarioRepoProp = $reflection->getProperty('usuarioRepository');
        $usuarioRepoProp->setAccessible(true);
        $usuarioRepoProp->setValue($this->service, $usuarioRepositoryMock);

        $blacklistRepoProp = $reflection->getProperty('siapeBlackListServidorRepository');
        $blacklistRepoProp->setAccessible(true);
        $blacklistRepoProp->setValue($this->service, $siapeBlackListServidorRepositoryMock);

        /** @var UsuarioService $this->service */
        $result = $this->service->matriculas($cpf);

        $this->assertTrue((bool) $result[0]->getAttribute('emProcessoDeInativacao'));
        $this->assertFalse((bool) $result[1]->getAttribute('emProcessoDeInativacao'));
    }
}
