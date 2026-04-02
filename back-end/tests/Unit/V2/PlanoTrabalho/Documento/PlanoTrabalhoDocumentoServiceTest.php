<?php

use App\V2\PlanoTrabalho\Documento\PlanoTrabalhoDocumentoService;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAuthorizationValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAssinarValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoCancelarAssinaturaValidator;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\TCRAssinaturaDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRAssinaturaPolicy;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\Repository\DocumentoRepository;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\StatusService;
use App\Models\Documento;
use App\Models\DocumentoAssinatura;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->assinaturaRepo = Mockery::mock(DocumentoAssinaturaRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->authValidator = Mockery::mock(PlanoTrabalhoDocumentoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoDocumentoStoreValidator::class);
    $this->assinarValidator = Mockery::mock(PlanoTrabalhoDocumentoAssinarValidator::class);
    $this->cancelarAssinaturaValidator = Mockery::mock(PlanoTrabalhoDocumentoCancelarAssinaturaValidator::class);
    $this->assinaturaPolicy = Mockery::mock(TCRAssinaturaPolicy::class);
    $this->datasourceBuilder = Mockery::mock(TCRDatasourceBuilder::class);
    $this->renderer = Mockery::mock(TCRTemplateRenderer::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->service = new PlanoTrabalhoDocumentoService(
        $this->documentoRepo,
        $this->assinaturaRepo,
        $this->planoRepo,
        $this->authValidator,
        $this->storeValidator,
        $this->assinarValidator,
        $this->cancelarAssinaturaValidator,
        $this->assinaturaPolicy,
        $this->datasourceBuilder,
        $this->renderer,
        $this->statusService,
    );

    /** @var PlanoTrabalho $plano */
    $this->plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $this->plano->id = 'plano-1';

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->nome = 'João';

    Auth::shouldReceive('id')->andReturn('user-1');
    Auth::shouldReceive('user')->andReturn($usuario);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoService::store', function () {

    test('retorna documento existente sem gerar novo', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);
        $this->storeValidator->shouldReceive('validar')->once();

        /** @var Documento $docExistente */
        $docExistente = Mockery::mock(Documento::class)->makePartial();
        $docExistente->id = 'doc-existente';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($docExistente);
        $this->planoRepo->shouldNotReceive('loadRelacoesTCR');
        $this->documentoRepo->shouldNotReceive('createFromTCR');

        expect($this->service->store('plano-1'))->toBe($docExistente);
    });

    test('cria documento carregando relações do plano já obtido', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);
        $this->storeValidator->shouldReceive('validar')->once();
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);
        $this->planoRepo->shouldReceive('loadRelacoesTCR')->once()->andReturn($this->plano);

        $this->datasourceBuilder->shouldReceive('getTemplate')->andReturn('<html>{{nome}}</html>');
        $this->datasourceBuilder->shouldReceive('getDataset')->andReturn([]);
        $this->datasourceBuilder->shouldReceive('getDatasource')->andReturn((object) []);
        $this->datasourceBuilder->shouldReceive('getTemplateId')->andReturn('tmpl-1');
        $this->renderer->shouldReceive('render')->andReturn('<html>Teste</html>');
        Session::shouldReceive('get')->with('entidade_id')->andReturn('entidade-1');

        /** @var Documento $novoDoc */
        $novoDoc = Mockery::mock(Documento::class)->makePartial();
        $novoDoc->id = 'doc-novo';

        $this->documentoRepo->shouldReceive('createFromTCR')->once()->with(Mockery::type(TCRDocumentoDTO::class))->andReturn($novoDoc);
        $this->planoRepo->shouldReceive('update')->once()->with('plano-1', ['documento_id' => 'doc-novo']);

        expect($this->service->store('plano-1'))->toBe($novoDoc);
    });

    test('não persiste quando autorização falha', function () {
        $this->authValidator->shouldReceive('validar')->andThrow(new ForbiddenException('Sem permissão.'));
        $this->storeValidator->shouldNotReceive('validar');

        $this->service->store('plano-1');
    })->throws(ForbiddenException::class);
});

