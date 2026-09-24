<?php

namespace App\Services\Siape\Unidade;

use App\Cache\GestorHierarquiaCache;
use App\Facades\SiapeLog;
use App\Models\SiapeBlacklistUnidade;
use App\Models\Unidade;
use App\Repository\SiapeBlacklistUnidadeRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\Erros;
use App\Services\CodigoOrgaoService;
use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;
use SimpleXMLElement;
use Throwable;

class SiapeUnidadeLifecycleService
{
    private const RESPONSE_AUSENTE_LISTA_UORGS = 'Unidade ausente em listaUorgs';

    public function __construct(
        private readonly ?Closure $confirmarAusencia = null
    ) {
    }

    /**
     * @param array<int, array<string, mixed>|object> $uorgsAtivas
     * @return array<string, int>
     */
    public function sincronizarBlacklistPelaListaUorgs(array $uorgsAtivas, ?string $codigoOrgao = null): array
    {
        $codigoOrgao = $this->codigoOrgao($codigoOrgao);
        $codigosAtivos = $this->normalizarCodigosListaUorgs($uorgsAtivas);
        $resultado = [
            'blacklists_criadas' => 0,
            'blacklists_mantidas' => 0,
            'pendencias_canceladas' => 0,
            'unidades_avaliadas' => 0,
        ];

        $unidades = $this->unidadeRepository()->findAllAtivasComCodigoByCodigoOrgao($codigoOrgao);

        foreach ($unidades as $unidade) {
            /** @var Unidade $unidade */
            $codigoNormalizado = $this->normalizarCodigo($unidade->codigo);

            if ($codigoNormalizado === null) {
                continue;
            }

            $resultado['unidades_avaliadas']++;

            if (isset($codigosAtivos[$codigoNormalizado])) {
                $cancelamento = $this->cancelarPendenciaPorCodigo((string) $unidade->codigo, $codigoOrgao);
                $resultado['pendencias_canceladas'] += $cancelamento['blacklists_removidas'] > 0
                    || $cancelamento['unidades_canceladas'] > 0
                    ? 1
                    : 0;
                continue;
            }

            $manutencao = $this->criarOuManterBlacklist((string) $unidade->codigo, $codigoOrgao);
            $resultado[$manutencao]++;
        }

        SiapeLog::info('Lifecycle SIAPE unidade: sincronizacao de blacklist pela listaUorgs concluida', $resultado);

        return $resultado;
    }

    /**
     * @return array<string, int>
     */
    public function cancelarPendenciaPorCodigo(string $codigo, ?string $codigoOrgao = null): array
    {
        $codigoOrgao = $this->codigoOrgao($codigoOrgao);
        $registros = $this->blacklistRepository()->findAllByCodigoOrgaoCodigo($codigoOrgao, $codigo);

        $blacklistsRemovidas = 0;
        foreach ($registros as $registro) {
            /** @var SiapeBlacklistUnidade $registro */
            if ($this->blacklistRepository()->delete($registro->id)) {
                $blacklistsRemovidas++;
            }
        }

        $unidadesCanceladas = $this->unidadeRepository()
            ->cancelarInicioInativacaoPorCodigoOrgaoCodigo($codigoOrgao, $codigo);

        if ($blacklistsRemovidas > 0 || $unidadesCanceladas > 0) {
            SiapeLog::info('Lifecycle SIAPE unidade: pendencia de inativacao cancelada', [
                'codigo' => $codigo,
                'codigo_orgao' => $codigoOrgao,
                'blacklists_removidas' => $blacklistsRemovidas,
                'unidades_canceladas' => $unidadesCanceladas,
            ]);
        }

        return [
            'blacklists_removidas' => $blacklistsRemovidas,
            'unidades_canceladas' => $unidadesCanceladas,
        ];
    }

    /**
     * @return array<string, int>
     */
    public function reativarUnidadeEncontradaNoSiape(string $codigo, ?string $codigoOrgao = null): array
    {
        $codigoOrgao = $this->codigoOrgao($codigoOrgao);
        $cancelamento = $this->cancelarPendenciaPorCodigo($codigo, $codigoOrgao);

        $unidadesReativadas = $this->unidadeRepository()
            ->reativarPorCodigoOrgaoCodigo($codigoOrgao, $codigo);

        if ($unidadesReativadas > 0) {
            SiapeLog::info('Lifecycle SIAPE unidade: unidade reativada por retorno em dadosUorg', [
                'codigo' => $codigo,
                'codigo_orgao' => $codigoOrgao,
                'unidades_reativadas' => $unidadesReativadas,
            ]);
        }

        return [
            'blacklists_removidas' => $cancelamento['blacklists_removidas'],
            'pendencias_canceladas' => $cancelamento['unidades_canceladas'],
            'unidades_reativadas' => $unidadesReativadas,
        ];
    }

