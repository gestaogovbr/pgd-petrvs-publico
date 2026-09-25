<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\SiapeListaServidores;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;
use App\Repository\SiapeConsultaDadosFuncionais\Contracts\SiapeConsultaDadosFuncionaisWriteRepositoryContract;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisWriteRepositoryContract;
use App\Repository\SiapeListaServidores\Contracts\SiapeListaServidoresReadRepositoryContract;
use App\Repository\SiapeListaServidores\Contracts\SiapeListaServidoresWriteRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Support\SiapeDate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Services\CodigoOrgaoService;
use SimpleXMLElement;

class BuscarDadosSiapeServidor extends BuscarDadosSiape
{
    const MAX_INSERT_DB = 1000;

    public function __construct(
        mixed $config,
        private readonly ?SiapeListaServidoresReadRepositoryContract $listaServidoresReadRepository = null,
        private readonly ?SiapeListaServidoresWriteRepositoryContract $listaServidoresWriteRepository = null,
        private readonly ?IntegracaoServidorReadRepositoryContract $integracaoServidorReadRepository = null,
        private readonly ?SiapeBlackListServidorReadRepositoryContract $blacklistReadRepository = null,
        private readonly ?UsuarioReadRepositoryContract $usuarioReadRepository = null,
        private readonly ?SiapeConsultaDadosPessoaisWriteRepositoryContract $dadosPessoaisWriteRepository = null,
        private readonly ?SiapeConsultaDadosFuncionaisWriteRepositoryContract $dadosFuncionaisWriteRepository = null,
    ) {
        parent::__construct($config);
    }

    private function processar(): void
    {
        Log::info("Iniciando processamento de servidor...");

        $this->limpaTabela();
        $codigoOrgao = CodigoOrgaoService::obrigatorio($this->getConfig()['codOrgao'] ?? null);

        $response = $this->listaServidoresRead()->pendentes();

        if ($response->isEmpty()) {
            Log::info("Nenhum servidor a ser processado");
            return;
        }

        $snapshotCompleto = true;
        $servidoresPorCpf = [];

        foreach ($response as $siapeListaServidores) {
            $siapeListaServidoresArray = $this->getServidores($siapeListaServidores);

            if ($siapeListaServidoresArray === null) {
                $snapshotCompleto = false;
                continue;
            }

            foreach ($siapeListaServidoresArray as $servidor) {
                if (!$this->servidorDaListaValido($servidor)) {
                    $snapshotCompleto = false;
                    continue;
                }

                $cpf = $servidor['cpf'];
                $servidorAtual = $servidoresPorCpf[$cpf] ?? null;
                if ($servidorAtual === null || $this->servidorMaisRecente($servidor, $servidorAtual)) {
                    $servidoresPorCpf[$cpf] = $servidor;
                }
            }
        }

        $cpfsBlacklistPendente = array_fill_keys($this->blacklistRead()->cpfsByProcessedStatus(false), true);
        $cpfsBlacklistDefinitiva = array_fill_keys($this->blacklistRead()->cpfsByProcessedStatus(true), true);
        $cpfsNaBlacklist = $cpfsBlacklistPendente + $cpfsBlacklistDefinitiva;
        $datasProcessadasPorCpf = $this->datasProcessadasPorCpf($codigoOrgao);
        $servidores = [];

        foreach ($servidoresPorCpf as $cpf => $servidor) {
            if (
                isset($cpfsBlacklistPendente[$cpf])
                || $this->servidorPrecisaAtualizacao($servidor, $datasProcessadasPorCpf[$cpf] ?? null)
            ) {
                $servidores[$cpf] = $servidor;
            }
        }

        $this->adicionarCandidatosAusentesSeSnapshotCompleto(
            $snapshotCompleto,
            $servidores,
            array_fill_keys(array_keys($servidoresPorCpf), true),
            $cpfsNaBlacklist,
            array_fill_keys(array_keys($datasProcessadasPorCpf), true)
        );

        Log::info("Servidores a serem processados: " . count($servidores));

        $this->executarRequisicoes($servidores);

        $this->listaServidoresWrite()->markProcessados($response->modelKeys());

        Log::info("Finalizando processamento de servidor");
    }

