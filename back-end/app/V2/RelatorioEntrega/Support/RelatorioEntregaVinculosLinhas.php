<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

/**
 * Distribui os vínculos de Planejamento Institucional e Cadeia de Valor em linhas.
 *
 * A quantidade de linhas é a maior entre as duas listas. A coluna mais curta
 * repete "Idem" depois do último item, indicando que o vínculo já apresentado se mantém.
 * Coluna sem nenhum vínculo permanece com o marcador de ausência em todas as linhas.
 */
final class RelatorioEntregaVinculosLinhas
{
    public const IDEM = 'Idem';

    public const SEM_VINCULO = '-';

    public const LINHA_INICIAL = 1;

    private const LINHAS_MINIMAS = 1;

    /**
     * @param list<string> $planejamentos
     * @param list<string> $cadeias
     * @return list<array{planejamento_institucional: string, cadeia_valor: string}>
     */
    public static function montar(array $planejamentos, array $cadeias): array
    {
        $planejamentos = self::normalizar($planejamentos);
        $cadeias = self::normalizar($cadeias);
        $quantidade = max(count($planejamentos), count($cadeias), self::LINHAS_MINIMAS);

        $linhas = [];
        for ($indice = 0; $indice < $quantidade; $indice++) {
            $linhas[] = [
                'planejamento_institucional' => self::celula($planejamentos, $indice),
                'cadeia_valor' => self::celula($cadeias, $indice),
            ];
        }

        return $linhas;
    }

    /**
     * @param list<string> $itens
     */
    private static function celula(array $itens, int $indice): string
    {
        if (isset($itens[$indice])) {
            return $itens[$indice];
        }

        if ($itens === []) {
            return self::SEM_VINCULO;
        }

        return self::IDEM;
    }

    /**
     * @param list<string> $itens
     * @return list<string>
     */
    private static function normalizar(array $itens): array
    {
        $nomes = [];
        foreach ($itens as $item) {
            $nome = trim($item);
            if ($nome !== '') {
                $nomes[] = $nome;
            }
        }

        return $nomes;
    }
}
