<?php

namespace App\Services;

use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use Illuminate\Support\Facades\File;

class SiapeIndividualService extends ServiceBase
{
    use LogTrait;

    private BuscarDadosSiapeServidor $buscarDadosSiapeServidor;
    private BuscarDadosSiapeUnidade $buscarDadosSiapeUnidade;
    private ProcessaDadosSiapeBD $processaDadosSiape;
    private BuscarDadosSiapeServidores $buscarDadosSiapeServidores;
    private BuscarDadosSiapeUnidades $buscarDadosSiapeUnidades;


    public mixed $config;

    public function __construct($collection = null)
    {
        parent::__construct($collection);
        $this->inicializaClassesNecessarias();
    }

    public function processaServidor(string $cpf)
    {
        $this->limpaLogSiape($cpf);

        return $this->SiapeIndividualServidorService->fluxoSiape($cpf, $this);
    }

    public function processaUnidade(string $codUnidade)
    {
        $this->limpaLogSiape($codUnidade);

        return $this->SiapeIndividualUnidadeService->fluxoSiape($codUnidade, $this);
    }

    private function inicializaClassesNecessarias()
    {
        $this->config = config("integracao")["siape"];
        $this->buscarDadosSiapeServidor = new BuscarDadosSiapeServidor($this->config);
        $this->buscarDadosSiapeUnidade = new BuscarDadosSiapeUnidade($this->config);
        $this->buscarDadosSiapeServidores = new BuscarDadosSiapeServidores($this->config);
        $this->buscarDadosSiapeUnidades = new BuscarDadosSiapeUnidades($this->config);
        $this->processaDadosSiape = new ProcessaDadosSiapeBD();
    }

    private function limpaLogSiape(string $cpf)
    {
        $logPath = storage_path('logs/siape.log');

        if (File::exists($logPath)) {
            File::put($logPath, '');
        }


    }


    private function getOrgao() {
        return strval(intval($this->config['codOrgao']));
    }

    
    public function getBuscarDadosSiapeServidor(): BuscarDadosSiapeServidor{
        return $this->buscarDadosSiapeServidor;
    }
    public function getBuscarDadosSiapeUnidade(): BuscarDadosSiapeUnidade{
        return $this->buscarDadosSiapeUnidade;
    }
    public function getProcessaDadosSiape(): ProcessaDadosSiapeBD{
        return $this->processaDadosSiape;
    }
    public function getBuscarDadosSiapeServidores(): BuscarDadosSiapeServidores{
        return $this->buscarDadosSiapeServidores;
    }
    public function getBuscarDadosSiapeUnidades(): BuscarDadosSiapeUnidades{
        return $this->buscarDadosSiapeUnidades;
    }
}