    /** @param array<string, string> $servidor */
    private function servidorDaListaValido(array $servidor): bool
    {
        if (empty($servidor['cpf']) || empty($servidor['dataUltimaTransacao'])) {
            return false;
        }

        return SiapeDate::dataUltimaTransacaoParaBanco($servidor['dataUltimaTransacao']) !== null;
    }

    /**
     * @param array<string, string> $servidor
     * @param array<string, string> $servidorAtual
     */
    private function servidorMaisRecente(array $servidor, array $servidorAtual): bool
    {
        $data = SiapeDate::dataUltimaTransacaoParaBancoOuFalha($servidor['dataUltimaTransacao']);
        $dataAtual = SiapeDate::dataUltimaTransacaoParaBancoOuFalha($servidorAtual['dataUltimaTransacao']);

        return $this->asTimestamp($data) > $this->asTimestamp($dataAtual);
    }

    /** @return array<string, string|null> */
    private function datasProcessadasPorCpf(string $codigoOrgao): array
    {
        return $this->integracaoServidorRead()->datasMaisRecentesPorCpf($codigoOrgao);
    }

    /** @param array<string, string> $servidor */
    private function servidorPrecisaAtualizacao(array $servidor, ?string $dataProcessada): bool
    {
        if ($dataProcessada === null) {
            return true;
        }

        $dataModificacaoSiape = SiapeDate::dataUltimaTransacaoParaBancoOuFalha($servidor['dataUltimaTransacao']);

        return $this->asTimestamp($dataModificacaoSiape) > $this->asTimestamp($dataProcessada);
    }

    /**
     * @param array<string, array<string, string>> $servidores
     * @param array<string, bool> $cpfsRetornados
     * @param array<string, bool> $cpfsNaBlacklist
     * @param array<string, bool> $cpfsGerenciadosPeloSiape
     */
    private function adicionarCandidatosAusentesSeSnapshotCompleto(
        bool $snapshotCompleto,
        array &$servidores,
        array $cpfsRetornados,
        array $cpfsNaBlacklist,
        array $cpfsGerenciadosPeloSiape
    ): void {
        if (!$snapshotCompleto) {
            Log::warning('Reconciliação de servidores ausentes ignorada: snapshot da lista SIAPE incompleto ou inválido.');
            return;
        }

        $this->adicionarCandidatosAusentes(
            $servidores,
            $cpfsRetornados,
            $cpfsNaBlacklist,
            $cpfsGerenciadosPeloSiape
        );
    }

    /**
     * @param array<string, array<string, string>> $servidores
     * @param array<string, bool> $cpfsRetornados
     * @param array<string, bool> $cpfsNaBlacklist
     * @param array<string, bool> $cpfsGerenciadosPeloSiape
     */
    private function adicionarCandidatosAusentes(
        array &$servidores,
        array $cpfsRetornados,
        array $cpfsNaBlacklist,
        array $cpfsGerenciadosPeloSiape
    ): void {
        $cpfsCandidatos = $this->usuarioRead()->cpfsAtivosGerenciadosPeloSiape();

        $dataReconsulta = now()->format('dmY');
        $candidatos = [];
        foreach ($cpfsCandidatos as $cpf) {
            if (
                !isset($cpfsGerenciadosPeloSiape[$cpf])
                || isset($cpfsRetornados[$cpf])
                || isset($cpfsNaBlacklist[$cpf])
            ) {
                continue;
            }

            $candidatos[$cpf] = [
                'cpf' => $cpf,
                'dataUltimaTransacao' => $dataReconsulta,
            ];
        }

        $quantidadeCandidatos = count($candidatos);
        $limiteCandidatos = (int) config('integracao.siape.reconciliacao_servidores_max_candidatos');
        if ($quantidadeCandidatos > $limiteCandidatos) {
            Log::warning('Reconciliação de servidores ausentes interrompida pelo limite de segurança.', [
                'candidatos' => $quantidadeCandidatos,
                'limite' => $limiteCandidatos,
            ]);
            return;
        }

        $servidores = array_replace($servidores, $candidatos);

        Log::info("Servidores ausentes candidatos à confirmação individual: {$quantidadeCandidatos}");
    }

