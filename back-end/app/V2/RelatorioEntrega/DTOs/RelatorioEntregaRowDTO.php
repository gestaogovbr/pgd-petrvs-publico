<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\DTOs;

use App\V2\RelatorioEntrega\Support\RelatorioEntregaMetaHelper;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaSituacaoHelper;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaTipoMetaHelper;

final class RelatorioEntregaRowDTO implements \JsonSerializable
{
    public function __construct(
        public readonly string $id,
        public readonly string $unidade_id,
        public readonly string $unidadeHierarquia,
        public readonly string $demandanteHierarquia,
        public readonly string $destinatario,
        public readonly string $entregaNome,
        public readonly ?string $data_inicio,
        public readonly ?string $data_fim,
        public readonly float $meta_planejado,
        public readonly float $meta_alcancado,
        public readonly string $meta_tipo,
        public readonly float $meta_percentual,
        public readonly int $qtd_planejamento_institucional,
        public readonly int $qtd_cadeia_valor,
        public readonly int $qtd_outras_entregas,
        public readonly string $situacao,
        public readonly string $plano_id,
        public readonly string $plano_numero,
        public readonly string $plano_nome,
        public readonly string $plano_rotulo,
        public readonly string $plano_status,
        public readonly int $qtd_participantes,
        public readonly int $qtd_planos_trabalho,
    ) {}

    public static function fromQueryRow(object $row, ?string $dataConsulta = null): self
    {
        $tipoIndicador = $row->tipo_indicador ?? null;
        $temRegistroExecucao = ((int) ($row->qtd_registros_execucao ?? 0)) > 0;
        $metaPlanejado = (float) ($row->meta_planejado ?? RelatorioEntregaMetaHelper::valorAbsolutoRegistroExecucao(
            $row->progresso_meta ?? null,
            $tipoIndicador,
            $temRegistroExecucao,
        ));
        $metaAlcancado = (float) ($row->meta_alcancado ?? RelatorioEntregaMetaHelper::valorAbsolutoRegistroExecucao(
            $row->progresso_realizado ?? null,
            $tipoIndicador,
            $temRegistroExecucao,
        ));
        $consulta = $dataConsulta ?? now()->toDateString();

        return new self(
            id: (string) ($row->id ?? ''),
            unidade_id: (string) ($row->plano_unidade_id ?? $row->unidade_id ?? ''),
            unidadeHierarquia: (string) ($row->unidade_hierarquia ?? ''),
            demandanteHierarquia: (string) ($row->demandante_hierarquia ?? ''),
            destinatario: (string) ($row->destinatario ?? ''),
            entregaNome: (string) ($row->entrega_nome ?? ''),
            data_inicio: self::nullableString($row->data_inicio ?? null),
            data_fim: self::nullableString($row->data_fim ?? null),
            meta_planejado: $metaPlanejado,
            meta_alcancado: $metaAlcancado,
            meta_tipo: RelatorioEntregaTipoMetaHelper::label(is_string($tipoIndicador) ? $tipoIndicador : null),
            meta_percentual: (float) ($row->meta_percentual ?? RelatorioEntregaMetaHelper::valorPercentualAlcance(
                $metaPlanejado,
                $metaAlcancado,
            )),
            qtd_planejamento_institucional: (int) ($row->qtd_planejamento_institucional ?? 0),
            qtd_cadeia_valor: (int) ($row->qtd_cadeia_valor ?? 0),
            qtd_outras_entregas: (int) ($row->qtd_outras_entregas ?? 0),
            situacao: RelatorioEntregaSituacaoHelper::calcular(
                self::nullableString($row->data_inicio ?? null),
                self::nullableString($row->data_fim ?? null),
                $consulta,
            ),
            plano_id: (string) ($row->plano_id ?? ''),
            plano_numero: (string) ($row->plano_numero ?? ''),
            plano_nome: (string) ($row->plano_nome ?? ''),
            plano_rotulo: self::formatPlanoRotulo(
                (string) ($row->plano_nome ?? ''),
                $row->plano_data_inicio ?? null,
                $row->plano_data_fim ?? null,
            ),
            plano_status: (string) ($row->plano_status ?? ''),
            qtd_participantes: (int) ($row->qtd_participantes ?? 0),
            qtd_planos_trabalho: (int) ($row->qtd_planos_trabalho ?? 0),
        );
    }

    /** @return array<string, mixed> */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'unidade_id' => $this->unidade_id,
            'unidadeHierarquia' => $this->unidadeHierarquia,
            'demandanteHierarquia' => $this->demandanteHierarquia,
            'destinatario' => $this->destinatario,
            'entregaNome' => $this->entregaNome,
            'data_inicio' => $this->data_inicio,
            'data_fim' => $this->data_fim,
            'meta_planejado' => $this->meta_planejado,
            'meta_alcancado' => $this->meta_alcancado,
            'meta_tipo' => $this->meta_tipo,
            'meta_percentual' => $this->meta_percentual,
            'qtd_planejamento_institucional' => $this->qtd_planejamento_institucional,
            'qtd_cadeia_valor' => $this->qtd_cadeia_valor,
            'qtd_outras_entregas' => $this->qtd_outras_entregas,
            'situacao' => $this->situacao,
            'plano_id' => $this->plano_id,
            'plano_numero' => $this->plano_numero,
            'plano_nome' => $this->plano_nome,
            'plano_rotulo' => $this->plano_rotulo,
            'plano_status' => $this->plano_status,
            'qtd_participantes' => $this->qtd_participantes,
            'qtd_planos_trabalho' => $this->qtd_planos_trabalho,
        ];
    }

    private static function formatPlanoRotulo(string $nome, mixed $dataInicio, mixed $dataFim): string
    {
        $nome = trim($nome);
        $inicio = self::formatDateBr($dataInicio);
        $fim = self::formatDateBr($dataFim);

        if ($nome === '') {
            return '-';
        }

        if ($inicio === '' && $fim === '') {
            return $nome;
        }

        if ($fim === '' || $fim === $inicio) {
            return "{$nome} - {$inicio}";
        }

        return "{$nome} - {$inicio} - {$fim}";
    }

    private static function formatDateBr(mixed $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        $timestamp = strtotime((string) $value);

        return $timestamp !== false ? date('d/m/Y', $timestamp) : '';
    }

    private static function nullableString(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (string) $value;
    }
}
