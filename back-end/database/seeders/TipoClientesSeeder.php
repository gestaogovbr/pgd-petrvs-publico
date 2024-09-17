<?php

namespace Database\Seeders;

use App\Models\TipoCliente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoClientesSeeder extends Seeder
{
    public $timenow;
    public function __construct()
    {
        $this->timenow = now();
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiposClientes =
            [
                [
                    'id' => 'c28122f5-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Unidade de órgão/entidade',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Administração Pública',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Público externo',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ]
            ];

            TipoCliente::upsert($tiposClientes, 'id');
    }
}
