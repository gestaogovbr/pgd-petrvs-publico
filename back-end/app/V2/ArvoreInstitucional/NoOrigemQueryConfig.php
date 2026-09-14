<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

/**
 * Configuração declarativa que descreve a estrutura de um nó da árvore institucional.
 *
 * Contém apenas metadados estruturais (tabelas, colunas, FKs) — fixos por domínio.
 * Os parâmetros de consulta (IDs de nós, ID de container) são passados diretamente
 * aos métodos do DataProvider.
 */
final class NoOrigemQueryConfig
{
    /**
     * @param string $tabelaVinculo Tabela pivot entre nó e entrega (ex: planos_entregas_entregas_processos)
     * @param string $colunaFkNo Coluna FK na tabela de vínculo que aponta para o nó (ex: cadeia_processo_id)
     * @param string $tabelaNo Tabela do nó (ex: cadeias_valores_processos)
     * @param string $colunaPaiId Coluna de parentesco primário no nó (ex: processo_pai_id)
     * @param string|null $colunaPaiSecundarioId Coluna de parentesco secundário (ex: objetivo_superior_id) ou null
     * @param string|null $containerTabela Tabela do container (ex: cadeias_valores) — JOIN por FK no nó
     * @param string|null $containerFk FK no nó que aponta para o container (ex: cadeia_valor_id)
     * @param string|null $tipoTabela Tabela de tipo/classificação (ex: cadeias_valores_tipos_elementos)
     * @param string|null $tipoFk FK no nó que aponta para o tipo (ex: tipo_elemento_id)
     * @param string $orderBy Coluna de ordenação dos nós no grafo (ex: sequencia, nome)
     */
    public function __construct(
        public readonly string $tabelaVinculo,
        public readonly string $colunaFkNo,
        public readonly string $tabelaNo,
        public readonly string $colunaPaiId,
        public readonly ?string $colunaPaiSecundarioId = null,
        public readonly ?string $containerTabela = null,
        public readonly ?string $containerFk = null,
        public readonly ?string $tipoTabela = null,
        public readonly ?string $tipoFk = null,
        public readonly string $orderBy = 'no_tbl.nome',
    ) {}
}
