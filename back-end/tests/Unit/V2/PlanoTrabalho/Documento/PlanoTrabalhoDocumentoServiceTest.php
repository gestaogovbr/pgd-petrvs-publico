<?php

use App\V2\PlanoTrabalho\Documento\PlanoTrabalhoDocumentoService;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\Documento;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->documentoRepo = Mockery::mock(DocumentoRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoDocumentoStoreValidator::class);

    $this->service = new PlanoTrabalhoDocumentoService(
        $this->documentoRepo,
        $this->planoRepo,
        $this->storeValidator,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoDocumentoService::store', function () {

    test('retorna documento existente quando TCR já existe para o plano', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');

        /** @var Documento $docExistente */
        $docExistente = Mockery::mock(Documento::class)->makePartial();
        $docExistente->id = 'doc-existente';

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn($docExistente);

        $this->documentoRepo->shouldNotReceive('create');
        $this->planoRepo->shouldNotReceive('update');

        $result = $this->service->store('plano-1');

        expect($result)->toBe($docExistente);
    });

    test('cria novo documento quando não existe TCR para o plano', function () {
        $this->storeValidator->shouldReceive('validar')->once()->with('plano-1');

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn(null);

        Session::shouldReceive('get')->with('entidade_id')->andReturn('entidade-1');

        /** @var Documento $novoDoc */
        $novoDoc = Mockery::mock(Documento::class)->makePartial();
        $novoDoc->id = 'doc-novo';

        $this->documentoRepo->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['tipo'] === 'HTML'
                && $attrs['especie'] === 'TCR'
                && $attrs['status'] === 'GERADO'
                && $attrs['plano_trabalho_id'] === 'plano-1'
                && $attrs['entidade_id'] === 'entidade-1'
            ))
            ->andReturn($novoDoc);

        $this->planoRepo->shouldReceive('update')
            ->once()
            ->with('plano-1', ['documento_id' => 'doc-novo']);

        $result = $this->service->store('plano-1');

        expect($result)->toBe($novoDoc);
    });

    test('não persiste quando validação lança exceção', function () {
        $this->storeValidator->shouldReceive('validar')
            ->once()
            ->andThrow(new ServerException('ValidatePlanoTrabalhoDocumento', 'Plano de Trabalho não encontrado.'));

        $this->documentoRepo->shouldNotReceive('findTcrByPlanoTrabalhoId');
        $this->documentoRepo->shouldNotReceive('create');
        $this->planoRepo->shouldNotReceive('update');

        $this->service->store('plano-inexistente');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');

    test('atualiza documento_id no plano de trabalho após criação', function () {
        $this->storeValidator->shouldReceive('validar')->once();

        $this->documentoRepo->shouldReceive('findTcrByPlanoTrabalhoId')->andReturn(null);

        Session::shouldReceive('get')->with('entidade_id')->andReturn('entidade-1');

        /** @var Documento $novoDoc */
        $novoDoc = Mockery::mock(Documento::class)->makePartial();
        $novoDoc->id = 'doc-xyz';

        $this->documentoRepo->shouldReceive('create')->andReturn($novoDoc);

        $this->planoRepo->shouldReceive('update')
            ->once()
            ->with('plano-1', ['documento_id' => 'doc-xyz']);

        $this->service->store('plano-1');
    });
});
