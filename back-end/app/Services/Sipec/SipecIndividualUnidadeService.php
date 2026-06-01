<?php

namespace App\Services\Sipec;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\DTOs\Sipec\ServidorSipecDTO;
use App\DTOs\Sipec\UnidadeSipecDTO;
use App\Facades\SiapeLog;
use App\Models\Unidade;
use App\Repository\EntidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoServiceFactory;
use App\Services\SiapeBlackListServidorService;
use App\Services\ServiceBase;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use App\Services\Siape\Unidade\Atribuicao;
use Exception;
use Illuminate\Support\Str;

class SipecIndividualUnidadeService extends ServiceBase
{
    use Atribuicao;

    private const STATUS_SUCESSO = 'sucesso';
    private const STATUS_ERRO    = 'erro';
    private const STATUS_PARCIAL = 'parcial';
    private const MSG_CONCLUIDO  = 'Processamento da unidade concluído';

    private ?array $resumo = null;
    private ?array $relatorioCarga = null;

    protected SipecService $sipecService;
    protected SiapeBlackListServidorService $blackListService;
    protected IntegracaoServiceFactory $integracaoServiceFactory;
    protected EntidadeRepository $entidadeRepository;
    protected UnidadeRepository $unidadeRepository;
    protected UnidadeIntegranteRepository $unidadeIntegranteRepository;
    protected UnidadeIntegranteAtribuicaoRepository $unidadeIntegranteAtribuicaoRepository;
    protected UsuarioRepository $usuarioRepository;
    protected CargaIndividualSiapeSubject $cargaIndividualSiapeSubject;

    public function __construct($collection = null)
    {
        $this->sipecService                          = app(SipecService::class);
        $this->blackListService                      = app(SiapeBlackListServidorService::class);
        $this->integracaoServiceFactory              = app(IntegracaoServiceFactory::class);
        $this->entidadeRepository                    = app(EntidadeRepository::class);
        $this->unidadeRepository                     = app(UnidadeRepository::class);
        $this->unidadeIntegranteRepository           = app(UnidadeIntegranteRepository::class);
        $this->unidadeIntegranteAtribuicaoRepository = app(UnidadeIntegranteAtribuicaoRepository::class);
        $this->usuarioRepository                     = app(UsuarioRepository::class);
        $this->cargaIndividualSiapeSubject           = app(CargaIndividualSiapeSubject::class);
        parent::__construct($collection);
    }

    public function getUnidadeIntegranteRepository(): UnidadeIntegranteRepository
    {
        return $this->unidadeIntegranteRepository;
    }

    public function getUnidadeIntegranteAtribuicaoRepository(): UnidadeIntegranteAtribuicaoRepository
    {
        return $this->unidadeIntegranteAtribuicaoRepository;
    }

    public function getUsuarioRepository(): UsuarioRepository
    {
        return $this->usuarioRepository;
    }

    public function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getResumo(): ?array
    {
        return $this->resumo;
    }

    public function getRelatorioCarga(): ?array
    {
        return $this->relatorioCarga;
    }

