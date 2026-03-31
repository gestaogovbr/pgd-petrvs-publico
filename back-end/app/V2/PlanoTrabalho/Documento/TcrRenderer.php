<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento;

use App\Services\TemplateService;

class TcrRenderer
{
    public function __construct(
        private readonly TemplateService $templateService,
    ) {}

    public function render(string $template, mixed $datasource): string
    {
        return $this->templateService->renderTemplate($template, $datasource);
    }
}
