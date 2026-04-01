<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Models\Documento;
use App\Models\DocumentoAssinatura;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\StatusService;
use App\V2\PlanoTrabalho\Documento\TCR\TCRAssinaturaDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRAssinaturaPolicy;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasourceBuilder;
use App\V2\PlanoTrabalho\Documento\TCR\TCRDocumentoDTO;
use App\V2\PlanoTrabalho\Documento\TCR\TCRTemplateRenderer;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAssinarValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoAuthorizationValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoCancelarAssinaturaValidator;
use App\V2\PlanoTrabalho\Documento\Validators\PlanoTrabalhoDocumentoStoreValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PlanoTrabalhoDocumentoService
{
    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoDocumentoAuthorizationValidator $authValidator,
        private readonly PlanoTrabalhoDocumentoStoreValidator $storeValidator,
        private readonly PlanoTrabalhoDocumentoAssinarValidator $assinarValidator,
        private readonly PlanoTrabalhoDocumentoCancelarAssinaturaValidator $cancelarAssinaturaValidator,
        private readonly TCRAssinaturaPolicy $assinaturaPolicy,
        private readonly TCRDatasourceBuilder $datasourceBuilder,
        private readonly TCRTemplateRenderer $renderer,
        private readonly StatusService $statusService,
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
            'assinaturas' => $documento->assinaturas->map(function (DocumentoAssinatura $assinatura) {
                return [
                    'usuario_id' => $assinatura->usuario_id,
                    'usuario_nome' => $assinatura->usuario->nome,
                    'data_assinatura' => $assinatura->data_assinatura
                ];
            })
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

    public function assinar(string $planoTrabalhoId): DocumentoAssinatura
    {
        $usuarioId = Auth::id();
        $plano = $this->authValidator->validar($planoTrabalhoId, $usuarioId);
        $documento = $this->assinarValidator->validar($plano, $usuarioId);

        $dto = TCRAssinaturaDTO::fromDocumento($documento, $usuarioId);
        $assinatura = $this->assinaturaRepository->createFromTCR($dto);

        $status = $this->assinaturaPolicy->todasRealizadas($plano, $documento->id)
            ? StatusEnum::ATIVO->value
            : StatusEnum::AGUARDANDO_ASSINATURA->value;

        $this->statusService->atualizaStatus(
            $plano,
            $status,
            "Registrada a assinatura do servidor: " . Auth::user()->nome . "."
        );

        return $assinatura;
    }

    public function cancelarAssinatura(string $planoTrabalhoId): void
    {
        $usuarioId = Auth::id();
        $plano = $this->authValidator->validar($planoTrabalhoId, $usuarioId);
        $documento = $this->cancelarAssinaturaValidator->validar($plano, $usuarioId);

        $this->assinaturaRepository->deleteAssinaturaUsuario($documento->id, $usuarioId);

        $status = $this->assinaturaRepository->existeAlgumaAssinatura($documento->id)
            ? StatusEnum::AGUARDANDO_ASSINATURA->value
            : StatusEnum::INCLUIDO->value;

        $this->statusService->atualizaStatus(
            $plano,
            $status,
            "Cancelada a assinatura do servidor: " . Auth::user()->nome . "."
        );
    }
}
