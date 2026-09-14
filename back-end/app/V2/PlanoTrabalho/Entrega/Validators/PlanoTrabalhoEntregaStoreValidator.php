<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;

class PlanoTrabalhoEntregaStoreValidator
{
    private const STATUSES_PLANEJAMENTO = [
        StatusEnum::INCLUIDO,
        StatusEnum::AGUARDANDO_ASSINATURA,
    ];

    private const ORIGENS_VINCULADAS = ['PROPRIA_UNIDADE', 'OUTRA_UNIDADE'];

    private const MENSAGEM_PERIODO_BLOQUEADO =
        'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.';

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
        private readonly PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly AtividadeRepository $atividadeRepository,
    ) {}

    public function validar(PlanoTrabalhoEntregaStoreDTO $dto): void
    {
        $plano = $this->findPlanoOrFail($dto->planoTrabalhoId);
        $this->validarStatusInclusao($plano, $dto->consolidacaoId);
        $this->validarVinculoSeAplicavel($plano, $dto);
    }

    public function validarUpdate(PlanoTrabalhoEntregaStoreDTO $dto): void
    {
        $plano = $this->findPlanoOrFail($dto->planoTrabalhoId);
        $this->validarStatusPlanejamento($plano);
        $this->validarVinculoSeAplicavel($plano, $dto);
    }

    public function validarDestroy(string $planoTrabalhoId, ?string $entregaId = null, ?string $consolidacaoId = null): void
    {
        $plano = $this->findPlanoOrFail($planoTrabalhoId);
        $this->validarStatusExclusao($plano, $consolidacaoId);

        if ($plano->status === StatusEnum::ATIVO->value && $entregaId !== null) {
            $this->validarEntregaSemRegistrosEmPeriodosFechados($entregaId);
        }
    }

    private function findPlanoOrFail(string $planoTrabalhoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        return $plano;
    }

    private function validarVinculoSeAplicavel(PlanoTrabalho $plano, PlanoTrabalhoEntregaStoreDTO $dto): void
    {
        if (!in_array($dto->origem, self::ORIGENS_VINCULADAS, true)) {
            return;
        }

        if ($dto->planoEntregaEntregaId === null) {
            throw new ValidateException('O vínculo com a entrega do plano de entregas é obrigatório para este tipo.');
        }

        $entrega = $this->findEntregaOrFail($dto->planoEntregaEntregaId);
        $this->validarUnicidade($dto->planoTrabalhoId, $entrega->id, $dto->entregaId);
        $this->validarIntersecaoPeriodo($plano, $entrega);
        $this->validarSomatorioEsforcoExecutado($dto);
    }

    private function findEntregaOrFail(string $planoEntregaEntregaId): PlanoEntregaEntrega
    {
        $entrega = $this->planoEntregaRepository->findEntregaById($planoEntregaEntregaId);

        if ($entrega === null) {
            throw new NotFoundException('A entrega do plano de entregas não foi encontrada.');
        }

        return $entrega;
    }

    private function validarStatusInclusao(PlanoTrabalho $plano, ?string $consolidacaoId): void
    {
        if ($this->isStatusPlanejamento($plano)) {
            return;
        }

        if ($plano->status === StatusEnum::ATIVO->value) {
            $this->validarPeriodoAvaliativoAberto($plano, $consolidacaoId);
            return;
        }

        throw new ValidateException(
            'Contribuições só podem ser incluídas ou excluídas quando o Plano de Trabalho está em rascunho, aguardando assinatura ou em execução.'
        );
    }

    private function validarStatusExclusao(PlanoTrabalho $plano, ?string $consolidacaoId): void
    {
        $this->validarStatusInclusao($plano, $consolidacaoId);
    }

    private function validarStatusPlanejamento(PlanoTrabalho $plano): void
    {
        if ($this->isStatusPlanejamento($plano)) {
            return;
        }

        throw new ValidateException(
            'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.'
        );
    }

    private function isStatusPlanejamento(PlanoTrabalho $plano): bool
    {
        $statusPermitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PLANEJAMENTO);

        return in_array($plano->status, $statusPermitidos, true);
    }

    private function validarPeriodoAvaliativoAberto(PlanoTrabalho $plano, ?string $consolidacaoId): void
    {
        if ($consolidacaoId !== null) {
            $this->validarConsolidacaoInformada($plano, $consolidacaoId);
            return;
        }

        if (!$this->consolidacaoRepository->possuiPeriodoAberto($plano->id)) {
            throw new ValidateException(self::MENSAGEM_PERIODO_BLOQUEADO);
        }
    }

    private function validarConsolidacaoInformada(PlanoTrabalho $plano, string $consolidacaoId): void
    {
        $consolidacao = $this->consolidacaoRepository->findConsolidacaoById($consolidacaoId);

        if ($consolidacao === null) {
            throw new NotFoundException('Período avaliativo não encontrado.');
        }

        if ($consolidacao->plano_trabalho_id !== $plano->id) {
            throw new ValidateException('O período avaliativo não pertence a este Plano de Trabalho.');
        }

        if ($this->periodoEstaBloqueado($consolidacao)) {
            throw new ValidateException(self::MENSAGEM_PERIODO_BLOQUEADO);
        }
    }

    private function periodoEstaBloqueado(PlanoTrabalhoConsolidacao $consolidacao): bool
    {
        return in_array($consolidacao->status, [
            StatusEnum::CONCLUIDO->value,
            StatusEnum::AVALIADO->value,
        ], true);
    }

    private function validarEntregaSemRegistrosEmPeriodosFechados(string $entregaId): void
    {
        if ($this->atividadeRepository->possuiEmPeriodosFechados($entregaId)) {
            throw new ValidateException(self::MENSAGEM_PERIODO_BLOQUEADO);
        }
    }

    private function validarUnicidade(string $planoTrabalhoId, string $planoEntregaEntregaId, ?string $entregaId = null): void
    {
        if ($this->planoTrabalhoEntregaRepository->existeVinculo($planoTrabalhoId, $planoEntregaEntregaId, $entregaId)) {
            throw new ValidateException('Esta entrega já está vinculada a este Plano de Trabalho.');
        }
    }

    private function validarIntersecaoPeriodo(PlanoTrabalho $plano, PlanoEntregaEntrega $entrega): void
    {
        $semIntersecao = $entrega->data_inicio > $plano->data_fim
            || ($entrega->data_fim !== null && $entrega->data_fim < $plano->data_inicio);

        if ($semIntersecao) {
            throw new ValidateException('O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');
        }
    }

    private function validarSomatorioEsforcoExecutado(PlanoTrabalhoEntregaStoreDTO $dto): void
    {
        if (!$dto->informouEsforcoExecutado) {
            return;
        }

        $somatorios = $this->planoTrabalhoEntregaRepository->somatoriosEsforcoProjetados(
            $dto->planoTrabalhoId,
            $dto->entregaId,
            $dto->forcaTrabalho,
            $dto->esforcoExecutado,
        );

        if (!$somatorios->planejadoIgualExecutado()) {
            throw new ValidateException(
                'O somatório do esforço executado deve ser igual ao somatório do esforço planejado no Plano de Trabalho.'
            );
        }
    }
}
