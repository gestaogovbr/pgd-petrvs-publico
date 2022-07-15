<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCapacidade;
use App\Services\TipoCapacidadeService;

class TipoCapacidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tiposCapacidadesService = new TipoCapacidadeService();
        // carrega os tipos de capacidades do vetor declarado no serviço TiposCapacidadesService
         $dadosTiposCapacidades = $tiposCapacidadesService->tiposCapacidades;
         foreach($dadosTiposCapacidades as $linha)
         {
             $registro = $linha;
             $tipocapacidade = TipoCapacidade::where('id', $registro[0])->first() ?? new TipoCapacidade();
             $tipocapacidade->fill([
                 'id' => $registro[0],
                 'codigo' => $registro[1],
                 'descricao' => $registro[2]
             ]);
             $tipocapacidade->save();
         }
    }
}
