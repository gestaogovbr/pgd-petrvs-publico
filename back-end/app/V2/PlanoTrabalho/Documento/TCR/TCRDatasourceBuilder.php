<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Collection;

class TCRDatasourceBuilder
{
    public function __construct(
        private readonly TCRDatasetProvider $datasetProvider,
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
        return $this->datasetProvider->getDataset();
    }

    public function getDatasource(PlanoTrabalho $plano): object
    {
        $context = $this->datasetProvider->getContext($plano);
        $fields = $this->datasetProvider->getFieldDefinitions();

        return $this->buildFields($context, $fields);
    }

    private function buildFields(mixed $context, array $fields): object
    {
        $values = $this->toArray($context);
        $result = [];

        foreach ($fields as $field) {
            $valor = isset($field['value'])
                ? $field['value']($context)
                : ($values[$field['field']] ?? null);

            if ($valor === null) {
                continue;
            }

            if (is_array($valor) || $valor instanceof Collection) {
                $result[$field['field']] = array_map(
                    fn ($item) => $this->buildFields($item, $field['fields']),
                    $valor instanceof Collection ? $valor->all() : $valor
                );
                continue;
            }

            if (isset($field['fields'])) {
                $result[$field['field']] = $this->buildFields($valor, $field['fields']);
                continue;
            }

            if (isset($field['lookup'])) {
                $valor = TCRTemplateRenderer::formataLookup($valor, $field['lookup']);
            }

            if (isset($field['type'])) {
                $valor = TCRTemplateRenderer::formataValor($valor, $field['type']);
            }

            $result[$field['field']] = $valor;
        }

        return (object) $result;
    }

    private function toArray(mixed $context): array
    {
        if ($context instanceof ModelBase) {
            return $context->toArray();
        }

        if (is_object($context) && method_exists($context, 'toArray')) {
            return $context->toArray();
        }

        return (array) $context;
    }
}
