<?php

declare(strict_types=1);

namespace App\DTOs\RelatorioAgente;

use App\DTOs\AbstractFiltersDTO;

/**
 * Filtros tipados do relatório de agentes públicos (interface de consulta).
 */
final class RelatorioAgenteFiltersDTO extends AbstractFiltersDTO
{
    public function __construct(
        public readonly ?string $unidadeId = null,
        public readonly bool $incluirUnidadesSubordinadas = false,
        public readonly ?string $usuarioId = null,
        public readonly ?string $nome = null,
        public readonly ?string $unidadeHierarquia = null,
        public readonly ?string $matricula = null,
        public readonly ?string $situacao = null,
        public readonly ?string $participantePgd = null,
        public readonly ?string $programaNome = null,
        public readonly ?string $modalidadePgd = null,
        public readonly ?string $modalidadeSouGov = null,
        public readonly ?string $comparacaoSouGovPetrvs = null,
        public readonly ?string $tipoPedagio = null,
        public readonly ?string $dataInicialPedagio = null,
        public readonly ?string $dataFinalPedagio = null,
        public readonly ?string $dispensaPlanoTrabalho = null,
        public readonly ?string $dataInicioDispensaPt = null,
        public readonly ?string $dataFimDispensaPt = null,
        public readonly ?string $atribuicao = null,
        public readonly ?string $planoEntregaEntregaId = null,
        public readonly ?bool $somenteVigentes = null,
    ) {
    }

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        return new self(
            unidadeId: self::trimmedStringOrNull($filters['unidade_id'] ?? null),
            incluirUnidadesSubordinadas: self::toBool($filters['incluir_unidades_subordinadas'] ?? false),
            usuarioId: self::trimmedStringOrNull($filters['usuario_id'] ?? null),
            nome: self::likeValueOrNull($filters['nome'] ?? null),
            unidadeHierarquia: self::likeValueOrNull($filters['unidadeHierarquia'] ?? null),
            matricula: self::likeValueOrNull($filters['matricula'] ?? null),
            situacao: self::trimmedStringOrNull($filters['situacao'] ?? null),
            participantePgd: self::trimmedStringOrNull($filters['participantePGD'] ?? null),
            programaNome: self::likeValueOrNull($filters['programaNome'] ?? null),
            modalidadePgd: self::trimmedStringOrNull($filters['modalidade_pgd'] ?? null),
            modalidadeSouGov: self::trimmedStringOrNull($filters['modalidadeSouGov'] ?? null),
            comparacaoSouGovPetrvs: self::trimmedStringOrNull($filters['comparacaoSouGovPetrvs'] ?? null),
            tipoPedagio: self::trimmedStringOrNull($filters['tipo_pedagio'] ?? null),
            dataInicialPedagio: self::dateStringOrNull($filters['data_inicial_pedagio'] ?? null),
            dataFinalPedagio: self::dateStringOrNull($filters['data_final_pedagio'] ?? null),
            dispensaPlanoTrabalho: self::trimmedStringOrNull($filters['dispensa_plano_trabalho'] ?? null),
            dataInicioDispensaPt: self::dateStringOrNull($filters['data_inicio_dispensa_pt'] ?? null),
            dataFimDispensaPt: self::dateStringOrNull($filters['data_fim_dispensa_pt'] ?? null),
            atribuicao: self::trimmedStringOrNull($filters['atribuicao'] ?? null),
            planoEntregaEntregaId: self::trimmedStringOrNull($filters['plano_entrega_entrega_id'] ?? null),
            somenteVigentes: array_key_exists('somente_vigentes', $filters)
                ? self::toBool($filters['somente_vigentes'])
                : null,
        );
    }

    /**
     * Perfil participante: remove filtros de unidade e restringe ao próprio usuário.
     */
    public function restritoAoUsuario(string $usuarioId): self
    {
        return new self(
            unidadeId: null,
            incluirUnidadesSubordinadas: false,
            usuarioId: $usuarioId,
            nome: $this->nome,
            unidadeHierarquia: $this->unidadeHierarquia,
            matricula: $this->matricula,
            situacao: $this->situacao,
            participantePgd: $this->participantePgd,
            programaNome: $this->programaNome,
            modalidadePgd: $this->modalidadePgd,
            modalidadeSouGov: $this->modalidadeSouGov,
            comparacaoSouGovPetrvs: $this->comparacaoSouGovPetrvs,
            tipoPedagio: $this->tipoPedagio,
            dataInicialPedagio: $this->dataInicialPedagio,
            dataFinalPedagio: $this->dataFinalPedagio,
            dispensaPlanoTrabalho: $this->dispensaPlanoTrabalho,
            dataInicioDispensaPt: $this->dataInicioDispensaPt,
            dataFimDispensaPt: $this->dataFimDispensaPt,
            atribuicao: $this->atribuicao,
            planoEntregaEntregaId: $this->planoEntregaEntregaId,
            somenteVigentes: $this->somenteVigentes,
        );
    }

    /**
     * Formato `where` esperado pelo repositório legado de agentes.
     *
     * @return list<array{0: string, 1: string, 2: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->unidadeId !== null) {
            $where[] = ['unidade_id', '==', $this->unidadeId];
        }
        if ($this->incluirUnidadesSubordinadas) {
            $where[] = ['incluir_unidades_subordinadas', '==', 1];
        }
        if ($this->usuarioId !== null) {
            $where[] = ['usuario_id', '==', $this->usuarioId];
        }
        if ($this->nome !== null) {
            $where[] = ['nome', 'like', '%' . $this->nome . '%'];
        }
        if ($this->unidadeHierarquia !== null) {
            $where[] = ['unidadeHierarquia', 'like', '%' . $this->unidadeHierarquia . '%'];
        }
        if ($this->matricula !== null) {
            $where[] = ['matricula', 'like', '%' . $this->matricula . '%'];
        }
        if ($this->situacao !== null) {
            $where[] = ['situacao', '==', $this->situacao];
        }
        if ($this->participantePgd !== null) {
            $where[] = ['participantePGD', '==', $this->participantePgd];
        }
        if ($this->programaNome !== null) {
            $where[] = ['programaNome', 'like', '%' . $this->programaNome . '%'];
        }
        if ($this->modalidadePgd !== null) {
            $where[] = ['modalidade_pgd', '==', $this->modalidadePgd];
        }
        if ($this->modalidadeSouGov !== null) {
            $where[] = ['modalidadeSouGov', '==', $this->modalidadeSouGov];
        }
        if ($this->comparacaoSouGovPetrvs !== null) {
            $where[] = ['comparacaoSouGovPetrvs', '==', $this->comparacaoSouGovPetrvs];
        }
        if ($this->tipoPedagio !== null) {
            $where[] = ['tipo_pedagio', '==', $this->tipoPedagio];
        }
        if ($this->dataInicialPedagio !== null) {
            $where[] = ['data_inicial_pedagio', '==', $this->dataInicialPedagio];
        }
        if ($this->dataFinalPedagio !== null) {
            $where[] = ['data_final_pedagio', '==', $this->dataFinalPedagio];
        }
        if ($this->dispensaPlanoTrabalho !== null) {
            $where[] = ['dispensa_plano_trabalho', '==', $this->dispensaPlanoTrabalho];
        }
        if ($this->dataInicioDispensaPt !== null) {
            $where[] = ['data_inicio_dispensa_pt', '==', $this->dataInicioDispensaPt];
        }
        if ($this->dataFimDispensaPt !== null) {
            $where[] = ['data_fim_dispensa_pt', '==', $this->dataFimDispensaPt];
        }
        if ($this->atribuicao !== null) {
            $where[] = ['atribuicao', '==', $this->atribuicao];
        }
        if ($this->planoEntregaEntregaId !== null) {
            $where[] = ['plano_entrega_entrega_id', '==', $this->planoEntregaEntregaId];
        }
        if ($this->somenteVigentes !== null) {
            $where[] = ['somente_vigentes', '==', $this->somenteVigentes ? 1 : 0];
        }

        return $where;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $filters = [];

        if ($this->unidadeId !== null) {
            $filters['unidade_id'] = $this->unidadeId;
        }
        if ($this->incluirUnidadesSubordinadas) {
            $filters['incluir_unidades_subordinadas'] = true;
        }
        if ($this->usuarioId !== null) {
            $filters['usuario_id'] = $this->usuarioId;
        }
        if ($this->nome !== null) {
            $filters['nome'] = $this->nome;
        }
        if ($this->unidadeHierarquia !== null) {
            $filters['unidadeHierarquia'] = $this->unidadeHierarquia;
        }
        if ($this->matricula !== null) {
            $filters['matricula'] = $this->matricula;
        }
        if ($this->situacao !== null) {
            $filters['situacao'] = $this->situacao;
        }
        if ($this->participantePgd !== null) {
            $filters['participantePGD'] = $this->participantePgd;
        }
        if ($this->programaNome !== null) {
            $filters['programaNome'] = $this->programaNome;
        }
        if ($this->modalidadePgd !== null) {
            $filters['modalidade_pgd'] = $this->modalidadePgd;
        }
        if ($this->modalidadeSouGov !== null) {
            $filters['modalidadeSouGov'] = $this->modalidadeSouGov;
        }
        if ($this->comparacaoSouGovPetrvs !== null) {
            $filters['comparacaoSouGovPetrvs'] = $this->comparacaoSouGovPetrvs;
        }
        if ($this->tipoPedagio !== null) {
            $filters['tipo_pedagio'] = $this->tipoPedagio;
        }
        if ($this->dataInicialPedagio !== null) {
            $filters['data_inicial_pedagio'] = $this->dataInicialPedagio;
        }
        if ($this->dataFinalPedagio !== null) {
            $filters['data_final_pedagio'] = $this->dataFinalPedagio;
        }
        if ($this->dispensaPlanoTrabalho !== null) {
            $filters['dispensa_plano_trabalho'] = $this->dispensaPlanoTrabalho;
        }
        if ($this->dataInicioDispensaPt !== null) {
            $filters['data_inicio_dispensa_pt'] = $this->dataInicioDispensaPt;
        }
        if ($this->dataFimDispensaPt !== null) {
            $filters['data_fim_dispensa_pt'] = $this->dataFimDispensaPt;
        }
        if ($this->atribuicao !== null) {
            $filters['atribuicao'] = $this->atribuicao;
        }
        if ($this->planoEntregaEntregaId !== null) {
            $filters['plano_entrega_entrega_id'] = $this->planoEntregaEntregaId;
        }
        if ($this->somenteVigentes !== null) {
            $filters['somente_vigentes'] = $this->somenteVigentes;
        }

        return $filters;
    }
}