describe('PlanoTrabalhoDocumentoService::show', function () {

    test('retorna numero, titulo e conteudo do TCR', function () {
        $this->authValidator->shouldReceive('validar')->once();

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->numero = 42;
        $documento->titulo = 'Termo de Ciência e Responsabilidade';
        $documento->conteudo = '<html>Conteúdo</html>';
        $documento->shouldReceive('getAttribute')->with('assinaturas')->andReturn(new \Illuminate\Database\Eloquent\Collection());

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($documento);

        $result = $this->service->show('plano-1');

        expect($result['numero'])->toBe(42);
        expect($result['titulo'])->toBe('Termo de Ciência e Responsabilidade');
        expect($result['conteudo'])->toBe('<html>Conteúdo</html>');
        expect($result)->toHaveKey('assinaturas');
    });

    test('lança exceção quando plano não possui documento TCR', function () {
        $this->authValidator->shouldReceive('validar')->once();
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        $this->service->show('plano-1');
    })->throws(NotFoundException::class);
});

describe('PlanoTrabalhoDocumentoService::assinar', function () {

    test('registra assinatura e atualiza status para AGUARDANDO_ASSINATURA', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->conteudo = '<html>TCR</html>';

        $this->assinarValidator->shouldReceive('validar')->once()->andReturn($documento);

        $assinatura = Mockery::mock(DocumentoAssinatura::class)->makePartial();
        $this->assinaturaRepo->shouldReceive('createFromTCR')
            ->once()
            ->with(Mockery::type(TCRAssinaturaDTO::class))
            ->andReturn($assinatura);

        $this->assinaturaPolicy->shouldReceive('todasRealizadas')
            ->with($this->plano, 'doc-1')
            ->andReturn(false);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($this->plano, StatusEnum::AGUARDANDO_ASSINATURA->value, Mockery::type('string'));

        expect($this->service->assinar('plano-1'))->toBe($assinatura);
    });

    test('atualiza status para ATIVO quando todas assinaturas realizadas', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';
        $documento->conteudo = '<html>TCR</html>';

        $this->assinarValidator->shouldReceive('validar')->once()->andReturn($documento);

        $assinatura = Mockery::mock(DocumentoAssinatura::class)->makePartial();
        $this->assinaturaRepo->shouldReceive('createFromTCR')->once()->andReturn($assinatura);

        $this->assinaturaPolicy->shouldReceive('todasRealizadas')
            ->with($this->plano, 'doc-1')
            ->andReturn(true);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($this->plano, StatusEnum::ATIVO->value, Mockery::type('string'));

        expect($this->service->assinar('plano-1'))->toBe($assinatura);
    });

    test('não registra assinatura quando autorização falha', function () {
        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Sem permissão.'));

        $this->assinarValidator->shouldNotReceive('validar');
        $this->assinaturaRepo->shouldNotReceive('createFromTCR');

        $this->service->assinar('plano-1');
    })->throws(ForbiddenException::class);
});

describe('PlanoTrabalhoDocumentoService::cancelarAssinatura', function () {

    test('remove assinatura e reverte status para INCLUIDO quando não restam assinaturas', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->cancelarAssinaturaValidator->shouldReceive('validar')->once()->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('deleteAssinaturaUsuario')->once()->with('doc-1', 'user-1')->andReturn(true);
        $this->assinaturaRepo->shouldReceive('existeAlgumaAssinatura')->with('doc-1')->andReturn(false);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($this->plano, StatusEnum::INCLUIDO->value, Mockery::type('string'));

        $this->service->cancelarAssinatura('plano-1');
    });

    test('mantém AGUARDANDO_ASSINATURA quando ainda restam assinaturas de outros', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);

        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->id = 'doc-1';

        $this->cancelarAssinaturaValidator->shouldReceive('validar')->once()->andReturn($documento);
        $this->assinaturaRepo->shouldReceive('deleteAssinaturaUsuario')->once()->andReturn(true);
        $this->assinaturaRepo->shouldReceive('existeAlgumaAssinatura')->with('doc-1')->andReturn(true);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($this->plano, StatusEnum::AGUARDANDO_ASSINATURA->value, Mockery::type('string'));

        $this->service->cancelarAssinatura('plano-1');
    });

    test('não remove assinatura quando autorização falha', function () {
        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Sem permissão.'));

        $this->cancelarAssinaturaValidator->shouldNotReceive('validar');
        $this->assinaturaRepo->shouldNotReceive('deleteAssinaturaUsuario');

        $this->service->cancelarAssinatura('plano-1');
    })->throws(ForbiddenException::class);
});
