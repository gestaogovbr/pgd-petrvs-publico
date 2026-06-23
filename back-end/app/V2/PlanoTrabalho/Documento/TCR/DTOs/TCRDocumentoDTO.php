<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR\DTOs;

class TCRDocumentoDTO
{
    private const TITULO = 'Termo de Ciência e Responsabilidade';
    private const TIPO = 'HTML';
    private const ESPECIE = 'TCR';
    private const STATUS = 'GERADO';

    public function __construct(
        public readonly string $planoTrabalhoId,
        public readonly string $entidadeId,
        public readonly string $conteudo,
        public readonly string $template,
        public readonly array $dataset,
        public readonly mixed $datasource,
        public readonly ?string $templateId,
    ) {}

    public function toArray(): array
    {
        return [
            'tipo' => self::TIPO,
            'especie' => self::ESPECIE,
            'titulo' => self::TITULO,
            'conteudo' => $this->conteudo,
            'status' => self::STATUS,
            'template' => $this->template,
            'dataset' => $this->dataset,
            'datasource' => $this->datasource,
            'plano_trabalho_id' => $this->planoTrabalhoId,
            'entidade_id' => $this->entidadeId,
            'template_id' => $this->templateId,
        ];
    }
}
