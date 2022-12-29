<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Capacidade;
use App\Services\CapacidadeService;
use App\Services\UtilService;
use DateTime;

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
        $util = new UtilService();
        $dadosCapacidades = $capacidadesService->capacidades;
        foreach ($dadosCapacidades as $registro) {
            for ($i = 1; $i < count($registro); $i++) {
                $id = $util::uuid($registro[$i].$registro[0]);
                $capacidade = Capacidade::where('id', $id)->first() ?? new Capacidade();
                $capacidade->fill([
                    'id' => $id,
                    'data_inicio' => new DateTime('2022/1/1'),
                    'data_fim' => null,
                    'perfil_id' => $util->uuid($registro[$i]),
                    'tipo_capacidade_id' => $util->uuid($registro[0])
                ]);
                $capacidade->save();
            }
        }
    }
}
