<?php

namespace App\Services;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\DTOs\Siape\DadosFuncionaisSiapeDTO;
use App\Facades\SiapeLog;
use App\Enums\UsuarioSituacaoSiape;
use App\Models\Entidade;
use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Repository\EntidadeRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\SiapeConsultaDadosFuncionaisRepository;
use App\Repository\SiapeConsultaDadosPessoaisRepository;
use App\Repository\SiapeDadosUORGRepository;
use App\Repository\SiapeListaUORGSRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UsuarioRepository;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use App\Services\Siape\Unidade\Atribuicao;
use App\Services\IntegracaoServiceFactory;
use App\Support\SiapeDate;
use Illuminate\Support\Str;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Brazanation\Documents\Cpf;

class SiapeIndividualServidorService extends ServiceBase
{
    use Atribuicao;

    private const STATUS_SUCESSO = 'sucesso';
    private const STATUS_ERRO = 'erro';
    private const STATUS_PARCIAL = 'parcial';
    private const MSG_CONCLUIDO = 'Processamento concluído';
    private const TAMANHO_CPF = 11;
    private const MAX_PREVIEW_LOG = 200;
    private SiapeIndividualService $service;
    private ?array $resumo = null;
    private ?array $relatorioCarga = null;
    private ?array $relatorioCargaDetalhada = null;

    public function __construct(
        protected IntegracaoServiceFactory $integracaoServiceFactory,
        protected EntidadeRepository $entidadeRepository,
        protected SiapeBlackListServidorRepository $siapeBlackListServidorRepository,
        protected SiapeConsultaDadosFuncionaisRepository $siapeConsultaDadosFuncionaisRepository,
        protected SiapeConsultaDadosPessoaisRepository $siapeConsultaDadosPessoaisRepository,
        protected SiapeDadosUORGRepository $siapeDadosUORGRepository,
        protected SiapeListaUORGSRepository $siapeListaUORGSRepository,
        protected UnidadeRepository $unidadeRepository,
        protected UnidadeIntegranteRepository $unidadeIntegranteRepository,
        protected UnidadeIntegranteAtribuicaoRepository $unidadeIntegranteAtribuicaoRepository,
        protected UsuarioRepository $usuarioRepository,
        protected CargaIndividualSiapeSubject $cargaIndividualSiapeSubject,
        $collection = null
    ) {
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
     * Executa o fluxo completo de sincronização do SIAPE para um servidor
     * @throws Exception
     */
    public function fluxoSiape(string $cpf, SiapeIndividualService $service): ?array
    {
        SiapeLog::info("Iniciando o processo de sincronização cpf #:{$cpf}");

        $this->service = $service;
        $this->resumo = null;
        $this->relatorioCarga = null;
        $this->relatorioCargaDetalhada = null;
        $processamentoId = (string) Str::uuid();
        $dadosRelatorio = [
            'dadosPessoais' => [],
            'dadosFuncionais' => [],
        ];
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf) ?? $cpf;
        $usuariosAntes = [];

        try {
            $cpfLimpo = $this->limparEValidarCpf($cpf);
            $usuariosAntes = $this->capturarEstadoUsuarios($cpfLimpo);
            $this->logInicioProcessamento($cpf, $cpfLimpo);
            $this->limparDadosAnteriores($cpfLimpo);

            list($xmlFuncionais, $xmlPessoais) = $this->prepararXmlsConsulta($cpfLimpo);
            list($respFuncionais, $respPessoais) = $this->executarConsultasSiape($cpfLimpo, $xmlFuncionais, $xmlPessoais);

            $dadosFuncionais = $this->processarRespostaFuncionais($cpfLimpo, $respFuncionais);
            $dadosRelatorio['dadosFuncionais'] = $this->processarRespostaFuncionaisParaRelatorio($cpfLimpo, $respFuncionais, $dadosFuncionais);
            $dadosRelatorio['dadosPessoais'] = $this->processarDadosPessoaisParaRelatorio($cpfLimpo, $respPessoais);
            $this->atualizarDadosFuncionaisParciais($cpfLimpo, $dadosFuncionais, $dadosRelatorio['dadosPessoais']);

            $this->processarUnidadesDosServidores($cpfLimpo, $dadosFuncionais);
            $this->salvarDadosConsulta($cpfLimpo, $respFuncionais, $respPessoais);

            $this->atualizarVinculosUsuarios($cpfLimpo, $dadosFuncionais);
            $this->executarSincronizacaoFinal($cpfLimpo, $dadosFuncionais);

            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_SUCESSO);

            if (empty($this->resumo)) {
                $nome = 'Servidor';
                try {
                     $dadosPessoaisArr = $dadosRelatorio['dadosPessoais'];
                     $nome = $dadosPessoaisArr['nome'] ?? 'Servidor';
                } catch (\Throwable $e) {
                    // ignore
                }

                $this->resumo[] = [
                    'status' => self::STATUS_PARCIAL,
                    'nome' => $nome,
                    'usuario_existia' => false,
                    'usuario_inserido' => false,
                    'lotacao_associada' => false,
                    'alteracoes' => [],
                    'mensagem' => 'O CPF foi processado no SIAPE, porém o usuário não foi inserido no Petrvs. Verifique se os dados estão corretos ou se há restrições.'
                ];
            }

            $this->registrarRelatorioCarga(
                $processamentoId,
                $cpfLimpo,
                $this->statusRelatorioPorResumo($this->resumo),
                true,
                $dadosRelatorio,
                null
            );

            $this->sincronizarResumoComRelatorioCarga();

            return $this->resumo;

        } catch (\Throwable $e) {
            $msgErro = 'Houve uma falha na comunicação com o SIAPE ao processar este CPF. Por favor, tente novamente mais tarde.';
            SiapeLog::error('Erro ao processar servidor no SIAPE: ' . $cpfLimpo . ' - ' . $e->getMessage());

            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_ERRO, $msgErro);
            $this->registrarRelatorioCarga(
                $processamentoId,
                $cpfLimpo,
                CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
                false,
                $dadosRelatorio,
                $msgErro
            );

