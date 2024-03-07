<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Funcao;

class FuncaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $funcoes = array(

            array(
                "id" => "09d3f00f-f35b-4c23-b398-8661a8e06247",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "0a805a78-ea9c-45df-b146-ba54c1346b28",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe Substituto",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
          /*  array(
                "id" => "09d3f00f-f35b-4c23-b398-8661a8e06247",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Superintendente",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "0a805a78-ea9c-45df-b146-ba54c1346b28",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Diretor",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "1a9ca9c2-fb7d-4a04-bfeb-f35d917099e4",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Coordenador",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "21f85bec-e818-434b-bf56-f77bc3770e59",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe de Seção",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "45a8285f-05b6-4124-b3f4-958700346f3e",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe de Setor",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "612d1757-d293-4039-972f-282c528b5878",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "NPF",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "8c08374b-4665-4baa-ac0a-60552d664830",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Diretor Geral",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "8f14ac1a-b2a3-4240-b988-6b5bc5d7e388",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe de Núcleo",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "99a555ee-6670-4e26-aceb-851aefd7627c",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe de Divisão",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "9cbaa3e8-f9f6-4a7c-9778-dcdbc40a0c0b",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Chefe de Delegacia",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),
            array(
                "id" => "b89d2218-d7b5-451f-be5a-5cedb79a6232",
                "created_at" => "2024-02-23 14:55:55",
                "updated_at" => "2024-02-23 14:55:55",
                "deleted_at" => NULL,
                "nome" => "Coordenador Geral",
                "nivel" => "",
                "descricao" => "",
                "siape" => "",
                "cbo" => "",
                "ativo" => 1,
            ),*/
        );

        foreach ($funcoes as $funcao) {
            Funcao::firstOrCreate(['id' => $funcao['id']], $funcao);
        }
    }
}
