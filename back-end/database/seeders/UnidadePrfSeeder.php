<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidade;
use Carbon\Carbon;

class UnidadePrfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //cria a Unidade 'PRF', que será a raiz de todas as outras
        $prf = new Unidade();
        $prf->fill([
            'codigo' => '1',
            'sigla' => 'PRF',
            'nome' => 'POLÍCIA RODOVIÁRIA FEDERAL',
            'entidade_id' => '52d78c7d-e0c1-422b-b094-2ca5958d5ac1'
        ]);
        $prf->save();
    }
}
