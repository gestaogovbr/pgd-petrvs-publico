<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AreaConhecimento;

class AreaConhecimentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas_conhecimentos = array(
            array(
                "id" => "007aef65-3957-4cbd-bb63-b664a1b0e727",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências Exatas e da Terra",
                "ativo" => 1,
            ),
            array(
                "id" => "069d2dbd-32e4-4320-a4ef-cfb0c2342161",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Linguística, Letras e Artes",
                "ativo" => 1,
            ),
            array(
                "id" => "20798491-07f2-417a-8029-1e431351cc44",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências Humanas",
                "ativo" => 1,
            ),
            array(
                "id" => "265d0a51-ac3b-4a81-b95b-36aa814e2d26",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências da Saúde",
                "ativo" => 1,
            ),
            array(
                "id" => "316eb1e1-bbd7-4743-ba9e-cfdcce4d681e",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Institucional",
                "ativo" => 1,
            ),
            array(
                "id" => "57a5496f-331d-4075-899c-1126b26be935",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências Agrárias",
                "ativo" => 1,
            ),
            array(
                "id" => "5bf02b75-1b99-4d7f-a9b3-5152a1c488ad",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Engenharias",
                "ativo" => 1,
            ),
            array(
                "id" => "6f4e3ecf-0ac5-40b5-ae68-5ec109683200",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências Biológicas",
                "ativo" => 1,
            ),
            array(
                "id" => "ac28f9d9-1231-458d-9746-77e226b9e645",
                "created_at" => "2024-02-23 14:55:53",
                "updated_at" => "2024-02-23 14:55:53",
                "deleted_at" => NULL,
                "nome" => "Ciências Sociais Aplicadas",
                "ativo" => 1,
            ),
        );
        AreaConhecimento::upsert($areas_conhecimentos, "id");
    }
}

