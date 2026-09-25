<?php
namespace App\Services\Siape\BuscarDados;

use App\Models\SiapeListaUORGS;
use App\Repository\SiapeListaServidores\Contracts\SiapeListaServidoresWriteRepositoryContract;
use App\Repository\SiapeListaUORGS\Contracts\SiapeListaUORGSReadRepositoryContract;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use SimpleXMLElement;
use App\Services\CodigoOrgaoService;

class BuscarDadosSiapeServidores extends BuscarDadosSiape{

    const MAX_INSERT_DB = 1000;

    public function __construct(
        mixed $config,
        private readonly ?SiapeListaUORGSReadRepositoryContract $listaUorgsReadRepository = null,
        private readonly ?SiapeListaServidoresWriteRepositoryContract $listaServidoresWriteRepository = null,
    ) {
        parent::__construct($config);
    }

    public function buscaServidores(): void
    {
        Log::info("Iniciando busca de servidores...");

        $codigoOrgao = CodigoOrgaoService::obrigatorio($this->getConfig()['codOrgao'] ?? null);
        $response = $this->listaUorgsRead()->findLatestProcessed($codigoOrgao);
                
        if(!$response){
            Log::info("Nenhuma unidade encontrada.");
            return;
        }

        $unidades = $this->getUnidades($response);  
        
        if(!$unidades){
            Log::info("Nenhuma unidade encontrada.");
            return;
        }


        $xmlsUnidades = [];
        foreach ($unidades as $unidade) {
            $codigoSiape = $unidade['codigo'];
            $codOrgao = strval(intval($this->getConfig()['codOrgao']));

            array_push($xmlsUnidades, $this->listaServidores(
                $this->getConfig()['siglaSistema'],
                $this->getConfig()['nomeSistema'],
                $this->getConfig()['senha'],
                $this->getCpf(),
                $codOrgao,
                $codigoSiape
            ));
        }

        $xmlResponse =  $this->BuscaSiape($xmlsUnidades);
        if (count($xmlResponse) !== count($xmlsUnidades)) {
            Log::warning('Lista de servidores não substituída: nem todas as UORGs responderam ao SIAPE.', [
                'requisicoes' => count($xmlsUnidades),
                'respostas' => count($xmlResponse),
            ]);
            return;
        }

        $inserts = [];
        foreach ($xmlResponse as $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $this->substituirSnapshot($inserts);

        Log::info("Busca de servidores finalizada.");
    }

    /** @param array<int, array<string, mixed>> $inserts */
    private function substituirSnapshot(array $inserts): void
    {
        $this->listaServidoresWrite()->replaceSnapshot($inserts, self::MAX_INSERT_DB);
    }

    public function listaServidores(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $siapeCpf,
        $siapeCodOrgao,
        $codigoSiape
    ): string {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaServidores = $body->addChild('ser:listaServidores');
        $listaServidores->addChild('siglaSistema', $siapeSiglaSistema);
        $listaServidores->addChild('nomeSistema', $siapeNomeSistema);
        $listaServidores->addChild('senha', $siapeSenha);
        $listaServidores->addChild('cpf', $siapeCpf);
        $listaServidores->addChild('codOrgao', $siapeCodOrgao);
        $listaServidores->addChild('codUorg', $codigoSiape);

        $xmlData = $xml->asXML();
        return $xmlData;
    }

    private function buscaSiape($xmlsData): array
    {
        $lotes = array_chunk($xmlsData, $this->getQtdMaxRequisicoes(), true);
        $tempoInicial = microtime(true);
        $respostas = [];
        foreach ($lotes as $lote) {
            $respostas = array_merge($respostas, $this->executaRequisicoes($lote));
        }
        $tempoFinal = microtime(true);
        $tempoTotal = $tempoFinal - $tempoInicial;
        Log::info("Tempo total de execução: " . $tempoTotal. " segundos");
        return $respostas;
    }

    public function enviar(): void
    {
        $this->buscaServidores();
    }

    private function getUnidades(SiapeListaUORGS $response) : ?array {
        try {
            $xmlResponse = $this->prepareResponseXml($response->response);
        } catch (\Exception $e) {
            Log::error('Erro ao processar XML das Unidades', [$e->getMessage()]);
            return null;
        }
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');
        $uorgs = $xmlResponse->xpath('//ns2:Uorg');
        return array_map([$this, 'simpleXmlElementToArray'], $uorgs);
    }

    private function listaUorgsRead(): SiapeListaUORGSReadRepositoryContract
    {
        return $this->listaUorgsReadRepository ?? app(SiapeListaUORGSReadRepositoryContract::class);
    }

    private function listaServidoresWrite(): SiapeListaServidoresWriteRepositoryContract
    {
        return $this->listaServidoresWriteRepository ?? app(SiapeListaServidoresWriteRepositoryContract::class);
    }
}
