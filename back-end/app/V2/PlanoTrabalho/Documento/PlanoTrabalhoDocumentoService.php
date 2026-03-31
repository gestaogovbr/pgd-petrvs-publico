<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Models\Documento;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use Illuminate\Support\Facades\Session;

class PlanoTrabalhoDocumentoService
{
    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoDocumentoStoreValidator $storeValidator,
        private readonly TCRDatasourceBuilder $datasourceBuilder,
        private readonly TCRTemplateRenderer $renderer,
    ) {}

    public function store(string $planoTrabalhoId): Documento
    {
        $this->storeValidator->validar($planoTrabalhoId);

        $documentoExistente = $this->documentoRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);

        if ($documentoExistente !== null) {
            return $documentoExistente;
        }

        $plano = $this->planoTrabalhoRepository->findByIdParaTcr($planoTrabalhoId);

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
