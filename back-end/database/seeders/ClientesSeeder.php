<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientesSeeder extends Seeder
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
        $clientes = [
            [
                'id' => 'd7d34d34-7098-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'c28122f5-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Lista de UORGS do órgão/entidade',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => 'f3eedb40-7098-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Direta',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => '58db86a8-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Indireta',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => '60aca904-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Legislativo',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => '660e4d2b-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Judiário',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => '6ca07153-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Orgãos de controle',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => '71f7572d-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'cfd50d6a-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Estadual e DF',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => 'ad145ad4-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Instituição privadas sem fins lucrativos',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => 'efec75dd-d619-11ef-a51b-0242ac120003',
                'tipo_cliente_id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Instituição privadas com fins lucrativos',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ],
            [
                'id' => 'b5209f31-7099-11ef-8e76-0242ac1c0002',
                'tipo_cliente_id' => 'd55be7dd-708d-11ef-8e76-0242ac1c0002',
                'nome' => 'Indivíduo',
                'created_at' => $this->timenow,
                'updated_at' => $this->timenow,
                'deleted_at' => null
            ]

        ];

        Cliente::upsert($clientes, 'id');
    }
}
