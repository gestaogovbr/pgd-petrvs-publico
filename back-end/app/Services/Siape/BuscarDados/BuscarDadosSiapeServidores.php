<?php
namespace App\Services\Siape\BuscarDados;

use App\Models\IntegracaoUnidade;
use App\Models\SiapeListaServidores;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use SimpleXMLElement;

class BuscarDadosSiapeServidores extends BuscarDadosSiape{


    public function buscaServidores(): void
    {
        $unidades = IntegracaoUnidade::all();

        $xmlsUnidades = [];
        foreach ($unidades as $unidade) {
            $codigoSiape = $unidade->codigo_siape;
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
        SiapeListaServidores::insert($inserts);
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
        $lotes = array_chunk($xmlsData, self::QUANTIDADE_MAXIMA_REQUISICOES, true);
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

}