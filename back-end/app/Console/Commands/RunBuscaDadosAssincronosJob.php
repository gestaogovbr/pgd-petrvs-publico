<?php

namespace App\Console\Commands;

use App\Jobs\BuscadoDadosSiapeAssincronoJob;
use Illuminate\Console\Command;

class RunBuscaDadosAssincronosJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-busca-dados-assincronos-job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para sincronizar os dados do SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        dispatch(new \App\Jobs\BuscadoDadosSiapeAssincronoJob());
        $classe = new \App\Jobs\BuscadoDadosSiapeAssincronoJob();
        $classe->handle();
        $this->info('Job executado com sucesso.');
    }
}
