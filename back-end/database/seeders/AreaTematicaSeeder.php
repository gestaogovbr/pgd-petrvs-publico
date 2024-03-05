<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaTematica;

class AreaTematicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas_tematicas = array(
            array(
                "id" => "01054cac-6c83-4b1a-9a61-9a55d6d660e1",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Gestão de Pessoas",
                "ativo" => 1,
            ),
            array(
                "id" => "20720107-0637-4af9-a65b-6e2ea7ad4045",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Operações",
                "ativo" => 1,
            ),
            array(
                "id" => "532b0964-e1e9-49e5-8b95-f154ba31612e",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Administração e Logística",
                "ativo" => 1,
            ),
            array(
                "id" => "538b1db9-d3f0-494c-af65-a1c652c41618",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Inteligência",
                "ativo" => 1,
            ),
            array(
                "id" => "85079dfc-eb1a-4547-b5bb-0c2e94e36d01",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Governança",
                "ativo" => 1,
            ),
            array(
                "id" => "85cab9dc-6a00-4b98-a8b4-2e8097c731b3",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Ensino",
                "ativo" => 1,
            ),
            array(
                "id" => "95932a0e-6e4c-44cf-8b3c-dc56e7312920",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Corregedoria",
                "ativo" => 1,
            ),
            array(
                "id" => "980ba84c-2757-40f3-b3a2-6df4eb45ff73",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Tecnologia",
                "ativo" => 1,
            ),
            array(
                "id" => "a2454f6d-36a8-4881-b052-7cac3917d2ac",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Articulação",
                "ativo" => 1,
            ),
            array(
                "id" => "c6c9d997-7bd2-4630-938d-5568f9a88caf",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Comunicação",
                "ativo" => 1,
            ),
        );

        foreach ($areas_tematicas as $area) {
            AreaTematica::firstOrCreate(['id' => $area['id']], $area);
        }
    }
}

