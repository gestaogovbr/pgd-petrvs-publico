<?php

namespace Database\Seeders;

use App\Models\TipoCliente;
use App\Models\Cliente;
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

            $clientes = [
                [
                    'id' => '9dd2913d-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Direta',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'a616f006-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Indireta',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'ae49738e-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Legislativo',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'b7f4d2ea-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Judiciário',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'c176c666-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Órgãos de controle',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'c802ba2e-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Estadual e DF',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => 'cdd000e2-d12e-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Municipal',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],

                [
                    'id' => '2fd75791-d12f-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Instituições privadas sem fins lucrativos',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ],
                [
                    'id' => '3c1ce5ef-d12f-11ef-a51b-0242ac120003',
                    'tipo_cliente_id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                    'nome' => 'Indivíduo',
                    'created_at' => $this->timenow,
                    'updated_at' => $this->timenow,
                    'deleted_at' => null
                ]
            ];

            TipoCliente::upsert($tiposClientes, 'id');
            Cliente::upsert($clientes, 'id');
    }
}
