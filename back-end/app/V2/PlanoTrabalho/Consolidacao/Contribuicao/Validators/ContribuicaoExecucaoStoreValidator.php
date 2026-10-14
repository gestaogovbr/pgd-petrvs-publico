<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;

class ContribuicaoExecucaoStoreValidator
{
    private const PERIODOS_BLOQUEADOS = [
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

    private const MENSAGEM_PERIODO_BLOQUEADO =
        'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.';

    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly PlanoTrabalhoConsolidacaoContribuicaoRepository $contribuicaoRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    public function validarStore(PlanoTrabalho $plano, ContribuicaoExecucaoStoreDTO $dto): PlanoTrabalhoConsolidacao
    {
        $consolidacao = $this->resolverPeriodoLiberado($plano, $dto->consolidacaoId);
        $this->validarVinculoEntrega($dto);

        return $consolidacao;
    }

    public function validarUpdate(PlanoTrabalho $plano, ContribuicaoExecucaoStoreDTO $dto): PlanoTrabalhoConsolidacaoContribuicao
    {
        $this->resolverPeriodoLiberado($plano, $dto->consolidacaoId);
        $this->validarVinculoEntrega($dto);

        return $this->resolverContribuicao($dto->consolidacaoId, $dto->contribuicaoId);
    }

    public function validarDestroy(PlanoTrabalho $plano, string $consolidacaoId, string $contribuicaoId): PlanoTrabalhoConsolidacaoContribuicao
    {
        $this->resolverPeriodoLiberado($plano, $consolidacaoId);

        return $this->resolverContribuicao($consolidacaoId, $contribuicaoId);
    }

    private function resolverPeriodoLiberado(PlanoTrabalho $plano, string $consolidacaoId): PlanoTrabalhoConsolidacao
    {
        if ($plano->status !== StatusEnum::ATIVO->value) {
            throw new ValidateException('Contribuições de execução só podem ser gerenciadas quando o Plano de Trabalho está em execução.');
        }

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

        return $consolidacao;
    }

    private function periodoEstaBloqueado(PlanoTrabalhoConsolidacao $consolidacao): bool
    {
        $bloqueados = array_map(static fn (StatusEnum $s): string => $s->value, self::PERIODOS_BLOQUEADOS);

        return in_array($consolidacao->status, $bloqueados, true);
    }

    private function validarVinculoEntrega(ContribuicaoExecucaoStoreDTO $dto): void
    {
        if (!$dto->isVinculadaAEntrega()) {
            return;
        }

        if ($dto->planoEntregaEntregaId === null) {
            throw new ValidateException('O vínculo com a entrega do plano de entregas é obrigatório para este tipo.');
        }

        if ($this->planoEntregaRepository->findEntregaById($dto->planoEntregaEntregaId) === null) {
            throw new NotFoundException('A entrega do plano de entregas não foi encontrada.');
        }
    }

    private function resolverContribuicao(string $consolidacaoId, ?string $contribuicaoId): PlanoTrabalhoConsolidacaoContribuicao
    {
        if ($contribuicaoId === null) {
            throw new ValidateException('O identificador da contribuição é obrigatório.');
        }

        $contribuicao = $this->contribuicaoRepository->findById($contribuicaoId);

        if ($contribuicao === null) {
            throw new NotFoundException('Contribuição de execução não encontrada.');
        }

        if ($contribuicao->plano_trabalho_consolidacao_id !== $consolidacaoId) {
            throw new ValidateException('A contribuição não pertence a este período avaliativo.');
        }

        return $contribuicao;
    }
}
