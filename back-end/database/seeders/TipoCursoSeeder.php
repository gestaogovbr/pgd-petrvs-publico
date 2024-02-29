<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoCurso;

class TipoCursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipos_cursos = array(
            array(
                "id" => "4374817d-f495-4e61-b20f-1b6e69a3c4df",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Corregedoria",
                "ativo" => 1,
            ),
            array(
                "id" => "65b8f2dd-a6e5-40f9-8d1f-832490274ee2",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Administração e Logística",
                "ativo" => 1,
            ),
            array(
                "id" => "82a8b5b2-c28a-472b-93da-d8615dd117f8",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Institucional",
                "ativo" => 1,
            ),
            array(
                "id" => "bb646dda-769b-4577-aa99-c1b867fcfa58",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Operacional",
                "ativo" => 1,
            ),
            array(
                "id" => "c8772ff1-caf7-4ed3-82f0-340ac5f2f263",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Executiva",
                "ativo" => 1,
            ),
            array(
                "id" => "de855fbd-36a5-400d-a1e9-4bac37615ecf",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Gestão de Pessoas",
                "ativo" => 1,
            ),
            array(
                "id" => "df37fc79-5be1-4222-bc00-30c7fff01147",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Inteligência",
                "ativo" => 1,
            ),
            array(
                "id" => "f91092a1-5609-492c-b244-5a16ea2a53e8",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "Acadêmico",
                "ativo" => 1,
            ),
            array(
                "id" => "fb2f7ef7-1450-439e-9839-4e3858583348",
                "created_at" => "2024-02-23 16:19:08",
                "updated_at" => "2024-02-23 16:19:08",
                "deleted_at" => NULL,
                "nome" => "TI e Comunicação",
                "ativo" => 1,
            ),
        );
        TipoCurso::upsert($tipos_cursos, "id");
    }
}

