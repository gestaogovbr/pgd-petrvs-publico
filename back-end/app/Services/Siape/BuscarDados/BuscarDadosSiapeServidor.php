<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoServidor;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeListaServidores;
use Carbon\Carbon;
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
            ->orderBy('updated_at', 'desc')->get();

        if (!$response) {
            Log::info("Nenhum servidor a ser processado");
            return;
        }

        $servidores = [];
        foreach ($response as $siapeListaServidores) {
            $siapeListaServidoresArray = $this->getServidores($siapeListaServidores);
            if(!$siapeListaServidoresArray){
                continue;
            }
            foreach ($siapeListaServidoresArray as $servidor) {
                $servidores[$servidor['cpf']] = $servidor;

            }
        }
        reset($servidores);
        Log::info("teste um servidor: ", [key($servidores)]);

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

        // $servidores = array_slice($servidores, 0, 10, true);//teste  

        // Log::info("ret: " , [$servidores] );
        // return;

        $this->executarRequisicoes($servidores);
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
            $xmlsServidores[$servidor['cpf']] = $xml;
            // array_push($xmlsServidores, $xml);
        }
        // Log::info("xmlsServidores", [$xmlsServidores]);

        $xmlResponse = $this->BuscaDados($xmlsServidores);

        $inserts = [];
        foreach ($xmlResponse as $cpf => $xml) {
            array_push($inserts, [
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
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
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
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

    private function BuscaDados(array $xmlsServidores)
    {
        $lotes = array_chunk($xmlsServidores, self::QUANTIDADE_MAXIMA_REQUISICOES, true);
        $tempoInicial = microtime(true);
        $respostas = [];
        foreach ($lotes as $lote) {
            $resposta = $this->executaRequisicoes($lote);
            $respostas = $this->array_merge_recursive_distinct($respostas,  $resposta);
            // $respostas = array_merge($respostas,  $resposta);
            Log::info("Reposta da requisição::", [$respostas]);
        }
        $tempoFinal = microtime(true);
        $tempoTotal = $tempoFinal - $tempoInicial;
        Log::info("Dados funcionais: Tempo total de execução: " . $tempoTotal . " segundos");
        return $respostas;
    }



    private function getServidores(SiapeListaServidores $response) : ?array
    {
        try {
            $xmlResponse = $this->prepareResponseXml($response->response);
        } catch (\Exception $e) {
            Log::error('Erro ao processar XML', [$e->getMessage()]);
            return null;
        }

        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');

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
                // Se a chave já existe no primeiro array, criamos uma nova chave
                $array1[] = $value;
            } else {
                // Caso contrário, apenas adicionamos a chave/valor do segundo array
                $array1[$key] = $value;
            }
        }
    
        return $array1;
    }
}


