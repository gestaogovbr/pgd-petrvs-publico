<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Repository\EntidadeRepository;
use App\Repository\SiapeDadosUORGRepository;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SiapeIndividualUnidadeService extends ServiceBase
{
    use LogTrait;

    private SiapeIndividualService $service;

    public function __construct(
        protected SiapeDadosUORGRepository $siapeDadosUORGRepository,
        protected EntidadeRepository $entidadeRepository,
        protected IntegracaoServiceFactory $integracaoServiceFactory,
        $collection = null
    ) {
        parent::__construct($collection);
    }

    public function fluxoSiape(string $codigoUnidade, SiapeIndividualService $service)
    {
        SiapeLog::info('Iniciando o processo de sincronização da unidade #:' . $codigoUnidade);

        $this->service = $service;

        SiapeLog::info('Limpando tabelas de controle do SIAPE para a unidade');

        $this->siapeDadosUORGRepository->forceDeleteProcessados();

        $codigoUnidade = preg_replace('/[^0-9]/', '', $codigoUnidade);

        SiapeLog::info('Montando XML dos dados da unidade');

        $xmlDadosDaUnidade = $this->montaXmlUnidade($codigoUnidade);

        SiapeLog::info('Executando requisição no SIAPE');

        $dadosUnidadeResponseXml = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlDadosDaUnidade); //xml

        $codUorg = $this->getCodigoFromXML($dadosUnidadeResponseXml);

        SiapeLog::info('Dados da unidade recebidos do SIAPE', ['response' => $dadosUnidadeResponseXml]);

        SiapeLog::info('Buscando a lista de urogs');


        SiapeLog::info('Salvando os dados da unidade');

        $this->siapeDadosUORGRepository->create([    
            'id' => Str::uuid(),
            'data_modificacao' => today(),
            'codigo' => $codUorg,
            'response' => $dadosUnidadeResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);


        $integracaoService = $this->integracaoServiceFactory->make();

        $entidades = $this->entidadeRepository->findAll();
        $inputs = [
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
        ];
        $retorno = [];
        foreach ($entidades as $entidade) {
            $inputs['entidade'] = $entidade->id;
            $retorno = $integracaoService->sincronizar($inputs);
        }

        return $retorno;
    }

    private function getCodigoFromXML(string $xmlResponse): ?string
    {
        $xml = simplexml_load_string($xmlResponse);
        $xml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $result = $xml->xpath('//ent:codUorg');

        return $result ? ltrim((string) $result[0], '0') : null;
    }


    private function montaXmlUnidade($codigoDaUnidade)
    {
        $orgao =  strval(intval($this->service->config['codOrgao']));

        return $this->service->getBuscarDadosSiapeUnidade()->getUorgAsXml(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $orgao,
            $codigoDaUnidade
        );
    }
    
}
