<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Exceptions\NotFoundException;
use App\Models\Documento;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAuthorizationValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PlanoTrabalhoDocumentoService
{
    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoDocumentoAuthorizationValidator $authValidator,
        private readonly PlanoTrabalhoDocumentoStoreValidator $storeValidator,
        private readonly TCRDatasourceBuilder $datasourceBuilder,
        private readonly TCRTemplateRenderer $renderer,
    ) {}

    public function show(string $planoTrabalhoId): array
    {
        $this->authValidator->validar($planoTrabalhoId, Auth::id());

        $documento = $this->documentoRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);

        if ($documento === null) {
            throw new NotFoundException('Documento não encontrado para este Plano de Trabalho.');
        }

        return [
            'numero' => $documento->numero,
            'titulo' => $documento->titulo,
            'conteudo' => $documento->conteudo,
        ];
    }

    public function store(string $planoTrabalhoId): Documento
    {
        $plano = $this->authValidator->validar($planoTrabalhoId, Auth::id());
        $this->storeValidator->validar($plano);

        $documentoExistente = $this->documentoRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);

        if ($documentoExistente !== null) {
            return $documentoExistente;
        }

        $plano = $this->planoTrabalhoRepository->loadRelacoesTCR($plano);

        $template = $this->datasourceBuilder->getTemplate($plano);
        $datasource = $this->datasourceBuilder->getDatasource($plano);

        $dto = new TCRDocumentoDTO(
            planoTrabalhoId: $planoTrabalhoId,
            entidadeId: Session::get('entidade_id'),
            conteudo: $this->renderer->render($template, $datasource),
            template: $template,
            dataset: $this->datasourceBuilder->getDataset(),
            datasource: $datasource,
            templateId: $this->datasourceBuilder->getTemplateId($plano),
        );

        $documento = $this->documentoRepository->createFromTCR($dto);

        $this->planoTrabalhoRepository->update($planoTrabalhoId, [
            'documento_id' => $documento->id,
        ]);

        return $documento;
    }
}
