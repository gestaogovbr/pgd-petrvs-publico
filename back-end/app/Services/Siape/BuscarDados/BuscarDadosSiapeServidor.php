<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoServidor;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeListaServidores;
use DateTime;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Str;

class BuscarDadosSiapeServidor extends BuscarDadosSiape
{

    private function processar(): void
    {
        $servidoresJaProcessadas = IntegracaoServidor::all();

        $response = SiapeListaServidores::where('processado', 0)
            ->orderBy('updated_at', 'desc')
            ->first();

        $servidores = $this->getServidores($response);

        $servidores = array_filter($servidores, function ($servidor) use ($servidoresJaProcessadas) {

            $unidadeProcessada =  $servidoresJaProcessadas->firstWhere('cpf', $servidor['cpf']);

            if (!$unidadeProcessada) {
                return true;
            }

            $dataModificacaoBD = $this->asTimestamp($unidadeProcessada->data_modificacao);

            $dataModificacaoSiape = DateTime::createFromFormat('dmY', $servidor['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
            $dataModificacaoSiape  = $this->asTimestamp($dataModificacaoSiape);

            if ($dataModificacaoSiape > $dataModificacaoBD) {
                return true;
            }
            return false;
        });

        Log::info("Unidades a serem processadas: " . count($servidores));

        $this->executarRequisicoes($servidores);
    }

    private function executarRequisicoes(array $servidores): void
    {
        $this->executarRequisicoesDadosFuncionais($servidores);
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
            $xmlsServidores[$servidor['cpf']] = $xml;
            // array_push($xmlsServidores, $xml);
        }

        $xmlResponse = $this->BuscaDados($xmlsServidores);

        $inserts = [];
        foreach ($xmlResponse as $cpf => $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'response' => $xml
            ]);
        }
        SiapeConsultaDadosFuncionais::insert($inserts);

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
            $xmlsServidores[$servidor['cpf']] = $xml;
            // array_push($xmlsServidores, $xml);
        }

        $xmlResponse = $this->BuscaDados($xmlsServidores);

        $inserts = [];
        foreach ($xmlResponse as $cpf => $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'response' => $xml
            ]);
        }
        SiapeConsultaDadosPessoais::insert($inserts);

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

    private function BuscaDados(array $xmlsServidores){
        $lotes = array_chunk($xmlsServidores, self::QUANTIDADE_MAXIMA_REQUISICOES);
        $tempoInicial = microtime(true);
        $respostas = [];
        foreach ($lotes as $lote) {
            $respostas = array_merge($respostas, $this->executaRequisicoes($lote));
        }
        $tempoFinal = microtime(true);
        $tempoTotal = $tempoFinal - $tempoInicial;
        Log::info("Dados funcionais: Tempo total de execução: " . $tempoTotal. " segundos");
        return $respostas;
    }

    

    private function getServidores(SiapeListaServidores $response)
    {

        $xmlResponse = $this->prepareResponseXml($response->response);
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');

        $servidores = $xmlResponse->xpath('//ns2:Servidor');

        $servidoresArray = array_map([$this, 'simpleXmlElementToArray'], $servidores);

        return $servidoresArray;
    }


    public function enviar(): void {
        $this->processar();
    }
}
