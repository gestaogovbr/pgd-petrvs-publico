<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoServidor;
use App\Models\SiapeBlackListServidores;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeListaServidores;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Str;


class BuscarDadosSiapeServidor extends BuscarDadosSiape
{
    const MAX_INSERT_DB = 1000;
    private function processar(): void
    {
        Log::info("Iniciando processamento de servidor...");

        $this->limpaTabela();
        $servidoresJaProcessadas = IntegracaoServidor::all();
        $blacklistServidores = SiapeBlackListServidores::all();

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
                $servidores[$servidor['cpf'].".".$servidor['dataUltimaTransacao']] = $servidor;

            }
        }

        $servidores = array_filter($servidores, function ($servidor) use ($servidoresJaProcessadas, $blacklistServidores) {

            $estaNaBlackList =  $blacklistServidores->firstWhere('cpf', $servidor['cpf']);
            if ($estaNaBlackList) {
                Log::alert("está na black list deverá ser ignorado: ".$servidor['cpf']);
                return false;
            }
            $servidorProcessado =  $servidoresJaProcessadas->firstWhere('cpf', $servidor['cpf']);

            if (!$servidorProcessado) {
                return true;
            }

            if(is_null($servidorProcessado->data_modificacao)){
                return true;
            }
            $dataModificacaoBD = $this->asTimestamp($servidorProcessado->data_modificacao);

            $dataModificacaoSiape = DateTime::createFromFormat('dmY', $servidor['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
            $dataModificacaoSiape  = $this->asTimestamp($dataModificacaoSiape);

            if ($dataModificacaoSiape > $dataModificacaoBD) {
                return true;
            }
            return false;
        });


        Log::info("Servidores a serem processadas: " . count($servidores));


        $this->executarRequisicoes($servidores);

        foreach ($response as $siapeListaServidores) {
            $siapeListaServidores->processado = 1;
            $siapeListaServidores->save();
        }

        Log::info("Finalizando processamento de servidor");

    }

    private function limpaTabela(): void
    {
        DB::table('siape_consultaDadosPessoais')->truncate();
        DB::table('siape_consultaDadosFuncionais')->truncate();
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
                'data_modificacao' => DateTime::createFromFormat('dmY', $dataUltimaTransacao)->format('Y-m-d 00:00:00'),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
        foreach($lotesInserts as $insert){
            SiapeConsultaDadosFuncionais::insert($insert);
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
                'data_modificacao' => DateTime::createFromFormat('dmY', $dataUltimaTransacao)->format('Y-m-d 00:00:00'),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
        $lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
        foreach($lotesInserts as $insert){
            SiapeConsultaDadosPessoais::insert($insert);
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
            Log::alert("resposta simples", $resposta);
            $respostas = $this->array_merge_recursive_distinct($respostas,  $resposta);
        }
        Log::alert("Respostas mesclada::", $respostas);
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

}


