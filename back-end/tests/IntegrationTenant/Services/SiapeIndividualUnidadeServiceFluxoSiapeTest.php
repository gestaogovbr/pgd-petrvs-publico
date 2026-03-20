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

    $this->registroProcessado = SiapeDadosUORG::factory()->processado()->create();
});

afterEach(function () {
    Mockery::close();
});

describe('SiapeIndividualUnidadeService::fluxoSiape', function () {
    test('insere SiapeDadosUORG com codigo correto e remove processados para codUorg válido', function () {
        $codigo = (string) rand(1, 999);
        $codUorg = str_pad($codigo, 6, '0', STR_PAD_LEFT);

        $soapResponse = <<<XML
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
                    <out xmlns="">
                        <codUorg xmlns="http://entidade.wssiapenet">$codUorg</codUorg>
                    </out>
                </ns1:dadosUorgResponse>
            </soap:Body>
        </soap:Envelope>
        XML;

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->not->toBeNull();

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapResponse);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape($codigo, $this->mockSiapeService);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->toBeNull();

        $inserted = SiapeDadosUORG::where('codigo', $codigo)->first();
        expect($inserted)->not->toBeNull();
        expect($inserted->codigo)->toBe($codigo);
    });

    test('insere SiapeDadosUORG com codigo null e remove processados quando SIAPE retorna fault', function () {
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

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->not->toBeNull();

        $this->mockBuscarUnidade->shouldReceive('executaRequisicao')
            ->andReturn($soapFault);

        $service = app(SiapeIndividualUnidadeService::class);
        $service->fluxoSiape('codigo invalido', $this->mockSiapeService);

        expect(SiapeDadosUORG::withTrashed()->find($this->registroProcessado->id))->toBeNull();

        $inserted = SiapeDadosUORG::whereNull('codigo')->first();
        expect($inserted)->not->toBeNull();
        expect($inserted->codigo)->toBeNull();
        expect($inserted->response)->toContain('faultstring');
    });
});
