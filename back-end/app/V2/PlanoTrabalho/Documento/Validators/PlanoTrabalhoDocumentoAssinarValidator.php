<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\DocumentoRepository;
use App\Repository\UnidadeRepository;

class PlanoTrabalhoDocumentoAssinarValidator
{
    private const STATUSES_PERMITIDOS = [
        StatusEnum::INCLUIDO,
        StatusEnum::AGUARDANDO_ASSINATURA,
    ];

    private const MAX_ASSINATURAS_TCR = 2;

    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $usuarioId): Documento
    {
        $this->validarStatus($plano);
        $this->validarEntregas($plano);
        $this->validarChefiaHierarquica($plano, $usuarioId);

        $documento = $this->documentoRepository->findTcrByPlanoTrabalhoId($plano->id);

        if ($documento === null) {
            throw new NotFoundException('Plano de Trabalho não possui documento TCR gerado.');
        }

        if ($this->assinaturaRepository->usuarioJaAssinou($documento->id, $usuarioId)) {
            throw new ValidateException('Usuário já assinou este documento.');
        }

        if ($documento->assinaturas()->count() >= self::MAX_ASSINATURAS_TCR) {
            throw new ValidateException('Todas as assinaturas exigidas já foram realizadas.');
        }

        return $documento;
    }

    private function validarStatus(PlanoTrabalho $plano): void
    {
        $permitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PERMITIDOS);

        if (!in_array($plano->status, $permitidos, true)) {
            throw new ValidateException('Plano de Trabalho deve estar com status Incluído ou Aguardando Assinatura para ser assinado.');
        }
    }

    private function validarEntregas(PlanoTrabalho $plano): void
    {
        if ($plano->entregas()->exists() === false) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para ser assinado.');
        }
    }

    private function validarChefiaHierarquica(PlanoTrabalho $plano, string $usuarioId): void
    {
        if ($plano->usuario_id === $usuarioId) {
            return;
        }

        $unidade = $this->unidadeRepository->findById($plano->unidade_id);

        if ($unidade === null || $unidade->unidade_pai_id === null) {
            return;
        }

        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($plano->unidade_id, $plano->usuario_id)) {
            return;
        }

        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($unidade->unidade_pai_id, $usuarioId)) {
            throw new ForbiddenException('A assinatura de gestor deve ser de uma chefia hierarquicamente superior à unidade do participante.');
        }
    }
}
