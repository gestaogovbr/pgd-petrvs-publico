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

    /**
     * Valida se o assinante possui autoridade hierárquica para assinar o TCR de outro participante.
     *
     * Regra baseada no papel do participante NA UNIDADE DO PT:
     * - Participante é apenas lotado → gestor da mesma unidade ou da unidade pai pode assinar
     * - Participante é gestor da unidade do PT → gestor da unidade pai deve assinar
     */
    private function validarChefiaHierarquica(PlanoTrabalho $plano, string $usuarioId): void
    {
        if ($plano->usuario_id === $usuarioId) {
            return;
        }

        $unidade = $this->unidadeRepository->findById($plano->unidade_id);

        // Unidade raiz (sem pai): não há hierarquia superior para exigir.
        // Não verifica se o assinante é gestor porque o AuthorizationValidator
        // (executado antes) já garante que apenas o dono do PT ou gestores da unidade
        // chegam até aqui (via autorizarDonoOuChefia → isUsuarioGestorRecursivo).
        if ($unidade === null || $unidade->unidade_pai_id === null) {
            return;
        }

        // Verifica se o participante é gestor DA UNIDADE DO PT (não recursivo)
        if (!$this->unidadeRepository->isUsuarioGestorDaUnidade($plano->unidade_id, $plano->usuario_id)) {
            return;
        }

        // Participante é gestor da unidade do PT — exige assinante da unidade pai
        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($unidade->unidade_pai_id, $usuarioId)) {
            throw new ForbiddenException('O assinante deve ser gestor da mesma unidade do participante ou de uma unidade superior.');
        }
    }
}
