<?php

namespace App\Services;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Facades\SiapeLog;
use App\Models\Entidade;
use App\Models\IntegracaoUnidade;
use App\Models\Unidade;
use App\Repository\EntidadeRepository;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\SiapeDadosUORGRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Services\Siape\CargaIndividual\CargaIndividualSiapeSubject;
use Exception;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use function Symfony\Component\String\s;

class SiapeIndividualUnidadeService extends ServiceBase
{
    use LogTrait;

    private const STATUS_SUCESSO = 'sucesso';
    private const STATUS_ERRO = 'erro';
    private const STATUS_PARCIAL = 'parcial';
    private const MSG_CONCLUIDO = 'Processamento da unidade concluído';

    private SiapeIndividualService $service;

    /** @var array<int, array<string, mixed>>|null */
    private ?array $resumo = null;
    private ?array $relatorioCarga = null;

    public function __construct(
        protected SiapeDadosUORGRepository $siapeDadosUORGRepository,
        protected EntidadeRepository $entidadeRepository,
        protected IntegracaoServiceFactory $integracaoServiceFactory,
        protected UnidadeRepository $unidadeRepository,
        protected UnidadeIntegranteRepository $unidadeIntegranteRepository,
        protected IntegracaoUnidadeRepository $integracaoUnidadeRepository,
        protected CargaIndividualSiapeSubject $cargaIndividualSiapeSubject,
        $collection = null
    ) {
        parent::__construct($collection);
    }

    /**
     * @return array<int, array<string, mixed>>|null
     */
    public function getResumo(): ?array
    {
        return $this->resumo;
    }

    public function getRelatorioCarga(): ?array
    {
        return $this->relatorioCarga;
    }

