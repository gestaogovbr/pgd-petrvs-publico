<?php

namespace App\Services\Siape\BuscarDados;

use App\Models\SiapeListaUORGS;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\DB;

class BuscarDadosSiapeUnidades extends BuscarDadosSiape
{
    public function listaUorgs(
        $siapeSiglaSistema,
        $siapeNomeSistema,
        $siapeSenha,
        $cpf,
        $siapeCodOrgao
    ): void {
        Log::info("Busca das Unidades iniciada");
        
        $this->limpaTabela();

        $xml = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet"/>');
        $body = $xml->addChild('soapenv:Body');
        $listaUorgs = $body->addChild('ser:listaUorgs');
        $listaUorgs->addChild('siglaSistema', $siapeSiglaSistema);
        $listaUorgs->addChild('nomeSistema', $siapeNomeSistema);
        $listaUorgs->addChild('senha', $siapeSenha);
        $listaUorgs->addChild('cpf', $cpf);
        $listaUorgs->addChild('codOrgao', $siapeCodOrgao);
        $listaUorgs->addChild('codUorg', null);

        $xmlData = $xml->asXML();

        $xmlResponse =  $this->buscaSincrona($xmlData);
        $entidade = SiapeListaUORGS::create(['response' => $xmlResponse]);
        $entidade->save();

        Log::info("Busca das unidades finalizada");
    }

    private function limpaTabela(): void
    {
        DB::table('siape_listaUORG')->truncate();
    }

    

    public function enviar(): void
    {
        $codOrgao = strval(intval($this->getConfig()['codOrgao']));

        $this->listaUorgs(
            $this->getConfig()['siglaSistema'],
            $this->getConfig()['nomeSistema'],
            $this->getConfig()['senha'],
            $this->getCpf(),
            $codOrgao
        );
    }
}
