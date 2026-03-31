<?php

use App\V2\PlanoTrabalho\Documento\PlanoTrabalhoDocumentoService;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAuthorizationValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->authValidator = Mockery::mock(PlanoTrabalhoDocumentoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoDocumentoStoreValidator::class);
    $this->datasourceBuilder = Mockery::mock(TCRDatasourceBuilder::class);
    $this->renderer = Mockery::mock(TCRTemplateRenderer::class);

    $this->service = new PlanoTrabalhoDocumentoService(
        $this->documentoRepo,
        $this->planoRepo,
        $this->authValidator,
        $this->storeValidator,
        $this->datasourceBuilder,
        $this->renderer,
    );

    /** @var PlanoTrabalho $plano */
    $this->plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $this->plano->id = 'plano-1';

    Auth::shouldReceive('id')->andReturn('user-1');
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoService::store', function () {

    test('retorna documento existente sem gerar novo', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);
        $this->storeValidator->shouldReceive('validar')->once()->with($this->plano);

        /** @var Documento $docExistente */
        $docExistente = Mockery::mock(Documento::class)->makePartial();
        $docExistente->id = 'doc-existente';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn($docExistente);
        $this->plano->shouldNotReceive('load');
        $this->planoRepo->shouldNotReceive('loadRelacoesTCR');
        $this->documentoRepo->shouldNotReceive('createFromTCR');

        expect($this->service->store('plano-1'))->toBe($docExistente);
    });

    test('cria documento carregando relações do plano já obtido', function () {
        $this->authValidator->shouldReceive('validar')->once()->andReturn($this->plano);
        $this->storeValidator->shouldReceive('validar')->once()->with($this->plano);
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        $this->planoRepo->shouldReceive('loadRelacoesTCR')->once()->with($this->plano)->andReturn($this->plano);

        $this->datasourceBuilder->shouldReceive('getTemplate')->andReturn('<html>{{nome}}</html>');
        $this->datasourceBuilder->shouldReceive('getDataset')->andReturn([]);
        $this->datasourceBuilder->shouldReceive('getDatasource')->andReturn((object) []);
        $this->datasourceBuilder->shouldReceive('getTemplateId')->andReturn('tmpl-1');
        $this->renderer->shouldReceive('render')->andReturn('<html>Teste</html>');

        Session::shouldReceive('get')->with('entidade_id')->andReturn('entidade-1');

        /** @var Documento $novoDoc */
        $novoDoc = Mockery::mock(Documento::class)->makePartial();
        $novoDoc->id = 'doc-novo';

        $this->documentoRepo->shouldReceive('createFromTCR')
            ->once()
            ->with(Mockery::type(TCRDocumentoDTO::class))
            ->andReturn($novoDoc);

        $this->planoRepo->shouldReceive('update')
            ->once()
            ->with('plano-1', ['documento_id' => 'doc-novo']);

        expect($this->service->store('plano-1'))->toBe($novoDoc);
    });

    test('não persiste quando autorização falha', function () {
        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Usuário não tem permissão.'));

        $this->storeValidator->shouldNotReceive('validar');
        $this->documentoRepo->shouldNotReceive('createFromTCR');

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

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn($documento);

        expect($this->service->show('plano-1'))->toBe([
            'numero' => 42,
            'titulo' => 'Termo de Ciência e Responsabilidade',
            'conteudo' => '<html>Conteúdo</html>',
        ]);
    });

    test('lança exceção quando plano não possui documento TCR', function () {
        $this->authValidator->shouldReceive('validar')->once();

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        $this->service->show('plano-1');
    })->throws(NotFoundException::class);

    test('não busca documento quando autorização falha', function () {
        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Sem permissão.'));

        $this->documentoRepo->shouldNotReceive('findTcrByPlanoTrabalhoId');

        $this->service->show('plano-1');
    })->throws(ForbiddenException::class);
});
