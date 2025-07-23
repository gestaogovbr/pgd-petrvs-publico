<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Models\Entidade;
use App\Models\SiapeDadosUORG;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SiapeIndividualUnidadeService extends ServiceBase
{
    use LogTrait;

    private SiapeIndividualService $service;

    public function fluxoSiape(string $codigoUnidade, SiapeIndividualService $service)
    {
        SiapeLog::info('Iniciando o processo de sincronização da unidade #:' . $codigoUnidade);

        $this->service = $service;

        SiapeLog::info('Limpando tabelas de controle do SIAPE para a unidade');

        SiapeDadosUORG::withTrashed()->where('processado', 1)->forceDelete();

        $codigoUnidade = preg_replace('/[^0-9]/', '', $codigoUnidade);

        $codOrgao = strval(intval($this->service->config['codOrgao']));

        SiapeLog::info('Montando XML dos dadosda unidade');

        $xmlDadosDaUnidade = $this->montaXmlUnidade($codigoUnidade);

        SiapeLog::info('Executando requisição no SIAPE');

        $dadosUnidadeResponseXml = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlDadosDaUnidade); //xml

        SiapeLog::info('Dados da unidade recebidos do SIAPE', ['response' => $dadosUnidadeResponseXml]);

        SiapeLog::info('Buscando a lista de urogs');


        SiapeLog::info('Salvando os dados da unidade');

        SiapeDadosUORG::insert([    
            'id' => Str::uuid(),
            'data_modificacao' => today(),
            'response' => $dadosUnidadeResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);


        $integracaoService = new IntegracaoService([]);

        $entidades = Entidade::all();
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