    /**
     * @return array<string, int>
     */
    public function iniciarInativacoesComBlacklistVencida(): array
    {
        $codigoOrgao = $this->codigoOrgao();
        $prazoDias = $this->prazoDias();
        $dataLimite = now()->subDays($prazoDias);
        $resultado = [
            'unidades_iniciadas' => 0,
            'blacklists_avaliadas' => 0,
        ];

        $blacklists = $this->blacklistRepository()->findAllVencidasByCodigoOrgao($codigoOrgao, $dataLimite);

        foreach ($blacklists as $blacklist) {
            /** @var SiapeBlacklistUnidade $blacklist */
            $resultado['blacklists_avaliadas']++;

            $unidades = $this->unidadeRepository()
                ->findAllSemInicioInativacaoByCodigoOrgaoCodigo($blacklist->codigo_orgao, $blacklist->codigo);

            foreach ($unidades as $unidade) {
                /** @var Unidade $unidade */
                DB::transaction(function () use ($unidade, $blacklist): void {
                    $unidadeAtual = $this->unidadeRepository()->findByIdForUpdate($unidade->id);

                    if (!$unidadeAtual instanceof Unidade || $unidadeAtual->data_inicio_inativacao !== null || $unidadeAtual->data_inativacao !== null) {
                        return;
                    }

                    $this->unidadeRepository()->iniciarInativacao($unidadeAtual->id);

                    $this->blacklistRepository()->update($blacklist->id, [
                        'inativado' => 1,
                        'updated_at' => now(),
                    ]);
                });

                $resultado['unidades_iniciadas']++;
            }
        }

        SiapeLog::info('Lifecycle SIAPE unidade: inicio de inativacao concluido', $resultado);

        return $resultado;
    }

    /**
     * @return array<string, int>
     */
    public function efetivarInativacoesPendentes(): array
    {
        $codigoOrgao = $this->codigoOrgao();
        $prazoDias = $this->prazoDias();
        $dataLimite = now()->subDays($prazoDias);
        $resultado = [
            'unidades_avaliadas' => 0,
            'unidades_inativadas' => 0,
            'confirmacoes_presentes' => 0,
            'confirmacoes_falhas' => 0,
            'integrantes_afetados' => 0,
            'atribuicoes_removidas' => 0,
        ];

        $unidades = $this->unidadeRepository()
            ->findAllPendentesInativacaoByCodigoOrgaoAte($codigoOrgao, $dataLimite);

        foreach ($unidades as $unidade) {
            /** @var Unidade $unidade */
            $resultado['unidades_avaliadas']++;

            try {
                $ausente = $this->confirmarAusenciaEmDadosUorg((string) $unidade->codigo);
            } catch (Throwable $e) {
                $resultado['confirmacoes_falhas']++;
                SiapeLog::warning('Lifecycle SIAPE unidade: confirmacao dadosUorg falhou, unidade preservada', [
                    'unidade_id' => $unidade->id,
                    'codigo' => $unidade->codigo,
                    'erro' => $e->getMessage(),
                ]);
                continue;
            }

            if (!$ausente) {
                $resultado['confirmacoes_presentes']++;
                SiapeLog::info('Lifecycle SIAPE unidade: dadosUorg indica unidade presente, inativacao ignorada', [
                    'unidade_id' => $unidade->id,
                    'codigo' => $unidade->codigo,
                ]);
                continue;
            }

            $inativacao = DB::transaction(function () use ($unidade, $dataLimite): array {
                $unidadeAtual = $this->unidadeRepository()->findByIdForUpdate($unidade->id);

                if (
                    !$unidadeAtual instanceof Unidade
                    || $unidadeAtual->data_inativacao !== null
                    || $unidadeAtual->data_inicio_inativacao === null
                    || $unidadeAtual->data_inicio_inativacao > $dataLimite
                ) {
                    return [
                        'inativada' => 0,
                        'integrantes_afetados' => 0,
                        'atribuicoes_removidas' => 0,
                    ];
                }

                $integrantesAfetados = $this->contarIntegrantesAtivosDaUnidade($unidadeAtual);

                if (!$this->unidadeRepository()->efetivarInativacao($unidadeAtual->id)) {
                    return [
                        'inativada' => 0,
                        'integrantes_afetados' => 0,
                        'atribuicoes_removidas' => 0,
                    ];
                }

                return [
                    'inativada' => 1,
                    'integrantes_afetados' => $integrantesAfetados,
                    'atribuicoes_removidas' => $this->removerAtribuicoesDaUnidade($unidadeAtual),
                ];
            });

            if ($inativacao['inativada'] === 0) {
                continue;
            }

            $resultado['unidades_inativadas']++;
            $resultado['integrantes_afetados'] += $inativacao['integrantes_afetados'];
            $resultado['atribuicoes_removidas'] += $inativacao['atribuicoes_removidas'];

            SiapeLog::info('Lifecycle SIAPE unidade: unidade inativada apos confirmacao dadosUorg', [
                'unidade_id' => $unidade->id,
                'codigo' => $unidade->codigo,
                'integrantes_afetados' => $inativacao['integrantes_afetados'],
                'atribuicoes_removidas' => $inativacao['atribuicoes_removidas'],
            ]);
        }

        if ($resultado['atribuicoes_removidas'] > 0) {
            GestorHierarquiaCache::invalidarTudo();
        }

        return $resultado;
    }

