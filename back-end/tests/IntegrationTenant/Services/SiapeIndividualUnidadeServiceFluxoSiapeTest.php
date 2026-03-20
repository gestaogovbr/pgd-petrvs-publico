<?php

use App\Models\SiapeDadosUORG;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualUnidadeService;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use Illuminate\Support\Facades\Log;
use Mockery;

beforeEach(function () {
    SiapeDadosUORG::query()->forceDelete();

    Log::shouldReceive('channel')->with('siape')->andReturnSelf();
    Log::shouldReceive('info')->withAnyArgs();

    $this->mockBuscarUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
    $this->mockBuscarUnidade->shouldReceive('getUorgAsXml')->andReturn('<xml/>');
    $this->mockBuscarUnidade->shouldReceive('getCpf')->andReturn('00000000000');

    $this->mockSiapeService = Mockery::mock(SiapeIndividualService::class);
    $this->mockSiapeService->config = [
        'codOrgao' => '40211',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'TESTE',
        'senha' => 'TESTE',
    ];
    $this->mockSiapeService->shouldReceive('getBuscarDadosSiapeUnidade')
        ->andReturn($this->mockBuscarUnidade);
});

afterEach(function () {
    Mockery::close();
});

describe('SiapeIndividualUnidadeService::fluxoSiape', function () {
    test('insere SiapeDadosUORG com codigo 38 para codUorg válido', function () {
        $soapResponse = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                    <out xmlns="">
                        <codUorg xmlns="http://entidade.wssiapenet">000038</codUorg>
                    </out>
                </ns1:dadosUorgResponse>
            </soap:Body>
        </soap:Envelope>
        XML;

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapResponse);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape('38', $this->mockSiapeService);

        $this->assertDatabaseHas('siape_dadosUORG', ['codigo' => '38'], 'tenant');
        expect(SiapeDadosUORG::where('codigo', '38')->count())->toBe(1);
    });

    test('insere SiapeDadosUORG com codigo null quando SIAPE retorna fault', function () {
        $soapFault = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <soap:Body>
                <soap:Fault>
                    <faultcode>0002</faultcode>
                    <faultstring>Não existem dados para consulta</faultstring>
                </soap:Fault>
            </soap:Body>
        </soap:Envelope>
        XML;

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapFault);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape('codigo invalido', $this->mockSiapeService);

        $inserted = SiapeDadosUORG::whereNull('codigo')->first();

        expect($inserted)->not->toBeNull();
        expect($inserted->codigo)->toBeNull();
        expect($inserted->response)->toContain('faultstring');
    });
});
