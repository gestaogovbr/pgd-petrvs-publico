<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaAtividadeExterna;

class AreaAtividadeExternaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas_atividades_externas = array(
            array(
                "id" => "22505a05-f206-45a0-bcc7-abdd2c92b359",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Direito",
                "ativo" => 1,
            ),
            array(
                "id" => "28991dc3-93a5-427d-8cf3-38a58536ee76",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Saúde",
                "ativo" => 1,
            ),
            array(
                "id" => "482eb329-9a1d-43e1-98e1-a5e064cc94c9",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Polícia Militar",
                "ativo" => 1,
            ),
            array(
                "id" => "53d74db6-ba70-4459-a687-4ac4863ff1aa",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Forças Armadas",
                "ativo" => 1,
            ),
            array(
                "id" => "6ff702a7-d135-4eef-b394-8f98cb95c69c",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Polícia Civil",
                "ativo" => 1,
            ),
            array(
                "id" => "8afc66fe-99e6-407d-8526-ef39da0f70bc",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Administração",
                "ativo" => 1,
            ),
            array(
                "id" => "8e1fcf28-6177-4414-a0dd-914b72dabee9",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Gestão",
                "ativo" => 1,
            ),
            array(
                "id" => "93499a2c-3e8c-4469-91f9-c6bac8662e00",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Docência",
                "ativo" => 1,
            ),
            array(
                "id" => "97f4cde6-9f52-4c5b-88d7-0d1cd23d54a9",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Tecnologia",
                "ativo" => 1,
            ),
            array(
                "id" => "d7cced56-803d-40fd-b824-901017e1eb68",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Esporte de Alto Nível",
                "ativo" => 1,
            ),
            array(
                "id" => "f045add7-613c-4910-9d82-43b4d463c5d8",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Guarda Municipal",
                "ativo" => 1,
            ),
        );

        foreach ($areas_atividades_externas as $area) {
            AreaAtividadeExterna::firstOrCreate(['id' => $area['id']], $area);
        }


    }
}