    public function dadosUorgConfirmaAusencia(string $codigo, string $response): bool
    {
        if (trim($response) === '') {
            throw new RuntimeException("Resposta vazia em dadosUorg para a unidade {$codigo}");
        }

        $responseXml = $this->parseXml($response);
        $fault = $responseXml->xpath('//*[local-name()="Fault"]');

        if ($fault && isset($fault[0])) {
            $faultCode = isset($fault[0]->faultcode) ? trim((string) $fault[0]->faultcode) : '';
            $faultString = isset($fault[0]->faultstring) ? trim((string) $fault[0]->faultstring) : '';
            $decodedFaultString = html_entity_decode($faultString, ENT_QUOTES | ENT_HTML5, 'UTF-8');

            return $faultCode === Erros::faultcode
                && (
                    in_array($faultString, Erros::getFaultStringNaoExistemDados(), true)
                    || in_array($decodedFaultString, Erros::getFaultStringNaoExistemDados(), true)
                );
        }

        $dadosUorgResponse = $responseXml->xpath('//*[local-name()="dadosUorgResponse"]');

        if (empty($dadosUorgResponse)) {
            throw new RuntimeException("Resposta ambigua em dadosUorg para a unidade {$codigo}");
        }

        $out = $responseXml->xpath('//*[local-name()="dadosUorgResponse"]/*[local-name()="out"]');

        return empty($out);
    }

    protected function removerAtribuicoesDaUnidade(Unidade $unidade): int
    {
        $integranteIds = $this->unidadeIntegranteRepository()->findIdsAtivosByUnidade((string) $unidade->id);

        if ($integranteIds === []) {
            return 0;
        }

        return $this->unidadeIntegranteAtribuicaoRepository()
            ->deleteAtivasByUnidadeIntegranteIds($integranteIds);
    }

    protected function contarIntegrantesAtivosDaUnidade(Unidade $unidade): int
    {
        return $this->unidadeIntegranteRepository()->countAtivosByUnidade((string) $unidade->id);
    }

    protected function confirmarAusenciaEmDadosUorg(string $codigo): bool
    {
        if ($this->confirmarAusencia instanceof Closure) {
            return (bool) ($this->confirmarAusencia)($codigo);
        }

        $config = config('integracao.siape');
        $buscarDadosUnidade = new BuscarDadosSiapeUnidade($config);
        $codOrgao = strval(intval((string) ($config['codOrgao'] ?? '')));

        $xml = $buscarDadosUnidade->getUorgAsXml(
            (string) ($config['siglaSistema'] ?? ''),
            (string) ($config['nomeSistema'] ?? ''),
            (string) ($config['senha'] ?? ''),
            $buscarDadosUnidade->getCpf(),
            $codOrgao,
            $codigo
        );

        $response = $buscarDadosUnidade->executaRequisicao($xml);

        if (!is_string($response)) {
            throw new RuntimeException("Resposta invalida em dadosUorg para a unidade {$codigo}");
        }

        return $this->dadosUorgConfirmaAusencia($codigo, $response);
    }

