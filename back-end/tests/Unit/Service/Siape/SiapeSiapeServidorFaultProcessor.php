<?php

use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Models\SiapeBlackListServidor;
use App\Services\Siape\SiapeServidorFaultProcessor;
use Illuminate\Support\Facades\Schema;

uses(Tests\TestCase::class);

beforeEach(function () {
    if (!Schema::hasTable('siape_blacklist_servidores')) {
        Schema::create('siape_blacklist_servidores', function ($table) {
            $table->uuid('id')->primary();
            $table->string('cpf');
            $table->text('response');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    $this->cpf = '12345678901';
    $this->responseString = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><soap:Fault><faultcode>0002</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Body></soap:Envelope>';
    $this->tipoDado = 'Dados Funcionais';
});

test('lança exceção quando fault é processável', function () {
    $xml = new SimpleXMLElement($this->responseString);
    $xml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');

    $processor = new SiapeServidorFaultProcessor($xml, $this->cpf, $this->responseString, $this->tipoDado);

    expect(fn() => $processor->process())
        ->toThrow(ErrorDataSiapeFaultCodeException::class, 'Não foi possível encontrar no SIAPE os Dados Funcionais do CPF informado.');
});

test('cria entrada na blacklist quando fault é processável', function () {
    $xml = new SimpleXMLElement($this->responseString);
    $xml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');

    $processor = new SiapeServidorFaultProcessor($xml, $this->cpf, $this->responseString, $this->tipoDado);

    try {
        $processor->process();
    } catch (ErrorDataSiapeFaultCodeException $e) {
        // Exceção esperada
    }

    expect(SiapeBlackListServidor::where('cpf', $this->cpf)->exists())->toBeTrue();
});

test('não lança exceção quando não existe fault', function () {
    $responseString = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><response>success</response></soap:Body></soap:Envelope>';
    $xml = new SimpleXMLElement($responseString);
    $xml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');

    $processor = new SiapeServidorFaultProcessor($xml, $this->cpf, $responseString, $this->tipoDado);

    expect(fn() => $processor->process())->not->toThrow(ErrorDataSiapeFaultCodeException::class);
});

test('não lança exceção quando fault code é diferente', function () {
    $responseString = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><soap:Fault><faultcode>0001</faultcode><faultstring>Não existem dados para consulta</faultstring></soap:Fault></soap:Body></soap:Envelope>';

    $xml = new SimpleXMLElement($responseString);
    $xml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');

    $processor = new SiapeServidorFaultProcessor($xml, $this->cpf, $responseString, $this->tipoDado);

    expect(fn() => $processor->process())->not->toThrow(ErrorDataSiapeFaultCodeException::class);
});

test('não lança exceção quando fault string não é catalogada', function () {
    $responseString = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><soap:Fault><faultcode>0002</faultcode><faultstring>Erro desconhecido</faultstring></soap:Fault></soap:Body></soap:Envelope>';

    $xml = new SimpleXMLElement($responseString);
    $xml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');

    $processor = new SiapeServidorFaultProcessor($xml, $this->cpf, $responseString, $this->tipoDado);

    expect(fn() => $processor->process())->not->toThrow(ErrorDataSiapeFaultCodeException::class);
});
