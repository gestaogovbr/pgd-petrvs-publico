<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Unidade;
use App\Models\Cidade;

class UnidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public $timenow;
    public $brasilia;

    public function __construct(){
        $this->timenow = now();
        $this->brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
    }

    public function run()
    {
        /*
        $brasilia = Cidade::where('codigo_ibge', '5300108')->sole();
        //cria a Unidade 'PRF' que será a raiz de todas as outras.
        $prf = new Unidade();
        $prf->fill([
            'codigo' => '1', // Código SIAPE da UORG
            'sigla' => 'PRF',
            'nome' => 'Polícia Rodoviária Federal',
            'entidade_id' => '52d78c7d-e0c1-422b-b094-2ca5958d5ac1',
            'instituidora' => 1,
            'cidade_id' => $brasilia->id
        ]);
        $prf->save();
        */

        $unidades = array(
          array(
            "id" => '4f705d83-5808-4240-8b92-39ca88139076',
            "codigo" => '30802', //Código SIAPE da UORG
            "sigla" => 'PRF',
            "nome" => 'Polícia Rodoviária Federal',
            "entidade_id" => '52d78c7d-e0c1-422b-b094-2ca5958d5ac1',
            "instituidora" => 1,
            "cidade_id" => $this->brasilia->id
          ),
          array(
            "id" => '8a2a768c-ae60-4308-8f30-821a21a66fe4',
            "codigo" => '17500', //Código SIAPE da UORG
            "sigla" => 'MGI',
            "nome" => 'Ministério da Gestão e da Inovação em Serviços Públicos',
            "entidade_id" => '1eec6bcb-28c9-4b2e-ad37-250a10439647',
            "instituidora" => 1,
            "cidade_id" => $this->brasilia->id
          ),
        );
        Unidade::insertOrIgnore($unidades);
    }
}