    /**
     * @param array<int, array<string, mixed>|object> $uorgsAtivas
     * @return array<string, true>
     */
    private function normalizarCodigosListaUorgs(array $uorgsAtivas): array
    {
        $codigos = [];

        foreach ($uorgsAtivas as $uorg) {
            $codigo = is_array($uorg)
                ? ($uorg['codigo'] ?? null)
                : ($uorg->codigo ?? null);
            $codigoNormalizado = $this->normalizarCodigo($codigo);

            if ($codigoNormalizado !== null) {
                $codigos[$codigoNormalizado] = true;
            }
        }

        return $codigos;
    }

    private function normalizarCodigo(mixed $codigo): ?string
    {
        if ($codigo === null) {
            return null;
        }

        $codigo = trim((string) $codigo);

        if ($codigo === '') {
            return null;
        }

        if (ctype_digit($codigo)) {
            return ltrim($codigo, '0') ?: '0';
        }

        return $codigo;
    }

    private function criarOuManterBlacklist(string $codigo, string $codigoOrgao): string
    {
        $response = self::RESPONSE_AUSENTE_LISTA_UORGS . ' em ' . now()->toDateTimeString();
        $blacklistAtiva = $this->blacklistRepository()->findActiveByCodigoOrgaoCodigo($codigoOrgao, $codigo);

        if ($blacklistAtiva instanceof SiapeBlacklistUnidade) {
            $this->blacklistRepository()->update($blacklistAtiva->id, [
                'response' => $response,
                'updated_at' => now(),
            ]);

            return 'blacklists_mantidas';
        }

        $blacklistRemovida = $this->blacklistRepository()
            ->findLatestTrashedByCodigoOrgaoCodigo($codigoOrgao, $codigo);

        if ($blacklistRemovida instanceof SiapeBlacklistUnidade) {
            $this->blacklistRepository()->restoreAsNovaPendencia($blacklistRemovida, $response);

            return 'blacklists_criadas';
        }

        $this->blacklistRepository()->create([
            'id' => (string) Str::uuid(),
            'codigo_orgao' => $codigoOrgao,
            'codigo' => $codigo,
            'response' => $response,
            'inativado' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return 'blacklists_criadas';
    }

    private function parseXml(string $response): SimpleXMLElement
    {
        $response = trim($response);
        $response = preg_replace('/&(?!amp;|lt;|gt;|quot;|apos;)/', '&amp;', $response) ?? $response;
        $response = preg_replace('/[^\P{C}\t\n\r]/u', '', $response) ?? $response;
        $response = preg_replace('/xmlns=""/', '', $response) ?? $response;

        libxml_use_internal_errors(true);
        $xml = simplexml_load_string($response, SimpleXMLElement::class, LIBXML_NOCDATA);

        if (!$xml instanceof SimpleXMLElement) {
            $errors = array_map(
                static fn ($error): string => trim($error->message),
                libxml_get_errors()
            );
            libxml_clear_errors();

            throw new RuntimeException('XML invalido em dadosUorg: ' . implode('; ', $errors));
        }

        return $xml;
    }

    private function prazoDias(): int
    {
        return max(1, (int) config('integracao.siape.inativacao_unidade_prazo_dias', 7));
    }

    private function codigoOrgao(?string $codigoOrgao = null): string
    {
        return CodigoOrgaoService::obrigatorio(
            $codigoOrgao ?? config('integracao.siape.codOrgao'),
            'O Código do Órgão é obrigatório para processar o lifecycle de unidades SIAPE.'
        );
    }

    private function unidadeRepository(): UnidadeRepository
    {
        return app(UnidadeRepository::class);
    }

    private function blacklistRepository(): SiapeBlacklistUnidadeRepository
    {
        return app(SiapeBlacklistUnidadeRepository::class);
    }

    private function unidadeIntegranteRepository(): UnidadeIntegranteRepository
    {
        return app(UnidadeIntegranteRepository::class);
    }

    private function unidadeIntegranteAtribuicaoRepository(): UnidadeIntegranteAtribuicaoRepository
    {
        return app(UnidadeIntegranteAtribuicaoRepository::class);
    }
}
