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
use App\Services\SiapeIndividualServidorService;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

it('monta escopo da carga individual com cpf e matriculas funcionais normalizadas', function () {
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

    $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'montarEscopoCargaIndividualServidor');
    $method->setAccessible(true);

    $escopo = $method->invoke($service, '52998224725', [
        ['matriculaSiape' => ' 2326001 '],
        ['matriculaSiape' => '2326001'],
        ['matriculaSiape' => '2326002'],
        ['matriculaSiape' => ''],
        ['matriculaSiape' => null],
    ]);

    expect($escopo)->toBe([
        'origem' => 'carga_individual_servidor',
        'cpf' => '52998224725',
        'matriculas' => ['2326001', '2326002'],
    ]);
});
