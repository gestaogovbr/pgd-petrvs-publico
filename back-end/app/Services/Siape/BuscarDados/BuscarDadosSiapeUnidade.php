<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoUnidade;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaUORGS;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Str;

class BuscarDadosSiapeUnidade extends BuscarDadosSiape
{
    private function limpaTabela(): void
    {
        DB::table('siape_dadosUORG')->truncate();
    }

    private function insertDados($xmlResponse) {

        foreach ($xmlResponse as $dados => $xml) {
            $dados = explode(".", $dados);
            $dataultimaAtualizacao = $dados[1];

            SiapeDadosUORG::insert([
                'id' => Str::uuid(),
                'data_modificacao' => DateTime::createFromFormat('dmY', $dataultimaAtualizacao)->format('Y-m-d 00:00:00'),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }

    private function getUnidadesAsXML($unidades)
    {
        $xmlUnidades = [];
        foreach ($unidades as $unidade) {
            $codigoSiape = $unidade['codigo'];
            $codOrgao = strval(intval($this->getConfig()['codOrgao']));

            $xmlUnidades[$unidade['codigo'].".".$unidade['dataUltimaTransacao']] =  
                $this->getUorgAsXml(
                    $this->getConfig()['siglaSistema'],
                    $this->getConfig()['nomeSistema'],
                    $this->getConfig()['senha'],
                    $this->getCpf(),
                    $codOrgao,
                    $codigoSiape
                );
        }

       return $xmlUnidades;
    }

    public function getUnidades(SiapeListaUORGS $listaUorgs) : ?array {
        try {
            $xmlResponse = $this->prepareResponseXml($listaUorgs->response);
        } catch (\Exception $e) {
            Log::error('Erro ao processar XML na carga da Unidade', [$e->getMessage()]);
            return null;
        }
        $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $xmlResponse->registerXPathNamespace('ns2', 'http://entidade.wssiapenet');
        $uorgs = $xmlResponse->xpath('//ns2:Uorg');
        return array_map([$this, 'simpleXmlElementToArray'], $uorgs);
    }

    public function getUorgAsXml(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao,
        $siapeCodUorg
    ): string {
        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $dadosUorg = $body->addChild('ser:dadosUorg');
        $dadosUorg->addChild('siglaSistema', $siapeSiglaSistema);
        $dadosUorg->addChild('nomeSistema', $siapeNomeSistema);
        $dadosUorg->addChild('senha', $siapeSenha);
        $dadosUorg->addChild('cpf', $cpf);
        $dadosUorg->addChild('codOrgao', $siapeCodOrgao);
        $dadosUorg->addChild('codUorg', $siapeCodUorg);

        return $xml->asXML();
    }

    public function buscarUnidades(array $xmlUnidades) : bool
    {
        $lotes = array_chunk($xmlUnidades, $this->getQtdMaxRequisicoes(), true);
        $tempoInicial = microtime(true);

        foreach ($lotes as $i => $lote) {
            Log::info('Lote '.($i + 1).' de '.count($lotes));

            $response = $this->executaRequisicoes($lote);

            $this->insertDados($response);

            unset($response);
        }

        $tempoFinal = microtime(true);
        $tempoTotal = $tempoFinal - $tempoInicial;
        Log::info("Tempo total de execução: " . $tempoTotal. " segundos");
        return true;
    }  

    public function enviar(): void
    {
        Log::info("Processamento de Unidade iniciado");

        $this->limpaTabela();
        
        $unidadesJaProcessadas = IntegracaoUnidade::all();

        $uorgs = SiapeListaUORGS::where('processado', 0)
                ->orderBy('updated_at', 'desc')
                ->first();

        $unidades = $this->getUnidades($uorgs);

        if(!$unidades){
            Log::info("Nenhuma unidade encontrada.");
            return;
        }

        $unidades = array_filter($unidades, function ($unidade) use ($unidadesJaProcessadas) 
        {
           $unidadeProcessada =  $unidadesJaProcessadas->firstWhere('codigo_siape', $unidade['codigo']);

           if(!$unidadeProcessada){
                return true;
            }

            if(is_null($unidadeProcessada->data_modificacao)){
                return true;
            }

            $dataModificacaoBD = $this->asTimestamp($unidadeProcessada->data_modificacao);
            $dataModificacaoSiape = DateTime::createFromFormat('dmY', $unidade['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
            $dataModificacaoSiape  = $this->asTimestamp($dataModificacaoSiape);

            if($dataModificacaoSiape > $dataModificacaoBD){
                return true;
            }
            return false;

        });
        
        Log::info("Unidades a serem processadas: " . count($unidades));

        $unidadesXML = $this->getUnidadesAsXML($unidades);

        $this->buscarUnidades($unidadesXML);

        /*$inserts = [];
        foreach ($xmlResponse as $dados => $xml) {
            $dados = explode(".", $dados);
            $dataultimaAtualizacao = $dados[1];
            array_push($inserts, [
                'id' => Str::uuid(),
                'data_modificacao' => DateTime::createFromFormat('dmY', $dataultimaAtualizacao)->format('Y-m-d 00:00:00'),
                'response' => $xml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
        SiapeDadosUORG::insert($inserts);
        */

        $uorgs->processado = 1;
        $uorgs->save();

        Log::info("Processamento de Unidade finalizado.");
    }
}