            $this->sincronizarResumoComRelatorioCarga();
            throw $e;
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function processarDadosPessoaisParaRelatorio(string $cpf, string $respPessoais): array
    {
        try {
            return $this->service->getProcessaDadosSiape()->processaDadosPessoais($cpf, $respPessoais);
        } catch (\Throwable $e) {
            SiapeLog::warning('Nao foi possivel montar dados pessoais para relatorio', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [];
        }
    }

    /**
     * @param array<int, array<string, mixed>> $dadosFuncionais
     * @param array<string, mixed> $dadosPessoais
     */
    private function atualizarDadosFuncionaisParciais(string $cpf, array $dadosFuncionais, array $dadosPessoais): void
    {
        if ($dadosPessoais !== []) {
            return;
        }

        $dadosFuncionaisDtos = DadosFuncionaisSiapeDTO::listFromArray($dadosFuncionais);

        if (!$this->dadosFuncionaisPossuemAtributosParciais($dadosFuncionaisDtos)) {
            return;
        }

        $usuariosPorCpf = $this->usuarioRepository->findAllByCpfUnfiltered($cpf);
        $usuariosPorMatricula = $usuariosPorCpf
            ->keyBy(fn(Usuario $usuario): string => (string) $usuario->matricula);

        if ($usuariosPorMatricula->isEmpty()) {
            return;
        }

        DB::transaction(function () use ($cpf, $dadosFuncionaisDtos, $usuariosPorCpf, $usuariosPorMatricula): void {
            $usuariosAtualizadosPorNovaMatricula = [];

            foreach ($dadosFuncionaisDtos as $dados) {
                $matricula = $dados->matriculaSiape();
                if ($matricula === null) {
                    continue;
                }

                $usuario = $this->resolverUsuarioParaAtualizacaoFuncionalParcial(
                    $dados,
                    $usuariosPorCpf,
                    $usuariosPorMatricula,
                    $usuariosAtualizadosPorNovaMatricula
                );
                if ($usuario === null) {
                    continue;
                }

                $attributes = $dados->atributosUsuarioParciais();
                if ((string) $usuario->matricula !== $matricula) {
                    $attributes['matricula'] = $matricula;
                    $usuariosAtualizadosPorNovaMatricula[$usuario->id] = true;
                }

                if ($attributes === []) {
                    continue;
                }

                $this->usuarioRepository->update($usuario->id, $attributes);
                SiapeLog::info('Dados funcionais da carga individual parcial atualizados', [
                    'cpf' => $cpf,
                    'matricula' => $matricula,
                    'campos' => array_keys($attributes),
                ]);
            }
        });
    }

    /**
     * @param Collection<int, Usuario> $usuariosPorCpf
     * @param Collection<string, Usuario> $usuariosPorMatricula
     * @param array<string, bool> $usuariosAtualizadosPorNovaMatricula
     */
    private function resolverUsuarioParaAtualizacaoFuncionalParcial(
        DadosFuncionaisSiapeDTO $dados,
        Collection $usuariosPorCpf,
        Collection $usuariosPorMatricula,
        array $usuariosAtualizadosPorNovaMatricula
    ): ?Usuario {
        $matricula = $dados->matriculaSiape();
        if ($matricula === null) {
            return null;
        }

        /** @var Usuario|null $usuarioPorMatricula */
        $usuarioPorMatricula = $usuariosPorMatricula->get($matricula);
        if ($usuarioPorMatricula !== null) {
            return $usuarioPorMatricula;
        }

        $codigosUnidade = collect($dados->codigosUnidadeCandidatos())
            ->map(fn(mixed $codigo): ?string => $this->normalizarCodigoUnidade($codigo))
            ->filter(fn(?string $codigo): bool => $codigo !== null)
            ->unique()
            ->values();

        if ($codigosUnidade->isEmpty()) {
            SiapeLog::warning('Carga parcial com nova matricula sem unidade para correlacao', [
                'quantidade_usuarios_cpf' => $usuariosPorCpf->count(),
            ]);

            return null;
        }

        $usuariosDaUnidade = $usuariosPorCpf->filter(function (Usuario $usuario) use ($codigosUnidade): bool {
            $codigoLotacao = $this->normalizarCodigoUnidade($usuario->lotacao?->unidade?->codigo);

            return $codigoLotacao !== null && $codigosUnidade->contains($codigoLotacao);
        });

        if ($usuariosDaUnidade->count() !== 1) {
            SiapeLog::warning('Carga parcial com nova matricula sem correlacao univoca', [
                'codigos_unidade' => $codigosUnidade->all(),
                'quantidade_usuarios_cpf' => $usuariosPorCpf->count(),
                'quantidade_candidatos_unidade' => $usuariosDaUnidade->count(),
            ]);

            return null;
        }

        /** @var Usuario $usuario */
        $usuario = $usuariosDaUnidade->first();
        if (isset($usuariosAtualizadosPorNovaMatricula[$usuario->id])) {
            SiapeLog::warning('Mais de uma nova matricula correlacionada ao mesmo usuario na carga parcial; atualizacao ignorada', [
                'codigos_unidade' => $codigosUnidade->all(),
            ]);

            return null;
        }

        return $usuario;
    }

    /**
     * @param array<int, DadosFuncionaisSiapeDTO> $dadosFuncionais
     */
    private function dadosFuncionaisPossuemAtributosParciais(array $dadosFuncionais): bool
    {
        foreach ($dadosFuncionais as $dados) {
            if ($dados->atributosUsuarioParciais() !== []) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<string, mixed> $dadosRelatorio
     */
    private function registrarRelatorioCarga(
        string $processamentoId,
        string $cpf,
        string $status,
        bool $entradaValida,
        array $dadosRelatorio,
        ?string $mensagemErro
    ): void {
        $relatorio = $this->cargaIndividualSiapeSubject->notificar(new CargaIndividualSiapeProcessamentoDTO(
            processamentoId: $processamentoId,
            tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_SERVIDOR,
            chave: $cpf,
            status: $status,
            entradaValida: $entradaValida,
            dadosSiape: $dadosRelatorio,
            resumo: $this->resumo,
            mensagemErro: $mensagemErro,
            solicitanteId: auth()->id(),
        ));

        $this->relatorioCarga = $relatorio ? [
            'id' => $relatorio->id,
            'status' => $relatorio->status,
            'tipo' => $relatorio->tipo,
        ] : null;

        $this->relatorioCargaDetalhada = $relatorio ? [
            'status' => $relatorio->status,
            'secoes' => $relatorio->secoes ?? [],
        ] : null;
    }

    /**
     * @param array<int, array<string, mixed>>|null $resumo
     */
    private function statusRelatorioPorResumo(?array $resumo): string
    {
        if (collect($resumo ?? [])->contains(fn(array $item) => ($item['status'] ?? null) === self::STATUS_PARCIAL)) {
            return CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL;
        }

        return CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO;
    }

    private function sincronizarResumoComRelatorioCarga(): void
    {
        if ($this->resumo === null || $this->relatorioCargaDetalhada === null) {
            return;
        }

        if (($this->relatorioCargaDetalhada['status'] ?? null) !== CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL) {
            return;
        }

        $secaoPorMatricula = collect($this->relatorioCargaDetalhada['secoes'] ?? [])
            ->mapWithKeys(function (array $secao, int $indice): array {
                $matricula = $this->matriculaDaSecao($secao);
                $chave = $matricula ?? (string) $indice;

                return [$chave => $this->secaoTemProblema($secao)];
            });

        foreach ($this->resumo as $indice => &$itemResumo) {
            $matricula = (string) ($itemResumo['matricula'] ?? '');
            $chave = $matricula !== '' ? $matricula : (string) $indice;

            if (($secaoPorMatricula->get($chave) ?? false) === true) {
                $itemResumo['status'] = self::STATUS_PARCIAL;
            }
        }
        unset($itemResumo);
    }

    /**
     * @param array<string, mixed> $secao
     */
    private function secaoTemProblema(array $secao): bool
    {
        foreach (($secao['campos'] ?? []) as $campo) {
            if (in_array($campo['status'] ?? null, ['divergente', 'nao_encontrado'], true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<string, mixed> $secao
     */
    private function matriculaDaSecao(array $secao): ?string
    {
        foreach (($secao['campos'] ?? []) as $campo) {
            if (($campo['campo'] ?? null) === 'matriculaSiape') {
                $matricula = $campo['recebido_siape'] ?? null;

                return is_scalar($matricula) ? (string) $matricula : null;
            }
        }

        $titulo = $secao['titulo'] ?? null;
        if (!is_string($titulo)) {
            return null;
        }

        if (preg_match('/(\d{4,})$/', $titulo, $matches) === 1) {
            return $matches[1];
        }

        return null;
    }

    protected function instanciarIntegracaoService(): IntegracaoService
    {
        return $this->integracaoServiceFactory->make([]);
    }

    protected function getModelInstance(string $modelClass): mixed
    {
        return app($modelClass);
    }

    protected function buscarUsuariosPorCpf(string $cpf): array
    {
        return $this->usuarioRepository->findAllByCpfWithLotacao($cpf)
            ->map(fn(Usuario $u) => [
                'id' => $u->id,
                'matricula' => $u->matricula,
                'nome' => $u->nome,
                'email' => $u->email,
                'situacao_siape' => $u->situacao_siape,
                'lotacao_id' => $u->lotacao?->unidade_id
            ])->toArray();
    }

    private function capturarEstadoUsuarios(string $cpf): array
    {
        return $this->buscarUsuariosPorCpf($cpf);
    }

    private function logInicioProcessamento(string $cpfOriginal, string $cpfLimpo): void
    {
        SiapeLog::info('CPF processado', [
            'cpf_original' => $cpfOriginal,
            'cpf_limpo' => $cpfLimpo,
            'cpf_valido' => $this->validarCpf($cpfLimpo)
        ]);
    }

    protected function limparDadosSiape(string $cpf): void
    {
        $this->siapeConsultaDadosPessoaisRepository->forceDeleteByCpf($cpf);
        $this->siapeConsultaDadosFuncionaisRepository->forceDeleteByCpf($cpf);
    }

    private function limparDadosAnteriores(string $cpf): void
    {
        SiapeLog::info("Limpando tabelas de controle do SIAPE para o cpf: {$cpf}");
        $this->limparDadosSiape($cpf);
    }

    private function prepararXmlsConsulta(string $cpf): array
    {
        $codOrgao = strval(intval($this->service->config['codOrgao']));
        SiapeLog::info('Montando XML dos dados funcionais e pessoais', [
            'cpf' => $cpf,
            'cod_orgao' => $codOrgao
        ]);

        try {
            $xmlFuncionais = $this->montaXMLDadosFuncionais($cpf);
            $xmlPessoais = $this->montaXmlDadosPessoais($cpf);

            SiapeLog::info('XMLs montados com sucesso', [
                'xml_funcionais_tamanho' => strlen($xmlFuncionais),
                'xml_pessoais_tamanho' => strlen($xmlPessoais)
            ]);

            return [$xmlFuncionais, $xmlPessoais];
        } catch (Exception $e) {
            SiapeLog::error('Erro ao montar XMLs', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
            throw new Exception("Erro ao montar XMLs para consulta SIAPE: " . $e->getMessage());
        }
    }

    private function executarConsultasSiape(string $cpf, string $xmlFuncionais, string $xmlPessoais): array
    {
        SiapeLog::info('Executando requisicoes no SIAPE', ['cpf' => $cpf, 'timestamp' => now()->toDateTimeString()]);

        try {
            $respFuncionais = $this->service->getBuscarDadosSiapeServidor()->executaRequisicao($xmlFuncionais);
            $respPessoais = $this->service->getBuscarDadosSiapeServidor()->executaRequisicao($xmlPessoais);

            SiapeLog::info('Requisições executadas com sucesso', [
                'cpf' => $cpf,
                'response_funcionais_tamanho' => strlen($respFuncionais),
                'response_pessoais_tamanho' => strlen($respPessoais)
            ]);

            $this->logPreviewResposta($cpf, $respFuncionais, $respPessoais);

            return [$respFuncionais, $respPessoais];
        } catch (Exception $e) {
            report($e);
            throw new Exception("Houve uma falha na comunicação com o SIAPE ao processar este CPF. Por favor, tente novamente mais tarde.");
        }
    }

    private function logPreviewResposta(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        SiapeLog::info('Processando retorno do SIAPE', [
            'cpf' => $cpf,
            'response_funcionais_preview' => substr($respFuncionais, 0, self::MAX_PREVIEW_LOG) . '...',
            'response_pessoais_preview' => substr($respPessoais, 0, self::MAX_PREVIEW_LOG) . '...'
        ]);
    }

    private function processarRespostaFuncionais(string $cpf, string $responseXml): array
    {
        try {
            $dadosArray = $this->service->getProcessaDadosSiape()->processaDadosFuncionais($cpf, $responseXml);

            SiapeLog::info('Dados funcionais processados', [
                'cpf' => $cpf,
                'dados_processados' => is_array($dadosArray) ? count($dadosArray) : 'não é array',
                'tipo_dados' => gettype($dadosArray)
            ]);

            if (!$dadosArray) {
                SiapeLog::warning('Nenhum dado funcional encontrado para o CPF', [
                    'cpf' => $cpf,
                    'response_funcionais' => $responseXml
                ]);
                throw new Exception("Não há dados funcionais para este CPF: {$cpf}");
            }

            return $this->normalizarDadosFuncionais($cpf, $dadosArray);
        } catch (Exception $e) {
            report($e);
            throw new Exception("Erro ao processar dados funcionais do SIAPE: " . $e->getMessage());
        }
    }

    private function processarRespostaFuncionaisParaRelatorio(string $cpf, string $responseXml, array $fallback): array
    {
        try {
            $dadosArray = $this->service->getProcessaDadosSiape()->processaDadosFuncionaisParaRelatorio($cpf, $responseXml);

            return $this->normalizarDadosFuncionais($cpf, $dadosArray);
        } catch (\Throwable $e) {
            report($e);
            SiapeLog::warning('Nao foi possivel montar dados funcionais completos para relatorio; usando dados processados', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
            ]);

            return $fallback;
        }
    }

    private function normalizarDadosFuncionais(string $cpf, mixed $dados): array
    {
        if (!is_array($dados) || !isset($dados[0])) {
            SiapeLog::info('Convertendo dados funcionais para array', [
                'cpf' => $cpf,
                'tipo_original' => gettype($dados)
            ]);
            return [$dados];
        }
        return $dados;
    }

    private function processarUnidadesDosServidores(string $cpf, array $dadosFuncionais): void
    {
        foreach (DadosFuncionaisSiapeDTO::listFromArray($dadosFuncionais) as $index => $dados) {
            $this->processarUnidadeIndividual($cpf, $index, $dados);
        }
    }

    private function processarUnidadeIndividual(string $cpf, int $index, DadosFuncionaisSiapeDTO $dados): void
    {
        SiapeLog::info('Iniciando o processo da unidade do servidor', [
            'cpf' => $cpf,
            'indice_dados' => $index,
            'dados_funcionais_keys' => $dados->keys()
        ]);
        
        $codigoUnidade = $this->resolverCodigoUnidadeServidor($dados);
        if (!$this->validarUnidadeProcessada($cpf, $codigoUnidade, $dados)) {
            return;
        }
        
        $this->sincronizarDadosUnidade($cpf, $codigoUnidade);
    }

    private function resolverCodigoUnidadeServidor(DadosFuncionaisSiapeDTO $dados): string
    {
        foreach ($dados->codigosUnidadeCandidatos() as $codigoCandidato) {
            $codigo = $this->normalizarCodigoUnidade($codigoCandidato);

            if ($codigo !== null) {
                return $codigo;
            }
        }

        return '0';
    }

    private function normalizarCodigoUnidade(mixed $codigo): ?string
    {
        if ($codigo === null) {
            return null;
        }

        $valor = trim((string) $codigo);

        if ($valor === '') {
            return null;
        }

        $digitos = preg_replace('/\D/', '', $valor);

        if ($digitos === null || $digitos === '') {
            return null;
        }

        $normalizado = (string) intval($digitos);

        return $normalizado === '0' ? null : $normalizado;
    }

    protected function verificarExistenciaUnidade(string $codigoUnidade): bool
    {
        return $this->unidadeRepository->existsByCodigoOrgao(CodigoOrgaoService::atual(), $codigoUnidade);
    }

    private function validarUnidadeProcessada(string $cpf, string $codigoUnidade, DadosFuncionaisSiapeDTO $dados): bool
    {
        $unidadeProcessada = $this->verificarExistenciaUnidade($codigoUnidade);

        if (!$unidadeProcessada) {
            $matricula = $dados->matriculaSiape() ?? 'N/A';
            SiapeLog::warning('Unidade não processada encontrada; matrícula ignorada', [
                'cpf' => $cpf,
                'codigo_unidade' => $codigoUnidade,
                'matricula_siape' => $matricula,
            ]);
            return false;
        }

        return true;
    }

    private function sincronizarDadosUnidade(string $cpf, string $codigoUnidade): void
    {
        SiapeLog::info('Montando XML e executando requisição da unidade');
        $xmlUnidade = $this->montaXmlUnidade($codigoUnidade);
        $respUnidade = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlUnidade);

        $this->atualizarListaUorgs($codigoUnidade);
        $unidadeSiape = $this->buscarUnidadeNaLista($codigoUnidade);

        $this->salvarHistoricoUnidade($respUnidade, $unidadeSiape);
    }

    private function atualizarListaUorgs(string $codOrgao): void
    {
        $this->service->getBuscarDadosSiapeUnidades()->listaUorgs(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $codOrgao
        );
    }

    protected function buscarUorgNaoProcessada()
    {
        return $this->siapeListaUORGSRepository->findUnprocessed(CodigoOrgaoService::atual());
    }

    private function buscarUnidadeNaLista(string $codigoUnidade): ?array
    {
        $uorgs = $this->buscarUorgNaoProcessada();

        $listaUorgs = $this->service->getBuscarDadosSiapeUnidade()->getUnidades($uorgs);
        return collect($listaUorgs)->firstWhere('codigo', $codigoUnidade);
    }

    protected function salvarHistoricoUnidadeDb(string $responseXml, ?array $unidadeSiape): void
    {
        $this->siapeDadosUORGRepository->create([
            'id' => Str::uuid(),
            'codigo_orgao' => CodigoOrgaoService::atual(),
            'data_modificacao' => SiapeDate::dataUltimaTransacaoParaBancoOuFalha($unidadeSiape['dataUltimaTransacao']),
            'response' => $responseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    private function salvarHistoricoUnidade(string $responseXml, ?array $unidadeSiape): void
    {
        if (!$unidadeSiape) return;

        SiapeLog::info('Salvando os dados da unidade');
        $this->salvarHistoricoUnidadeDb($responseXml, $unidadeSiape);
    }

    protected function salvarDadosConsultaDb(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        $this->siapeConsultaDadosFuncionaisRepository->create([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $respFuncionais,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $this->siapeConsultaDadosPessoaisRepository->create([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $respPessoais,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    private function salvarDadosConsulta(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        SiapeLog::info('Salvando os dados funcionais e pessoais do servidor');

        $this->salvarDadosConsultaDb($cpf, $respFuncionais, $respPessoais);
    }

    private function atualizarVinculosUsuarios(string $cpf, array $dadosFuncionais): void
    {
        SiapeLog::info('Iniciando remoção de vínculos para forçar nova lotação', ['cpf' => $cpf]);

        try {
            $this->removeVinculoParaforcarSerLotadoNovamente($cpf, $dadosFuncionais);
            SiapeLog::info('Remoção de vínculos concluída com sucesso', ['cpf' => $cpf]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao remover vínculos', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
        }
    }

    protected function buscarTodasEntidades()
    {
        return $this->entidadeRepository->findAll();
    }

    private function executarSincronizacaoFinal(string $cpf, array $dadosFuncionais = []): void
    {
        SiapeLog::info('Iniciando sincronização final', ['cpf' => $cpf]);

        try {
            $integracaoService = $this->instanciarIntegracaoService();
            $entidades = $this->buscarTodasEntidades();
            $escopoServidor = $this->montarEscopoCargaIndividualServidor($cpf, $dadosFuncionais);

            SiapeLog::info('Processando entidades para sincronização', [
                'cpf' => $cpf,
                'matriculas' => $escopoServidor['matriculas'],
                'total_entidades' => $entidades->count()
            ]);

            foreach ($entidades as $entidade) {
                $this->sincronizarEntidadeUnica($integracaoService, $entidade, $cpf, $escopoServidor);
            }

            SiapeLog::info('Processo de sincronização concluído com sucesso', ['cpf' => $cpf]);
        } catch (Exception $e) {
            report($e);
            throw new Exception("Erro na sincronização final: " . $e->getMessage());
        }
    }

    private function sincronizarEntidadeUnica(IntegracaoService $service, Entidade $entidade, string $cpf, array $escopoServidor): void
    {
        SiapeLog::info('Sincronizando entidade', [
            'cpf' => $cpf,
            'matriculas' => $escopoServidor['matriculas'],
            'entidade_id' => $entidade->id,
            'entidade_nome' => $entidade->nome ?? 'sem nome'
        ]);

        $service->sincronizar([
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
            'entidade' => $entidade->id,
            'escopo_carga_individual_servidor' => $escopoServidor,
        ]);
    }

    /**
     * @param array<int, array<string, mixed>> $dadosFuncionais
     * @return array{origem: string, cpf: string, matriculas: array<int, string>}
     */
    private function montarEscopoCargaIndividualServidor(string $cpf, array $dadosFuncionais): array
    {
        $matriculas = collect(DadosFuncionaisSiapeDTO::listFromArray($dadosFuncionais))
            ->map(fn(DadosFuncionaisSiapeDTO $dados): ?string => $dados->matriculaSiape())
            ->filter()
            ->unique()
            ->values()
            ->all();

        return [
            'origem' => 'carga_individual_servidor',
            'cpf' => $cpf,
            'matriculas' => $matriculas,
        ];
    }

    protected function gerarUsuariosResumo(string $cpf) {
        return $this->usuarioRepository->findAllByCpfWithLotacao($cpf);
    }

    private function gerarResumo(array $usuariosAntes, string $cpf, string $status, string $mensagem = self::MSG_CONCLUIDO): array
    {
        $resumo = [];
        $usuariosDepois = $this->gerarUsuariosResumo($cpf);
        $mapAntes = collect($usuariosAntes)->keyBy(fn($u) => $u['matricula'] ?? $u['id']);

        foreach ($usuariosDepois as $uDepois) {
            $key = $uDepois->matricula ?? $uDepois->id;
            $uAntes = $mapAntes->get($key);

            $item = $this->criarItemResumo($uDepois, $uAntes, $status, $mensagem);
            $resumo[] = $item;
        }

        return $resumo;
    }

    private function criarItemResumo(Usuario $uDepois, ?array $uAntes, string $status, string $mensagem): array
    {
        $item = [
            'status' => $status,
            'matricula' => $uDepois->matricula,
            'nome' => $uDepois->nome,
            'usuario_existia' => !!$uAntes,
            'usuario_inserido' => !$uAntes,
            'lotacao_associada' => !empty($uDepois->lotacao),
            'alteracoes' => [],
            'mensagem' => $mensagem
        ];

        if ($uAntes) {
            $item['alteracoes'] = $this->detectarAlteracoes($uAntes, $uDepois);
        }

        if (!$item['lotacao_associada']) {
            $item['status'] = self::STATUS_PARCIAL;
            $item['mensagem'] .= ' (Lotação não associada)';
        }

        return $item;
    }

    private function detectarAlteracoes(array $uAntes, Usuario $uDepois): array
    {
        $alteracoes = [];
        $campos = ['nome', 'email', 'matricula', 'situacao_siape'];

        foreach ($campos as $campo) {
            if (($uAntes[$campo] ?? null) != $uDepois->$campo) {
                $alteracoes[] = $campo;
            }
        }

        if (($uAntes['lotacao_id'] ?? null) != $uDepois->lotacao?->unidade_id) {
            $alteracoes[] = 'lotacao_id';
        }

        return $alteracoes;
    }

    protected function buscarUsuariosSimples(string $cpf)
    {
        return $this->usuarioRepository->findAllByCpfUnfiltered($cpf);
    }

    private function removeVinculoParaforcarSerLotadoNovamente(string $cpf, array $dadosFuncionaisArray): void
    {
        $usuarios = $this->buscarUsuariosSimples($cpf);

        if ($usuarios->isEmpty()) {
            $this->removendoDaBlackList($cpf);
            return;
        }

        $matriculasSiape = array_map(
            fn(DadosFuncionaisSiapeDTO $dados): ?string => $dados->matriculaSiape(),
            DadosFuncionaisSiapeDTO::listFromArray($dadosFuncionaisArray)
        );

        foreach ($usuarios as $usuario) {
            if (in_array($usuario->matricula, $matriculasSiape)) {
                $this->processarRemocaoVinculoUsuario($usuario, $cpf, $matriculasSiape);
                continue;
            }

            $this->adicionarBlacklist($cpf, $usuario->matricula);
        }
    }

    private function adicionarBlacklist(string $cpf, ?string $matricula): void
    {
        if (empty($matricula)) {
            return;
        }

        $exists = $this->siapeBlackListServidorRepository->exists($cpf, $matricula);

        if (!$exists) {
            $this->siapeBlackListServidorRepository->create([
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'matricula' => $matricula,
                'response' => 'Adicionado automaticamente via integração',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            SiapeLog::info('Usuário adicionado à blacklist por ausência no SIAPE', [
                'cpf' => $cpf,
                'matricula' => $matricula
            ]);
        }
    }

    private function processarRemocaoVinculoUsuario(Usuario $usuario, string $cpf, array $matriculasSiape): void
    {
        $this->atualizarStatusUsuario($usuario);
        $this->verificarBlacklist($cpf, $usuario);

        if (!$usuario->lotacao?->unidade) return;

        $this->removeTodasAsGestoesDoUsuario($usuario);

        if (!in_array($usuario->matricula, $matriculasSiape)) {
            SiapeLog::warning('Lotação não removida: Matrícula não corresponde ao SIAPE', [
                'cpf' => $cpf,
                'matricula' => $usuario->matricula,
                'matriculas_siape' => $matriculasSiape
            ]);
            return;
        }
        //FIXME Removendo essa opção até que corrija o bug de lotação
        // $this->removeLotacao($usuario);
    }

    private function atualizarStatusUsuario(Usuario $usuario): void
    {
        $this->usuarioRepository->update($usuario->id, ['usuario_externo' => false]);
    }

    protected function buscarBlacklist(string $cpf, ?string $matricula = null)
    {
        return $this->siapeBlackListServidorRepository->findByCpfAndOptionalMatricula($cpf, $matricula);
    }

    private function verificarBlacklist(string $cpf, Usuario $usuario): void
    {
        try {
            $blacklistRegistro = $this->buscarBlacklist($cpf, $usuario->matricula);

            if ($blacklistRegistro) {
                $this->processarRegistroBlacklist($blacklistRegistro, $usuario, $cpf);
            }
        } catch (Exception $e) {
            SiapeLog::error('Erro ao processar remoção na siape_blacklist_servidores', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
        }
    }

    private function processarRegistroBlacklist(SiapeBlackListServidor $registro, Usuario $usuario, string $cpf): void
    {
        if ((int)($registro->inativado ?? 0) === 1) {
            $this->usuarioRepository->update($usuario->id, ['situacao_siape' => UsuarioSituacaoSiape::ATIVO->value]);
            SiapeLog::info('Usuário reativado pela remoção da blacklist', [
                'cpf' => $cpf,
                'usuario_id' => $usuario->id
            ]);
        }

        $this->siapeBlackListServidorRepository->forceDelete($registro->id);
        SiapeLog::info('Registro removido da blacklist', ['cpf' => $cpf]);
    }

    protected function removendoDaBlackList(string $cpf): void
    {
        $blacklistRegistro = $this->buscarBlacklist($cpf);
        if ($blacklistRegistro) {
            $this->siapeBlackListServidorRepository->forceDelete($blacklistRegistro->id);
            SiapeLog::info('Registro removido da blacklist', ['cpf' => $cpf]);
        }
    }

    private function montaXmlUnidade($codigoDaUnidade)
    {
        return $this->service->getBuscarDadosSiapeUnidade()->getUorgAsXml(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $this->service->getOrgao(),
            $codigoDaUnidade
        );
    }

    private function montaXMLDadosFuncionais(string $cpf)
    {
        return $this->service->getBuscarDadosSiapeServidor()->consultaDadosFuncionais(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $cpf,
            $this->service->getOrgao(),
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );
    }

    private function montaXmlDadosPessoais(string $cpf)
    {
        return $this->service->getBuscarDadosSiapeServidor()->consultaDadosPessoais(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $cpf,
            $this->service->getOrgao(),
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );
    }

    private function validarCpf(string $cpf): bool
    {
        try {
            new Cpf($cpf);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    private function limparEValidarCpf(string $cpf): string
    {
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf);

        $validator = Validator::make(['cpf' => $cpfLimpo], [
            'cpf' => ['required', 'string', 'size:' . self::TAMANHO_CPF],
        ]);

        if ($validator->fails()) {
            SiapeLog::error('CPF com formato inválido', [
                'cpf_original' => $cpf,
                'cpf_limpo' => $cpfLimpo,
                'erros' => $validator->errors()->all()
            ]);
            throw new Exception("CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos.");
        }

        try {
            new Cpf($cpfLimpo);
        } catch (\Exception $e) {
            SiapeLog::error('Erro ao validar CPF', [
                'cpf_original' => $cpf,
                'erro' => $e->getMessage()
            ]);
            throw new Exception("CPF inválido: Dígito verificador incorreto ou inválido.");
        }

        return $cpfLimpo;
    }
}
