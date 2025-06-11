<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Models\Entidade;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaServidores;
use App\Models\SiapeListaUORGS;
use App\Models\Unidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;
use DateTime;
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

        SiapeLog::info('Buscando a lista de urogs');

        $this->service->getBuscarDadosSiapeUnidades()->listaUorgs(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $codOrgao,
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );

        $uorgs = SiapeListaUORGS::where('processado', 0)
            ->orderBy('updated_at', 'desc')
            ->first();

        $listaUorgs = $this->service->getBuscarDadosSiapeUnidade()->getUnidades($uorgs);

        $unidade = collect($listaUorgs)->firstWhere('codigo', $codigoUnidade);

        SiapeLog::info('Salvando os dados da unidade');

        SiapeDadosUORG::insert([
            'id' => Str::uuid(),
            'data_modificacao' => DateTime::createFromFormat('dmY', $unidade['dataUltimaTransacao'])
                ->format('Y-m-d 00:00:00'),
            'response' => $dadosUnidadeResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);


        $integracaoService = new IntegracaoService([]);

        $entidades = Entidade::all();
        $inputs = [
            'unidades' => true,
            'servidores' => false,
            'gestores' => false,
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
        return $this->service->getBuscarDadosSiapeUnidade()->getUorgAsXml(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $this->service->getOrgao(),
            $codigoDaUnidade
        );
    }
    
}
