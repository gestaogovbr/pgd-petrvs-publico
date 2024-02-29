<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CentroTreinamento;

class CentroTreinamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $centros_treinamentos = array(
            array(
                "id" => "34d72081-e99c-4a55-bbbb-75554541a93b",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "Não se aplica",
                "ativo" => 1,
            ),
            array(
                "id" => "50a3934f-10b8-4dc8-a257-4ac95d787755",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "CTSUL",
                "ativo" => 1,
            ),
            array(
                "id" => "532d3758-d1fd-4168-a862-e9c79b47d69d",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "UniPRF",
                "ativo" => 1,
            ),
            array(
                "id" => "56a24da2-2d80-4b75-ab14-8cbd9724f43c",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "CTRJ",
                "ativo" => 1,
            ),
            array(
                "id" => "7101cd02-c587-4d75-bcb5-a0cb125ec008",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "CTCO",
                "ativo" => 1,
            ),
            array(
                "id" => "83958a3b-c6b8-40c4-91da-3041d8f1d6a9",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "ENASP",
                "ativo" => 1,
            ),
            array(
                "id" => "e7cffb10-b991-49b6-81d7-505a9cd68519",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "CTNE",
                "ativo" => 1,
            ),
            array(
                "id" => "e914e6cb-a42c-41f7-adfa-bf66216d42f3",
                "created_at" => "2024-02-23 16:19:11",
                "updated_at" => "2024-02-23 16:19:11",
                "deleted_at" => NULL,
                "nome" => "ANP",
                "ativo" => 1,
            ),
        );
        CentroTreinamento::upsert($centros_treinamentos, "id");
    }
}

