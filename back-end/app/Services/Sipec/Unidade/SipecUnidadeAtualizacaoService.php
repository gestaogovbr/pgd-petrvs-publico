<?php

declare(strict_types=1);

namespace App\Services\Sipec\Unidade;

use App\Facades\SiapeLog;
use App\Models\IntegracaoUnidade;
use App\Models\Unidade;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\UnidadeRepository;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;

/**
 * Compara integracao_unidades com unidades e sincroniza:
 * inserts, updates de hierarquia, updates de dados, ativação.
 * Processa por nível de profundidade para garantir consistência de path.
 */
class SipecUnidadeAtualizacaoService
{
    private const TRANSACTION_RETRIES = 3;

    /** @var array<string, Unidade> codigo → Unidade */
    private array $mapaUnidades = [];

    /** @var array<string, string> id → codigo */
    private array $mapaIdParaCodigo = [];

    /** @var array<string, string> codigo_ibge → cidade_id */
    private array $mapaCidades = [];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly IntegracaoUnidadeRepository $integracaoUnidadeRepository,
    ) {
    }

    /**
     * @return array{inseridas: int, atualizadas_hierarquia: int, atualizadas_dados: int, ativadas: int, erros: int}
     */
    public function processar(): array
    {
        $resultado = [
            'inseridas' => 0,
            'atualizadas_hierarquia' => 0,
            'atualizadas_dados' => 0,
            'ativadas' => 0,
            'erros' => 0,
        ];

        $this->carregarMapas();
        $this->garantirUnidadeRaiz();
        $syncResult = $this->sincronizarUnidades();
        $resultado['inseridas'] = $syncResult['inseridas'];
        $resultado['atualizadas_hierarquia'] = $syncResult['atualizadas_hierarquia'];
        $resultado['atualizadas_dados'] = $syncResult['atualizadas_dados'];
        $resultado['erros'] = $syncResult['erros'];
        $resultado['ativadas'] = $this->ativarUnidades();

        SiapeLog::info('SIPEC Unidade Atualização: processamento concluído', $resultado);

        return $resultado;
    }

    private function carregarMapas(): void
    {
        $unidades = $this->unidadeRepository->findAllComCodigo();

        $this->mapaUnidades = $unidades->keyBy('codigo')->all();
        $this->mapaIdParaCodigo = $unidades->pluck('codigo', 'id')->all();

        $this->mapaCidades = DB::table('cidades')
            ->whereNotNull('codigo_ibge')
            ->pluck('id', 'codigo_ibge')
            ->all();
    }

    private function garantirUnidadeRaiz(): void
    {
        $codigoRaiz = (string) (config('integracao.sipec.codUorg') ?: config('integracao.codigoUnidadeRaiz'));

        if (empty($codigoRaiz)) {
            SiapeLog::info('SIPEC: código da unidade raiz não configurado');
            return;
        }

        $integracaoRaiz = $this->integracaoUnidadeRepository->findByCodigo($codigoRaiz);

        if (!$integracaoRaiz) {
            SiapeLog::info('SIPEC: unidade raiz não encontrada em integracao_unidades', [
                'codigo' => $codigoRaiz,
            ]);
            return;
        }

        $unidadeRaiz = $this->unidadeRepository->findBySigla($integracaoRaiz->siglauorg);

        if (!$unidadeRaiz) {
            SiapeLog::info('SIPEC: unidade raiz não encontrada na tabela unidades', [
                'sigla' => $integracaoRaiz->siglauorg,
            ]);
            return;
        }

        if ($unidadeRaiz->codigo !== $integracaoRaiz->id_servo) {
            $this->unidadeRepository->update($unidadeRaiz->id, [
                'codigo' => $integracaoRaiz->id_servo,
            ]);
            SiapeLog::info('SIPEC: código da unidade raiz corrigido', [
                'de' => $unidadeRaiz->codigo,
                'para' => $integracaoRaiz->id_servo,
            ]);

            if (!empty($unidadeRaiz->codigo)) {
                unset($this->mapaUnidades[$unidadeRaiz->codigo]);
            }
            $unidadeRaiz->codigo = $integracaoRaiz->id_servo;
            $this->mapaUnidades[$integracaoRaiz->id_servo] = $unidadeRaiz;
            $this->mapaIdParaCodigo[$unidadeRaiz->id] = $integracaoRaiz->id_servo;
        }
    }

    /**
     * @return array{inseridas: int, atualizadas_hierarquia: int, atualizadas_dados: int, erros: int}
     */
    private function sincronizarUnidades(): array
    {
        $contadores = ['inseridas' => 0, 'atualizadas_hierarquia' => 0, 'atualizadas_dados' => 0, 'erros' => 0];

        $unidadesIntegracao = $this->integracaoUnidadeRepository->findAllAtivas();

        if ($unidadesIntegracao->isEmpty()) {
            return $contadores;
        }

        $codigoRaiz = (string) (config('integracao.sipec.codUorg') ?: config('integracao.codigoUnidadeRaiz'));
        $arvore = new ArvoreUnidadeBuilder($unidadesIntegracao->all(), $codigoRaiz);
        $niveis = $arvore->getNiveisPorProfundidade();

        foreach ($niveis as $nivel => $unidades) {
            $errosNoNivel = 0;

            DB::beginTransaction();
            try {
                foreach ($unidades as $integracao) {
                    try {
                        $resultado = $this->sincronizarUnidade($integracao);
                        if ($resultado !== null) {
                            $contadores[$resultado]++;
                        }
                    } catch (\Throwable $e) {
                        $errosNoNivel++;
                        $contadores['erros']++;
                        report($e);
                        SiapeLog::error('SIPEC: falha ao sincronizar unidade', [
                            'codigo' => $integracao->id_servo ?? null,
                            'erro' => $e->getMessage(),
                        ]);
                    }
                }

                if ($errosNoNivel > 0) {
                    DB::rollBack();
                    SiapeLog::error('SIPEC: nível de hierarquia com erros, rollback e interrompendo', [
                        'nivel' => $nivel,
                        'erros_no_nivel' => $errosNoNivel,
                    ]);
                    break;
                }

                DB::commit();
            } catch (\Throwable $e) {
                DB::rollBack();
                SiapeLog::error('SIPEC: erro inesperado no nível, interrompendo sincronização', [
                    'nivel' => $nivel,
                    'erro' => $e->getMessage(),
                ]);
                $contadores['erros']++;
                break;
            }
        }

        return $contadores;
    }

    /**
     * @return 'inseridas'|'atualizadas_hierarquia'|'atualizadas_dados'|null
     */
    private function sincronizarUnidade(IntegracaoUnidade $integracao): ?string
    {
        $codigo = $integracao->id_servo;
        $unidadeExistente = $this->mapaUnidades[$codigo] ?? null;

        if (!$unidadeExistente) {
            return $this->inserirUnidade($integracao);
        }

        return $this->atualizarUnidade($integracao, $unidadeExistente);
    }

    private function inserirUnidade(IntegracaoUnidade $integracao): string
    {
        $pai = $this->resolverPai($integracao->pai_servo);
        $path = $pai ? $this->calcularPath($pai) : '';
        $cidadeId = $this->resolverCidade($integracao->municipio_ibge);
        $entidadeId = $pai?->entidade_id ?? $this->getEntidadeIdRaiz();

        $novaUnidade = $this->unidadeRepository->create([
            'codigo' => $integracao->id_servo,
            'nome' => $integracao->nomeuorg,
            'sigla' => $integracao->siglauorg ? mb_strtoupper(trim($integracao->siglauorg), 'UTF-8') : null,
            'path' => $path,
            'unidade_pai_id' => $pai?->id,
            'cidade_id' => $cidadeId,
            'entidade_id' => $entidadeId,
            'data_modificacao' => UtilService::asDateTime($integracao->data_modificacao),
            'notificacoes' => '{}',
            'etiquetas' => '[]',
            'atividades_arquivamento_automatico' => 0,
            'atividades_avaliacao_automatico' => 0,
            'planos_prazo_comparecimento' => 10,
            'planos_tipo_prazo_comparecimento' => 'DIAS',
            'distribuicao_forma_contagem_prazos' => 'HORAS_UTEIS',
            'autoedicao_subordinadas' => 1,
            'checklist' => '[]',
        ]);

        $this->mapaUnidades[$integracao->id_servo] = $novaUnidade;
        $this->mapaIdParaCodigo[$novaUnidade->id] = $integracao->id_servo;

        return 'inseridas';
    }

    /**
     * @return 'atualizadas_hierarquia'|'atualizadas_dados'|null
     */
    private function atualizarUnidade(IntegracaoUnidade $integracao, Unidade $unidade): ?string
    {
        $paiAtualCodigo = $this->getCodigoPaiAtual($unidade);
        $cidadeId = $this->resolverCidade($integracao->municipio_ibge);
        $sigla = $integracao->siglauorg ? mb_strtoupper(trim($integracao->siglauorg), 'UTF-8') : null;

        $paiMudou = $integracao->pai_servo !== $paiAtualCodigo;
        $dadosMudaram = $integracao->nomeuorg !== $unidade->nome
            || $sigla !== $unidade->sigla
            || $cidadeId !== $unidade->cidade_id;

        if (!$paiMudou && !$dadosMudaram) {
            return null;
        }

        $dados = [
            'nome' => $integracao->nomeuorg,
            'sigla' => $sigla,
            'cidade_id' => $cidadeId,
            'data_modificacao' => UtilService::asDateTime($integracao->data_modificacao),
            'updated_at' => now(),
        ];

        if ($paiMudou) {
            $novoPai = $this->resolverPai($integracao->pai_servo);
            $novoPath = $novoPai ? $this->calcularPath($novoPai) : '';

            $dados['unidade_pai_id'] = $novoPai?->id;
            $dados['path'] = $novoPath;

            $this->unidadeRepository->update($unidade->id, $dados);
            $this->recalcularPathsFilhos($unidade, $novoPath);

            $unidade->path = $novoPath;
            $unidade->unidade_pai_id = $novoPai?->id;

            return 'atualizadas_hierarquia';
        }

        $this->unidadeRepository->update($unidade->id, $dados);
        return 'atualizadas_dados';
    }

    private function recalcularPathsFilhos(Unidade $unidade, string $novoPathPai): void
    {
        $pathAntigo = $unidade->path . '/' . $unidade->id;
        $pathNovo = $novoPathPai . '/' . $unidade->id;

        if ($pathAntigo === $pathNovo) {
            return;
        }

        $this->unidadeRepository->recalcularPaths($pathAntigo, $pathNovo);
    }

    private function ativarUnidades(): int
    {
        return $this->unidadeRepository->reativarPorIntegracao();
    }

    private function resolverPai(?string $codigoPai): ?Unidade
    {
        if (empty($codigoPai)) {
            return null;
        }

        return $this->mapaUnidades[$codigoPai] ?? null;
    }

    private function calcularPath(Unidade $pai): string
    {
        $path = $pai->path ? $pai->path . '/' . $pai->id : $pai->id;

        return trim(preg_replace('#/+#', '/', $path), '/');
    }

    private function resolverCidade(?string $codigoIbge): ?string
    {
        if (empty($codigoIbge)) {
            return null;
        }

        return $this->mapaCidades[$codigoIbge] ?? null;
    }

    private function getCodigoPaiAtual(Unidade $unidade): ?string
    {
        if (empty($unidade->unidade_pai_id)) {
            return null;
        }

        return $this->mapaIdParaCodigo[$unidade->unidade_pai_id] ?? null;
    }

    private function getEntidadeIdRaiz(): ?string
    {
        // Busca entidade_id da raiz no mapa (unidade sem pai)
        foreach ($this->mapaUnidades as $unidade) {
            if (empty($unidade->unidade_pai_id)) {
                return $unidade->entidade_id;
            }
        }
        return null;
    }
}
