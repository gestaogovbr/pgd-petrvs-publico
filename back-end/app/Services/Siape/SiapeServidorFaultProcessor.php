<?php

namespace App\Services\Siape;

use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Models\SiapeBlackListServidor;
use App\Services\Siape\Erros;
use Illuminate\Support\Str;
use SimpleXMLElement;

enum TipoDadoServidorSiape: string
{
    case FUNCIONAL = 'Dados Funcionais';
    case PESSOAL = 'Dados Pessoais';
}

class SiapeServidorFaultProcessor
{
    private SimpleXMLElement $responseXml;
    private string $cpf;
    private string $responseString;
    private string $tipoDado;

    public function __construct(SimpleXMLElement $responseXml, string $cpf, string $responseString, string $tipoDado)
    {
        $this->responseXml = $responseXml;
        $this->cpf = $cpf;
        $this->responseString = $responseString;
        $this->tipoDado = TipoDadoServidorSiape::tryFrom($tipoDado)->value ?? 'Dados';
    }

    public function process()
    {
        $fault = $this->responseXml->xpath('//soap:Fault');
        if ($this->isFaultProcessavel($fault)) {
            SiapeBlackListServidor::firstOrCreate(
                ['cpf' => $this->cpf],
                ['id' => (string) Str::uuid(), 'response' => $this->responseString]
            );

            throw new ErrorDataSiapeFaultCodeException($this->errorMessage());
        }
    }

    private function isFaultProcessavel($fault): bool
    {
        return $fault
            && isset($fault[0]->faultcode)
            && (string) $fault[0]->faultcode === Erros::faultcode
            && isset($fault[0]->faultstring)
            && $this->isFaultStringCatalogada($fault);
    }

    private function isFaultStringCatalogada($fault): bool
    {
        $faultString = trim((string) $fault[0]->faultstring);
        $faultStrings = Erros::getFaultStringNaoExistemDados();
        return in_array($faultString, $faultStrings, true)
            || in_array(html_entity_decode($faultString, ENT_QUOTES | ENT_HTML5, 'UTF-8'), $faultStrings, true);
    }

    private function errorMessage(): string
    {
        return "Não foi possível encontrar no SIAPE os {$this->tipoDado} do CPF informado.";
    }
}
