<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Models\PlanoTrabalho;
use App\Services\TemplateDatasetService;
use App\Services\TemplateService;

class TcrDatasourceBuilder
{
    private const DATASET_CODIGO = 'PLANO_TRABALHO';

    public function __construct(
        private readonly TemplateDatasetService $templateDatasetService,
        private readonly TemplateService $templateService,
    ) {}

    public function getTemplate(PlanoTrabalho $plano): string
    {
        return $plano->programa->templateTcr->conteudo ?? '';
    }

    public function getTemplateId(PlanoTrabalho $plano): ?string
    {
        return $plano->programa->template_tcr_id;
    }

    public function getDataset(): array
    {
        return $this->templateDatasetService->getDataset(self::DATASET_CODIGO, true);
    }

    public function getDatasource(PlanoTrabalho $plano): mixed
    {
        return $this->templateService->getDatasource(self::DATASET_CODIGO, $plano);
    }
}