    /**
     * @return mixed
     */
    public function fluxoSiape(string $codigoUnidade, SiapeIndividualService $service)
    {
        SiapeLog::info('Iniciando o processo de sincronização da unidade #:' . $codigoUnidade);

        $this->service = $service;
        $this->resumo = null;
        $this->relatorioCarga = null;
        $processamentoId = (string) Str::uuid();
        $dadosRelatorio = [];
        $entradaValida = false;
        $codigoUnidade = $this->normalizarCodigoUnidade($codigoUnidade);
        $unidadeAntes = $this->capturarEstadoUnidade($codigoUnidade);

        try {
            SiapeLog::info('Limpando tabelas de controle do SIAPE para a unidade');

            $this->siapeDadosUORGRepository->forceDeleteProcessados();

            SiapeLog::info('Montando XML dos dados da unidade');

            $xmlDadosDaUnidade = $this->montaXmlUnidade($codigoUnidade);

            SiapeLog::info('Executando requisição no SIAPE');

            $dadosUnidadeResponseXml = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlDadosDaUnidade); //xml

            $codUorg = $this->getCodigoFromXML($dadosUnidadeResponseXml);
            $codigoProcessado = $codUorg ?? $codigoUnidade;
            $dadosRelatorio = $this->extrairDadosUnidadeRelatorio($dadosUnidadeResponseXml);
            $entradaValida = !empty($dadosRelatorio['codUorg']);

            SiapeLog::info('Dados da unidade recebidos do SIAPE', ['response' => $dadosUnidadeResponseXml]);

            SiapeLog::info('Buscando a lista de urogs');

            SiapeLog::info('Salvando os dados da unidade');

        $this->siapeDadosUORGRepository->create([
            'id' => Str::uuid(),
            'data_modificacao' => today(),
            'codigo' => $codUorg,
            'response' => $dadosUnidadeResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

            $this->siapeDadosUORGRepository->create([
                'id' => Str::uuid(),
                'data_modificacao' => today(),
                'codigo' => $codUorg,
                'response' => $dadosUnidadeResponseXml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $integracaoService = $this->integracaoServiceFactory->make();

            $entidades = $this->entidadeRepository->findAll();
            $inputs = [
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,
            ];
            $retorno = [];
            foreach ($entidades as $entidade) {
                /** @var Entidade $entidade */
                $inputs['entidade'] = (string) $entidade->id;
                $retorno = $integracaoService->sincronizar($inputs);
            }

            $this->resumo = [
                $this->montarItemResumo(
                    $codigoProcessado,
                    $unidadeAntes,
                    $this->capturarEstadoUnidade($codigoProcessado),
                    self::STATUS_SUCESSO,
                    self::MSG_CONCLUIDO
                )
            ];

            $this->registrarRelatorioCarga(
                $processamentoId,
                $codigoProcessado,
                $entradaValida ? CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO : CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
                $entradaValida,
                $dadosRelatorio,
                $entradaValida ? null : 'Não existem dados para consulta'
            );

            return $retorno;
        } catch (Exception $e) {
            $this->resumo = [
                $this->montarItemResumo(
                    $codigoUnidade,
                    $unidadeAntes,
                    $this->capturarEstadoUnidade($codigoUnidade),
                    self::STATUS_ERRO,
                    $e->getMessage()
                )
            ];

            $this->registrarRelatorioCarga(
                $processamentoId,
                $codigoUnidade,
                CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO,
                false,
                $dadosRelatorio,
                $e->getMessage()
            );

            throw $e;
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function relatorioProcessamento(string $codigoUnidade): array
    {
        $codigoUnidade = $this->normalizarCodigoUnidade($codigoUnidade);
        $unidade = $this->unidadeRepository->findByCodigo($codigoUnidade);

        if (!$unidade instanceof Unidade) {
            throw new Exception("Unidade {$codigoUnidade} não encontrada no Petrvs.");
        }

        $snapshot = $this->snapshotUnidade($unidade);

        return [
            'success' => true,
            'chefeCpf' => $this->buscarChefeCpf($codigoUnidade),
            'quantidadeServidoresLotados' => $this->unidadeIntegranteRepository->countLotadosByUnidade($unidade->id),
            'unidade' => [
                'id' => $snapshot['id'],
                'codigo' => $snapshot['codigo'],
                'sigla' => $snapshot['sigla'],
                'nome' => $snapshot['nome'],
                'unidade_pai_id' => $snapshot['unidade_pai_id'],
                'unidade_pai_codigo' => $snapshot['unidade_pai_codigo'],
                'unidade_pai_sigla' => $snapshot['unidade_pai_sigla'],
                'unidade_raiz' => $snapshot['unidade_raiz'],
            ],
        ];
    }

    private function getCodigoFromXML(string $xmlResponse): ?string
    {
        $xml = simplexml_load_string($xmlResponse);
        if ($xml === false) {
            return null;
        }

        $xml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $result = $xml->xpath('//ent:codUorg');

        if (!$result) {
            return null;
        }

        $codigo = ltrim((string) $result[0], '0');

        return $codigo !== '' ? $codigo : null;
    }

    private function normalizarCodigoUnidade(string $codigoUnidade): string
    {
        return preg_replace('/[^0-9]/', '', $codigoUnidade) ?? '';
    }

    /**
     * @return array<string, mixed>|null
     */
    private function capturarEstadoUnidade(string $codigoUnidade): ?array
    {
        $unidade = $this->unidadeRepository->findByCodigo($codigoUnidade);

        return $unidade instanceof Unidade ? $this->snapshotUnidade($unidade) : null;
    }

    /**
     * @return array<string, mixed>
     */
    private function snapshotUnidade(Unidade $unidade): array
    {
        $unidade->loadMissing('unidadePai');

        return [
            'id' => $unidade->id,
            'codigo' => $unidade->codigo,
            'sigla' => $unidade->sigla,
            'nome' => $unidade->nome,
            'unidade_pai_id' => $unidade->unidade_pai_id,
            'unidade_pai_codigo' => $unidade->unidadePai?->codigo,
            'unidade_pai_sigla' => $unidade->unidadePai?->sigla,
            'unidade_raiz' => $unidade->unidade_pai_id === null,
        ];
    }

    /**
     * @param array<string, mixed>|null $unidadeAntes
     * @param array<string, mixed>|null $unidadeDepois
     * @return array<string, mixed>
     */
    private function montarItemResumo(
        string $codigoUnidade,
        ?array $unidadeAntes,
        ?array $unidadeDepois,
        string $status,
        string $mensagem
    ): array {
        if (!$unidadeDepois) {
            return [
                'status' => $status === self::STATUS_ERRO ? self::STATUS_ERRO : self::STATUS_PARCIAL,
                'mensagem' => $status === self::STATUS_ERRO ? $mensagem : 'Unidade processada, mas não localizada no Petrvs.',
                'unidade_codigo' => $codigoUnidade,
                'unidade_nome' => null,
                'unidade_sigla' => null,
                'unidade_existia' => $unidadeAntes !== null,
                'unidade_inserida' => false,
                'unidade_pai_id' => null,
                'unidade_pai_codigo' => null,
                'unidade_pai_sigla' => null,
                'unidade_raiz' => null,
                'quantidade_servidores_lotados' => null,
                'chefe_cpf' => $this->buscarChefeCpf($codigoUnidade),
                'alteracoes' => [],
            ];
        }

        return [
            'status' => $status,
            'mensagem' => $mensagem,
            'unidade_codigo' => $unidadeDepois['codigo'],
            'unidade_nome' => $unidadeDepois['nome'],
            'unidade_sigla' => $unidadeDepois['sigla'],
            'unidade_existia' => $unidadeAntes !== null,
            'unidade_inserida' => $unidadeAntes === null,
            'unidade_pai_id' => $unidadeDepois['unidade_pai_id'],
            'unidade_pai_codigo' => $unidadeDepois['unidade_pai_codigo'],
            'unidade_pai_sigla' => $unidadeDepois['unidade_pai_sigla'],
            'unidade_raiz' => $unidadeDepois['unidade_raiz'],
            'quantidade_servidores_lotados' => $this->unidadeIntegranteRepository->countLotadosByUnidade((string) $unidadeDepois['id']),
            'chefe_cpf' => $this->buscarChefeCpf((string) $unidadeDepois['codigo']),
            'alteracoes' => $this->detectarAlteracoes($unidadeAntes, $unidadeDepois),
        ];
    }

    /**
     * @param array<string, mixed>|null $unidadeAntes
     * @param array<string, mixed> $unidadeDepois
     * @return array<int, string>
     */
    private function detectarAlteracoes(?array $unidadeAntes, array $unidadeDepois): array
    {
        if (!$unidadeAntes) {
            return [];
        }

        $alteracoes = [];
        foreach (['codigo', 'nome', 'sigla', 'unidade_pai_id'] as $campo) {
            if (($unidadeAntes[$campo] ?? null) !== ($unidadeDepois[$campo] ?? null)) {
                $alteracoes[] = $campo;
            }
        }

        return $alteracoes;
    }

    private function buscarChefeCpf(string $codigoUnidade): ?string
    {
        $registro = $this->integracaoUnidadeRepository->findByCodigo($codigoUnidade);

        if (!$registro instanceof IntegracaoUnidade || empty($registro->cpf_titular_autoridade_uorg)) {
            return null;
        }

        $cpf = preg_replace('/[^0-9]/', '', $registro->cpf_titular_autoridade_uorg);

        return $cpf !== '' ? $cpf : null;
    }

    /**
     * @return array<string, mixed>
     */
    private function extrairDadosUnidadeRelatorio(string $xmlResponse): array
    {
        $xml = simplexml_load_string($xmlResponse);
        if ($xml === false) {
            return [];
        }

        $xml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $dados = [];
        foreach ([
            'codUorg',
            'codUorgPai',
            'nomeExtendido',
            'siglaUorg',
            'dataUltimaTransacao',
            'cpfTitularAutoridadeUorg',
        ] as $campo) {
            $result = $xml->xpath('//ent:' . $campo);
            if ($result && isset($result[0])) {
                $dados[$campo] = (string) $result[0];
            }
        }

        return $dados;
    }

    /**
     * @param array<string, mixed> $dadosRelatorio
     */
    private function registrarRelatorioCarga(
        string $processamentoId,
        string $codigoUnidade,
        string $status,
        bool $entradaValida,
        array $dadosRelatorio,
        ?string $mensagemErro
    ): void {
        $relatorio = $this->cargaIndividualSiapeSubject->notificar(new CargaIndividualSiapeProcessamentoDTO(
            processamentoId: $processamentoId,
            tipo: CargaIndividualSiapeProcessamentoDTO::TIPO_UNIDADE,
            chave: $codigoUnidade,
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

    private function montaXmlUnidade($codigoDaUnidade)
    {
        $orgao =  strval(intval($this->service->config['codOrgao']));

        return $this->service->getBuscarDadosSiapeUnidade()->getUorgAsXml(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $orgao,
            $codigoDaUnidade
        );
    }

}