    private function limpaTabela(): void
    {
        $this->dadosPessoaisWrite()->truncate();
        $this->dadosFuncionaisWrite()->truncate();
    }

    private function executarRequisicoes(array $servidores): void
    {
        $this->executarRequisicoesDadosFuncionais($servidores);

        $this->executarRequisicoesDadosPessoais($servidores);
    }

    private function executarRequisicoesDadosFuncionais(array $servidores): void
    {
        $xmlsServidores = [];
        foreach ($servidores as $servidor) {
            $codOrgao = strval(intval($this->getConfig()['codOrgao']));
            $xml = $this->consultaDadosFuncionais(
                $this->getConfig()['siglaSistema'],
                $this->getConfig()['nomeSistema'],
                $this->getConfig()['senha'],
                $servidor['cpf'],
                $codOrgao,
                $this->getConfig()['parmExistPag'],
                $this->getConfig()['parmTipoVinculo']
            );
            $xmlsServidores[$servidor['cpf'].".".$servidor['dataUltimaTransacao']] = $xml;
        }

        Log::info('Busca de Dados Funcionais');
        $xmlResponse = $this->buscaDados($xmlsServidores);

        $inserts = [];
        foreach ($xmlResponse as $dados => $xml) {
            $dadosArray = explode(".", $dados);
            $cpf = $dadosArray[0];
            $dataUltimaTransacao = $dadosArray[1];

            array_push($inserts, [
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'data_modificacao' => SiapeDate::dataUltimaTransacaoParaBancoOuFalha($dataUltimaTransacao),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
        foreach($lotesInserts as $insert){
            $this->dadosFuncionaisWrite()->insertMany($insert);
        }
    }

    private function executarRequisicoesDadosPessoais(array $servidores): void
    {
        $xmlsServidores = [];
        foreach ($servidores as $servidor) {
            $codOrgao = strval(intval($this->getConfig()['codOrgao']));
            $xml = $this->consultaDadosPessoais(
                $this->getConfig()['siglaSistema'],
                $this->getConfig()['nomeSistema'],
                $this->getConfig()['senha'],
                $servidor['cpf'],
                $codOrgao,
                $this->getConfig()['parmExistPag'],
                $this->getConfig()['parmTipoVinculo']
            );
            $xmlsServidores[$servidor['cpf'].".".$servidor['dataUltimaTransacao']] = $xml;
        }

        Log::info('Busca de Dados Pessoais');
        $xmlResponse = $this->buscaDados($xmlsServidores);

        $inserts = [];
        foreach ($xmlResponse as $dados => $xml) {
            $dadosArray = explode(".", $dados);
            $cpf = $dadosArray[0];
            $dataUltimaTransacao = $dadosArray[1];
            array_push($inserts, [
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'data_modificacao' => SiapeDate::dataUltimaTransacaoParaBancoOuFalha($dataUltimaTransacao),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
        $lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
        foreach($lotesInserts as $insert){
            $this->dadosPessoaisWrite()->insertMany($insert);
        }
    }

    public function consultaDadosFuncionais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): string {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $consultaDadosFuncionais = $body->addChild('ser:consultaDadosFuncionais');
        $consultaDadosFuncionais->addChild('siglaSistema', $siapeSiglaSistema);
        $consultaDadosFuncionais->addChild('nomeSistema', $siapeNomeSistema);
        $consultaDadosFuncionais->addChild('senha', $siapeSenha);
        $consultaDadosFuncionais->addChild('cpf', $cpf);
        $consultaDadosFuncionais->addChild('codOrgao', $siapeCodOrgao);
        $consultaDadosFuncionais->addChild('parmExistPag', $siapeParmExistPag);
        $consultaDadosFuncionais->addChild('parmTipoVinculo', $siapeParmTipoVinculo);

        return $xml->asXML();
    }

    public function consultaDadosPessoais(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeParmExistPag,
        $siapeParmTipoVinculo
    ): string {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $consultaDadosPessoais = $body->addChild('ser:consultaDadosPessoais');
        $consultaDadosPessoais->addChild('siglaSistema', $siapeSiglaSistema);
        $consultaDadosPessoais->addChild('nomeSistema', $siapeNomeSistema);
        $consultaDadosPessoais->addChild('senha', $siapeSenha);
        $consultaDadosPessoais->addChild('cpf', $cpf);
        $consultaDadosPessoais->addChild('codOrgao', $siapeCodOrgao);
        $consultaDadosPessoais->addChild('parmExistPag', $siapeParmExistPag);
        $consultaDadosPessoais->addChild('parmTipoVinculo', $siapeParmTipoVinculo);

        return $xml->asXML();
    }

    // a partir de um array de servidores, divide em lote e busca os dados
    private function buscaDados(array $xmlsServidores)
    {
        $lotes = array_chunk($xmlsServidores, $this->getQtdMaxRequisicoes(), true);
        $tempoInicial = microtime(true);
        $respostas = [];
        foreach ($lotes as $i => $lote) {
            Log::info('Lote '.($i + 1).' de '.count($lotes));
            $resposta = $this->executaRequisicoes($lote);
            Log::info('Lote SIAPE recebido.', ['respostas' => count($resposta)]);
            $respostas = $this->array_merge_recursive_distinct($respostas,  $resposta);
        }
        Log::info('Respostas SIAPE consolidadas.', ['respostas' => count($respostas)]);
        $tempoFinal = microtime(true);
        $tempoTotal = $tempoFinal - $tempoInicial;
        Log::info("Dados funcionais: Tempo total de execução: " . $tempoTotal . " segundos");
        return $respostas;
    }

    public function getServidores(SiapeListaServidores $response) : ?array
    {
        try {
            $xmlResponse = $this->prepareResponseXml($response->response);
        } catch (\Exception $e) {
            report($e);
            Log::error('Erro ao processar XML dos Servidores', [$e->getMessage()]);
            return null;
        }

        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');

        if ($xmlResponse->xpath('//soap:Fault') || !$xmlResponse->xpath('//ns1:listaServidoresResponse')) {
            Log::warning('Resposta inválida ao listar servidores no SIAPE.');
            return null;
        }

        $servidores = $xmlResponse->xpath('//ns2:Servidor');

        $servidoresArray = array_map([$this, 'simpleXmlElementToArray'], $servidores);

        return $servidoresArray;
    }


    public function enviar(): void
    {
        $this->processar();
    }


    private function array_merge_recursive_distinct($array1, $array2) {
        foreach ($array2 as $key => $value) {
            if (array_key_exists($key, $array1)) {
                $array1[] = $value;
            } else {
                $array1[$key] = $value;
            }
        }

        return $array1;
    }

    private function listaServidoresRead(): SiapeListaServidoresReadRepositoryContract
    {
        return $this->listaServidoresReadRepository ?? app(SiapeListaServidoresReadRepositoryContract::class);
    }

    private function listaServidoresWrite(): SiapeListaServidoresWriteRepositoryContract
    {
        return $this->listaServidoresWriteRepository ?? app(SiapeListaServidoresWriteRepositoryContract::class);
    }

    private function integracaoServidorRead(): IntegracaoServidorReadRepositoryContract
    {
        return $this->integracaoServidorReadRepository ?? app(IntegracaoServidorReadRepositoryContract::class);
    }

    private function blacklistRead(): SiapeBlackListServidorReadRepositoryContract
    {
        return $this->blacklistReadRepository ?? app(SiapeBlackListServidorReadRepositoryContract::class);
    }

    private function usuarioRead(): UsuarioReadRepositoryContract
    {
        return $this->usuarioReadRepository ?? app(UsuarioReadRepositoryContract::class);
    }

    private function dadosPessoaisWrite(): SiapeConsultaDadosPessoaisWriteRepositoryContract
    {
        return $this->dadosPessoaisWriteRepository ?? app(SiapeConsultaDadosPessoaisWriteRepositoryContract::class);
    }

    private function dadosFuncionaisWrite(): SiapeConsultaDadosFuncionaisWriteRepositoryContract
    {
        return $this->dadosFuncionaisWriteRepository ?? app(SiapeConsultaDadosFuncionaisWriteRepositoryContract::class);
    }
}
