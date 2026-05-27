<?php

namespace App\Services\Sipec;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\DTOs\Sipec\ServidorSipecDTO;
use App\Facades\SiapeLog;
use App\Models\Usuario;
use App\Repository\EntidadeRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoServiceFactory;
use App\Services\SiapeBlackListServidorService;
use App\Services\ServiceBase;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use App\Services\Siape\Unidade\Atribuicao;
use Brazanation\Documents\Cpf;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SipecIndividualServidorService extends ServiceBase
{
    use Atribuicao;

    private const STATUS_SUCESSO = 'sucesso';
    private const STATUS_ERRO = 'erro';
    private const STATUS_PARCIAL = 'parcial';
    private const MSG_CONCLUIDO = 'Processamento concluído';
    private const TAMANHO_CPF = 11;

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

    public function __construct(
        $collection = null
    ) {
        $this->sipecService = app(SipecService::class);
        $this->blackListService = app(SiapeBlackListServidorService::class);
        $this->integracaoServiceFactory = app(IntegracaoServiceFactory::class);
        $this->entidadeRepository = app(EntidadeRepository::class);
        $this->unidadeRepository = app(UnidadeRepository::class);
        $this->unidadeIntegranteRepository = app(UnidadeIntegranteRepository::class);
        $this->unidadeIntegranteAtribuicaoRepository = app(UnidadeIntegranteAtribuicaoRepository::class);
        $this->usuarioRepository = app(UsuarioRepository::class);
        $this->cargaIndividualSiapeSubject = app(CargaIndividualSiapeSubject::class);
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
     * Executa o fluxo completo de sincronização via SIPEC para um servidor.
     *
     * @throws Exception
     */
    public function fluxoSipec(string $cpf): ?array
    {
        SiapeLog::info("SIPEC: Iniciando sincronização cpf #:{$cpf}");

        $this->resumo = null;
        $this->relatorioCarga = null;
        $processamentoId = (string) Str::uuid();
        $dadosRelatorio = ['dadosPessoais' => [], 'dadosFuncionais' => []];
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf) ?? $cpf;
        $usuariosAntes = [];

        try {
            $cpfLimpo = $this->limparEValidarCpf($cpf);
            $usuariosAntes = $this->capturarEstadoUsuarios($cpfLimpo);

            $servidorRaw = $this->buscarServidorNoSipec($cpfLimpo);

            if (!$servidorRaw) {
                throw new Exception("SIPEC: Servidor com CPF {$cpfLimpo} não encontrado na resposta da API.");
            }

            $dto = ServidorSipecDTO::fromArray($servidorRaw);
            $dadosFuncionais = [$dto->toDadosFuncionais()];
            $dadosPessoais = $dto->toDadosPessoais();

            $dadosRelatorio['dadosFuncionais'] = $dadosFuncionais;
            $dadosRelatorio['dadosPessoais'] = $dadosPessoais;

            $this->validarUnidadesExistem($dadosFuncionais);
            $this->atualizarVinculosUsuarios($cpfLimpo, $dadosFuncionais);
            $this->executarSincronizacaoFinal($cpfLimpo);

            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_SUCESSO);

            if (empty($this->resumo)) {
                $this->resumo[] = [
                    'status' => self::STATUS_PARCIAL,
                    'nome' => $dadosPessoais['nome'] ?? 'Servidor',
                    'usuario_existia' => false,
                    'usuario_inserido' => false,
                    'lotacao_associada' => false,
                    'alteracoes' => [],
                    'mensagem' => 'O CPF foi processado no SIPEC, porém o usuário não foi inserido no Petrvs.'
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

            return $this->resumo;

        } catch (Exception $e) {
            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_ERRO, $e->getMessage());
            $this->registrarRelatorioCarga(
                $processamentoId,
                $cpfLimpo,
                CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
                false,
                $dadosRelatorio,
                $e->getMessage()
            );
            throw $e;
        }
    }

    private function buscarServidorNoSipec(string $cpf): ?array
    {
        SiapeLog::info('SIPEC: Consultando API por CPF', ['cpf' => $cpf]);
        return $this->sipecService->buscarServidorPorCpf($cpf);
    }

    private function validarUnidadesExistem(array $dadosFuncionais): void
    {
        foreach ($dadosFuncionais as $dados) {
            $codigoUnidade = strval(intval($dados['codUorgExercicio'] ?? '0'));
            if (empty($codigoUnidade) || $codigoUnidade === '0') continue;

            if (!$this->unidadeRepository->existsByCodigo($codigoUnidade)) {
                throw new Exception(
                    "SIPEC: A unidade de código {$codigoUnidade} ainda não foi processada. " .
                    "É preciso fazer uma carga total na unidade primeiro."
                );
            }
        }
    }

    private function atualizarVinculosUsuarios(string $cpf, array $dadosFuncionais): void
    {
        SiapeLog::info('SIPEC: Atualizando vínculos', ['cpf' => $cpf]);

        $usuarios = $this->usuarioRepository->findAllByCpfUnfiltered($cpf);

        if ($usuarios->isEmpty()) {
            $this->blackListService->verificarERemover($cpf);
            return;
        }

        $matriculasSipec = array_filter(array_map(
            fn($dado) => $dado['matriculaSiape'] ?? null,
            $dadosFuncionais
        ));

        foreach ($usuarios as $usuario) {
            if (in_array($usuario->matricula, $matriculasSipec)) {
                $this->usuarioRepository->update($usuario->id, ['usuario_externo' => false]);
                $this->blackListService->verificarERemover($cpf, $usuario->matricula);
                if ($usuario->lotacao?->unidade) {
                    $this->removeTodasAsGestoesDoUsuario($usuario);
                }
                continue;
            }
            $this->blackListService->adicionar($cpf, $usuario->matricula, 'Adicionado automaticamente via integração SIPEC');
        }
    }

    private function executarSincronizacaoFinal(string $cpf): void
    {
        SiapeLog::info('SIPEC: Sincronização final', ['cpf' => $cpf]);

        $integracaoService = $this->integracaoServiceFactory->make([]);
        $entidades = $this->entidadeRepository->findAll();

        foreach ($entidades as $entidade) {
            $integracaoService->sincronizar([
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,
                'entidade' => $entidade->id
            ]);
        }
    }

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
    }

    private function statusRelatorioPorResumo(?array $resumo): string
    {
        if (collect($resumo ?? [])->contains(fn(array $item) => ($item['status'] ?? null) === self::STATUS_PARCIAL)) {
            return CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL;
        }
        return CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO;
    }

    private function capturarEstadoUsuarios(string $cpf): array
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

    private function gerarResumo(array $usuariosAntes, string $cpf, string $status, string $mensagem = self::MSG_CONCLUIDO): array
    {
        $resumo = [];
        $usuariosDepois = $this->usuarioRepository->findAllByCpfWithLotacao($cpf);
        $mapAntes = collect($usuariosAntes)->keyBy(fn($u) => $u['matricula'] ?? $u['id']);

        foreach ($usuariosDepois as $uDepois) {
            $key = $uDepois->matricula ?? $uDepois->id;
            $uAntes = $mapAntes->get($key);

            $item = [
                'status' => $status,
                'nome' => $uDepois->nome,
                'usuario_existia' => !!$uAntes,
                'usuario_inserido' => !$uAntes,
                'lotacao_associada' => !empty($uDepois->lotacao),
                'alteracoes' => $uAntes ? $this->detectarAlteracoes($uAntes, $uDepois) : [],
                'mensagem' => $mensagem
            ];

            if (!$item['lotacao_associada']) {
                $item['status'] = self::STATUS_PARCIAL;
                $item['mensagem'] .= ' (Lotação não associada)';
            }

            $resumo[] = $item;
        }

        return $resumo;
    }

    private function detectarAlteracoes(array $uAntes, Usuario $uDepois): array
    {
        $alteracoes = [];
        foreach (['nome', 'email', 'matricula', 'situacao_siape'] as $campo) {
            if (($uAntes[$campo] ?? null) != $uDepois->$campo) {
                $alteracoes[] = $campo;
            }
        }
        if (($uAntes['lotacao_id'] ?? null) != $uDepois->lotacao?->unidade_id) {
            $alteracoes[] = 'lotacao_id';
        }
        return $alteracoes;
    }

    private function limparEValidarCpf(string $cpf): string
    {
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf);

        $validator = Validator::make(['cpf' => $cpfLimpo], [
            'cpf' => ['required', 'string', 'size:' . self::TAMANHO_CPF],
        ]);

        if ($validator->fails()) {
            throw new Exception("CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos.");
        }

        try {
            new Cpf($cpfLimpo);
        } catch (\Exception $e) {
            throw new Exception("CPF inválido: Dígito verificador incorreto ou inválido.");
        }

        return $cpfLimpo;
    }
}
