<?php

use App\V2\PlanoTrabalho\Documento\PlanoTrabalhoDocumentoService;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoDocumentoStoreValidator::class);
    $this->datasourceBuilder = Mockery::mock(TCRDatasourceBuilder::class);
    $this->renderer = Mockery::mock(TCRTemplateRenderer::class);

    $this->service = new PlanoTrabalhoDocumentoService(
        $this->documentoRepo,
        $this->planoRepo,
        $this->storeValidator,
        $this->datasourceBuilder,
        $this->renderer,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoService::store', function () {

    test('retorna documento existente sem gerar novo', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');

        /** @var Documento $docExistente */
        $docExistente = Mockery::mock(Documento::class)->makePartial();
        $docExistente->id = 'doc-existente';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn($docExistente);

        $this->planoRepo->shouldNotReceive('findByIdParaTcr');
        $this->documentoRepo->shouldNotReceive('createFromTCR');
        $this->planoRepo->shouldNotReceive('update');

        expect($this->service->store('plano-1'))->toBe($docExistente);
    });

    test('cria documento via DTO tipado quando não existe TCR', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->with('plano-1')->andReturn(null);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $this->planoRepo->shouldReceive('findByIdParaTcr')->with('plano-1')->andReturn($plano);

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

    test('não persiste quando validação lança exceção', function () {
        $this->storeValidator->shouldReceive('validar')
            ->andThrow(new ServerException('ValidatePlanoTrabalhoDocumento', 'Plano de Trabalho não encontrado.'));

        $this->documentoRepo->shouldNotReceive('findTcrByPlanoTrabalhoId');
        $this->documentoRepo->shouldNotReceive('createFromTCR');

        $this->service->store('plano-inexistente');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('atualiza documento_id no plano após criação', function () {
        $this->storeValidator->shouldReceive('validar')->once();
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $this->planoRepo->shouldReceive('findByIdParaTcr')->andReturn($plano);

        $this->datasourceBuilder->shouldReceive('getTemplate')->andReturn('');
        $this->datasourceBuilder->shouldReceive('getDataset')->andReturn([]);
        $this->datasourceBuilder->shouldReceive('getDatasource')->andReturn((object) []);
        $this->datasourceBuilder->shouldReceive('getTemplateId')->andReturn(null);
        $this->renderer->shouldReceive('render')->andReturn('');
        Session::shouldReceive('get')->with('entidade_id')->andReturn('ent-1');

        /** @var Documento $novoDoc */
        $novoDoc = Mockery::mock(Documento::class)->makePartial();
        $novoDoc->id = 'doc-xyz';
        $this->documentoRepo->shouldReceive('createFromTCR')->andReturn($novoDoc);

        $this->planoRepo->shouldReceive('update')
            ->once()
            ->with('plano-1', ['documento_id' => 'doc-xyz']);

        $this->service->store('plano-1');
    });
});

describe('PlanoTrabalhoDocumentoService::show', function () {

    test('retorna numero, titulo e conteudo do TCR mais recente', function () {
        /** @var Documento $documento */
        $documento = Mockery::mock(Documento::class)->makePartial();
        $documento->numero = 42;
        $documento->titulo = 'Termo de Ciência e Responsabilidade';
        $documento->conteudo = '<html>Conteúdo</html>';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn($documento);

        $result = $this->service->show('plano-1');

        expect($result)->toBe([
            'numero' => 42,
            'titulo' => 'Termo de Ciência e Responsabilidade',
            'conteudo' => '<html>Conteúdo</html>',
        ]);
    });

    test('lança exceção quando plano não possui documento TCR', function () {
        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn(null);

        $this->service->show('plano-1');
    })->throws(ServerException::class, 'Documento não encontrado para este Plano de Trabalho.');
});
