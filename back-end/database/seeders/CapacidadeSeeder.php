<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Capacidade;
use App\Services\CapacidadeService;
use App\Services\UtilService;

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
        $utilService = new UtilService();
        $dadosCapacidades = $capacidadesService->capacidades;
        foreach ($dadosCapacidades as $linha) {
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