    /**
     * Executa o fluxo completo de sincronização via SIPEC para uma unidade (UORG).
     * Busca todos os servidores da UORG, atualiza vínculos e dispara a sincronização final.
     *
     * @throws Exception
     */
    public function fluxoSipec(string $codUorg): ?array
    {
        $codUorg = $this->normalizarCodigo($codUorg);

        SiapeLog::info("SIPEC: Iniciando sincronização da unidade #{$codUorg}");

        $this->resumo        = null;
        $this->relatorioCarga = null;
        $processamentoId     = (string) Str::uuid();
        $dadosRelatorio      = [];
        $unidadeAntes        = $this->capturarEstadoUnidade($codUorg);

        try {
            $resposta     = $this->sipecService->buscarServidoresDaUnidade($codUorg);
            $servidores   = $resposta['content'] ?? $resposta;

            if (!is_array($servidores) || empty($servidores)) {
                throw new Exception("SIPEC: Nenhum servidor encontrado para a UORG {$codUorg}.");
            }

            SiapeLog::info("SIPEC: {$codUorg} — {count($servidores)} servidor(es) recebido(s)");

            $dtos           = $this->parsearServidores($servidores);
            $dadosRelatorio = $this->montarDadosRelatorio($codUorg, $dtos, $resposta);

            $this->atualizarVinculosDaUnidade($dtos);
            $this->executarSincronizacaoFinal();

            $unidadeDepois  = $this->capturarEstadoUnidade($codUorg);
            $this->resumo   = [$this->montarItemResumo(
                $codUorg,
                $unidadeAntes,
                $unidadeDepois,
                count($dtos),
                self::STATUS_SUCESSO,
                self::MSG_CONCLUIDO
            )];

            $this->registrarRelatorioCarga(
                $processamentoId,
                $codUorg,
                CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO,
                true,
                $dadosRelatorio,
                null
            );

            return $this->resumo;

        } catch (Exception $e) {
            $this->resumo = [$this->montarItemResumo(
                $codUorg,
                $unidadeAntes,
                $this->capturarEstadoUnidade($codUorg),
                0,
                self::STATUS_ERRO,
                $e->getMessage()
            )];

            $this->registrarRelatorioCarga(
                $processamentoId,
                $codUorg,
                CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
                false,
                $dadosRelatorio,
                $e->getMessage()
            );

            throw $e;
        }
    }

    /**
     * Consulta a UORG no SIPEC e retorna os dados sem persistir — útil para preview/debug.
     */
    public function consultarUnidade(string $codUorg): array
    {
        $codUorg = $this->normalizarCodigo($codUorg);

        $unidadeRaw = $this->sipecService->buscarUnidade($codUorg);
        $unidadeDto = $unidadeRaw ? UnidadeSipecDTO::fromArray($unidadeRaw) : null;

        $respostaServidores = $this->sipecService->buscarServidoresDaUnidade($codUorg);
        $servidores         = is_array($respostaServidores['content'] ?? $respostaServidores)
            ? ($respostaServidores['content'] ?? $respostaServidores)
            : [];

        $dtos = $this->parsearServidores($servidores);

        return [
            'codUorg'          => $codUorg,
            'unidade'          => $unidadeDto?->toRelatorio(),
            'total_servidores' => count($dtos),
            'servidores'       => array_map(fn(ServidorSipecDTO $dto) => $dto->toArray(), $dtos),
        ];
    }

    // -------------------------------------------------------------------------
    // Métodos privados
    // -------------------------------------------------------------------------

    /** @return ServidorSipecDTO[] */
    private function parsearServidores(array $servidores): array
    {
        $dtos = [];
        foreach ($servidores as $raw) {
            if (!is_array($raw)) continue;
            $dtos[] = ServidorSipecDTO::fromArray($raw);
        }
        return $dtos;
    }

    /** @param ServidorSipecDTO[] $dtos */
    private function atualizarVinculosDaUnidade(array $dtos): void
    {
        $cpfsProcessados = [];

        foreach ($dtos as $dto) {
            $cpf = preg_replace('/[^0-9]/', '', $dto->cpf ?? '');
            if (empty($cpf) || isset($cpfsProcessados[$cpf])) continue;

            $cpfsProcessados[$cpf] = true;
            $this->atualizarVinculosServidor($cpf, $dto);
        }
    }

    private function atualizarVinculosServidor(string $cpf, ServidorSipecDTO $dto): void
    {
        $usuarios = $this->usuarioRepository->findAllByCpfUnfiltered($cpf);

        if ($usuarios->isEmpty()) {
            $this->blackListService->verificarERemover($cpf);
            return;
        }

        foreach ($usuarios as $usuario) {
            if ($usuario->matricula === $dto->matriculaSiape) {
                $this->usuarioRepository->update($usuario->id, ['usuario_externo' => false]);
                $this->blackListService->verificarERemover($cpf, $usuario->matricula);
                if ($usuario->lotacao?->unidade) {
                    $this->removeTodasAsGestoesDoUsuario($usuario);
                }
                continue;
            }
            $this->blackListService->adicionar(
                $cpf,
                $usuario->matricula,
                'Adicionado automaticamente via integração SIPEC (unidade)'
            );
        }
    }

