<?php
namespace App\Services\Siape\BuscarDados;

use App\Models\SiapeListaServidores;
use App\Models\SiapeListaUORGS;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use SimpleXMLElement;

class BuscarDadosSiapeServidores extends BuscarDadosSiape{

    const MAX_INSERT_DB = 1000;
    public function buscaServidores(): void
    {
        Log::info("Iniciando busca de servidores...");

        $this->limpaTabela();

        $response = SiapeListaUORGS::where('processado', 1)
                ->orderBy('updated_at', 'desc')
                ->first();
                
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
        $inserts = [];
        foreach ($xmlResponse as $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
        foreach($lotesInserts as $insert){
            SiapeListaServidores::insert($insert);
        }

        Log::info("Busca de servidores finalizada.");
    }

    private function limpaTabela(): void
    {
        DB::table('siape_listaServidores')->truncate();
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

}