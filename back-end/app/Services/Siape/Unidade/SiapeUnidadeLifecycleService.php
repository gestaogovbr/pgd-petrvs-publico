<?php

namespace App\Services\Siape\Unidade;

use App\Facades\SiapeLog;
use App\Models\SiapeBlacklistUnidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\Erros;
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
    public function sincronizarBlacklistPelaListaUorgs(array $uorgsAtivas): array
    {
        $codigosAtivos = $this->normalizarCodigosListaUorgs($uorgsAtivas);
        $resultado = [
            'blacklists_criadas' => 0,
            'blacklists_mantidas' => 0,
            'pendencias_canceladas' => 0,
            'unidades_avaliadas' => 0,
        ];

        $unidades = Unidade::query()
            ->whereNotNull('codigo')
            ->where('codigo', '<>', '')
            ->whereNull('data_inativacao')
            ->get();

        foreach ($unidades as $unidade) {
            /** @var Unidade $unidade */
            $codigoNormalizado = $this->normalizarCodigo($unidade->codigo);

            if ($codigoNormalizado === null) {
                continue;
            }

            $resultado['unidades_avaliadas']++;

            if (isset($codigosAtivos[$codigoNormalizado])) {
                $cancelamento = $this->cancelarPendenciaPorCodigo((string) $unidade->codigo);
                $resultado['pendencias_canceladas'] += $cancelamento['blacklists_removidas'] > 0
                    || $cancelamento['unidades_canceladas'] > 0
                    ? 1
                    : 0;
                continue;
            }

            $manutencao = $this->criarOuManterBlacklist((string) $unidade->codigo);
            $resultado[$manutencao]++;
        }

        SiapeLog::info('Lifecycle SIAPE unidade: sincronizacao de blacklist pela listaUorgs concluida', $resultado);

        return $resultado;
    }

    /**
     * @return array<string, int>
     */
    public function cancelarPendenciaPorCodigo(string $codigo): array
    {
        $registros = SiapeBlacklistUnidade::query()
            ->where('codigo', $codigo)
            ->get();

        $blacklistsRemovidas = 0;
        foreach ($registros as $registro) {
            /** @var SiapeBlacklistUnidade $registro */
            $registro->delete();
            $blacklistsRemovidas++;
        }

        $unidadesCanceladas = Unidade::query()
            ->where('codigo', $codigo)
            ->whereNotNull('data_inicio_inativacao')
            ->update([
                'data_inicio_inativacao' => null,
                'updated_at' => now(),
            ]);

        if ($blacklistsRemovidas > 0 || $unidadesCanceladas > 0) {
            SiapeLog::info('Lifecycle SIAPE unidade: pendencia de inativacao cancelada', [
                'codigo' => $codigo,
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
    public function iniciarInativacoesComBlacklistVencida(): array
    {
        $prazoDias = $this->prazoDias();
        $dataLimite = now()->subDays($prazoDias);
        $resultado = [
            'unidades_iniciadas' => 0,
            'blacklists_avaliadas' => 0,
        ];

        $blacklists = SiapeBlacklistUnidade::query()
            ->where('inativado', 0)
            ->where('created_at', '<=', $dataLimite)
            ->get();

        foreach ($blacklists as $blacklist) {
            /** @var SiapeBlacklistUnidade $blacklist */
            $resultado['blacklists_avaliadas']++;

            $unidades = Unidade::query()
                ->where('codigo', $blacklist->codigo)
                ->whereNull('data_inicio_inativacao')
                ->whereNull('data_inativacao')
                ->get();

            foreach ($unidades as $unidade) {
                /** @var Unidade $unidade */
                DB::transaction(function () use ($unidade, $blacklist): void {
                    $unidadeAtual = Unidade::query()
                        ->whereKey($unidade->id)
                        ->lockForUpdate()
                        ->first();

                    if (!$unidadeAtual instanceof Unidade || $unidadeAtual->data_inicio_inativacao !== null || $unidadeAtual->data_inativacao !== null) {
                        return;
                    }

                    $unidadeAtual->data_inicio_inativacao = now();
                    $unidadeAtual->save();

                    $blacklistAtual = SiapeBlacklistUnidade::query()
                        ->whereKey($blacklist->id)
                        ->lockForUpdate()
                        ->first();

                    if ($blacklistAtual instanceof SiapeBlacklistUnidade) {
                        $blacklistAtual->inativado = 1;
                        $blacklistAtual->updated_at = now();
                        $blacklistAtual->save();
                    }
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
        $prazoDias = $this->prazoDias();
        $dataLimite = now()->subDays($prazoDias);
        $resultado = [
            'unidades_avaliadas' => 0,
            'unidades_inativadas' => 0,
            'confirmacoes_presentes' => 0,
            'confirmacoes_falhas' => 0,
            'atribuicoes_removidas' => 0,
        ];

        $unidades = Unidade::query()
            ->whereNotNull('data_inicio_inativacao')
            ->where('data_inicio_inativacao', '<=', $dataLimite)
            ->whereNull('data_inativacao')
            ->get();

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

            $atribuicoesRemovidas = DB::transaction(function () use ($unidade): int {
                $unidadeAtual = Unidade::query()
                    ->whereKey($unidade->id)
                    ->lockForUpdate()
                    ->first();

                if (!$unidadeAtual instanceof Unidade || $unidadeAtual->data_inativacao !== null) {
                    return 0;
                }

                $unidadeAtual->data_inativacao = now();
                $unidadeAtual->save();

                return $this->removerAtribuicoesDaUnidade($unidadeAtual);
            });

            $resultado['unidades_inativadas']++;
            $resultado['atribuicoes_removidas'] += $atribuicoesRemovidas;

            SiapeLog::info('Lifecycle SIAPE unidade: unidade inativada apos confirmacao dadosUorg', [
                'unidade_id' => $unidade->id,
                'codigo' => $unidade->codigo,
                'atribuicoes_removidas' => $atribuicoesRemovidas,
            ]);
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

        $out = $responseXml->xpath('//*[local-name()="dadosUorgResponse"]/*[local-name()="out"]');

        return empty($out);
    }

    protected function removerAtribuicoesDaUnidade(Unidade $unidade): int
    {
        $integranteIds = UnidadeIntegrante::query()
            ->where('unidade_id', $unidade->id)
            ->whereNull('deleted_at')
            ->pluck('id');

        if ($integranteIds->isEmpty()) {
            return 0;
        }

        return UnidadeIntegranteAtribuicao::query()
            ->whereIn('unidade_integrante_id', $integranteIds->all())
            ->whereNull('deleted_at')
            ->delete();
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

    private function criarOuManterBlacklist(string $codigo): string
    {
        $response = self::RESPONSE_AUSENTE_LISTA_UORGS . ' em ' . now()->toDateTimeString();
        $blacklistAtiva = SiapeBlacklistUnidade::query()
            ->where('codigo', $codigo)
            ->first();

        if ($blacklistAtiva instanceof SiapeBlacklistUnidade) {
            $blacklistAtiva->response = $response;
            $blacklistAtiva->updated_at = now();
            $blacklistAtiva->save();

            return 'blacklists_mantidas';
        }

        $blacklistRemovida = SiapeBlacklistUnidade::onlyTrashed()
            ->where('codigo', $codigo)
            ->orderByDesc('deleted_at')
            ->first();

        if ($blacklistRemovida instanceof SiapeBlacklistUnidade) {
            $blacklistRemovida->restore();
            $blacklistRemovida->inativado = 0;
            $blacklistRemovida->response = $response;
            $blacklistRemovida->created_at = now();
            $blacklistRemovida->updated_at = now();
            $blacklistRemovida->save();

            return 'blacklists_criadas';
        }

        SiapeBlacklistUnidade::query()->create([
            'id' => (string) Str::uuid(),
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
}
