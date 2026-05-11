<?php

declare(strict_types=1);

namespace App\DTOs\Siape;

use Carbon\CarbonImmutable;

final readonly class CargaIndividualSiapeProcessamentoDTO
{
    public const TIPO_SERVIDOR = 'servidor';
    public const TIPO_UNIDADE = 'unidade';

    public const STATUS_SUCESSO = 'sucesso';
    public const STATUS_ERRO = 'erro';
    public const STATUS_PARCIAL = 'parcial';

    /**
     * @param array<string, mixed> $dadosSiape
     * @param array<int, array<string, mixed>>|null $resumo
     */
    public function __construct(
        public string $processamentoId,
        public string $tipo,
        public string $chave,
        public string $status,
        public bool $entradaValida,
        public array $dadosSiape,
        public ?array $resumo = null,
        public ?string $mensagemErro = null,
        public ?string $solicitanteId = null,
        public ?CarbonImmutable $processadoEm = null,
    ) {
    }

    public function processadoEm(): CarbonImmutable
    {
        return $this->processadoEm ?? CarbonImmutable::now();
    }
}
