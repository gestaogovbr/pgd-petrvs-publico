<?php

use App\Repository\EntidadeRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\SiapeConsultaDadosFuncionaisRepository;
use App\Repository\SiapeConsultaDadosPessoaisRepository;
use App\Repository\SiapeDadosUORGRepository;
use App\Repository\SiapeListaUORGSRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoServiceFactory;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Services\SiapeIndividualServidorService;
use App\Services\SiapeIndividualService;
use Illuminate\Support\Facades\Log;
use Psr\Log\LoggerInterface;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

it('registra falha suprimida ao processar dados pessoais para o relatorio individual SIAPE', function () {
    $service = Mockery::mock(SiapeIndividualServidorService::class, [
        Mockery::mock(IntegracaoServiceFactory::class),
        Mockery::mock(EntidadeRepository::class),
        Mockery::mock(SiapeBlackListServidorRepository::class),
        Mockery::mock(SiapeConsultaDadosFuncionaisRepository::class),
        Mockery::mock(SiapeConsultaDadosPessoaisRepository::class),
        Mockery::mock(SiapeDadosUORGRepository::class),
        Mockery::mock(SiapeListaUORGSRepository::class),
        Mockery::mock(UnidadeRepository::class),
        Mockery::mock(UnidadeIntegranteRepository::class),
        Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class),
        Mockery::mock(UsuarioRepository::class),
        Mockery::mock(CargaIndividualSiapeSubject::class),
    ])->makePartial();

    $cpf = '52998224725';
    $erro = new RuntimeException('Sequencia de caracteres invalida nos dados pessoais SIAPE');
    $processador = Mockery::mock(ProcessaDadosSiapeBD::class);
    $processador
        ->shouldReceive('processaDadosPessoais')
        ->with($cpf, 'xml-pessoal-com-caractere-invalido')
        ->andThrow($erro)
        ->once();

    $siape = Mockery::mock(SiapeIndividualService::class);
    $siape
        ->shouldReceive('getProcessaDadosSiape')
        ->andReturn($processador)
        ->once();

    $serviceProperty = new ReflectionProperty(SiapeIndividualServidorService::class, 'service');
    $serviceProperty->setAccessible(true);
    $serviceProperty->setValue($service, $siape);

    $logger = Mockery::mock(LoggerInterface::class);
    $logger
        ->shouldReceive('warning')
        ->with(
            Mockery::on(fn (string $message): bool => str_contains($message, 'dados pessoais') && str_contains($message, 'relatorio')),
            Mockery::on(fn (array $context): bool => ($context['cpf'] ?? null) === $cpf
                && ($context['erro'] ?? null) === $erro->getMessage()
                && isset($context['trace']))
        )
        ->once();
    Log::shouldReceive('channel')->with('siape')->andReturn($logger);

    $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'processarDadosPessoaisParaRelatorio');
    $method->setAccessible(true);

    $result = $method->invoke($service, $cpf, 'xml-pessoal-com-caractere-invalido');

    expect($result)->toBe([]);
});