    private function executarSincronizacaoFinal(): void
    {
        SiapeLog::info('SIPEC: Sincronização final da unidade');

        $integracaoService = $this->integracaoServiceFactory->make([]);
        $entidades         = $this->entidadeRepository->findAll();

        foreach ($entidades as $entidade) {
            $integracaoService->sincronizar([
                'unidades'  => true,
                'servidores' => true,
                'gestores'  => true,
                'entidade'  => $entidade->id,
            ]);
        }
    }

    private function capturarEstadoUnidade(string $codUorg): ?array
    {
        $unidade = $this->unidadeRepository->findByCodigo($codUorg);
        if (!$unidade instanceof Unidade) return null;

        $unidade->loadMissing('unidadePai');

        return [
            'id'              => $unidade->id,
            'codigo'          => $unidade->codigo,
            'sigla'           => $unidade->sigla,
            'nome'            => $unidade->nome,
            'unidade_pai_id'  => $unidade->unidade_pai_id,
        ];
    }

    private function montarItemResumo(
        string  $codUorg,
        ?array  $unidadeAntes,
        ?array  $unidadeDepois,
        int     $totalServidores,
        string  $status,
        string  $mensagem
    ): array {
        if ($status === self::STATUS_SUCESSO && $unidadeDepois === null) {
            $status   = self::STATUS_PARCIAL;
            $mensagem .= ' (Unidade não localizada no Petrvs após sincronização)';
        }

        return [
            'status'                  => $status,
            'mensagem'                => $mensagem,
            'unidade_codigo'          => $codUorg,
            'unidade_nome'            => $unidadeDepois['nome']           ?? null,
            'unidade_sigla'           => $unidadeDepois['sigla']          ?? null,
            'unidade_existia'         => $unidadeAntes  !== null,
            'unidade_inserida'        => $unidadeAntes  === null && $unidadeDepois !== null,
            'unidade_pai_id'          => $unidadeDepois['unidade_pai_id'] ?? null,
            'total_servidores_sipec'  => $totalServidores,
            'alteracoes'              => $this->detectarAlteracoes($unidadeAntes, $unidadeDepois),
        ];
    }

    private function detectarAlteracoes(?array $antes, ?array $depois): array
    {
        if (!$antes || !$depois) return [];

        $alteracoes = [];
        foreach (['codigo', 'nome', 'sigla', 'unidade_pai_id'] as $campo) {
            if (($antes[$campo] ?? null) !== ($depois[$campo] ?? null)) {
                $alteracoes[] = $campo;
            }
        }
        return $alteracoes;
    }

    /** @param ServidorSipecDTO[] $dtos */
    private function montarDadosRelatorio(string $codUorg, array $dtos, array $respostaBruta): array
    {
        return [
            'codUorg'            => $codUorg,
            'total_servidores'   => count($dtos),
            'paginacao'          => [
                'totalElements' => $respostaBruta['totalElements'] ?? null,
                'totalPages'    => $respostaBruta['totalPages']    ?? null,
                'number'        => $respostaBruta['number']        ?? null,
            ],
        ];
    }

    private function registrarRelatorioCarga(
        string  $processamentoId,
        string  $codUorg,
        string  $status,
        bool    $entradaValida,
        array   $dadosRelatorio,
        ?string $mensagemErro
    ): void {
        $relatorio = $this->cargaIndividualSiapeSubject->notificar(new CargaIndividualSiapeProcessamentoDTO(
            processamentoId: $processamentoId,
            tipo:            CargaIndividualSiapeProcessamentoDTO::TIPO_UNIDADE,
            chave:           $codUorg,
            status:          $status,
            entradaValida:   $entradaValida,
            dadosSiape:      $dadosRelatorio,
            resumo:          $this->resumo,
            mensagemErro:    $mensagemErro,
            solicitanteId:   auth()->id(),
        ));

        $this->relatorioCarga = $relatorio ? [
            'id'     => $relatorio->id,
            'status' => $relatorio->status,
            'tipo'   => $relatorio->tipo,
        ] : null;
    }

    private function normalizarCodigo(string $codigo): string
    {
        return preg_replace('/[^0-9]/', '', $codigo) ?? '';
    }
}
