<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Capacidade;
use App\Services\CapacidadeService;

class CapacidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $capacidadesService = new CapacidadeService();
        // carrega os tipos de capacidades do vetor declarado no serviço TiposCapacidadesService
        // para a tabela tipos_capacidades no banco de dados
         $dadosCapacidades = $capacidadesService->capacidades;
         foreach($dadosCapacidades as $linha)
         {
             $registro = $linha;
             $capacidade = Capacidade::where('id', $registro[0])->first() ?? new Capacidade();
             $capacidade->fill([
                'id' => $registro[0],
                'data_inicio' => $registro[1],
                'perfil_id' => $registro[3],
                'tipo_capacidade_id' => $registro[4]
             ]);
             $capacidade->data_fim = $registro[2];
             $capacidade->save();
        }
    }
}
