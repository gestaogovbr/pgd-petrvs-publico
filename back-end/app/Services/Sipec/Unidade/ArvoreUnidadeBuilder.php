<?php

declare(strict_types=1);

namespace App\Services\Sipec\Unidade;

use App\Facades\SiapeLog;

/**
 * Constrói árvore de unidades a partir de uma lista flat (codigo → pai)
 * e retorna agrupada por nível de profundidade via BFS.
 */
class ArvoreUnidadeBuilder
{
    /** @var array<string, array{dados: object, filhos: string[]}> */
    private array $nos = [];

    private ?string $codigoRaiz = null;

    /**
     * @param array<int, object> $unidades Lista de objetos com ao menos `id_servo` e `pai_servo`
     * @param string|null $codigoRaizConfig Código da UORG raiz configurada (config integracao)
     */
    public function __construct(array $unidades, ?string $codigoRaizConfig = null)
    {
        $this->construirMapa($unidades);
        $this->codigoRaiz = $this->identificarRaiz($codigoRaizConfig);
    }

    /**
     * Retorna unidades agrupadas por nível de profundidade.
     * Nível 0 = raiz, Nível 1 = filhos da raiz, etc.
     *
     * @return array<int, object[]> Mapa nível → lista de objetos
     */
    public function getNiveisPorProfundidade(): array
    {
        if ($this->codigoRaiz === null) {
            SiapeLog::warning('SIPEC: não foi possível identificar raiz da árvore de unidades');
            return [];
        }

        $niveis = [];
        $visitados = [];
        $fila = [[$this->codigoRaiz, 0]];

        while (!empty($fila)) {
            [$codigo, $nivel] = array_shift($fila);

            if (isset($visitados[$codigo])) {
                continue;
            }
            $visitados[$codigo] = true;

            if (isset($this->nos[$codigo])) {
                $niveis[$nivel][] = $this->nos[$codigo]['dados'];

                foreach ($this->nos[$codigo]['filhos'] as $codigoFilho) {
                    if (!isset($visitados[$codigoFilho])) {
                        $fila[] = [$codigoFilho, $nivel + 1];
                    }
                }
            }
        }

        $orfaos = $this->detectarOrfaos($visitados);
        if (!empty($orfaos)) {
            SiapeLog::warning('SIPEC: unidades órfãs detectadas (não alcançáveis pela raiz)', [
                'total' => count($orfaos),
                'codigos' => array_slice($orfaos, 0, 20),
            ]);
        }

        ksort($niveis);
        return $niveis;
    }

    /**
     * @return string[] Códigos de unidades não alcançáveis pela raiz
     */
    public function getOrfaos(): array
    {
        $niveis = $this->getNiveisPorProfundidade();
        $visitados = [];
        foreach ($niveis as $unidades) {
            foreach ($unidades as $unidade) {
                $visitados[$unidade->id_servo] = true;
            }
        }
        return $this->detectarOrfaos($visitados);
    }

    private function construirMapa(array $unidades): void
    {
        foreach ($unidades as $unidade) {
            $codigo = (string) ($unidade->id_servo ?? '');
            if ($codigo === '') {
                continue;
            }

            $this->nos[$codigo] = [
                'dados' => $unidade,
                'filhos' => [],
            ];
        }

        foreach ($this->nos as $codigo => $no) {
            $codigoPai = (string) ($no['dados']->pai_servo ?? '');
            if ($codigoPai !== '' && isset($this->nos[$codigoPai])) {
                $this->nos[$codigoPai]['filhos'][] = (string) $codigo;
            }
        }
    }

    private function identificarRaiz(?string $codigoRaizConfig): ?string
    {
        if ($codigoRaizConfig !== null && isset($this->nos[$codigoRaizConfig])) {
            return $codigoRaizConfig;
        }

        return null;
    }

    /**
     * @param array<string, true> $visitados
     * @return string[]
     */
    private function detectarOrfaos(array $visitados): array
    {
        $orfaos = [];
        foreach ($this->nos as $codigo => $_) {
            if (!isset($visitados[(string) $codigo])) {
                $orfaos[] = (string) $codigo;
            }
        }
        return $orfaos;
    }
}
